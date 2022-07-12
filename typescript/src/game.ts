import { Player } from "./player";

export class Game {
  private players: Array<Player> = [];
  private tiles: Array<number> = [];
  private purses: Array<number> = [];
  private inPenaltyBox: Array<boolean> = [];
  private currentPlayer: number = 0;
  private isGettingOutOfPenaltyBox: boolean = false;

  private popQuestions: Array<string> = [];
  private scienceQuestions: Array<string> = [];
  private sportsQuestions: Array<string> = [];
  private rockQuestions: Array<string> = [];

  private categories = {
    pop: "Pop",
    science: "Science",
    sports: "Sports",
    rock: "Rock",
  };

  private tileCategoryMap = [
    this.categories.pop,
    this.categories.science,
    this.categories.sports,
    this.categories.rock,
    this.categories.pop,
    this.categories.science,
    this.categories.sports,
    this.categories.rock,
    this.categories.pop,
    this.categories.science,
    this.categories.sports,
    this.categories.rock,
  ]

  constructor() {
    for (let i = 0; i < 50; i++) {
      this.popQuestions.push(this.createQuestion("Pop Question " , i));
      this.scienceQuestions.push(this.createQuestion("Science Question " , i));
      this.sportsQuestions.push(this.createQuestion("Sports Question ", i));
      this.rockQuestions.push(this.createQuestion("Rock Question ", i));
    }
  }

  private createQuestion(questionCategory: string, index: number): string {
    return questionCategory + index;
  }

  public add(name: string): boolean {
    const player = new Player(name);
    this.players.push(player);

    this.purses[this.howManyPlayers()] = 0;
    this.inPenaltyBox[this.howManyPlayers()] = false;

    console.log(name + " was added");
    console.log("They are player number " + this.players.length);

    return true;
  }

  private howManyPlayers(): number {
    return this.players.length;
  }

   private setPlayerNewLocation(){
    console.log(
      this.getCurrentPlayer().name +
        "'s new location is " +
        this.getCurrentPlayer().location
    );
   }

  private getCurrentPlayer() {
    return this.players[this.currentPlayer];
  }

   private isPlayerGettingOutPenaltyBox(){
    console.log(
      this.getCurrentPlayer().name +
        " is not getting out of the penalty box"
    );
    this.isGettingOutOfPenaltyBox = false;
   }

  public roll(roll: number) {
    console.log(this.getCurrentPlayer().name + " is the current player");
    console.log("They have rolled a " + roll);

    const max_tiles = 11;
    if (this.inPenaltyBox[this.currentPlayer]) {
      if (this.isOdd(roll)) {
        this.isGettingOutOfPenaltyBox = true;

        console.log(
          this.getCurrentPlayer().name +
            " is getting out of the penalty box"
        );
        this.getCurrentPlayer().location =
          this.getCurrentPlayer().location + roll;
        if (this.getCurrentPlayer().location > max_tiles) {
          this.getCurrentPlayer().location =
            this.getCurrentPlayer().location - 12;
        }

        this.setPlayerNewLocation()
       
        console.log("The category is " + this.currentCategory());
       
        this.askQuestion();
      } else {
        this.isPlayerGettingOutPenaltyBox();
      }
    } else {
      this.getCurrentPlayer().location = this.getCurrentPlayer().location + roll;
      if (this.getCurrentPlayer().location > max_tiles) {
        this.getCurrentPlayer().location = this.getCurrentPlayer().location - 12;
      }

      this.setPlayerNewLocation();
      
      console.log("The category is " + this.currentCategory());

      this.askQuestion();
    }
  }

  private isOdd(roll: number) {
    return roll % 2 != 0;
  }

  private askQuestion(): void {
    if (this.currentCategory() == this.categories.pop) console.log(this.popQuestions.shift());
    if (this.currentCategory() == this.categories.science)
      console.log(this.scienceQuestions.shift());
    if (this.currentCategory() == this.categories.sports)
      console.log(this.sportsQuestions.shift());
    if (this.currentCategory() == this.categories.rock)
      console.log(this.rockQuestions.shift());
  }

  private currentCategory(): string {
    return this.tileCategoryMap[this.getCurrentPlayer().location];
  }

  private didPlayerWin(): boolean {
    return !(this.purses[this.currentPlayer] == 6);
  }

  public wrongAnswer(): boolean {
    console.log("Question was incorrectly answered");
    console.log(
      this.getCurrentPlayer().name + " was sent to the penalty box"
    );
    this.inPenaltyBox[this.currentPlayer] = true;

    this.currentPlayer += 1;
    if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
    return true;
  }

  private coinStatus(): void {
    console.log(
      this.getCurrentPlayer().name +
        " now has " +
        this.purses[this.currentPlayer] +
        " Gold Coins."
    );
  }

  public wasCorrectlyAnswered(): boolean {
    if (this.inPenaltyBox[this.currentPlayer]) {
      if (this.isGettingOutOfPenaltyBox) {
        console.log("Answer was correct!!!!");
        this.purses[this.currentPlayer] += 1;
        
        this.coinStatus();

        var winner = this.didPlayerWin();
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length) this.currentPlayer = 0;

        return winner;
      } else {
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
        return true;
      }
    } else {
      console.log("Answer was correct!!!!");

      this.purses[this.currentPlayer] += 1;
      
      this.coinStatus();

      var winner = this.didPlayerWin();

      this.currentPlayer += 1;
      if (this.currentPlayer == this.players.length) this.currentPlayer = 0;

      return winner;
    }
  }
}
