import React, { useState } from "react";
import { FlatList } from "react-native";
import { View } from "react-native-ui-lib";

import { useGetTransactions } from "@/modules/transaction/services/useGetTransactions";
import { TTransaction } from "@/modules/transaction/types";
import TokenTransferHistoryBottomSheet from "@/modules/wallet/components/tokenTransferHistoryBottomSheet";
import TokenTransferHistoryList from "@/modules/wallet/components/tokenTransferHistoryList";
import { useNetworkStore } from "@/stores/globalStore";

const TransactionScreen = () => {
  const { currentNetwork } = useNetworkStore();
  const {
    data: { pages: transactionResponse } = {},
    fetchNextPage,
    hasNextPage,
  } = useGetTransactions(
    {
      networkId: currentNetwork?.id || "",
    },
    { enabled: !!currentNetwork }
  );
  const [selectedTransaction, setSelectedTransaction] =
    useState<TTransaction | null>(null);

  const handleEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, paddingBottom: 32 }}>
      <FlatList
        onEndReachedThreshold={0.8}
        onEndReached={handleEndReached}
        contentContainerStyle={{ gap: 12 }}
        showsVerticalScrollIndicator={false}
        data={transactionResponse?.map((page) => page.data.data).flat()}
        keyExtractor={(transaction) => transaction.id}
        renderItem={({ item }) => (
          <TokenTransferHistoryList
            transaction={item}
            onItemClick={setSelectedTransaction}
          />
        )}
      />
      <TokenTransferHistoryBottomSheet
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        selectedTransaction={selectedTransaction}
      />
    </View>
  );
};

export default TransactionScreen;
