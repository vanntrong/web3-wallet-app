import {
  UseQueryOptions,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export interface Response<T> {
  message: string;
  data: T;
  pagination?: {
    limit: number;
    offset: number;
    total: number;
    hasNext: boolean;
  };
}

export type TUseQueryOptions<T> = Partial<
  Omit<UseQueryOptions<AxiosResponse<T>, AxiosError>, "queryKey" | "queryFn">
>;

export type TUseInfiniteQueryOptions<T> = Partial<
  Omit<
    UseInfiniteQueryOptions<AxiosResponse<T>, AxiosError>,
    "queryKey" | "queryFn"
  >
>;
