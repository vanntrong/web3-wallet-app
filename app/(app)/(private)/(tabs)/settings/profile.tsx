import { Stack } from "expo-router";
import React from "react";

import ProfileScreen from "@/modules/settings/screens/profileScreen";

const Screen = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Profile",
        }}
      />
      <ProfileScreen />
    </>
  );
};

export default Screen;
