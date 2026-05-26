import { Player } from "./Player";

export class Match {

    public playerA: Player;
    public playerB: Player;

    public playerACompletedRound: boolean = false;
    public playerBCompletedRound: boolean = false;

    constructor(public roomId: string, playerAId: string, playerBId: string) {
        this.playerA = new Player(playerAId, 1000);
        this.playerB = new Player(playerBId, 1000);
    }

    newRound() {
        this.playerACompletedRound = false;
        this.playerBCompletedRound = false;
    }

    playerCompletedRound(playerId: string) {
        if (this.playerA.id === playerId) {
            this.playerACompletedRound = true;
        } else {
            this.playerBCompletedRound = true;
        }
    }

    bothPlayersCompletedRound(): boolean {
        return this.playerACompletedRound && this.playerBCompletedRound;
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