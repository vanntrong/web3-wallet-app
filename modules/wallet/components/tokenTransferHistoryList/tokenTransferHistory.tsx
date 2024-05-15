import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

import { COLORS } from "@/configs/colors";
import { ETransactionStatus, TTransaction } from "@/modules/transaction/types";
import { useNetworkStore } from "@/stores/globalStore";
import { formatDate } from "@/utils/date";

interface Props {
  transaction: TTransaction;
}

const TokenTransferHistory = ({ transaction }: Props) => {
  const { currentNetwork } = useNetworkStore();
  return (
    <View style={styles.wrapper}>
      <Text style={styles.time}>{formatDate(transaction.createdAt)}</Text>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          {transactionStatusIcon[transaction.transactionStatus]}

          <View>
            <Text style={styles.title}>
              {transactionType[transaction.transactionType]}{" "}
              {transaction.token?.symbol ?? currentNetwork?.currentSymbol}
            </Text>
            <Text
              style={[
                styles.status,
                transactionStatusColor[transaction.transactionStatus],
              ]}
            >
              {transaction.transactionStatus}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.balance}>
            {transaction.amount}{" "}
            {transaction.token?.symbol ?? currentNetwork?.currentSymbol}
          </Text>
          {/* <Text style={styles.total}>{formatPrice(234.22)}</Text> */}
        </View>
      </View>
    </View>
  );
};

export default TokenTransferHistory;

export const transactionStatusIcon: Record<string, React.ReactNode> = {
  [ETransactionStatus.PENDING]: (
    <Ionicons name="timer-outline" size={30} color={COLORS.yellow4} />
  ),
  [ETransactionStatus.COMPLETED]: (
    <Feather name="send" size={30} color={COLORS.green4} />
  ),
  [ETransactionStatus.CANCELED]: (
    <Feather name="arrow-down-circle" size={30} color={COLORS.gray24} />
  ),
  [ETransactionStatus.FAILED]: (
    <Feather name="send" size={30} color={COLORS.red5} />
  ),
};

export const transactionType: Record<string, string> = {
  IN: "Receive",
  OUT: "Send",
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  time: {
    fontSize: 13,
    marginBottom: 4,
    color: COLORS.gray12,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    color: COLORS.gray24,
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  statusPending: {
    color: COLORS.yellow4,
  },
  statusFail: {
    color: COLORS.red5,
  },
  statusSuccess: {
    color: COLORS.green4,
  },
  balance: {
    fontSize: 18,
    color: COLORS.gray24,
    marginBottom: 4,
  },
  total: {
    fontSize: 16,
    color: COLORS.gray12,
  },
});

const transactionStatusColor: Record<string, any> = {
  [ETransactionStatus.PENDING]: styles.statusPending,
  [ETransactionStatus.COMPLETED]: styles.statusSuccess,
  [ETransactionStatus.CANCELED]: styles.statusFail,
  [ETransactionStatus.FAILED]: styles.statusFail,
};
