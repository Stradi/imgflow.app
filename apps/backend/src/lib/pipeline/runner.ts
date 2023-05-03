import sharp from 'sharp';
import { s3, uploadImage } from '../s3';
import { STEPNAME_TO_FN, TStep, functions } from './steps';

export type TPipeline = {
  steps: TStep[];
};

export type TNode = {
  id: string;
  data: any;
  type: string;
};

export type TEdge = {
  id: string;
  source: string;
  target: string;
};

export type TPipelineNew = {
  nodes: TNode[];
  edges: TEdge[];
};

export async function runPipeline(image: sharp.Sharp, pipeline: TPipeline, key: string) {
  const outputStep = pipeline.steps.find((step) => step.name === 'Output');
  if (!outputStep) {
    return '';
  }

  for (const step of pipeline.steps) {
    if (!STEPNAME_TO_FN[step.name]) {
      console.error(`Could not find step ${step.name}, continuing...`);
      continue;
    }

    if (step.name === 'Output') {
      await uploadImage(s3(), await image.toBuffer(), `${key}.${step.args.format}`, `image/${step.args.format}`);
      return `${key}.${step.args.format}`;
    }

    functions[STEPNAME_TO_FN[step.name]](image, step.args as any);
  }

  console.error('This should never happen. If you see this then I definitely fucked up this shit.');
  return '';
}

export async function runPipelineNew(pipeline: TPipelineNew) {
  const { graph, nodes } = buildGraph(pipeline);
  const paths = depthFirstTraverse(graph, nodes);

  const populatedPaths = paths.map((path) => {
    const pathNodes = path.map((id) => {
      return nodes[id];
    });

    return pathNodes;
  });

  console.log(populatedPaths);
}

function buildGraph(data: TPipelineNew) {
  // TODO: We should actually check if at least one input and output node exists
  // and are not in different islands.

  const adjList = new Map<string, Array<string>>();
  const nodes: Record<string, TNode> = {};

  for (const node of data.nodes) {
    adjList.set(node.id, []);
    nodes[node.id] = node;
  }

  for (const edge of data.edges) {
    const source = adjList.get(edge.source);
    const target = adjList.get(edge.target);
    if (!source || !target) {
      continue;
    }

    source.push(edge.target);
    target.push(edge.source);
  }

  return {
    graph: adjList,
    nodes,
  };
}

function depthFirstTraverse(
  graph: Map<string, string[]>,
  nodes: Record<string, TNode>,
  allPaths: string[][] = [],
  visited = new Set<string>(),
  startNode: string | null = null,
  currentPath: string[] = []
) {
  if (startNode === null) {
    const inputNode = Object.values(nodes).find((node) => node.type === 'InputImage');
    if (!inputNode) {
      throw new Error('Could not find input node');
    }

    startNode = inputNode.id;
  }

  visited.add(startNode);

  if (currentPath.length === 0) {
    currentPath = [startNode];
  }

  const children = graph.get(startNode);
  if (!children) {
    throw new Error('This node is not connected to anything. Then how did we get here? WTF!!!');
  }

  if (children.length === 1) {
    allPaths.push([...currentPath]);
  }

  for (const child of children) {
    if (!visited.has(child)) {
      currentPath.push(child);

      allPaths = depthFirstTraverse(graph, nodes, allPaths, visited, child, currentPath);

      currentPath.pop();
    }
  }

  return allPaths;
}
