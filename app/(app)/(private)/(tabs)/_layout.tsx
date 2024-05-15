import { Tabs } from "expo-router/tabs";
import React from "react";
import { ToastAndroid } from "react-native";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";

import { COLORS } from "@/configs/colors";
import { privateTabs } from "@/configs/privateTabs";
import { useNetworkStore } from "@/stores/globalStore";

export default function Layout() {
  const { currentNetwork } = useNetworkStore();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.gray24,
        headerShown: false,
        tabBarStyle: {
          borderWidth: 0,
          backgroundColor: COLORS.gray0,
          shadowOpacity: 0,
          elevation: 0,
          borderTopColor: COLORS.gray0,
        },
        tabBarShowLabel: false,
        unmountOnBlur: true,
      }}
    >
      {privateTabs.map((tab) => (
        <Tabs.Screen
          key={tab.title}
          name={tab.name}
          options={{
            title: tab.title,
            href: tab.isDisabled?.(currentNetwork) ? null : undefined,
            tabBarIcon: (props) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  width: "100%",
                }}
              >
                {tab.icon?.(props)}
                {props.focused && (
                  <Text style={{ fontWeight: "bold" }}>{tab.title}</Text>
                )}
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
