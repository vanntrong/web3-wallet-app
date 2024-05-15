export type TNetwork = {
  id: string;
  name: string;
  rpcURL: string;
  chainId: number;
  currentSymbol: string;
  blockExplorerUrl: string | null;
  thumbnail: string | null;
  isDefaultNetwork: true;
  isTestNet: true;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  networkSwap: TNetworkSwap | null;
};

export type TNetworkSwap = {
  id: string;
};
