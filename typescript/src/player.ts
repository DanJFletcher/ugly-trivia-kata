export class Player {
  public tile: number = 0;
  public purse: number = 0;
  public inPenaltyBox: boolean = false;

  constructor(public readonly name: string) {}
}
