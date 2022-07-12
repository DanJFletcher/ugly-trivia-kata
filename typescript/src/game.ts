import { isOdd } from "./isOdd";
import { Player } from "./player";

const MAX_TILES = 12;

export class Game {
  private players: Array<Player> = [];

  private currentPlayerIndex: number = 0;
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
    console.log("They are player number " + this.totalPlayers());

    return true;
  }

  private totalPlayers(): number {
    return this.players.length;
  }

  public roll(roll: number): void {
    console.log(this.getCurrentPlayer().name + " is the current player");
    console.log("They have rolled a " + roll);

    if (!this.getCurrentPlayer().inPenaltyBox) {
      this.movePlayer(roll)

      this.askQuestion();

      return;
    }
    
    if (isOdd(roll)) {
      this.letPlayerOutOfPenaltyBox();

      this.movePlayer(roll);

      this.askQuestion();

      return;
    }

    this.keepPlayerInPenaltyBox();
  }

  private getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  public wrongAnswer(): boolean {
    console.log("Question was incorrectly answered");
    console.log(
      this.getCurrentPlayer().name + " was sent to the penalty box"
    );
    this.getCurrentPlayer().inPenaltyBox = true;

    this.rotatePlayer();

    return true;
  }



  public wasCorrectlyAnswered(): boolean {
    if (!this.getCurrentPlayer().inPenaltyBox || this.isGettingOutOfPenaltyBox) {
      this.awardPlayer();

      var winner = this.didPlayerWin();

      this.rotatePlayer();

      return winner;
    }

    this.rotatePlayer();

    return true;
  }

  private awardPlayer() {
    console.log("Answer was correct!!!!");
    this.getCurrentPlayer().purse += 1;
    console.log(
      this.getCurrentPlayer().name +
      " now has " +
      this.getCurrentPlayer().purse +
      " Gold Coins."
    );
  }

  private rotatePlayer() {
    this.currentPlayerIndex += 1;
    if (this.currentPlayerIndex == this.totalPlayers()) {
      this.currentPlayerIndex = 0;
    }
  }

  private letPlayerOutOfPenaltyBox() {
    this.isGettingOutOfPenaltyBox = true;

    console.log(
      this.getCurrentPlayer().name +
      " is getting out of the penalty box"
    );
  }

  private keepPlayerInPenaltyBox() {
    console.log(
      this.getCurrentPlayer().name +
      " is not getting out of the penalty box"
    );
    this.isGettingOutOfPenaltyBox = false;
  }

  private movePlayer(roll: number) {
    this.getCurrentPlayer().tile += roll;
    
    if (this.getCurrentPlayer().tile >= MAX_TILES) {
      this.getCurrentPlayer().tile -= MAX_TILES;
    }

    console.log(
      this.getCurrentPlayer().name +
      "'s new location is " +
      this.getCurrentPlayer().tile
    );
  }

  private askQuestion(): void {
    console.log("The category is " + this.currentCategory());
    if (this.currentCategory() == "Pop") 
      console.log(this.popQuestions.shift());
    if (this.currentCategory() == "Science")
      console.log(this.scienceQuestions.shift());
    if (this.currentCategory() == "Sports")
      console.log(this.sportsQuestions.shift());
    if (this.currentCategory() == "Rock")
      console.log(this.rockQuestions.shift());
  }

  private currentCategory(): string {
    if (this.getCurrentPlayer().tile == 0) return "Pop";
    if (this.getCurrentPlayer().tile == 4) return "Pop";
    if (this.getCurrentPlayer().tile == 8) return "Pop";
    if (this.getCurrentPlayer().tile == 1) return "Science";
    if (this.getCurrentPlayer().tile == 5) return "Science";
    if (this.getCurrentPlayer().tile == 9) return "Science";
    if (this.getCurrentPlayer().tile == 2) return "Sports";
    if (this.getCurrentPlayer().tile == 6) return "Sports";
    if (this.getCurrentPlayer().tile == 10) return "Sports";
    return "Rock";
  }

  private didPlayerWin(): boolean {
    return !(this.getCurrentPlayer().purse == 6);
  }

  
}


