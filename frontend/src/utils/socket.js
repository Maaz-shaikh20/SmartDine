import { io } from "socket.io-client";

const SOCKET_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/api$/, "");

let socket = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      withCredentials: true,
      autoConnect: false, // Don't connect until we need it
    });
    socket.on("connect", () => {
      console.log("[SOCKET] Connected to server:", socket?.id);
    });
    socket.on("disconnect", () => {
      console.log("[SOCKET] Disconnected from server");
    });

    socket.on("connect_error", (error) => {
      console.error("[SOCKET] Connection error:", error);
    });
  }
  return socket;
};

export const connectSocket = (user) => {
  const s = getSocket();
  if (!s.connected) {
    s.connect();
  }
  // Join appropriate rooms
  s.emit("join", {
    userId: user.id,
    role: user.role.toLowerCase(),
  });
  return s;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
