import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { transactionsEndpoint } from "./endpoint";
import { TTransaction } from "../types";

import { Response } from "@/types/response";
import { axiosInstance } from "@/utils/axios";

export type TSendTransactionData = {
  to: string;
  networkId: string;
  amount: number;
  tokenAddress?: string;
  maxPriorityFeePerGas?: number | null;
  baseFee?: number | null;
};

export const useSendTransaction = (
  options?: UseMutationOptions<
    AxiosResponse<Response<TTransaction>>,
    AxiosError,
    TSendTransactionData
  >
) => {
  return useMutation({
    mutationFn: (data: TSendTransactionData) =>
      axiosInstance.post<Response<TTransaction>>(
        transactionsEndpoint.sendTransaction,
        data
      ),
    ...options,
  });
};
