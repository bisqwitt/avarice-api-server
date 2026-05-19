import { randomUUID } from "node:crypto";
import { Server, Socket } from "socket.io";
import { matchManager } from "../../game/MatchManager";
import { SocketEvents } from "../socketEvents";

let waitingPlayer: Socket | null = null;

export function registerMatchmakingHandlers(io: Server, socket: Socket) {
    socket.on(SocketEvents.JOIN_QUEUE, () => {
        console.log(`${socket.id} joined queue`);

        if (!waitingPlayer) {
            waitingPlayer = socket;
            socket.emit(SocketEvents.QUEUE_JOINED);
            return;
        }

        if (waitingPlayer.id === socket.id) {
            return;
        }

        const playerA = waitingPlayer;
        const playerB = socket;
        waitingPlayer = null;

        const roomId = `room-${randomUUID()}`;
        playerA.join(roomId);
        playerB.join(roomId);

        const match = matchManager.createMatch(roomId, playerA.id, playerB.id);

        playerA.emit(SocketEvents.MATCH_FOUND, {
            roomId,
            playerId: playerA.id,
            opponentId: playerB.id
        });

        playerB.emit(SocketEvents.MATCH_FOUND, {
            roomId,
            playerId: playerB.id,
            opponentId: playerA.id
        });

        console.log(`Match created: ${roomId}`);
    });

    socket.on(SocketEvents.DISCONNECT, () => {
        if (waitingPlayer?.id === socket.id) {
            waitingPlayer = null;
            console.log(`${socket.id} left queue`);
            return;
        }

        const match = matchManager.getMatchByPlayer(socket.id);
        if (!match) return;

        socket.to(match.roomId).emit(SocketEvents.OPPONENT_LEFT, {
            roomId: match.roomId,
            playerId: socket.id
        });

        matchManager.removeMatch(match.roomId);
        console.log(`Match closed: ${match.roomId}`);
    });
}