import React, { useState } from "react";
import { LayoutChangeEvent, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  View,
  TabControllerItemProps,
  Text,
  TouchableOpacity,
} from "react-native-ui-lib";

import { COLORS } from "@/configs/colors";

interface Props {
  items: TabControllerItemProps[];
  activeIndex: number;
  onChangeIndex: (index: number) => void;
}

type ItemWidth = Record<
  number,
  {
    width: number;
    x: number;
  }
>;

const TabBar = ({ items, activeIndex, onChangeIndex }: Props) => {
  const [widths, setWidths] = useState<ItemWidth>({});

  const handleItemLayout = (e: LayoutChangeEvent, index: number) => {
    if (!index) return;
    const { width, x } = e.nativeEvent.layout;
    setWidths((prev) => ({
      ...prev,
      [index]: {
        width,
        x,
      },
    }));
  };

  const indicatorStyle = useAnimatedStyle(() => {
    const currentItem = widths[activeIndex];

    const width = currentItem?.width || 70;
    const left = currentItem?.x || 0;

    return {
      width: withTiming(width, {
        duration: 100,
      }),
      transform: [
        {
          translateX: withTiming(left, {
            duration: 150,
          }),
        },
      ],
    };
  });

  return (
    <View style={styles.wrapper}>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.item}
          onLayout={(e) => handleItemLayout(e, index)}
          onPress={() => onChangeIndex?.(index)}
        >
          <View>
            <Text style={styles.itemText}>{item.label}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <Animated.View style={[styles.indicator, indicatorStyle]} />
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingBottom: 8,
  },
  item: {
    paddingHorizontal: 8,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.gray24,
  },
  indicator: {
    width: 70,
    height: 2,
    backgroundColor: COLORS.gray24,
    position: "absolute",
    bottom: 0,
  },
});
