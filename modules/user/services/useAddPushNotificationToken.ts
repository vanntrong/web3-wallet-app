import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { userEndpoint } from "./endpoint";
import { TUser } from "../types";

import { Response } from "@/types/response";
import { axiosInstance } from "@/utils/axios";

export type TAddPushNotificationTokenData = {
  token: string;
};

const useAddPushNotificationToken = (
  options?: UseMutationOptions<
    AxiosResponse<unknown>,
    AxiosError,
    TAddPushNotificationTokenData
  >
) => {
  return useMutation({
    mutationFn: (data: TAddPushNotificationTokenData) =>
      axiosInstance.patch<Response<TUser>>(
        userEndpoint.addPushNotificationToken,
        data
      ),
    ...options,
  });
};

export default useAddPushNotificationToken;
