import { create } from 'zustand';

type TEasterEggStore = {
  sarcasticMode: boolean;
  setSarcasticMode: (value: boolean) => void;
};

const useEasterEggStore = create<TEasterEggStore>((set, get) => ({
  sarcasticMode: false,
  setSarcasticMode: (value) => set({ sarcasticMode: value }),
}));

export default useEasterEggStore;
