import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface IPriceStore {
  prices: Record<string, number>;
  setPrice: (priceFeedId: string, price: number) => void;
}

export const usePriceStore = create<IPriceStore, [["zustand/immer", never]]>(
  immer((set) => ({
    prices: {},
    setPrice(priceFeedId, price) {
      set((state) => {
        state.prices[priceFeedId] = price;
      });
    },
  }))
);
