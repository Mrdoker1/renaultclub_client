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
    try {
      const res = await axios.post("http://localhost:3000/auth/login", { username, password });
      const token = res.data.token;
      localStorage.setItem("token", token);
      set({ token, isAuthenticated: true });

      await useAuthStore.getState().fetchUser(); // Загружаем данные о пользователе после входа
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("Ошибка с сервера:", error.response);
        throw new Error((error.response?.data?.message as string) || "Ошибка входа");
      } else {
        throw new Error("Сервер не отвечает");
      }
    }
  },

  register: async (username, email, password) => {
    try {
      await axios.post("http://localhost:3000/auth/register", { username, email, password, role: "user" });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("Ошибка с сервера:", error.response.data.message);
        throw new Error(error.response.data.message || "Ошибка регистрации");
      } else {
        throw new Error("Сервер не отвечает");
      }
    }
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
      if (axios.isAxiosError(error) && error.response) {
        console.error("Ошибка загрузки пользователя:", (error.response?.data?.message as string) || "Unknown error");
      } else {
        console.error("Сервер не отвечает");
      }
      set({ user: null, isAuthenticated: false });
    }
  },
}));
