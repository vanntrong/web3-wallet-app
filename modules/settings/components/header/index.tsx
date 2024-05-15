import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Settings</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 16,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: "600",
    color: "#000",
  },
});
