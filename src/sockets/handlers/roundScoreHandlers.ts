import { Server, Socket } from "socket.io";
import { matchManager } from "../../game/MatchManager";
import { SocketEvents } from "../socketEvents";

export function registerRoundScoreHandlers(io: Server, socket: Socket) {
    socket.on(SocketEvents.ROUND_SCORE_SUBMIT, ({ round, score }) => {
        const match = matchManager.getMatchByPlayer(socket.id);
        if (!match) {
            socket.emit(SocketEvents.ERROR_MESSAGE, { message: "No active Match" });
            return;
        }

        match.addRoundEndScore(socket.id, round, score);

        if (!match.bothPlayersCompletedRound(round)) {
            socket.emit(SocketEvents.ROUND_END_WAITING);
            return;
        }

        const roundScore = match.roundEndScores.get(round);

        io.to(match.playerA.id).emit(SocketEvents.ROUND_END_RESULT, {
            //    round,
            opponentScore: roundScore?.getScorePlayerB()
        });
        io.to(match.playerB.id).emit(SocketEvents.ROUND_END_RESULT, {
            //    round,
            opponentScore: roundScore?.getScorePlayerA()
        });
    });
}