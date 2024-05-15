import { TUseGetTokenBalanceQuery } from "./useGetTokenBalance";
import type { TUseGetTokenInfoFromAddressQuery } from "./useGetTokenInfoFromAddress";
import { UseGetTokenQuery } from "./useGetTokens";

export const tokenQueryKey = {
  getTokenFromAddress: (query: TUseGetTokenInfoFromAddressQuery) => [
    "getTokenFromAddress",
    query,
  ],
  getTokens: (params?: UseGetTokenQuery) => ["getTokens", params],
  getTokenBalance: (params?: TUseGetTokenBalanceQuery) => [
    "getTokenBalance",
    params,
  ],
};
