import { Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/header";
import { COLORS } from "@/configs/colors";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        header: ({ options, route }) => (
          <SafeAreaView
            style={[
              {
                backgroundColor: COLORS.appBackground,
                paddingHorizontal: 12,
              },
              Platform.select({ android: { paddingBottom: 32 } }),
            ]}
          >
            <Header header={options.title ?? route.name} />
          </SafeAreaView>
        ),
        headerShown: false,
        animation: "flip",
        contentStyle: {
          backgroundColor: COLORS.appBackground,
        },
      }}
    />
  );
};

export default Layout;
