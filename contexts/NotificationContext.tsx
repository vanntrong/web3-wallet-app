import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import React, { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";

import useAddPushNotificationToken from "@/modules/user/services/useAddPushNotificationToken";
import { useAuthStore } from "@/stores/globalStore";

const NotificationContext = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();

  const { mutate: addPushNotificationToken } = useAddPushNotificationToken();

  const [notificationToken, setNotificationToken] = useState<string | null>(
    null
  );

  const handleRegistrationError = useCallback(function (errorMessage: string) {
    alert(errorMessage);
    // throw new Error(errorMessage);
  }, []);

  const registerForPushNotificationsAsync = useCallback(async () => {
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (!Device.isDevice) {
      handleRegistrationError(
        "Must use physical device for push notifications"
      );
      return;
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;

    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }

    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      setNotificationToken(pushTokenString);
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  }, [handleRegistrationError]);

  useEffect(() => {
    if (notificationToken) return;
    registerForPushNotificationsAsync();
  }, [registerForPushNotificationsAsync, notificationToken]);

  useEffect(() => {
    if (!user || !notificationToken) return;
    addPushNotificationToken({ token: notificationToken });
  }, [notificationToken, user, addPushNotificationToken]);

  return <>{children}</>;
};

export default NotificationContext;
