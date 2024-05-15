import { useQuery } from "@tanstack/react-query";

import { transactionsEndpoint } from "./endpoint";
import { transactionQueryKey } from "./queryKey";

import { Response, TUseQueryOptions } from "@/types/response";
import { axiosInstance } from "@/utils/axios";

export type useEstimateGasQuery = {
  to: string;
  networkId: string;
  amount: number;
  tokenAddress?: string;
  maxPriorityFeePerGas?: string | null;
  baseFee?: string | null;
};

export const useEstimateGas = (
  query: useEstimateGasQuery,
  options?: TUseQueryOptions<Response<number>>
) => {
  const queryKey = transactionQueryKey.estimateGas(query);
  return useQuery({
    queryKey,
    queryFn: () =>
      axiosInstance.get<Response<number>>(transactionsEndpoint.estimateGas, {
        params: query,
      }),
    ...options,
  });
};
