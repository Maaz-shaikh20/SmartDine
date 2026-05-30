import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";

let io: Server | null = null;

export const initSocket = (httpServer: HttpServer) => {
    io = new Server(httpServer, {
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

    io.on("connection", (socket: Socket) => {
        console.log(`[SOCKET] User connected: ${socket.id}`);

        socket.on("join", (data: { userId?: string | number, role?: string }) => {
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

export const getIO = () => {
    if (!io) {
        // We might not have initialized it yet (e.g. in some utility called during startup)
        // This is a safety check.
    }
    return io;
};
