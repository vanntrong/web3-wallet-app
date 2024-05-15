import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

import ScanIcon from "@/assets/icons/scan.svg";
import IconButton from "@/components/iconButton";
import Input from "@/components/input";
import { COLORS } from "@/configs/colors";

interface Props {
  value: string;
  setValue: (value: string) => void;
  error?: string;
  onQrClick?: () => void;
}

const ToAddressInput = ({
  value = "",
  setValue,
  onQrClick,
  ...props
}: Props) => {
  const isHaveValue = value.length > 0;

  const handleButtonClick = () => {
    if (isHaveValue) {
      setValue("");
    } else {
      onQrClick?.();
    }
  };

  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.toText}>To</Text>
      <Input
        {...props}
        value={value}
        onChangeText={setValue}
        containerStyle={styles.input}
        placeholder="Search, public address (0x), or ENS"
        trailingAccessory={
          <IconButton onPress={handleButtonClick}>
            {isHaveValue ? (
              <AntDesign name="close" size={24} color="black" />
            ) : (
              <ScanIcon />
            )}
          </IconButton>
        }
      />
    </View>
  );
};

export default ToAddressInput;

const styles = StyleSheet.create({
  inputWrapper: {
    borderRadius: 8,
    padding: 16,
    backgroundColor: COLORS.white,
    marginTop: 16,
  },
  toText: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.gray24,
    marginBottom: 8,
  },
  input: {
    paddingVertical: 12,
  },
});
