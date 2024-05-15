import Stack from "expo-router/stack";
import React from "react";

import { COLORS } from "@/configs/colors";
import { CreateWalletProvider } from "@/contexts/CreateWalletContext";

export default function Layout() {
  console.log("asmdoasmodmas");
  return (
    <CreateWalletProvider>
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
        <Stack.Screen name="create-a-wallet" />
      </Stack>
    </CreateWalletProvider>
  );
}
