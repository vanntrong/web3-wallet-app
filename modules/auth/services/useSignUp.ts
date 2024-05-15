import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { authEndpoint } from "./authEndpoint";

import { Response } from "@/types/response";
import { axiosInstance } from "@/utils/axios";

type TSignUpData = {
  name: string;
  email: string;
  password: string;
};

type TSignUpResponse = {
  id: string;
  mnemonic: string;
  address: string;
  token: {
    access_token: string;
    refresh_token: string;
    exp: number;
  };
};

const useSignUp = (
  options?: UseMutationOptions<
    AxiosResponse<Response<TSignUpResponse>>,
    AxiosError,
    TSignUpData & { biometricPublicKey?: string }
  >
) => {
  return useMutation({
    mutationFn: (data: TSignUpData & { biometricPublicKey?: string }) =>
      axiosInstance.post<Response<TSignUpResponse>>(authEndpoint.signUp, data),
    ...options,
  });
};

export default useSignUp;
