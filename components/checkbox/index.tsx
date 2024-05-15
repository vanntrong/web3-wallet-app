import React from "react";
import { StyleSheet } from "react-native";
import { Checkbox as RCheckbox } from "react-native-ui-lib";

import { COLORS } from "@/configs/colors";

type Props = React.ComponentProps<typeof RCheckbox> & object;

const Checkbox = React.forwardRef<typeof RCheckbox, Props>(
  ({ containerStyle, ...props }, ref) => {
    return (
      <RCheckbox
        ref={ref}
        {...props}
        containerStyle={[styles.container, containerStyle]}
        iconColor={COLORS.primary5}
        color={COLORS.black}
        style={styles.checkbox}
      />
    );
  }
);

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
  },
  checkbox: { borderRadius: 4, borderWidth: 1 },
});
