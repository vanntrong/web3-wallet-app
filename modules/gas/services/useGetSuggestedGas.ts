import { useQuery } from "@tanstack/react-query";

import { gasEndpoint } from "./endpoint";
import { gasQueryKey } from "./queryKey";
import { TSuggestedGasFees } from "../types";

import { Response, TUseQueryOptions } from "@/types/response";
import { axiosInstance } from "@/utils/axios";

export type TUseGetSuggestedGasOptions = {
  networkId?: string;
};

const useGetSuggestedGas = (
  params?: TUseGetSuggestedGasOptions,
  options?: TUseQueryOptions<Response<TSuggestedGasFees | null>>
) => {
  const queryKey = gasQueryKey.getSuggestedGasFee(params);

  return useQuery({
    queryKey,
    queryFn: () =>
      axiosInstance.get<Response<TSuggestedGasFees | null>>(
        gasEndpoint.getSuggestedGasFee,
        {
          params,
        }
      ),
    ...options,
  });
};

export default useGetSuggestedGas;
