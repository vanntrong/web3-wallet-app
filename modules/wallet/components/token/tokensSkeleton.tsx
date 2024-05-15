import React from "react";
import { View } from "react-native-ui-lib";
import { Placeholder, PlaceholderLine, PlaceholderMedia } from "rn-placeholder";

import { COLORS } from "@/configs/colors";

const TokensSkeleton = () => {
  return (
    <View style={{ gap: 12 }}>
      {new Array(3).fill(0).map((_, index) => (
        <Placeholder
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 8,
            height: 72,
          }}
          key={index}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 16,
              height: "100%",
              width: "100%",
              flex: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <PlaceholderMedia style={{ borderRadius: 9999 }} />
              <PlaceholderLine
                width={40}
                height={14}
                style={{ marginBottom: 0 }}
              />
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "flex-end",
              }}
            >
              <PlaceholderLine
                width={40}
                height={14}
                style={{ marginBottom: 0 }}
              />
            </View>
          </View>
        </Placeholder>
      ))}
    </View>
  );
};

export default TokensSkeleton;
