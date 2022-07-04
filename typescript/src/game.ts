const correctAnswerMessage = "Answer was correct!!!!";

export class Game {
  private players: Array<string> = [];
  private places: Array<number> = [];
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
    this.places[this.howManyPlayers()] = 0;
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
      return;
    }

    if (isOdd(roll)) {
      this.isGettingOutOfPenaltyBox = true;

      console.log(
        this.players[this.currentPlayer] + " is getting out of the penalty box"
      );

      this.movePlayer(roll);

      return;
    }

    console.log(
      this.players[this.currentPlayer] +
        " is not getting out of the penalty box"
    );

    this.isGettingOutOfPenaltyBox = false;
  }

  private movePlayer(roll: number) {
    this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
    if (this.places[this.currentPlayer] > 11) {
      this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
    }

    console.log(
      this.players[this.currentPlayer] +
        "'s new location is " +
        this.places[this.currentPlayer]
    );
    console.log("The category is " + this.currentCategory());
    this.askQuestion();
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
    switch (this.places[this.currentPlayer]) {
      case 0 || 4 || 8:
        return "Pop";
      case 1 || 5 || 9:
        return "Science";
      case 2 || 6 || 10:
        return "Sports";
      default:
        return "Rock";
    }
  }

  private didPlayerWin(): boolean {
    return !(this.purses[this.currentPlayer] == 6);
  }

  public wrongAnswer(): boolean {
    console.log("Question was incorrectly answered");
    console.log(
      this.players[this.currentPlayer] + " was sent to the penalty box"
    );

    this.inPenaltyBox[this.currentPlayer] = true;

    this.rotateCurrentPlayer();

    return true;
  }

  private rotateCurrentPlayer() {
    this.currentPlayer += 1;
    if (this.currentPlayer == this.players.length) {
      this.currentPlayer = 0;
    }
  }

  public wasCorrectlyAnswered(): boolean {
    if (this.inPenaltyBox[this.currentPlayer]) {
      if (this.isGettingOutOfPenaltyBox) {
        console.log(correctAnswerMessage);
        this.purses[this.currentPlayer] += 1;
        console.log(
          this.players[this.currentPlayer] +
            " now has " +
            this.purses[this.currentPlayer] +
            " Gold Coins."
        );

        var winner = this.didPlayerWin();
        this.rotateCurrentPlayer();

        return winner;
      }
      this.rotateCurrentPlayer();
      return true;
    }
    console.log(correctAnswerMessage);

    this.purses[this.currentPlayer] += 1;
    console.log(
      this.players[this.currentPlayer] +
        " now has " +
        this.purses[this.currentPlayer] +
        " Gold Coins."
    );

    var winner = this.didPlayerWin();

    this.rotateCurrentPlayer();

    return winner;
  }
}

function isOdd(roll: number) {
  return roll % 2 != 0;
}
