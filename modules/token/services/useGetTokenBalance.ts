import { useQuery } from "@tanstack/react-query";

import { tokenQueryEndpoint } from "./endpoint";
import { tokenQueryKey } from "./queryKey";

import { Response, TUseQueryOptions } from "@/types/response";
import { axiosInstance } from "@/utils/axios";

export type TUseGetTokenBalanceQuery = {
  networkId?: string;
  contractAddress?: string;
  tokenDecimal?: number;
};

const useGetTokenBalance = (
  query: TUseGetTokenBalanceQuery,
  options?: TUseQueryOptions<Response<number>>
) => {
  const queryKey = tokenQueryKey.getTokenBalance(query);

  return useQuery({
    queryKey,
    queryFn: () =>
      axiosInstance.get<Response<number>>(tokenQueryEndpoint.getTokenBalance, {
        params: query,
      }),
    ...options,
  });
};

export default useGetTokenBalance;
