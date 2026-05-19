import type { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { registerMatchmakingHandlers } from "./handlers/matchmakingHandlers";
import { registerRoundScoreHandlers } from "./handlers/roundScoreHandlers";

export function setupSocketServer(httpServer: HttpServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);

        //registerRoomHandlers(io, socket);
        registerMatchmakingHandlers(io, socket);
        registerRoundScoreHandlers(io, socket);

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });

    return io;
}