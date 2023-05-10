import sharp from 'sharp';
import { s3, uploadImage } from '../s3';
import { STEPNAME_TO_FN, functions } from './steps';

export type TNode = {
  id: string;
  data: any;
  type: string;
  fn?: Function;
};

export type TEdge = {
  id: string;
  source: string;
  target: string;
};

export type TPipeline = {
  nodes: TNode[];
  edges: TEdge[];
};

export async function runPipeline(
  files: any,
  pipeline: TPipeline,
  pipelineId: number,
  userId: number,
  onProgress: (progress: any) => void
) {
  onProgress({
    message: 'Building graph',
    progress: 0,
  });

  const { graph, nodes } = buildGraph(sanitizePipelineData(pipeline));

  const validPaths = getValidPaths(graph, nodes);
  if (validPaths.length === 0) {
    throw new Error('Pipeline is not valid');
  }

  const totalStepCount = files.length * validPaths.length;
  let currentStep = 0;

  const processedFiles = [];
  const originalFiles = [];

  onProgress(0);

  for (const file of files) {
    originalFiles.push(file.key);

    for (const path of validPaths) {
      const sharpImage = sharp(file.stream);
      sharpImage.ensureAlpha();
      const processedFileKey = await runFlow(path, sharpImage, `${userId}/${pipelineId}/${file.uuid}`);
      processedFiles.push(processedFileKey);

      currentStep++;
      onProgress(Math.round((currentStep / totalStepCount) * 100));
    }
  }

  onProgress(100);

  return {
    originalFiles,
    processedFiles,
  };
}

async function runFlow(flow: TNode[], image: sharp.Sharp, key: string) {
  let finalImg = await image.toBuffer();

  for (const step of flow) {
    if (!STEPNAME_TO_FN[step.type]) {
      console.error(`Could not find step ${step.type}, continuing`);
      continue;
    }

    if (step.type === 'Output') {
      const finalKey = `${key}/${step.data.filename}.${step.data.format}`;
      await uploadImage(s3(), await finalImg, finalKey, `image/${step.data.format}`);
      return finalKey;
    }

    const newImg = await functions[STEPNAME_TO_FN[step.type]](finalImg, step.data as any);
    finalImg = newImg;
  }

  throw new Error('This should never happen. So we are throwing error: Dafuq?');
}

function buildGraph(data: TPipeline) {
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

function nodeToFunction(node: TNode) {
  switch (node.type) {
    case 'InputImage':
      return functions.input;
    case 'Crop':
      return functions.crop;
    case 'Extend':
      return functions.extend;
    case 'Resize':
      return functions.resize;
    case 'Output':
      return functions.output;
    default:
      return functions.noop;
  }
}

function sanitizePipelineData(data: TPipeline) {
  const whitelistedNodeProps = ['id', 'data', 'type'];
  const whitelistedEdgeProps = ['id', 'source', 'target'];

  for (const node of data.nodes) {
    for (const key of Object.keys(node)) {
      if (!whitelistedNodeProps.includes(key)) {
        // @ts-ignore
        delete node[key];
      }
    }
  }

  for (const edge of data.edges) {
    for (const key of Object.keys(edge)) {
      if (!whitelistedEdgeProps.includes(key)) {
        // @ts-ignore
        delete edge[key];
      }
    }
  }

  return data;
}

function getValidPaths(graph: Map<string, string[]>, nodes: Record<string, TNode>) {
  const paths = depthFirstTraverse(graph, nodes).map((path) => path.map((node) => nodes[node]));

  const pathsWithOutput = paths.filter((path) => path.find((node) => node.type === 'Output'));
  if (pathsWithOutput.length === 0) {
    return [];
  }

  const pathsWithInput = paths.filter((path) => path.find((node) => node.type === 'InputImage'));
  if (pathsWithInput.length === 0) {
    return [];
  }

  // Return only the paths that have both Input and Output nodes and populate the functions.
  return pathsWithInput
    .filter((path) => pathsWithOutput.find((p) => p === path))
    .map((path) =>
      path.map((node) => ({
        ...node,
        fn: nodeToFunction(node),
      }))
    );
}
