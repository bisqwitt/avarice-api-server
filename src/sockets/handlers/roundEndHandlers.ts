import { Server, Socket } from "socket.io";
import { SocketEvents } from "../socketEvents";
import { matchManager } from "../../game/MatchManager";

export function registerRoundEndHandlers(io: Server, socket: Socket) {
    socket.on(SocketEvents.ROUND_END, () => {
        const match = matchManager.getMatchByPlayer(socket.id);
        if (!match) {
            console.log(`Player ${socket.id} attempted to end round but is not in a match`);
            socket.emit(SocketEvents.ERROR_MESSAGE, { message: "No active Match" });
            return;
        }

        console.log(`Player ${socket.id} ended round`);

        match.playerCompletedRound(socket.id);

        if(!match.bothPlayersCompletedRound()) {
            console.log(`Player ${socket.id} completed round, waiting for opponent...`);
            io.to(socket.id).emit(SocketEvents.ROUND_END_WAITING);
            return;
        }

        console.log(`Both players completed round`);
        io.to(socket.id).emit(SocketEvents.BOTH_PLAYERS_ENDED_ROUND);
        io.to(match.getOpponent(socket.id)!.id).emit(SocketEvents.BOTH_PLAYERS_ENDED_ROUND);
    
        match.newRound();
    });
}
