import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native-ui-lib";

import IconButton from "../iconButton";

import { COLORS } from "@/configs/colors";

interface Props {
  header: string | string[];
}

const Header = ({ header }: Props) => {
  const router = useRouter();

  return (
    <View
      style={{
        backgroundColor: COLORS.appBackground,
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 16,
      }}
    >
      {router.canGoBack() && (
        <IconButton
          onPress={router.back}
          style={{
            position: "absolute",
            bottom: 0,
            zIndex: 1,
          }}
        >
          <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
        </IconButton>
      )}
      <Text
        style={{
          flex: 1,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 16,
          color: COLORS.gray24,
        }}
      >
        {Array.isArray(header) ? header[0] : header}
      </Text>
    </View>
  );
};

export default Header;
