import { Stack } from "expo-router";
import React from "react";

import UpdateUsernameScreen from "@/modules/settings/screens/updateUsernameScreen";

const Screen = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Update Username",
        }}
      />
      <UpdateUsernameScreen />
    </>
  );
};

export default Screen;
