import { Player } from "./Player";
import { RoundEndScore } from "./RoundEndScore";

export class Match {

    public roundEndScores: Map<number, RoundEndScore> = new Map();
    public playerA: Player;
    public playerB: Player;

    constructor(public roomId: string, playerAId: string, playerBId: string) {
        this.playerA = new Player(playerAId, 1000);
        this.playerB = new Player(playerBId, 1000);
    }

    addRoundEndScore(playerId: string, round: number, score: number) {
        if (!this.roundEndScores.has(round)) {
            this.roundEndScores.set(round, new RoundEndScore(round));
        }

        if (playerId === this.playerA.id) {
            this.roundEndScores.get(round)!.setScorePlayerA(score);
        } else {
            this.roundEndScores.get(round)!.setScorePlayerB(score);
        }
    }

    bothPlayersCompletedRound(round: number): boolean {
        return this.roundEndScores.get(round)?.bothScoresPresent() ?? false;
    }

    getPlayerById(id: string): Player {
        return this.playerA.id === id ? this.playerA : this.playerB;
    }

    getOpponent(playerId: string): Player | null {
        if (this.playerA.id === playerId) return this.playerB;
        if (this.playerB.id === playerId) return this.playerA;
        return null;
    }

}