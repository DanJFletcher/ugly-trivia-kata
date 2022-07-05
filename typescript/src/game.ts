export class Game {
  private players: Array<string> = [];
  private tiles: Array<number> = [];
  private purses: Array<number> = [];
  private inPenaltyBox: Array<boolean> = [];
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
    this.players.push(name);
    this.tiles[this.howManyPlayers()] = 0;
    this.purses[this.howManyPlayers()] = 0;
    this.inPenaltyBox[this.howManyPlayers()] = false;

    console.log(name + " was added");
    console.log("They are player number " + this.players.length);

    return true;
  }

  private howManyPlayers(): number {
    return this.players.length;
  }

  public roll(roll: number) {
    console.log(this.players[this.currentPlayer] + " is the current player");
    console.log("They have rolled a " + roll);

    if (!this.inPenaltyBox[this.currentPlayer]) {
      this.movePlayer(roll);
      this.askQuestion();

      return;
    }

    if (isOdd(roll)) {
      this.isGettingOutOfPenaltyBox = true;

      console.log(
        this.players[this.currentPlayer] + " is getting out of the penalty box"
      );

      this.movePlayer(roll);
      this.askQuestion();

      return;
    }

    console.log(
      this.players[this.currentPlayer] +
        " is not getting out of the penalty box"
    );
    this.isGettingOutOfPenaltyBox = false;
  }

  private movePlayer(roll: number) {
    this.tiles[this.currentPlayer] += roll;
    if (this.playerPassedLastTile()) {
      this.tiles[this.currentPlayer] -= 12;
    }

    console.log(
      this.players[this.currentPlayer] +
        "'s new location is " +
        this.tiles[this.currentPlayer]
    );
    console.log("The category is " + this.currentCategory());
  }

  private playerPassedLastTile() {
    return this.tiles[this.currentPlayer] > 11;
  }

  private askQuestion(): void {
    if (this.currentCategory() == "Pop") console.log(this.popQuestions.shift());
    if (this.currentCategory() == "Science")
      console.log(this.scienceQuestions.shift());
    if (this.currentCategory() == "Sports")
      console.log(this.sportsQuestions.shift());
    if (this.currentCategory() == "Rock")
      console.log(this.rockQuestions.shift());
  }

  private currentCategory(): string {
    if (this.tiles[this.currentPlayer] == 0) return "Pop";
    if (this.tiles[this.currentPlayer] == 4) return "Pop";
    if (this.tiles[this.currentPlayer] == 8) return "Pop";
    if (this.tiles[this.currentPlayer] == 1) return "Science";
    if (this.tiles[this.currentPlayer] == 5) return "Science";
    if (this.tiles[this.currentPlayer] == 9) return "Science";
    if (this.tiles[this.currentPlayer] == 2) return "Sports";
    if (this.tiles[this.currentPlayer] == 6) return "Sports";
    if (this.tiles[this.currentPlayer] == 10) return "Sports";
    return "Rock";
  }

  private didPlayerWin(): boolean {
    return this.purses[this.currentPlayer] != 6;
  }

  public wrongAnswer(): boolean {
    console.log("Question was incorrectly answered");
    console.log(
      this.players[this.currentPlayer] + " was sent to the penalty box"
    );
    this.inPenaltyBox[this.currentPlayer] = true;

    this.currentPlayer += 1;
    if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
    return true;
  }

  public wasCorrectlyAnswered(): boolean {
    if (!this.inPenaltyBox[this.currentPlayer]) {
      console.log("Answer was corrent!!!!");

      this.addToPlayerPurse();

      var winner = this.didPlayerWin();

      this.rotatePlayer();

      return winner;
    }

    if (this.isGettingOutOfPenaltyBox) {
      console.log("Answer was correct!!!!");

      this.addToPlayerPurse();

      var winner = this.didPlayerWin();

      this.rotatePlayer();

      return winner;
    }

    this.rotatePlayer();

    return true;
  }

  private addToPlayerPurse() {
    this.purses[this.currentPlayer] += 1;
    console.log(
      this.players[this.currentPlayer] +
        " now has " +
        this.purses[this.currentPlayer] +
        " Gold Coins."
    );
  }

  private rotatePlayer() {
    this.currentPlayer += 1;
    if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
  }
}
function isOdd(roll: number) {
  return roll % 2 != 0;
}
