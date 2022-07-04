import { GameRunner } from "../src/game-runner";
import { it } from "mocha";

const chai = require("chai");
const { jestSnapshotPlugin } = require("mocha-chai-jest-snapshot");
const { expect } = require("chai");

chai.use(jestSnapshotPlugin());

it("simulates the game", () => {
  const outputs: string[] = [];
  global.console.log = (str: string) => {
    outputs.push(str);
  };

  GameRunner.main();

  expect(outputs).toMatchSnapshot();
});
