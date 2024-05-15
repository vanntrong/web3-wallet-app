import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { Text, TouchableOpacity } from "react-native-ui-lib";

import { COLORS } from "@/configs/colors";

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  const { back } = useRouter();

  return (
    <TouchableOpacity style={styles.header} onPress={back}>
      <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: COLORS.gray24,
  },
});
