import React from "react";
import { StyleSheet } from "react-native";
import Spinner, {
  SpinnerPropTypes,
} from "react-native-loading-spinner-overlay";

import { COLORS } from "@/configs/colors";

interface Props extends SpinnerPropTypes {}

/**
 * Renders a loading screen component with specified animation and text style.
 *
 * @param {Props} props - The properties for the LoadingScreen component.
 * @return {JSX.Element} The LoadingScreen component.
 */
const LoadingScreen = (props: Props): JSX.Element => {
  return (
    <Spinner
      animation="fade"
      {...props}
      textStyle={{
        ...styles.textStyle,
        ...props.textStyle,
      }}
    />
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 14,
    color: COLORS.white,
  },
});
