export class Player {
    tile: number = 0;
    purse: number = 0;
    inPenaltyBox: boolean = false;

    constructor(readonly name: string) {}
}