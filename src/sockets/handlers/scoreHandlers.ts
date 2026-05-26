import { Server, Socket } from "socket.io";
import { matchManager } from "../../game/MatchManager";
import { SocketEvents } from "../socketEvents";

export function registerScoreHandlers(io: Server, socket: Socket)  {
    socket.on(SocketEvents.SCORE_UPDATE, ({ score }) => {
        const match = matchManager.getMatchByPlayer(socket.id);
        if (!match) {
            socket.emit(SocketEvents.ERROR_MESSAGE, { message: "No active Match" });
            return;
        }

        io.to(match.getOpponent(socket.id)!.id).emit(SocketEvents.OPPONENT_SCORE_CHANGED, {
            score: score
        });
    });
}