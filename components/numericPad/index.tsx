import { Entypo, Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";

import { numericPads } from "./config";
import { NumericPadRef } from "./type";

interface ButtonItemProps extends TouchableOpacityProps {
  buttonSize?: number;
  text?: string;
  customComponent?: React.ReactNode;
  customViewStyle?: StyleProp<ViewStyle>;
  customTextStyle?: StyleProp<TextStyle>;
}

const ButtonItem = ({
  activeOpacity,
  buttonSize = 60,
  text,
  customComponent,
  customViewStyle,
  accessible,
  accessibilityLabel,
  disabled,
  customTextStyle,
  onPress,
}: ButtonItemProps) => {
  return (
    <TouchableOpacity
      accessible={accessible}
      accessibilityRole="keyboardkey"
      accessibilityLabel={
        customComponent !== undefined ? accessibilityLabel : text
      }
      activeOpacity={activeOpacity}
      disabled={disabled}
      style={NumpadStyle.buttonContainer}
      onPress={onPress}
    >
      <View
        style={[
          NumpadStyle.buttonView,
          {
            width: buttonSize,
            height: buttonSize,
            borderRadius: buttonSize / 2,
          },
          customViewStyle,
        ]}
      >
        {customComponent || (
          <Text style={[NumpadStyle.buttonText, customTextStyle]}>{text}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const ViewHolder = () => {
  return <View style={NumpadStyle.buttonContainer} />;
};

type NumericPadProps = {
  numLength?: number;
  allowDecimal?: boolean;
  onValueChange?: (value: string) => void;
  buttonTextByKey?: any;
  accessible?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  activeOpacity?: number;
  buttonSize?: number;
  buttonItemStyle?: StyleProp<ViewStyle>;
  buttonAreaStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  numericDisabled?: boolean;
  allowClear?: boolean;
  maxDecimalFraction?: number;
};

const NumericPad = React.forwardRef<NumericPadRef, NumericPadProps>(
  (
    {
      numLength,
      allowDecimal,
      onValueChange,
      buttonTextByKey,
      accessible,
      containerStyle,
      activeOpacity,
      buttonSize,
      buttonItemStyle,
      buttonAreaStyle,
      buttonTextStyle,
      numericDisabled,
      allowClear,
      maxDecimalFraction,
    },
    ref
  ) => {
    const [input, setInput] = useState("");

    // useEffect(() => {
    //   if (!ref || !ref.current) return;
    //   ref.current = {
    //     clear: () => {
    //       if (input.length > 0) {
    //         setInput(input.slice(0, -1));
    //       }
    //     },
    //     clearAll: () => {
    //       if (input.length > 0) {
    //         setInput("");
    //       }
    //     },
    //   };
    // }, [input, ref]);

    const onButtonPressHandle = (key: string, value: string) => {
      // only 1 dot
      if (
        (key === "dot" && input.length < 1) ||
        (key === "dot" && input.includes("."))
      )
        return;
      if (
        input.includes(".") &&
        input.substring(input.indexOf(".")).length === maxDecimalFraction
      )
        return;
      if (!numLength || input.length < numLength) {
        setInput(input + "" + value);
      }
    };

    const handleClear = useCallback(() => {
      if (input.length > 0) {
        setInput(input.slice(0, -1));
      }
    }, [input]);

    useEffect(() => {
      if (onValueChange) {
        onValueChange(input);
      }
    }, [input, onValueChange]);

    return (
      <View style={[NumpadStyle.container, containerStyle]}>
        <View style={[NumpadStyle.buttonAreaContainer, buttonAreaStyle]}>
          {numericPads.map((item) => (
            <ButtonItem
              key={item.key}
              disabled={numericDisabled}
              accessible={accessible}
              activeOpacity={activeOpacity}
              onPress={() => onButtonPressHandle(item.key, item.value)}
              buttonSize={buttonSize}
              text={item.text}
              customTextStyle={buttonTextStyle}
              customViewStyle={buttonItemStyle}
            />
          ))}

          {allowDecimal ? (
            <ButtonItem
              disabled={numericDisabled}
              accessible={accessible}
              activeOpacity={activeOpacity}
              onPress={() => onButtonPressHandle("dot", ".")}
              buttonSize={buttonSize}
              text={buttonTextByKey.dot}
              customTextStyle={buttonTextStyle}
              customViewStyle={buttonItemStyle}
            />
          ) : (
            <ViewHolder />
          )}
          <ButtonItem
            disabled={numericDisabled}
            accessible={accessible}
            activeOpacity={activeOpacity}
            onPress={() => onButtonPressHandle("zero", "0")}
            buttonSize={buttonSize}
            text={buttonTextByKey.zero}
            customTextStyle={buttonTextStyle}
            customViewStyle={buttonItemStyle}
          />

          {allowClear && (
            <ButtonItem
              accessible={accessible}
              activeOpacity={activeOpacity}
              onPress={handleClear}
              customViewStyle={buttonItemStyle}
              customComponent={
                <Ionicons name="backspace-outline" size={28} color="#000" />
              }
            />
          )}
        </View>
      </View>
    );
  }
);

NumericPad.defaultProps = {
  buttonTextByKey: {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
    dot: ".",
    zero: "0",
  },
  accessible: false,
  containerStyle: { paddingVertical: 12 },
  activeOpacity: 0.9,
  buttonTextStyle: { color: "#000", fontSize: 30, fontWeight: "400" },
  numericDisabled: false,
  allowDecimal: true,
  allowClear: true,
};

const NumpadStyle = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  buttonAreaContainer: {
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  buttonContainer: {
    marginBottom: 12,
    width: "33%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonView: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default NumericPad;
