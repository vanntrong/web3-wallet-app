import { useQuery } from "@tanstack/react-query";

import { userEndpoint } from "./endpoint";
import { userQueryKey } from "./queryKey";

import { TMainToken, TToken } from "@/modules/token/types";
import { Response, TUseQueryOptions } from "@/types/response";
import { axiosInstance } from "@/utils/axios";

export type TGetMyTokenResponse = Response<{
  mainToken: TMainToken;
  otherTokens: TToken[];
}>;

export type TGetMyTokenResponseExtract = TGetMyTokenResponse["data"];

export const useGetMyToken = (
  networkId?: string,
  options?: TUseQueryOptions<TGetMyTokenResponse>
) => {
  const queryKey = userQueryKey.getMyTokens(networkId);

  return useQuery({
    queryKey,
    queryFn: () => {
      console.log("useGetMyToken", { networkId });
      return axiosInstance.get<TGetMyTokenResponse>(userEndpoint.getMyTokens, {
        params: {
          networkId,
        },
      });
    },

    ...options,
  });
};
