import rolls from "../tests/rolls";
import answers from "../tests/answers";
import { Game } from "./game";

export class GameRunner {
  public static main(): void {
    const game = new Game();
    game.add("Chet");
    game.add("Pat");
    game.add("Sue");
    game.add("Yun-Seo");
    game.add("Islay");
    game.add("Makana");
    game.add("Ebrar");
    game.add("Neo");
    game.add("Glaucia");
    game.add("Tendai");
    game.add("Sandy");
    game.add("Onyeka");
    game.add("Dave");

    let notAWinner;
    do {
      let roll = rolls.shift();
      if (typeof roll !== "undefined") {
        game.roll(roll);
      } else {
        break;
      }

      if (answers.shift()) {
        notAWinner = game.wrongAnswer();
      } else {
        notAWinner = game.wasCorrectlyAnswered();
      }
    } while (notAWinner);
  }
}

// GameRunner.main();
