import { Link } from "expo-router";
import React from "react";
import { FlatList, RefreshControl, TouchableOpacity } from "react-native";

import Token from "../token";
import TokensSkeleton from "../token/tokensSkeleton";

import SkeletonPlaceholder from "@/components/skeletonPlaceholder";
import { TToken } from "@/modules/token/types";
import { useAppStoreContext } from "@/stores/globalStore/app";

interface Props {
  tokens: TToken[];
  isLoading?: boolean;
}

const TokenList = ({ tokens, isLoading }: Props) => {
  const { refetchMyTokens, isRefetchingMyToken } = useAppStoreContext();

  return (
    <SkeletonPlaceholder skeleton={<TokensSkeleton />} isLoading={isLoading}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingMyToken}
            onRefresh={refetchMyTokens}
          />
        }
        data={tokens}
        contentContainerStyle={{ gap: 12 }}
        style={{ marginBottom: 80 }}
        renderItem={({ item }) => (
          <Link
            href={
              {
                pathname: "/(private)/wallet/token-detail/[token]",
                params: {
                  token: item.id,
                },
              } as any
            }
            asChild
          >
            <TouchableOpacity>
              <Token token={item} />
            </TouchableOpacity>
          </Link>
        )}
        keyExtractor={(item) => item.name ?? item.symbol}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </SkeletonPlaceholder>
  );
};

export default TokenList;
