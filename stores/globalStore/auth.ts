import { create } from "zustand";

import { TUser } from "@/modules/user/types";

interface AuthStore {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user: TUser | null) => set({ user }),
  accessToken: null,
  setAccessToken: (accessToken: string | null) => set({ accessToken }),
}));
