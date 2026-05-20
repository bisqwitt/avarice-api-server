import { Server, Socket } from "socket.io";
import { matchManager } from "../../game/MatchManager";
import { SocketEvents } from "../socketEvents";

export function registerHealthHandlers(io: Server, socket: Socket) {
    socket.on(SocketEvents.HEALTH_UPDATE, ({ newHealth }) => {
        const match = matchManager.getMatchByPlayer(socket.id);
        if (!match) {
            socket.emit(SocketEvents.ERROR_MESSAGE, { message: "No active Match" });
            return;
        }

        match.getPlayerById(socket.id).health = newHealth;

        io.to(match.getOpponent(socket.id)!.id).emit(SocketEvents.OPPONENT_HEALTH_CHANGED, {
            health: newHealth
        });
    });
}