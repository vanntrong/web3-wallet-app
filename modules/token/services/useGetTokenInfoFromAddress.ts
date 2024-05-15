import { useQuery } from "@tanstack/react-query";

import { tokenQueryEndpoint } from "./endpoint";
import { tokenQueryKey } from "./queryKey";

import { Response, TUseQueryOptions } from "@/types/response";
import { axiosInstance } from "@/utils/axios";

export type TGetTokenInfoResponse = {
  name: string;
  symbol: string;
  decimal: number;
  thumbnail: string | null;
};

export type TUseGetTokenInfoFromAddressQuery = {
  contractAddress?: string;
  networkId?: string;
};

export const useGetTokenInfoFromAddress = (
  query: TUseGetTokenInfoFromAddressQuery,
  options?: TUseQueryOptions<Response<TGetTokenInfoResponse>>
) => {
  const queryKey = tokenQueryKey.getTokenFromAddress(query);

  return useQuery({
    queryKey,
    queryFn: () =>
      axiosInstance.get<Response<TGetTokenInfoResponse>>(
        tokenQueryEndpoint.getTokenFromAddress,
        {
          params: query,
        }
      ),
    ...options,
  });
};
