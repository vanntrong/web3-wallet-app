import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, Text, View } from "react-native-ui-lib";

import { COLORS } from "@/configs/colors";
import { TMainToken, TToken } from "@/modules/token/types";

interface Props {
  token: TToken | TMainToken;
  isSelected?: boolean;
}

const TokenSearchResult = ({ token, isSelected }: Props) => {
  const getTokenNameDisplay = () => {
    if (token.name) {
      return `${token.name} (${token.symbol})`;
    }
    return token.symbol;
  };

  return (
    <View style={styles.token}>
      <View style={styles.tokenContainer}>
        <Avatar
          size={40}
          label={token.symbol}
          backgroundColor={COLORS.gray01}
          source={{ uri: token.thumbnail ?? undefined }}
        />
        <Text style={styles.tokenName}>{getTokenNameDisplay()}</Text>
      </View>
      {isSelected && <AntDesign name="check" size={20} color={COLORS.green3} />}
    </View>
  );
};

export default TokenSearchResult;

const styles = StyleSheet.create({
  token: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    borderRadius: 8,
  },
  tokenContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  tokenName: {
    fontSize: 16,
    color: COLORS.gray24,
  },
});
