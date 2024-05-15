import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-ui-lib";

interface Props extends React.ComponentProps<typeof TouchableOpacity> {}

const IconButton = React.forwardRef<typeof TouchableOpacity, Props>(
  ({ children, ...props }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        {...props}
        style={[styles.button, props.style]}
      >
        {children}
      </TouchableOpacity>
    );
  }
);

export default IconButton;

const styles = StyleSheet.create({
  button: {},
});
