import React, { useEffect } from "react";

import { TGetMyTokenResponseExtract } from "@/modules/user/services/useGetMyToken";
import { useAuthStore, useTokenStore } from "@/stores/globalStore";
import { useSocketStore } from "@/stores/socketStore";
import { showToast } from "@/utils/toast";

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useAuthStore();
  const { socket, connectSocket } = useSocketStore();
  const { setMainToken, setOtherTokens } = useTokenStore();

  useEffect(() => {
    if (accessToken) {
      connectSocket(accessToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("socket connected");
      });
      socket.on("updateNewBalance", (data: TGetMyTokenResponseExtract) => {
        setMainToken(data.mainToken);
        setOtherTokens(data.otherTokens);
      });
      // socket.on("createTransactionSuccess", (data: any) => {
      //   showToast({
      //     type: "successToast",
      //     title: `Transaction ${data.id} has been sent`,
      //   });
      // });
      // socket.on("createTransactionFail", (data: any) => {
      //   showToast({
      //     type: "failedToast",
      //     title: `Transaction ${data.id} failed`,
      //   });
      // });
      socket.on("swapSuccess", (data: any) => {
        showToast({
          type: "successToast",
          title: `Swap has been successful`,
        });
      });
      socket.on("swapFail", (data: any) => {
        showToast({
          type: "failedToast",
          title: data.message,
        });
      });
    }

    return () => {
      socket?.disconnect();
      socket?.removeAllListeners();
    };
  }, [socket, setMainToken, setOtherTokens]);

  return children;
};

export default SocketProvider;
