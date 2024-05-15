import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, Text, View } from "react-native-ui-lib";

import { COLORS } from "@/configs/colors";
import { TNetwork } from "@/modules/network/types";
import { getAvatarLabel } from "@/utils/converter";

interface Props {
  network: TNetwork;
  isSelected?: boolean;
}

const Network = ({ network, isSelected }: Props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.infoWrapper}>
        <Avatar
          label={getAvatarLabel(network.name)}
          source={{ uri: network.thumbnail ?? undefined }}
          backgroundColor={COLORS.gray01}
          size={40}
        />
        <Text style={styles.networkName}>{network.name}</Text>
      </View>
      {isSelected && <AntDesign name="check" size={20} color={COLORS.green3} />}
    </View>
  );
};

export default Network;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  networkName: {
    fontSize: 14,
    color: COLORS.gray14,
  },
});
