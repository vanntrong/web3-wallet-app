import * as Clipboard from "expo-clipboard";
import { Platform, ToastAndroid } from "react-native";

export const copyToClipboard = async (text: string) => {
  await Clipboard.setStringAsync(text);
  if (Platform.OS === "android")
    ToastAndroid.show("Copied to clipboard", ToastAndroid.SHORT);
};
