import { expect } from "chai";
import hre from "hardhat";
const { ethers } = hre;
import { OddOneScores } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("OddOneScores Contract", function () {
  let oddOneScores: OddOneScores;
  let owner: HardhatEthersSigner;
  let player1: HardhatEthersSigner;
  let player2: HardhatEthersSigner;

  beforeEach(async function () {
    [owner, player1, player2] = await ethers.getSigners();
    const OddOneScoresFactory = await ethers.getContractFactory("OddOneScores");
    oddOneScores = await OddOneScoresFactory.deploy();
    await oddOneScores.waitForDeployment();
  });

  describe("Score Submission Validation", function () {
    it("should submit a valid score and record it", async function () {
      const tx = await oddOneScores.connect(player1).submitScore(8, 10);
      await tx.wait();

      expect(await oddOneScores.getPlayerBestScore(player1.address)).to.equal(8);
      expect(await oddOneScores.getPlayerGameCount(player1.address)).to.equal(1);
    });

    it("should reject invalid scores where score > totalQuestions", async function () {
      await expect(
        oddOneScores.connect(player1).submitScore(11, 10)
      ).to.be.revertedWith("Score cannot exceed total questions");
    });

    it("should reject zero-question submissions", async function () {
      await expect(
        oddOneScores.connect(player1).submitScore(0, 0)
      ).to.be.revertedWith("Total questions must be greater than 0");
    });

    it("should emit ScoreSubmitted event on successful submission", async function () {
      await expect(oddOneScores.connect(player1).submitScore(5, 5))
        .to.emit(oddOneScores, "ScoreSubmitted")
        .withArgs(player1.address, 5, 5, (await ethers.provider.getBlock("latest"))!.timestamp + 1);
    });
  });

  describe("Player Statistics and Tracking", function () {
    it("should update player's best score only when a higher score is achieved", async function () {
      // First game: 5/10
      await oddOneScores.connect(player1).submitScore(5, 10);
      expect(await oddOneScores.getPlayerBestScore(player1.address)).to.equal(5);

      // Second game: 3/10 (lower score, should not decrease best score)
      await oddOneScores.connect(player1).submitScore(3, 10);
      expect(await oddOneScores.getPlayerBestScore(player1.address)).to.equal(5);

      // Third game: 9/10 (higher score, should update best score)
      await oddOneScores.connect(player1).submitScore(9, 10);
      expect(await oddOneScores.getPlayerBestScore(player1.address)).to.equal(9);
    });

    it("should track the number of games submitted accurately across multiple players", async function () {
      expect(await oddOneScores.getPlayerGameCount(player1.address)).to.equal(0);
      expect(await oddOneScores.getPlayerGameCount(player2.address)).to.equal(0);

      await oddOneScores.connect(player1).submitScore(6, 10);
      await oddOneScores.connect(player1).submitScore(7, 10);
      await oddOneScores.connect(player2).submitScore(10, 10);

      expect(await oddOneScores.getPlayerGameCount(player1.address)).to.equal(2);
      expect(await oddOneScores.getPlayerGameCount(player2.address)).to.equal(1);
    });
  });

  describe("Leaderboard and History Retrieval", function () {
    it("should return empty array when no scores are submitted", async function () {
      const records = await oddOneScores.getRecentScores(10);
      expect(records.length).to.equal(0);
      expect(await oddOneScores.getTotalSubmissions()).to.equal(0);
    });

    it("should retrieve recent scores in reverse chronological order", async function () {
      await oddOneScores.connect(player1).submitScore(4, 5);
      await oddOneScores.connect(player2).submitScore(5, 5);

      expect(await oddOneScores.getTotalSubmissions()).to.equal(2);

      const recent = await oddOneScores.getRecentScores(10);
      expect(recent.length).to.equal(2);
      expect(recent[0].player).to.equal(player2.address);
      expect(recent[0].score).to.equal(5);
      expect(recent[1].player).to.equal(player1.address);
      expect(recent[1].score).to.equal(4);
    });

    it("should respect the limit parameter in getRecentScores", async function () {
      await oddOneScores.connect(player1).submitScore(1, 5);
      await oddOneScores.connect(player1).submitScore(2, 5);
      await oddOneScores.connect(player1).submitScore(3, 5);

      const limited = await oddOneScores.getRecentScores(2);
      expect(limited.length).to.equal(2);
      expect(limited[0].score).to.equal(3);
      expect(limited[1].score).to.equal(2);
    });
  });
});
