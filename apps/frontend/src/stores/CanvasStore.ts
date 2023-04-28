import { create } from 'zustand';

let nodeIDCounter = 0;
let edgeIDCounter = 0;

type CanvasStore = {
  isDraggingNewNode: boolean;
  setIsDraggingNewNode: (isDraggingNewNode: boolean) => void;
  getNewNodeID: () => string;
  getNewEdgeID: () => string;
};

const useCanvasStore = create<CanvasStore>((set, get) => ({
  isDraggingNewNode: false,
  setIsDraggingNewNode: (isDraggingNewNode: boolean) => set({ isDraggingNewNode }),
  getNewNodeID: () => {
    return `node-${nodeIDCounter++}`;
  },
  getNewEdgeID: () => {
    return `edge-${edgeIDCounter++}`;
  },
}));

export default useCanvasStore;
