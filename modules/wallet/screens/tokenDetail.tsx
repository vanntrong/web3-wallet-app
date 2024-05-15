import { Feather } from "@expo/vector-icons";
import { InfiniteData } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Link, useLocalSearchParams } from "expo-router";
import * as immer from "immer";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { View } from "react-native-ui-lib";

import ReceiveTokenBottomSheet from "../components/receiveTokenBottomSheet";
import TokenTransferHistoryBottomSheet from "../components/tokenTransferHistoryBottomSheet";
import TokenTransferHistoryList from "../components/tokenTransferHistoryList";

import Button from "@/components/button";
import Header from "@/components/header";
import { COLORS } from "@/configs/colors";
import { queryClient } from "@/configs/queryClient";
import { SOCKET_EVENT } from "@/configs/socketEvent";
import useSocketListener from "@/hooks/useSocketListener";
import WalletLayout from "@/layouts/WalletLayout";
import { transactionQueryKey } from "@/modules/transaction/services/queryKey";
import { useGetTransactions } from "@/modules/transaction/services/useGetTransactions";
import { TTransaction } from "@/modules/transaction/types";
import MainTokenInfo from "@/modules/wallet/components/mainTokenInfo";
import {
  getTokenById,
  useNetworkStore,
  useTokenStore,
} from "@/stores/globalStore";
import { Response } from "@/types/response";

const TokenDetailScreen = () => {
  const { token } = useLocalSearchParams();
  const { currentNetwork } = useNetworkStore();
  const { otherTokens } = useTokenStore();

  const [selectedTransaction, setSelectedTransaction] =
    useState<TTransaction | null>(null);

  const [isShowReceiveTokenBottomSheet, setIsShowReceiveTokenBottomSheet] =
    useState(false);

  const selectedToken = useMemo(
    () => getTokenById(token as string),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [token, otherTokens, getTokenById]
  );

  const { data, fetchNextPage, hasNextPage } = useGetTransactions(
    {
      networkId: currentNetwork?.id,
      tokenId: selectedToken?.id,
    },
    {
      enabled: !!currentNetwork?.id && !!selectedToken?.id,
    }
  );

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
          tokenId: selectedToken?.id,
        }),
        newData
      );
    },
    [currentNetwork?.id, selectedToken?.id, data]
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
          tokenId: selectedToken?.id,
        }),
        newData
      );
    },
    [currentNetwork?.id, selectedToken?.id, data]
  );

  const handleEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

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

  if (!selectedToken) return null;

  return (
    <>
      <WalletLayout withHeader>
        <View style={{ marginBottom: 24 }}>
          <Header header={selectedToken.symbol} />
        </View>
        <MainTokenInfo token={selectedToken} />

        <View style={styles.buttonsWrapper}>
          <Link
            href={{
              pathname: "/send-token/select-to-address",
              params: {
                token,
              },
            }}
            asChild
          >
            <Button
              size="small"
              variant="secondary"
              style={styles.button}
              startIcon={
                <Feather name="send" size={20} color={COLORS.gray24} />
              }
            >
              Send
            </Button>
          </Link>
          <Button
            size="small"
            variant="secondary"
            style={styles.button}
            startIcon={
              <Feather
                name="arrow-down-circle"
                size={20}
                color={COLORS.gray24}
              />
            }
            onPress={() => setIsShowReceiveTokenBottomSheet(true)}
          >
            Receive
          </Button>
        </View>

        <View style={styles.transferHistoryWrapper}>
          <FlatList
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.8}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
            data={data?.pages?.map((page) => page.data.data).flat()}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TokenTransferHistoryList
                transaction={item}
                onItemClick={setSelectedTransaction}
              />
            )}
          />
        </View>
      </WalletLayout>
      <TokenTransferHistoryBottomSheet
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        selectedTransaction={selectedTransaction}
      />

      <ReceiveTokenBottomSheet
        isOpen={isShowReceiveTokenBottomSheet}
        onClose={() => setIsShowReceiveTokenBottomSheet(false)}
        token={selectedToken}
      />
    </>
  );
};

export default gestureHandlerRootHOC(TokenDetailScreen);

const styles = StyleSheet.create({
  mainTokenWrapper: {
    marginTop: 16,
  },
  buttonsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 16,
    width: "70%",
  },
  button: {
    flex: 1,
  },
  transferHistoryWrapper: {
    marginTop: 24,
    flex: 1,
    paddingBottom: 80,
  },
});
