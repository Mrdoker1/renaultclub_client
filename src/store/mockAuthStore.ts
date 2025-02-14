import { create } from "zustand";

interface User {
  id: string;
  username: string;
  email: string;
}

interface MockAuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
  fetchUser: () => Promise<void>;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export const useMockAuthStore = create<MockAuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  user: null,
  fetchUser: async () => {
    set({ user: { id: "1", username: "MockedUser", email: "MockedUser@example.com" } });
  },
  login: async (username: string) => {
    const token = 'MockedToken';
    localStorage.setItem("token", token);
    set({ token, isAuthenticated: true, user: { id: "1", username, email: `${username}@example.com` } });
    await useMockAuthStore.getState().fetchUser();
  },
  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
}));
