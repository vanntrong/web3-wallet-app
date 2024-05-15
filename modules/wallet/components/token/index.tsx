import React, { useMemo } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Avatar, Text, View } from "react-native-ui-lib";

import { COLORS } from "@/configs/colors";
import { TToken } from "@/modules/token/types";
import { usePriceStore } from "@/stores/globalStore/priceStore";
import {
  formatNumber,
  formatPrice,
  getAvatarLabel,
  sliceTokenName,
} from "@/utils/converter";

interface Props {
  token: TToken;
  showExchange?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Token = ({ token, showExchange = false, style }: Props) => {
  const { prices } = usePriceStore();

  const price = useMemo(() => {
    if (token.priceFeedId) return prices[token.priceFeedId];
    return undefined;
  }, [prices, token.priceFeedId]);

  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.tokenInfo}>
        <Avatar
          size={40}
          label={getAvatarLabel(token.name || token.symbol)}
          source={{ uri: token.thumbnail ?? undefined }}
        />
        <View>
          <Text style={styles.tokenName}>
            {sliceTokenName(token.name || token.symbol)}
          </Text>
          {price && <Text style={styles.tokenPrice}>{formatPrice(price)}</Text>}
        </View>
      </View>
      <View style={styles.balanceWrapper}>
        <Text style={styles.tokenBalance}>
          {formatNumber(token.balance)} {token.symbol}
        </Text>
        {/* {showExchange && (
          <PricePercentExchange percent={token.exchangePercent} />
        )} */}
      </View>
    </View>
  );
};

export default Token;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    flex: 1,
  },
  tokenInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tokenName: {
    fontSize: 16,
    color: COLORS.gray24,
  },
  tokenPrice: {
    fontSize: 14,
    color: COLORS.green4,
    marginTop: 2,
  },
  tokenBalance: {
    fontSize: 16,
    color: COLORS.gray24,
  },
  balanceWrapper: {
    alignItems: "flex-end",
  },
});
