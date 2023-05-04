import { ReactNode } from 'react';
import { create } from 'zustand';

export type TJob = {
  id: string;
  status: string;
  imageCount: number;
  progress: any;
  createdAt: string;
  duration: string;
  actions: ReactNode;
};

type TJobStore = {
  jobs: TJob[];
  addJob: (job: TJob) => void;
  setJobs: (jobs: TJob[]) => void;
  updateJob: (id: string, job: TJob) => void;
};

const useJobStore = create<TJobStore>((set, get) => ({
  jobs: [],
  addJob: (job: TJob) => set({ jobs: [...get().jobs, job] }),
  setJobs: (jobs: TJob[]) => set({ jobs }),
  updateJob: (id: string, job: TJob) => {
    const jobs = get().jobs.map((j) => (j.id === id ? job : j));
    set({ jobs });
  },
}));

export default useJobStore;
