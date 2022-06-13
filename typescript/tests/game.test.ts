import { expect } from "chai";
import { describe, it } from "mocha";
import { GameRunner } from "../src/game-runner";
import * as readline from "node:readline";

describe("The test environment", () => {
  it("should pass", () => {
    expect(true).to.be.true;
  });

  it("should access game", function () {
    expect(GameRunner).to.not.be.undefined;
  });

  it("simulates the game", () => {
    GameRunner.main();

    const lineReader = require("readline").createInterface({
      input: require("fs").createReadStream("file.in"),
    });

    lineReader.on("line", function (line) {
      console.log("Line from file:", line);
    });
  });
});
