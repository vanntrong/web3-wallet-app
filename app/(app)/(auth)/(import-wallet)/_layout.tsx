import Stack from "expo-router/stack";
import React from "react";

import { COLORS } from "@/configs/colors";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "flip",
        contentStyle: {
          backgroundColor: COLORS.gray0,
        },
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="import-wallet" />
    </Stack>
  );
}
