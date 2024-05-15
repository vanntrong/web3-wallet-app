import { Stack } from "expo-router";
import React from "react";

import PrivacyAndSecurityScreen from "@/modules/settings/screens/privacyAndSecurityScreen";

const Screen = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Privacy & Security",
        }}
      />
      <PrivacyAndSecurityScreen />
    </>
  );
};

export default Screen;
