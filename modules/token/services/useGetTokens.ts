import { useQuery } from "@tanstack/react-query";
import React from "react";

import { tokenQueryEndpoint } from "./endpoint";
import { tokenQueryKey } from "./queryKey";
import { TToken } from "../types";

import { BasePaginationQuery } from "@/types/query";
import { Response, TUseQueryOptions } from "@/types/response";
import { axiosInstance } from "@/utils/axios";

export interface UseGetTokenQuery extends BasePaginationQuery {
  networkId?: string;
  excludeContractAddresses?: string[];
  includeNative?: boolean;
}

const useGetTokens = (
  params?: UseGetTokenQuery,
  options?: TUseQueryOptions<Response<TToken[]>>
) => {
  const queryKey = tokenQueryKey.getTokens(params);

  return useQuery({
    queryKey,
    queryFn: () => {
      return axiosInstance.get<Response<TToken[]>>(
        tokenQueryEndpoint.getTokens,
        {
          params,
        }
      );
    },
    ...options,
  });
};

export default useGetTokens;
