import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { swapEndpoint } from "./endpoint";

import { Response } from "@/types/response";
import { axiosInstance } from "@/utils/axios";

export type TSwapTokenData = {
  tokenIn?: string;
  tokenOut?: string;
  amount: number;
  networkId: string;
  maxPriorityFeePerGas?: number | null;
  baseFee?: number | null;
};

const useSwapToken = (
  options?: UseMutationOptions<
    AxiosResponse<Response<unknown>>,
    AxiosError,
    TSwapTokenData
  >
) => {
  return useMutation({
    mutationFn: (body: TSwapTokenData) =>
      axiosInstance.post<Response<unknown>>(swapEndpoint.createSwap, body),
    ...options,
  });
};

export default useSwapToken;
