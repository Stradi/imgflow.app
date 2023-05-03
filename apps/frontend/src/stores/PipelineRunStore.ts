import { create } from 'zustand';

type TPipelineRun = {
  images: File[];
  setImages: (images: File[]) => void;
  pipeline: any;
  setPipeline: (pipeline: any) => void;
  isFinished: boolean;
  setIsFinished: (isFinished: boolean) => void;
};

const usePipelineRun = create<TPipelineRun>((set, get) => ({
  images: [],
  setImages: (images: File[]) => set({ images }),
  pipeline: null,
  setPipeline: (pipeline: any) => set({ pipeline }),
  isFinished: false,
  setIsFinished: (isFinished: boolean) => set({ isFinished }),
}));

export default usePipelineRun;
