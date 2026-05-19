export class RoundEndScore {

    private scorePlayerA: number | null = null;
    private scorePlayerB: number | null = null;

    constructor(
        public round: number
    ) { }

    setScorePlayerA(score: number): void {
        this.scorePlayerA = score;
    }

    setScorePlayerB(score: number): void {
        this.scorePlayerB = score;
    }

    getScorePlayerA(): number {
        return this.scorePlayerA!;
    }

    getScorePlayerB(): number {
        return this.scorePlayerB!;
    }

    bothScoresPresent(): boolean {
        return this.scorePlayerA !== null && this.scorePlayerB != null;
    }

}