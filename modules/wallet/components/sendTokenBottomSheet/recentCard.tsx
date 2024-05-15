import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

import UserAvatar from "@/components/userAvatar";
import { COLORS } from "@/configs/colors";

const RecentCard = () => {
  return (
    <View style={styles.container}>
      <UserAvatar size={35} label="TT" animate />
      <View>
        <Text style={styles.username}>Queen Bee</Text>
        <Text style={styles.address}>0xsndiansd...asdiasi</Text>
      </View>
    </View>
  );
};

export default RecentCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  username: {
    fontSize: 16,
    color: COLORS.gray24,
  },
  address: {
    fontSize: 12,
    marginTop: 4,
    color: COLORS.gray12,
  },
});
