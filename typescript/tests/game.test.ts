import { GameRunner } from "../src/game-runner";
import { it, expect } from "@jest/globals";

it("simulates the game", () => {
  const outputs: string[] = [];
  global.console.log = (str: string) => {
    outputs.push(str);
  };

  GameRunner.main();

  expect(outputs).toMatchSnapshot();
});
