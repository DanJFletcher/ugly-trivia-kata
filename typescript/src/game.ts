import { isOdd } from "./isOdd";
import { Player } from "./player";

export const MAX_TILES = 12;

export class Game {
  private players: Array<Player> = [];
  private currentPlayer: number = 0;
  private isGettingOutOfPenaltyBox: boolean = false;

  private popQuestions: Array<string> = [];
  private scienceQuestions: Array<string> = [];
  private sportsQuestions: Array<string> = [];
  private rockQuestions: Array<string> = [];

  constructor() {
    for (let i = 0; i < 50; i++) {
      this.popQuestions.push("Pop Question " + i);
      this.scienceQuestions.push("Science Question " + i);
      this.sportsQuestions.push("Sports Question " + i);
      this.rockQuestions.push("Rock Question " + i);
    }
  }

  public add(name: string): boolean {
    const player = new Player(name);
    this.players.push(player);

    console.log(name + " was added");
    console.log("They are player number " + this.players.length);

    return true;
  }

  public roll(roll: number) {
    console.log(this.getCurrentPlayer().name + " is the current player");
    console.log("They have rolled a " + roll);

    if (!this.getCurrentPlayer().inPenaltyBox) {
      this.getCurrentPlayer().move(roll);
      this.askQuestion();

      return;
    }

    if (isOdd(roll)) {
      this.letPlayerOutOfPenaltyBox();
      this.getCurrentPlayer().move(roll);
      this.askQuestion();

      return;
    }

    this.keepPlayerInPenaltyBox();
  }

  public wrongAnswer(): boolean {
    console.log("Question was incorrectly answered");
    console.log(this.getCurrentPlayer().name + " was sent to the penalty box");
    this.getCurrentPlayer().inPenaltyBox = true;

    this.rotatePlayer();

    return true;
  }

  public wasCorrectlyAnswered(): boolean {
    if (
      !this.getCurrentPlayer().inPenaltyBox ||
      this.isGettingOutOfPenaltyBox
    ) {
      this.getCurrentPlayer().collectAward();

      var winner = this.didPlayerWin();

      this.rotatePlayer();

      return winner;
    }

    this.rotatePlayer();

    return true;
  }

  private rotatePlayer() {
    this.currentPlayer += 1;

    if (this.currentPlayer == this.players.length) {
      this.currentPlayer = 0;
    }
  }

  private keepPlayerInPenaltyBox() {
    console.log(
      this.getCurrentPlayer().name + " is not getting out of the penalty box"
    );
    this.isGettingOutOfPenaltyBox = false;
  }

  private letPlayerOutOfPenaltyBox() {
    this.isGettingOutOfPenaltyBox = true;

    console.log(
      this.getCurrentPlayer().name + " is getting out of the penalty box"
    );
  }

  private getCurrentPlayer() {
    return this.players[this.currentPlayer];
  }

  private askQuestion(): void {
    console.log("The category is " + this.currentCategory());
    if (this.currentCategory() == "Pop") console.log(this.popQuestions.shift());
    if (this.currentCategory() == "Science")
      console.log(this.scienceQuestions.shift());
    if (this.currentCategory() == "Sports")
      console.log(this.sportsQuestions.shift());
    if (this.currentCategory() == "Rock")
      console.log(this.rockQuestions.shift());
  }

  private currentCategory(): string {
    if (this.getCurrentPlayer().location == 0) return "Pop";
    if (this.getCurrentPlayer().location == 4) return "Pop";
    if (this.getCurrentPlayer().location == 8) return "Pop";
    if (this.getCurrentPlayer().location == 1) return "Science";
    if (this.getCurrentPlayer().location == 5) return "Science";
    if (this.getCurrentPlayer().location == 9) return "Science";
    if (this.getCurrentPlayer().location == 2) return "Sports";
    if (this.getCurrentPlayer().location == 6) return "Sports";
    if (this.getCurrentPlayer().location == 10) return "Sports";
    return "Rock";
  }

  private didPlayerWin(): boolean {
    return this.getCurrentPlayer().purse !== 6;
  }
}
