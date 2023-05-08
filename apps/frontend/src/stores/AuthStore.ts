import { create } from 'zustand';

export type TUser = {
  id: number;
  email: string;
  accessToken: string;
};

type TAuthStore = {
  user: TUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: TUser) => void;
  logout: () => void;
  stopLoading: () => void;
};

const useAuthStore = create<TAuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: (user) => {
    localStorage.setItem('accessToken', user.accessToken);

    set({
      user,
      isAuthenticated: true,
    });
  },
  logout: () => {
    localStorage.removeItem('accessToken');

    set({
      user: null,
      isAuthenticated: false,
    });
  },
  stopLoading: () => set({ isLoading: false }),
}));

export default useAuthStore;
