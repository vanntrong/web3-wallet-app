import React from "react";
import { TouchableOpacity } from "react-native";
import { View } from "react-native-ui-lib";

import TokenTransferHistory from "./tokenTransferHistory";

import { TTransaction } from "@/modules/transaction/types";

interface Props {
  onItemClick: (transaction: TTransaction) => void;
  transaction: TTransaction;
}

const TokenTransferHistoryList = ({ onItemClick, transaction }: Props) => {
  return (
    <View>
      <TouchableOpacity onPress={() => onItemClick(transaction)}>
        <TokenTransferHistory transaction={transaction} />
      </TouchableOpacity>
    </View>
  );
};

export default TokenTransferHistoryList;
