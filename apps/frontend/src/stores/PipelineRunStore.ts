import { create } from 'zustand';

type TPipelineRun = {
  images: File[];
  setImages: (images: File[]) => void;
  pipeline: any;
  setPipeline: (pipeline: any) => void;
  isStarted: boolean;
  setIsStarted: (value: boolean) => void;
  isRequestCompleted: boolean;
  setIsRequestCompleted: (value: boolean) => void;
};

const usePipelineRun = create<TPipelineRun>((set, get) => ({
  images: [],
  setImages: (images: File[]) => set({ images }),
  pipeline: null,
  setPipeline: (pipeline: any) => set({ pipeline }),
  isStarted: false,
  setIsStarted: (value: boolean) => set({ isStarted: value }),
  isRequestCompleted: false,
  setIsRequestCompleted: (value: boolean) => set({ isRequestCompleted: value }),
}));

export default usePipelineRun;
