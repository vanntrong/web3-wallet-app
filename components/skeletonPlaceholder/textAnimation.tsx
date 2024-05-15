import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Fade, Placeholder, PlaceholderLine } from "rn-placeholder";

interface Props {
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

const TextAnimation = ({ width = 140, height = 20, style }: Props) => {
  return (
    <Placeholder
      Animation={Fade}
      style={[
        {
          height,
          width,
        },
        style,
      ]}
    >
      <PlaceholderLine
        style={{
          width,
        }}
        height={height}
      />
    </Placeholder>
  );
};

export default TextAnimation;
