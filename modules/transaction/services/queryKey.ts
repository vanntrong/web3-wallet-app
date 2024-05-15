import type { useEstimateGasQuery } from "./useEstimateGas";
import type { GetTransactionsQuery } from "./useGetTransactions";

export const transactionQueryKey = {
  getTransactions: (query: GetTransactionsQuery) => ["getTransactions", query],
  estimateGas: (query: useEstimateGasQuery) => ["estimateGas", query],
};
