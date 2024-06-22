import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { TransitionPresets } from "@react-navigation/stack";
import { QueryClientProvider } from "@tanstack/react-query";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router/stack";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useMemo, useState } from "react";
import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Toast from "@/components/toast";
import { localStoreKey } from "@/configs/localStore";
import { queryClient } from "@/configs/queryClient";
import { AppProvider } from "@/contexts/AppContext";
import NotificationContext from "@/contexts/NotificationContext";
import SocketProvider from "@/contexts/SocketContext";
import { JsStack } from "@/layouts/JsStack";
import { userEndpoint } from "@/modules/user/services/endpoint";
import { TUser } from "@/modules/user/types";
import { useAuthStore, useNetworkStore } from "@/stores/globalStore";
import {
  deleteLocalStore,
  getLocalStore,
  setLocalStore,
} from "@/stores/localStore";
import { Response } from "@/types/response";
import { axiosInstance } from "@/utils/axios";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
export const unstable_settings = {
  initialRouteName: "(private)",
};

export default function Layout() {
  const [authIsReady, setAuthIsReady] = useState(false);
  const { setUser, setAccessToken } = useAuthStore();
  const { setNetworks, setCurrentNetwork } = useNetworkStore();
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  useEffect(() => {
    async function prepare() {
      try {
        const accessToken = await getLocalStore(localStoreKey.ACCESS_TOKEN);
        console.log({ accessToken });
        // deleteLocalStore(localStoreKey.ACCESS_TOKEN);

        if (!accessToken) {
          setAuthIsReady(true);
          return;
        }
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        setAccessToken(accessToken);

        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        setAuthIsReady(true);
      }
    }

    prepare();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setAccessToken]);

  const appIsReady = useMemo(() => authIsReady, [authIsReady]); // for other in the future like setup fonts

  useEffect(() => {
    if (appIsReady) SplashScreen.hideAsync();
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <SocketProvider>
          <NotificationContext>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <BottomSheetModalProvider>
                <JsStack
                  screenOptions={{
                    headerShown: false,
                    animationEnabled: true,
                  }}
                >
                  <Stack.Screen name="index" />
                  <Stack.Screen name="(auth)/wallet-setup" />
                  <Stack.Screen name="(private)/(tabs)" />
                  <JsStack.Screen
                    name="(private)/(modal)"
                    options={{
                      ...TransitionPresets.ModalPresentationIOS,
                      presentation: "modal",
                      animation: "slide_from_right",
                      gestureEnabled: true,
                    }}
                  />
                </JsStack>
                <Toast />
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </NotificationContext>
        </SocketProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}
