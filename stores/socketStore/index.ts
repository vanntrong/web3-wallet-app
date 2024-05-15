import io, { Socket } from "socket.io-client";
import { create } from "zustand";

import { SOCKET_URL } from "@/configs/appConfig";

interface SocketStore {
  socket: Socket | null;
  connectSocket: (accessToken: string) => void;
}

export const useSocketStore = create<SocketStore>((set) => ({
  socket: null,
  connectSocket: (accessToken: string) => {
    const socket = io(SOCKET_URL, {
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    set({ socket });
  },
}));
