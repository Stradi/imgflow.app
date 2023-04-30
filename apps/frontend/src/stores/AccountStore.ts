import { create } from 'zustand';

type TAccountStore = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;

  user: {
    id: string;
    email: string;
  } | null;
  setUser: (user: { id: string; email: string }) => void;
};

// NOTE: I don't actually know if this works correctly, but it seems to work
const useAccountStore = create<TAccountStore>((set, get) => ({
  isAuthenticated: window.localStorage.getItem('user') !== null,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),

  user: window.localStorage.getItem('user') === null ? null : JSON.parse(window.localStorage.getItem('user')!),
  setUser: (user: { id: string; email: string }) => set({ user }),
}));

export default useAccountStore;
