import { MAX_TILES } from "./game";

export class Player {
  public location: number = 0;
  public purse: number = 0;
  public inPenaltyBox: boolean = false;

  constructor(readonly name: string) {}

  public collectAward(): void {
    console.log("Answer was correct!!!!");

    this.purse += 1;

    console.log(this.name + " now has " + this.purse + " Gold Coins.");
  }

  public move(roll: number) {
    this.location += roll;
    if (this.location >= MAX_TILES) {
      this.location -= MAX_TILES;
    }

    console.log(this.name + "'s new location is " + this.location);
  }
}
