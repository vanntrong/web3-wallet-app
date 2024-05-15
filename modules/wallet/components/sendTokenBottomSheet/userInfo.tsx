import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

import UserAvatar from "@/components/userAvatar";
import { COLORS } from "@/configs/colors";
import { useAuthStore } from "@/stores/globalStore";
import { getAvatarLabel } from "@/utils/converter";

const UserInfo = () => {
  const { user } = useAuthStore();

  return (
    <View style={styles.userInfo}>
      <UserAvatar
        size={35}
        label={getAvatarLabel(user?.name)}
        animate
        source={{ uri: user?.avatar }}
      />
      <Text style={styles.username}>{user?.name}</Text>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  userInfo: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
  },
  username: {
    fontSize: 16,
    color: COLORS.gray24,
  },
});
