import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-ui-lib";

import { COLORS } from "../../configs/colors";

interface Props extends React.ComponentProps<typeof TouchableOpacity> {
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "x-small";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  textStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
}

const Button = React.forwardRef<TouchableOpacity, Props>(
  (
    {
      children,
      variant = "primary",
      style,
      disabled = false,
      startIcon,
      endIcon,
      size = "medium",
      textStyle,
      isLoading,
      ...props
    },
    ref
  ) => {
    return (
      <TouchableOpacity
        disabled={disabled || isLoading}
        {...props}
        style={[
          styles.button,
          styleButtonTheme[variant],
          styleButtonSize[size],
          disabled && styles.buttonDisabled,
          style,
        ]}
        ref={ref}
      >
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={variant === "primary" ? COLORS.white : COLORS.gray24}
          />
        ) : (
          <>
            {startIcon && startIcon}
            {React.isValidElement(children) ? (
              children
            ) : (
              <Text
                style={[
                  styles.text,
                  styleTextTheme[variant],
                  disabled && styles.textDisabled,
                  textStyle,
                ]}
              >
                {children}
              </Text>
            )}
            {endIcon && endIcon}
          </>
        )}
      </TouchableOpacity>
    );
  }
);
Button.displayName = "Button";

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonPrimary: {
    backgroundColor: COLORS.black,
  },
  buttonSecondary: {
    backgroundColor: COLORS.secondary5,
  },
  buttonTextPrimary: {
    color: COLORS.primary5,
  },
  buttonTextSecondary: {
    color: COLORS.black,
  },
  buttonDisabled: {
    backgroundColor: COLORS.gray01,
  },
  textDisabled: {
    color: COLORS.gray03,
  },
  buttonMedium: {
    height: 56,
  },
  buttonSmall: {
    height: 48,
  },
  buttonXSmall: {
    height: 40,
  },
  buttonOutline: {
    backgroundColor: "transparent",
  },
});

const styleButtonTheme: Record<string, any> = {
  primary: styles.buttonPrimary,
  secondary: styles.buttonSecondary,
  outline: styles.buttonOutline,
};

const styleTextTheme: Record<string, any> = {
  primary: styles.buttonTextPrimary,
  secondary: styles.buttonTextSecondary,
};

const styleButtonSize: Record<string, any> = {
  medium: styles.buttonMedium,
  small: styles.buttonSmall,
  "x-small": styles.buttonXSmall,
};
