import { RoundEndScore } from "./RoundEndScore";

export class Match {

    public roundEndScores: Map<number, RoundEndScore> = new Map();

    constructor(
        public roomId: string,
        public playerA: string,
        public playerB: string) { }

    getOpponent(playerId: string): string | null {
        if (this.playerA === playerId) return this.playerB;
        if (this.playerB === playerId) return this.playerA;
        return null;
    }

    addRoundEndScore(player: string, round: number, score: number) {
        if (!this.roundEndScores.has(round)) {
            this.roundEndScores.set(round, new RoundEndScore(round));
        }

        if (player === this.playerA) {
            this.roundEndScores.get(round)!.setScorePlayerA(score);
        } else {
            this.roundEndScores.get(round)!.setScorePlayerB(score);
        }
    }

    bothPlayersCompletedRound(round: number): boolean {
        return this.roundEndScores.get(round)?.bothScoresPresent() ?? false;
    }

}