// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title OddOneScores
 * @notice Records completed game scores for the OddOne mini-game on Botchain Testnet.
 * @dev Scores are self-reported by players upon game completion. No funds, tokens, or prizes are managed.
 */
contract OddOneScores {
    struct ScoreRecord {
        address player;
        uint256 score;
        uint256 totalQuestions;
        uint256 timestamp;
    }

    // Mapping from player address to their highest score achieved
    mapping(address => uint256) public playerBestScore;

    // Mapping from player address to total number of games submitted
    mapping(address => uint256) public playerGameCount;

    // Array of all submitted score records for on-chain leaderboard display
    ScoreRecord[] private scoreHistory;

    // Emitted whenever a player submits their game score
    event ScoreSubmitted(
        address indexed player,
        uint256 score,
        uint256 totalQuestions,
        uint256 timestamp
    );

    /**
     * @notice Submits a completed game score.
     * @param score The number of correct answers.
     * @param totalQuestions The total number of questions in the game.
     */
    function submitScore(uint256 score, uint256 totalQuestions) external {
        require(totalQuestions > 0, "Total questions must be greater than 0");
        require(score <= totalQuestions, "Score cannot exceed total questions");

        // Increment player's game count
        playerGameCount[msg.sender] += 1;

        // Update player's best score if the new score is higher
        if (score > playerBestScore[msg.sender]) {
            playerBestScore[msg.sender] = score;
        }

        // Record the score in history
        scoreHistory.push(ScoreRecord({
            player: msg.sender,
            score: score,
            totalQuestions: totalQuestions,
            timestamp: block.timestamp
        }));

        emit ScoreSubmitted(msg.sender, score, totalQuestions, block.timestamp);
    }

    /**
     * @notice Returns the personal best score for a specific player.
     * @param player The address of the player.
     */
    function getPlayerBestScore(address player) external view returns (uint256) {
        return playerBestScore[player];
    }

    /**
     * @notice Returns the total games submitted by a specific player.
     * @param player The address of the player.
     */
    function getPlayerGameCount(address player) external view returns (uint256) {
        return playerGameCount[player];
    }

    /**
     * @notice Returns the total count of scores recorded in the contract.
     */
    function getTotalSubmissions() external view returns (uint256) {
        return scoreHistory.length;
    }

    /**
     * @notice Retrieves recent score submissions, newest first.
     * @param limit The maximum number of entries to return (0 or > total returns all).
     */
    function getRecentScores(uint256 limit) external view returns (ScoreRecord[] memory) {
        uint256 total = scoreHistory.length;
        if (total == 0) {
            return new ScoreRecord[](0);
        }

        uint256 count = (limit == 0 || limit > total) ? total : limit;
        ScoreRecord[] memory records = new ScoreRecord[](count);

        for (uint256 i = 0; i < count; i++) {
            records[i] = scoreHistory[total - 1 - i];
        }

        return records;
    }
}

