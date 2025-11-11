import { create } from 'zustand';
import Cookies from 'js-cookie';

interface AuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: Cookies.get('auth') === 'true',
  login: () => {
    Cookies.set('auth', 'true', { expires: 7 });
    set({ isAuthenticated: true });
  },
  logout: () => {
    Cookies.remove('auth');
    set({ isAuthenticated: false });
  },
}));
