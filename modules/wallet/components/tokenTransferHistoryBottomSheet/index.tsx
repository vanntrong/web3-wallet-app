import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import React, { useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

import RowValue from "../../../../components/rowValue";
import { transactionType } from "../tokenTransferHistoryList/tokenTransferHistory";

import BottomSheetModal from "@/components/bottomSheetModal";
import Divider from "@/components/divider";
import IconButton from "@/components/iconButton";
import { COLORS } from "@/configs/colors";
import { ETransactionStatus, TTransaction } from "@/modules/transaction/types";
import { useNetworkStore } from "@/stores/globalStore";
import { copyToClipboard } from "@/utils/clipboard";
import { formatContractAddress, formatNumber } from "@/utils/converter";
import { formatDate } from "@/utils/date";

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  selectedTransaction: TTransaction | null;
}

const transactionStatusIcon: Record<string, React.ReactNode> = {
  [ETransactionStatus.PENDING]: (
    <Ionicons name="timer-outline" size={36} color={COLORS.yellow4} />
  ),
  [ETransactionStatus.COMPLETED]: (
    <AntDesign name="checkcircleo" size={36} color={COLORS.green4} />
  ),
  [ETransactionStatus.CANCELED]: (
    <Feather name="arrow-down-circle" size={36} color={COLORS.gray24} />
  ),
  [ETransactionStatus.FAILED]: (
    <Feather name="send" size={36} color={COLORS.red5} />
  ),
};

const TokenTransferHistoryBottomSheet = (props: Props) => {
  const { selectedTransaction } = props;
  const { currentNetwork } = useNetworkStore();
  const snapPoints = useMemo(() => ["80%", "80%"], []);

  const handleChange = useCallback(
    (index: number) => {
      if (index === -1) props.onClose?.();
    },
    [props]
  );

  const symbol =
    selectedTransaction?.token?.symbol || currentNetwork?.currentSymbol;

  return (
    <BottomSheetModal
      {...props}
      snapPoints={snapPoints}
      onChange={handleChange}
      handleStyle={{ backgroundColor: COLORS.appBackground }}
      viewStyle={{ backgroundColor: COLORS.appBackground, flex: 1 }}
    >
      <View
        style={{ flex: 1, justifyContent: "space-between", paddingBottom: 50 }}
      >
        <View style={styles.wrapper}>
          <Text style={styles.title}>
            {transactionType[selectedTransaction?.transactionType || "OUT"]}{" "}
            {symbol}
          </Text>
          <View style={styles.statusWrapper}>
            {
              transactionStatusIcon[
                selectedTransaction?.transactionStatus || ""
              ]
            }
            <Text style={styles.status}>
              {selectedTransaction?.transactionStatus}
            </Text>
          </View>
          <View style={styles.historyWrapper}>
            <View style={styles.historyHeader}>
              <Text style={styles.amountHeading}>Amount</Text>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.amount}>
                  {selectedTransaction?.amount} {symbol}
                </Text>
              </View>
            </View>
            <Divider style={{ marginVertical: 16 }} />
            <View style={styles.detailInformation}>
              <RowValue
                label="From"
                value={formatContractAddress(selectedTransaction?.fromAddress)}
              />
              <RowValue
                label="To"
                value={formatContractAddress(selectedTransaction?.toAddress)}
              />
              <RowValue
                label="Date"
                value={formatDate(selectedTransaction?.createdAt)}
              />
              <RowValue
                label="Gas"
                value={`${formatNumber(selectedTransaction?.transactionGas ?? 0)} ${currentNetwork?.currentSymbol}`}
              />
              <RowValue
                label="Transaction hash"
                value={formatContractAddress(
                  selectedTransaction?.transactionHash
                )}
                valueAddon={
                  <IconButton
                    onPress={() =>
                      copyToClipboard(
                        selectedTransaction?.transactionHash || ""
                      )
                    }
                  >
                    <Feather name="copy" size={20} color={COLORS.gray24} />
                  </IconButton>
                }
              />
            </View>
          </View>
        </View>
      </View>
    </BottomSheetModal>
  );
};

export default TokenTransferHistoryBottomSheet;

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: COLORS.gray24,
  },
  statusWrapper: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  status: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.gray24,
    textTransform: "capitalize",
  },
  historyWrapper: {
    backgroundColor: COLORS.white,
    marginTop: 16,
    borderRadius: 8,
    paddingVertical: 16,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  amountHeading: {
    fontSize: 18,
    color: COLORS.gray24,
  },
  amount: {
    fontSize: 18,
    color: COLORS.gray24,
  },
  price: {
    color: COLORS.tokenPrice,
  },
  detailInformation: {
    paddingHorizontal: 16,
    gap: 16,
  },
  buttonsWrapper: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
  },
});
