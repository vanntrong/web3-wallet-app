import { useQuery } from "@tanstack/react-query";

import { swapEndpoint } from "./endpoint";
import { swapQueryKey } from "./queryKey";

import { Response, TUseQueryOptions } from "@/types/response";
import { axiosInstance } from "@/utils/axios";

export type TGetSwapQuoteParams = {
  tokenIn?: string;
  tokenOut?: string;
  amount: number;
  networkId: string;
};

export type TGetSwapQuoteResponse = {
  amountOut: number;
  gasEstimate: number;
};

const useGetSwapQuote = (
  params?: TGetSwapQuoteParams,
  options?: TUseQueryOptions<Response<TGetSwapQuoteResponse>>
) => {
  const queryKey = swapQueryKey.getQuote(params);

  return useQuery({
    queryKey,
    queryFn: () =>
      axiosInstance.get<Response<TGetSwapQuoteResponse>>(
        swapEndpoint.getQuote,
        {
          params,
        }
      ),
    ...options,
  });
};

export default useGetSwapQuote;
