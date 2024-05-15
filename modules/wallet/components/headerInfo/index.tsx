import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, Text, TouchableOpacity, View } from "react-native-ui-lib";

import { COLORS } from "@/configs/colors";
import { useAuthStore, useNetworkStore } from "@/stores/globalStore";
import { getAvatarLabel } from "@/utils/converter";

interface Props {
  onClickNetworkInfo?: () => void;
}

const HeaderInfo = ({ onClickNetworkInfo }: Props) => {
  const { user } = useAuthStore();
  const { currentNetwork } = useNetworkStore();

  return (
    <View style={styles.wrapper}>
      <View style={[styles.flexCenter, styles.userInfo]}>
        <Avatar
          label={getAvatarLabel(user?.name)}
          source={{ uri: user?.avatar }}
          animate
          backgroundColor={COLORS.blue2}
          size={45}
        />
        <Text style={styles.userName}>{user?.name}</Text>
      </View>
      <TouchableOpacity onPress={onClickNetworkInfo}>
        <View style={[styles.flexCenter]}>
          <Entypo name="dot-single" size={20} color={COLORS.gray24} />
          <Text style={styles.networkName}>{currentNetwork?.name}</Text>
          <Entypo name="chevron-down" size={20} color={COLORS.gray24} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderInfo;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flexCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  userInfo: {
    gap: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.gray24,
  },
  networkName: {
    fontWeight: "500",
    marginRight: 8,
  },
});
