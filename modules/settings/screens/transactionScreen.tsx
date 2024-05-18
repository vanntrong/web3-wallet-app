import { InfiniteData } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import * as immer from "immer";
import React, { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { View } from "react-native-ui-lib";

import { queryClient } from "@/configs/queryClient";
import { SOCKET_EVENT } from "@/configs/socketEvent";
import useSocketListener from "@/hooks/useSocketListener";
import { transactionQueryKey } from "@/modules/transaction/services/queryKey";
import { useGetTransactions } from "@/modules/transaction/services/useGetTransactions";
import { TTransaction } from "@/modules/transaction/types";
import TokenTransferHistoryBottomSheet from "@/modules/wallet/components/tokenTransferHistoryBottomSheet";
import TokenTransferHistoryList from "@/modules/wallet/components/tokenTransferHistoryList";
import { useNetworkStore } from "@/stores/globalStore";
import { Response } from "@/types/response";

const TransactionScreen = () => {
  const { currentNetwork } = useNetworkStore();
  const { data, fetchNextPage, hasNextPage } = useGetTransactions(
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

  const handleTransactionCreate = useCallback(
    (newTransaction: TTransaction) => {
      const newData = immer.produce(
        data,
        (draft: InfiniteData<AxiosResponse<Response<TTransaction[]>>>) => {
          const { pages } = draft;
          pages[0].data.data = [newTransaction, ...pages[0].data.data];

          draft.pages = pages;
        }
      );
      queryClient.setQueryData(
        transactionQueryKey.getTransactions({
          networkId: currentNetwork?.id,
        }),
        newData
      );
    },
    [currentNetwork?.id, data]
  );

  const handleTransactionCreateSuccess = useCallback(
    (transaction: TTransaction) => {
      const newData = immer.produce(
        data,
        (draft: InfiniteData<AxiosResponse<Response<TTransaction[]>>>) => {
          let { pages } = draft;
          pages = pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              data: page.data.data.map((d: TTransaction) =>
                d.id === transaction.id ? transaction : d
              ),
            },
          }));

          draft.pages = pages;
        }
      );
      queryClient.setQueryData(
        transactionQueryKey.getTransactions({
          networkId: currentNetwork?.id,
        }),
        newData
      );
    },
    [currentNetwork?.id, data]
  );

  useSocketListener(
    SOCKET_EVENT.transaction.TRANSACTION_CREATED,
    handleTransactionCreate
  );
  useSocketListener(
    SOCKET_EVENT.transaction.CREATE_TRANSACTION_SUCCESS,
    handleTransactionCreateSuccess
  );
  useSocketListener(
    SOCKET_EVENT.transaction.CREATE_TRANSACTION_FAIL,
    handleTransactionCreateSuccess
  );

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, paddingBottom: 32 }}>
      <FlatList
        onEndReachedThreshold={0.8}
        onEndReached={handleEndReached}
        contentContainerStyle={{ gap: 12 }}
        showsVerticalScrollIndicator={false}
        data={data?.pages?.map((page) => page.data.data).flat()}
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
