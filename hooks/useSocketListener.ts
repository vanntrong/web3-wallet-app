import React from "react";

import { useSocketStore } from "@/stores/socketStore";

const useSocketListener = <T extends any>(
  event: string,
  callback: (data: T) => void
) => {
  const { socket } = useSocketStore();

  React.useEffect(() => {
    if (socket) {
      socket.on(event, callback);
    }

    return () => {
      socket?.removeListener(event, callback);
    };
  }, [socket, event, callback]);
};

export default useSocketListener;
