import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { authEndpoint } from "./authEndpoint";

import { Response } from "@/types/response";
import { axiosInstance } from "@/utils/axios";

export type TLoginBiometricData = {
  signature: string;
  userId: string;
};

export type TLoginBiometricResponse = {
  tokens: { access_token: string; refresh_token: string; exp: number };
};

const useLoginBiometric = (
  options?: UseMutationOptions<
    AxiosResponse<Response<TLoginBiometricResponse>>,
    AxiosError,
    TLoginBiometricData
  >
) => {
  return useMutation({
    mutationFn: (data: TLoginBiometricData) =>
      axiosInstance.post<Response<TLoginBiometricResponse>>(
        authEndpoint.signInBiometric,
        data
      ),
    ...options,
  });
};

export default useLoginBiometric;
