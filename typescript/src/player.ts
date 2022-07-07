import { settings } from "./game";
export class Player {
  public tile: number = 0;
  public purse: number = 0;
  public inPenaltyBox: boolean = false;

  constructor(public readonly name: string) {}

  public move(roll: number): void {
    this.tile += roll;

    if (this.tile >= settings.totalTiles) {
      this.tile -= settings.totalTiles;
    }

    console.log(this.name + "'s new location is " + this.tile);
  }
}
