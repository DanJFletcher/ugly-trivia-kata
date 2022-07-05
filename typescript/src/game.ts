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

  private pop = "Pop";
  private science = "Science";
  private sports = "Sports";

  constructor() {
    for (let i = 0; i < 50; i++) {
      this.popQuestions.push("Pop Question " + i);
      this.scienceQuestions.push("Science Question " + i);
      this.sportsQuestions.push("Sports Question " + i);
      this.rockQuestions.push(this.createRockQuestion(i));
    }
  }

  private createRockQuestion(index: number): string {
    return "Rock Question " + index;
  }

  public add(name: string): boolean {
    this.players.push(name);
    this.places[this.howManyPlayers()] = 0;
    this.purses[this.howManyPlayers()] = 0;
    this.inPenaltyBox[this.howManyPlayers()] = false;

    console.log(name + " was added");
    console.log("They are player number " + this.howManyPlayers());

    return true;
  }

  private howManyPlayers(): number {
    return this.players.length;
  }

  private getCurrentPlace() {
    return this.places[this.currentPlayer];
  }

  private setCurrentPlace(value: number) {
    this.places[this.currentPlayer] = value;
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
    this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
    if (this.places[this.currentPlayer] > 11) {
      this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
    }

    console.log(
      this.players[this.currentPlayer] +
        "'s new location is " +
        this.places[this.currentPlayer]
    );
  }

  private askQuestion(): void {
    console.log("The category is " + this.currentCategory());

    if (this.currentCategory() == this.pop)
      console.log(this.popQuestions.shift());
    if (this.currentCategory() == this.science)
      console.log(this.scienceQuestions.shift());
    if (this.currentCategory() == this.sports)
      console.log(this.sportsQuestions.shift());
    if (this.currentCategory() == "Rock")
      console.log(this.rockQuestions.shift());
  }

  private currentCategory(): string {
    if (this.places[this.currentPlayer] == 0) return this.pop;
    if (this.places[this.currentPlayer] == 4) return this.pop;
    if (this.places[this.currentPlayer] == 8) return this.pop;
    if (this.places[this.currentPlayer] == 1) return this.science;
    if (this.places[this.currentPlayer] == 5) return this.science;
    if (this.places[this.currentPlayer] == 9) return this.science;
    if (this.places[this.currentPlayer] == 2) return this.sports;
    if (this.places[this.currentPlayer] == 6) return this.sports;
    if (this.places[this.currentPlayer] == 10) return this.sports;
    return "Rock";
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

    this.currentPlayer += 1;
    if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
    return true;
  }

  public wasCorrectlyAnswered(): boolean {
    if (this.inPenaltyBox[this.currentPlayer]) {
      if (!this.isGettingOutOfPenaltyBox) {
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
        return true;
      }

      console.log("Answer was correct!!!!");
      this.purses[this.currentPlayer] += 1;
      console.log(
        this.players[this.currentPlayer] +
          " now has " +
          this.purses[this.currentPlayer] +
          " Gold Coins."
      );

      var winner = this.didPlayerWin();
      this.currentPlayer += 1;
      if (this.currentPlayer == this.players.length) this.currentPlayer = 0;

      return winner;
    } else {
      console.log("Answer was corrent!!!!");

      this.purses[this.currentPlayer] += 1;
      console.log(
        this.players[this.currentPlayer] +
          " now has " +
          this.purses[this.currentPlayer] +
          " Gold Coins."
      );

      var winner = this.didPlayerWin();

      this.currentPlayer += 1;
      if (this.currentPlayer == this.players.length) this.currentPlayer = 0;

      return winner;
    }
  }
}
function isOdd(roll: number) {
  return roll % 2 != 0;
}
