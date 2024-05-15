import axios from "axios";

import { showToast } from "./toast";

import { API_URL } from "@/configs/appConfig";

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error?.response?.data?.message;
    const statusCode =
      error?.response?.status || error?.response?.data?.statusCode;
    // if (message && statusCode !== 401) {
    //   showToast({
    //     type: "failedToast",
    //     title: message,
    //     visibilityTime: 1000,
    //     position: "top",
    //     topOffset: 100,
    //   });
    // }

    return Promise.reject(error);
  }
);
