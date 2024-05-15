import {
  useInfiniteQuery,
  InfiniteData,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { transactionsEndpoint } from "./endpoint";
import { transactionQueryKey } from "./queryKey";
import { TTransaction } from "../types";

import { BasePaginationQuery } from "@/types/query";
import { Response, TUseInfiniteQueryOptions } from "@/types/response";
import { axiosInstance } from "@/utils/axios";

export interface GetTransactionsQuery extends BasePaginationQuery {
  networkId?: string;
  tokenId?: string;
}

export const useGetTransactions = (
  query: GetTransactionsQuery,
  options?: any
) => {
  const queryKey = transactionQueryKey.getTransactions(query);

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 0 }) =>
      axiosInstance.get<Response<TTransaction[]>>(
        transactionsEndpoint.getTransactions,
        {
          params: {
            ...query,
            offset: pageParam,
          },
        }
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      console.log("lastPage", lastPage.data.pagination);
      if (lastPage.data.pagination?.hasNext) {
        return (
          Number(lastPage.data.pagination?.offset) +
          Number(lastPage.data.pagination.limit)
        );
      }

      return undefined;
    },
    ...options,
  });
};
