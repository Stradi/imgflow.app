import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  OnNodesDelete,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  getConnectedEdges,
  getIncomers,
  getOutgoers,
} from 'reactflow';
import { create } from 'zustand';

let nodeIdCounter = 0;
let edgeIdCounter = 0;

type TCanvasStore = {
  isDraggingNewNode: boolean;
  setIsDraggingNewNode: (isDraggingNewNode: boolean) => void;
  setCounters: (nodeIdValue: number, edgeIdValue: number) => void;
  getNewNodeID: () => string;
  getNewEdgeID: () => string;

  pipelineName: string;
  setPipelineName: (pipelineName: string) => void;

  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onNodesDelete: OnNodesDelete;
};

const useCanvasStore = create<TCanvasStore>((set, get) => ({
  isDraggingNewNode: false,
  setIsDraggingNewNode: (isDraggingNewNode: boolean) => set({ isDraggingNewNode }),
  setCounters: (nodeIdValue: number, edgeIdValue: number) => {
    nodeIdCounter = nodeIdValue;
    edgeIdCounter = edgeIdValue;
  },
  getNewNodeID: () => {
    return `node-${nodeIdCounter++}`;
  },
  getNewEdgeID: () => {
    return `edge-${edgeIdCounter++}`;
  },
  pipelineName: 'New Pipeline',
  setPipelineName: (pipelineName: string) => set({ pipelineName }),
  nodes: [],
  edges: [],
  setNodes: (nodes: Node[]) => set({ nodes }),
  setEdges: (edges: Edge[]) => set({ edges }),
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  onNodesDelete: (deletedNodes: Node[]) => {
    set({
      edges: deletedNodes.reduce((acc, node) => {
        const incomers = getIncomers(node, get().nodes, get().edges);
        const outgoers = getOutgoers(node, get().nodes, get().edges);
        const connectedEdges = getConnectedEdges([node], get().edges);

        const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));
        const createdEdges = incomers.flatMap(({ id: source }) =>
          outgoers.map(({ id: target }) => ({ id: get().getNewEdgeID(), source, target, type: 'Reactive' }))
        );

        return [...remainingEdges, ...createdEdges];
      }, get().edges),
    });
  },
}));

export default useCanvasStore;
