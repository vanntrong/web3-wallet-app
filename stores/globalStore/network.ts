import { create } from "zustand";

import { TNetwork } from "@/modules/network/types";

interface NetworkStore {
  networks: TNetwork[];
  setNetworks: (networks: TNetwork[]) => void;
  currentNetwork: TNetwork | null;
  setCurrentNetwork: (network: TNetwork | null) => void;
}

export const useNetworkStore = create<NetworkStore>((set) => ({
  networks: [],
  setNetworks(networks) {
    set({ networks });
  },
  currentNetwork: null,
  setCurrentNetwork(network) {
    set({ currentNetwork: network });
  },
}));
