export const transactionsEndpoint = {
  getTransactions: "/transactions",
  confirmTransaction: (id: string) => `/transactions/${id}/confirm`,
  estimateGas: "/transactions/estimate-gas",
  sendTransaction: "/transactions",
};
