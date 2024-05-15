import { create } from "zustand";

import { TMainToken, TToken } from "@/modules/token/types";

interface TokenStore {
  mainToken?: TMainToken;
  otherTokens: TToken[];
  isLoading: boolean;

  setMainToken: (token: TMainToken) => void;
  setOtherTokens: (tokens: TToken[]) => void;
  getTokenById: (id: string) => TToken | undefined;
  setIsLoading: (isLoading: boolean) => void;
}

export const useTokenStore = create<TokenStore>((set, get) => ({
  otherTokens: [],
  isLoading: false,
  setMainToken(token) {
    set({ mainToken: token });
  },
  setOtherTokens(tokens) {
    set({ otherTokens: tokens });
  },
  getTokenById(id) {
    const tokens = get().otherTokens;
    return tokens.find((token) => token.id === id);
  },
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export const getTokenById = (id: string) =>
  useTokenStore.getState().getTokenById(id);
