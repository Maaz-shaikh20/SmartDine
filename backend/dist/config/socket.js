"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIO = exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
let io = null;
const initSocket = (httpServer) => {
    io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: [
                "http://localhost:5173",
                "https://myrasoighar.netlify.app",
                process.env.FRONTEND_URL || ""
            ].filter(Boolean),
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
            credentials: true,
        }
    });
    io.on("connection", (socket) => {
        console.log(`[SOCKET] User connected: ${socket.id}`);
        socket.on("join", (data) => {
            if (data.userId) {
                const userRoom = data.userId.toString();
                console.log(`[SOCKET] User ${data.userId} joined user room: ${userRoom}`);
                socket.join(userRoom);
            }
            if (data.role) {
                console.log(`[SOCKET] User joined role room: ${data.role}`);
                socket.join(data.role);
            }
        });
        socket.on("disconnect", () => {
            console.log(`[SOCKET] User disconnected: ${socket.id}`);
        });
    });
    return io;
};
exports.initSocket = initSocket;
const getIO = () => {
    if (!io) {
        // We might not have initialized it yet (e.g. in some utility called during startup)
        // This is a safety check.
    }
    return io;
};
exports.getIO = getIO;
