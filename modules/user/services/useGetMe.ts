import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { userEndpoint } from "./endpoint";
import { userQueryKey } from "./queryKey";
import { TUser } from "../types";

import { Response, TUseQueryOptions } from "@/types/response";
import { axiosInstance } from "@/utils/axios";

export const useGetMe = (
  accessToken: string | null,
  options?: TUseQueryOptions<Response<TUser>>
) => {
  const queryKey = userQueryKey.getMe(accessToken);
  return useQuery({
    queryKey,
    queryFn: () => axiosInstance.get<Response<TUser>>(userEndpoint.getMe),
    enabled: !!accessToken,
    ...options,
  });
};
