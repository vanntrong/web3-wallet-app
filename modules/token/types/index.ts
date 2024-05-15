export type TMainToken = {
  symbol: string;
  balance: number;
  contractAddress?: string;
  priceFeedId: string | null;
  thumbnail: string | null;
  decimal: number;
  name: string;
};

export type TToken = {
  id: string;
  name: string;
  contractAddress: string;
  symbol: string;
  decimal: number;
  balance?: number;
  priceFeedId: string | null;
  thumbnail: string | null;
  createdAt: string;
  updatedAt: string | null;
};
