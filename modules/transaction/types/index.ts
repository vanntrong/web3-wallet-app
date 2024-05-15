import { TToken } from "@/modules/token/types";

export enum ETransactionStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  CANCELED = "canceled",
  FAILED = "failed",
}

export type TTransaction = {
  id: string;
  transactionStatus: ETransactionStatus;
  transactionGas: number | null;
  transactionHash: string | null;
  blockHash: string | null;
  blockNumber: number | null;
  fromAddress: string;
  toAddress: string;
  tokenContractAddress: string;
  amount: number;
  createdAt: string;
  token: TToken;
  transactionType: "IN" | "OUT";
};
