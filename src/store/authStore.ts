import { create } from "zustand";
import axios from "axios";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: null,
  isAuthenticated: !!localStorage.getItem("token"),

  login: async (username, password) => {
    const res = await axios.post("http://localhost:3000/auth/login", { username, password });
    const token = res.data.token;
    localStorage.setItem("token", token);
    set({ token, isAuthenticated: true });

    await useAuthStore.getState().fetchUser(); // Загружаем данные о пользователе после входа
  },

  register: async (username, email, password) => {
    await axios.post("http://localhost:3000/auth/register", { username, email, password, role: "user" });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null, isAuthenticated: false });
  },

  fetchUser: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:3000/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ user: res.data });
    } catch (error) {
      console.error("Ошибка загрузки пользователя:", error);
      set({ user: null, isAuthenticated: false });
    }
  },
}));
