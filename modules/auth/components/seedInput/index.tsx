import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TextField } from "react-native-ui-lib";

import { COLORS } from "@/configs/colors";
import { validateWord } from "@/modules/auth/utils/validate";

type Props = React.ComponentProps<typeof TextField> & {
  value?: string;
  handleSubmit: (value: string) => void;
};

const SeedInput = ({ value = "", handleSubmit, ...props }: Props) => {
  const [input, setInput] = useState(value);
  const [isError, setIsError] = useState<boolean>();

  const handleBlur = () => {
    handleSubmit(input);
    const isValid = validateWord(input);
    setIsError(!isValid);
  };

  return (
    <TextField
      {...props}
      value={input}
      onChangeText={(val) => setInput(val)}
      onBlur={handleBlur}
      containerStyle={[styles.item, isError && styles.itemError]}
      style={{ fontSize: 13, color: COLORS.gray24 }}
      centered
    />
  );
};

export default SeedInput;

const styles = StyleSheet.create({
  item: {
    minHeight: 40,
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
  itemError: {
    borderColor: COLORS.red5,
  },
});
