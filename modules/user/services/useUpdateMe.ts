import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { userEndpoint } from "./endpoint";
import { TUser } from "../types";

import { Response } from "@/types/response";
import { axiosInstance } from "@/utils/axios";
import { showToast } from "@/utils/toast";

export type TUpdateMeData =
  | {
      selectedNetworkId?: string;
      avatar?: Blob;
      name?: string;
    }
  | FormData;

const useUpdateMe = (
  options?: UseMutationOptions<
    AxiosResponse<Response<TUser>>,
    AxiosError,
    TUpdateMeData
  >
) => {
  return useMutation({
    mutationFn: (data: TUpdateMeData) =>
      axiosInstance.patch<Response<TUser>>(userEndpoint.updateMe, data),
    onError() {
      showToast({
        type: "failedToast",
        title: "Failed to update profile",
        description: "Please try again later",
      });
    },
    ...options,
  });
};

export default useUpdateMe;
