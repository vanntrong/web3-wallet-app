import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { userEndpoint } from "./endpoint";

import { axiosInstance } from "@/utils/axios";

export type TImportTokenData = {
  networkId: string;
  contractAddresses: string[];
};

export const useImportToken = (
  options?: UseMutationOptions<unknown, AxiosError, TImportTokenData>
) => {
  return useMutation({
    mutationFn: (data: TImportTokenData) =>
      axiosInstance.patch(userEndpoint.importToken, data),
    ...options,
  });
};
