import { Stack } from "expo-router";
import React from "react";

import { COLORS } from "@/configs/colors";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
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
