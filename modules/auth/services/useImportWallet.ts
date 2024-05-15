import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { authEndpoint } from "./authEndpoint";

import { TImportWalletSchema } from "@/modules/auth/validations/importWallet";
import { Response } from "@/types/response";
import { axiosInstance } from "@/utils/axios";

export type TImportWalletResponse = {
  access_token: string;
  refresh_token: string;
  exp: number;
};

const useImportWallet = (
  options?: UseMutationOptions<
    AxiosResponse<Response<TImportWalletResponse>>,
    AxiosError,
    TImportWalletSchema & { biometricPublicKey?: string }
  >
) => {
  return useMutation({
    mutationFn: (data: TImportWalletSchema & { biometricPublicKey?: string }) =>
      axiosInstance.post<Response<TImportWalletResponse>>(
        authEndpoint.importWallet,
        data
      ),
    ...options,
  });
};

export default useImportWallet;
