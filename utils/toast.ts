import Toast, { ToastShowParams } from "react-native-toast-message";

type ShowToastOptions = {
  title: string;
  description?: string;
  type: "successToast" | "failedToast" | "pendingToast";
} & Omit<ToastShowParams, "type">;

/**
 * Shows a toast message with the specified options.
 *
 * @param {ShowToastOptions} options - The options for the toast message.
 */
export const showToast = ({
  type,
  title,
  description,
  ...options
}: ShowToastOptions) => {
  Toast.show({
    type,
    text1: title,
    text2: description,
    // autoHide: true,
    // visibilityTime: 2000,
    position: "bottom",
    ...options,
  });
};
