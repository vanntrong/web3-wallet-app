import { Stack } from "expo-router";
import React from "react";

import UpdateEmailScreen from "@/modules/settings/screens/updateEmailScreen";

const Screen = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Update Email",
        }}
      />
      <UpdateEmailScreen />
    </>
  );
};

export default Screen;
