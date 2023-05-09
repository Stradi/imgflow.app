import { RefObject } from 'react';
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
  canvasWrapperRef: RefObject<HTMLDivElement> | null;
  setCanvasWrapperRef: (canvasWrapperRef: RefObject<HTMLDivElement>) => void;

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

  getNodeData: (nodeId: string) => any;
  setNodeData: (nodeId: string, data: any) => void;

  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onNodesDelete: OnNodesDelete;

  reset: () => void;
};

const useCanvasStore = create<TCanvasStore>((set, get) => ({
  canvasWrapperRef: null,
  setCanvasWrapperRef: (canvasWrapperRef: RefObject<HTMLDivElement>) => set({ canvasWrapperRef }),

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
  getNodeData: (nodeId: string) => {
    const node = get().nodes.find((node) => node.id === nodeId);
    return node?.data || {};
  },
  setNodeData: (nodeId: string, data: any) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data,
          };
        }

        return node;
      }),
    });
  },
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
  reset: () => {
    nodeIdCounter = 0;
    edgeIdCounter = 0;
    set({
      nodes: [],
      edges: [],
      pipelineName: 'Untitled Pipeline',
    });
  },
}));

export default useCanvasStore;
