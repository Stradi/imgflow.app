export function isPipelineValid(pipeline: any) {
  const { graph, nodes } = buildGraph(pipeline);

  const validPaths = getValidPaths(graph, nodes);
  return validPaths.length > 0;
}

function sanitizePipelineData(data: any) {
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

function buildGraph(data: any) {
  const adjList = new Map<string, Array<string>>();
  const nodes: Record<string, any> = {};

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
function getValidPaths(graph: Map<string, string[]>, nodes: Record<string, any>) {
  const paths = depthFirstTraverse(graph, nodes).map((path: any) => path.map((node: any) => nodes[node]));

  const pathsWithOutput = paths.filter((path: any) => path.find((node: any) => node.type === 'Output'));
  if (pathsWithOutput.length === 0) {
    return [];
  }

  const pathsWithInput = paths.filter((path: any) => path.find((node: any) => node.type === 'InputImage'));
  if (pathsWithInput.length === 0) {
    return [];
  }

  // Return only the paths that have both Input and Output nodes and populate the functions.
  return pathsWithInput.filter((path: any) => pathsWithOutput.find((p: any) => p === path));
}

function depthFirstTraverse(
  graph: Map<any, any[]>,
  nodes: Record<string, any>,
  allPaths: string[][] = [],
  visited = new Set<any>(),
  startNode: string | null = null,
  currentPath: any[] = []
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
