import { create } from 'zustand';

let nodeIDCounter = 0;
let edgeIDCounter = 0;

type TCanvasStore = {
  isDraggingNewNode: boolean;
  setIsDraggingNewNode: (isDraggingNewNode: boolean) => void;
  getNewNodeID: () => string;
  getNewEdgeID: () => string;
};

const useCanvasStore = create<TCanvasStore>((set, get) => ({
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
