import { create } from "zustand";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  load: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: (user, token) => {
    localStorage.setItem("hqk_token", token);
    localStorage.setItem("hqk_user", JSON.stringify(user));
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem("hqk_token");
    localStorage.removeItem("hqk_user");
    set({ user: null, token: null });
  },
  load: () => {
    const token = localStorage.getItem("hqk_token");
    const user = localStorage.getItem("hqk_user");
    if (token && user) set({ token, user: JSON.parse(user) });
  },
}));
