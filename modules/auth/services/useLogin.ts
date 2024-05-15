import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { authEndpoint } from "./authEndpoint";
import { TLoginSchema } from "../validations/login";

import { Response } from "@/types/response";
import { axiosInstance } from "@/utils/axios";

export type TLoginResponse = {
  tokens: { access_token: string; refresh_token: string; exp: number };
};

const useLogin = (
  options?: UseMutationOptions<
    AxiosResponse<Response<TLoginResponse>>,
    AxiosError,
    TLoginSchema & { address: string }
  >
) => {
  return useMutation({
    mutationFn: (data: TLoginSchema & { address: string }) =>
      axiosInstance.post<Response<TLoginResponse>>(authEndpoint.signIn, data),
    ...options,
  });
};

export default useLogin;
