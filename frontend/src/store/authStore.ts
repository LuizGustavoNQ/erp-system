import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  userEmail: string | null;
  login: (token: string, email: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      userEmail: null,
      login: (token, email) => set({ token, userEmail: email }),
      logout: () => set({ token: null, userEmail: null }),
      isAuthenticated: () => !!get().token,
    }),
    {
      name: 'erp-auth-storage',
    }
  )
);
