import { useQuery } from "@tanstack/react-query";

import { swapEndpoint } from "./endpoint";
import { swapQueryKey } from "./queryKey";

import { Response, TUseQueryOptions } from "@/types/response";
import { axiosInstance } from "@/utils/axios";

export type useSwapEstimateGasQuery = {
  tokenIn?: string;
  tokenOut: string;
  networkId: string;
  amount: number;
  tokenAddress?: string;
  maxPriorityFeePerGas?: string | null;
  baseFee?: string | null;
};

export const useSwapEstimateGas = (
  query: useSwapEstimateGasQuery,
  options?: TUseQueryOptions<Response<number>>
) => {
  const queryKey = swapQueryKey.estimateGas(query);
  return useQuery({
    queryKey,
    queryFn: () =>
      axiosInstance.get<Response<number>>(swapEndpoint.estimateGas, {
        params: query,
      }),
    ...options,
  });
};
