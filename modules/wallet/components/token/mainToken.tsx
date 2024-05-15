import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Avatar, Text, View } from "react-native-ui-lib";

import { COLORS } from "@/configs/colors";
import { TMainToken } from "@/modules/token/types";
import { formatNumber } from "@/utils/converter";

interface Props {
  token: TMainToken;
  showExchange?: boolean;
  style?: StyleProp<ViewStyle>;
}

const MainToken = ({ token, showExchange = false, style }: Props) => {
  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.tokenInfo}>
        <Avatar size={40} label={token.symbol} />
        <View>
          <Text style={styles.tokenName}>{token.symbol}</Text>
          {/* <Text style={styles.tokenPrice}>{formatPrice(token.price)}</Text> */}
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

export default MainToken;

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
    color: COLORS.gray12,
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
