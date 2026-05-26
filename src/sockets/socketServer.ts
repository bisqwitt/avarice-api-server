import type { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { registerHealthHandlers } from "./handlers/healthHandlers";
import { registerMatchmakingHandlers } from "./handlers/matchmakingHandlers";
import { registerScoreHandlers } from "./handlers/scoreHandlers";
import { registerRoundEndHandlers } from "./handlers/roundEndHandlers";

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
        registerRoundEndHandlers(io, socket);
        registerHealthHandlers(io, socket);
        registerScoreHandlers(io, socket);

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });

    return io;
}