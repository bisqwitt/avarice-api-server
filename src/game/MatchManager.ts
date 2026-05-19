import { Match } from "./Match";

export class MatchManager {

    private matches: Map<string, Match> = new Map();
    private playerToRoom: Map<string, string> = new Map();

    createMatch(roomId: string, playerA: string, playerB: string): Match {
        const match = new Match(roomId, playerA, playerB);

        this.matches.set(roomId, match);
        this.playerToRoom.set(playerA, roomId);
        this.playerToRoom.set(playerB, roomId);

        return match;
    }

    getMatchByRoomId(roomId: string): Match | undefined {
        return this.matches.get(roomId);
    }

    getMatchByPlayer(playerId: string): Match | undefined {
        const roomId = this.playerToRoom.get(playerId);
        if (!roomId) return undefined;

        return this.matches.get(roomId);
    }

    removeMatch(roomId: string): Match | undefined {
        const match = this.matches.get(roomId);
        if (!match) return undefined;

        this.matches.delete(roomId);
        this.playerToRoom.delete(match.playerA);
        this.playerToRoom.delete(match.playerB);

        return match;
    }

}

export const matchManager = new MatchManager();