import React from "react";
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Text, TextField, View } from "react-native-ui-lib";

import { COLORS } from "@/configs/colors";

export type InputProps = React.ComponentProps<typeof TextField> & {
  error?: string;
  belowElement?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
  fieldStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
};

const Input = React.forwardRef<typeof TextField, InputProps>(
  (
    {
      belowElement,
      containerStyle,
      wrapperStyle,
      floatingPlaceholder,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <View style={wrapperStyle}>
        <TextField
          ref={ref as any}
          {...props}
          floatingPlaceholder={floatingPlaceholder}
          fieldStyle={[styles.fieldWrapper, props.fieldStyle]}
          containerStyle={[
            styles.container,
            floatingPlaceholder && styles.inputFloating,
            containerStyle,
            !!error && styles.containerError,
          ]}
          labelStyle={[styles.label, props.labelStyle]}
          style={[styles.field, props.style]}
          placeholderTextColor={COLORS.gray7}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        {belowElement && (
          <View style={styles.belowElementStyle}>{belowElement}</View>
        )}
      </View>
    );
  }
);

export default Input;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.gray01,
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    overflow: "hidden",
  },
  containerError: {
    borderColor: COLORS.red5,
  },
  label: {
    fontSize: 12,
    color: COLORS.gray7,
  },
  field: {
    color: COLORS.gray24,
    fontSize: 14,
    fontWeight: "bold",
    flexGrow: 0,
  },
  belowElementStyle: {
    marginTop: 4,
    marginLeft: 16,
  },
  fieldWrapper: { gap: 8, flex: 0, alignSelf: "flex-end" },
  inputFloating: {
    paddingTop: 6,
  },
  error: {
    marginTop: 4,
    textAlign: "right",
    color: COLORS.red5,
    fontSize: 13,
  },
});
