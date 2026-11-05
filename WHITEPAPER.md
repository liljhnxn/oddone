# OddOne — Lightpaper & Pitch Deck 🎯
**Spot the odd one out. Prove your instincts.**

**GitHub Repository:** [https://github.com/liljhnxn/oddone](https://github.com/liljhnxn/oddone)  
**Mainnet Contract on BotchainScan:** [`0xDfA9407DD6D940A4613E07c73f2ef838cc64Da15`](https://scan.botchain.ai/address/0xDfA9407DD6D940A4613E07c73f2ef838cc64Da15#code)  
**Network:** Botchain Mainnet (Chain ID `677`)  
**Native Token:** BOT (Total Supply: 150 Million)  
**RPC URL:** `https://rpc.botchain.ai`  
**Explorer:** `https://scan.botchain.ai`  

---

## 1. Executive Summary

**OddOne** is an engaging, lightweight Web3 mini-game designed for mainstream accessibility and on-chain engagement. Players are presented with four options, identify the outlier, receive instant educational feedback, and can optionally record their score on Botchain Mainnet.

Unlike traditional crypto games burdened by complex onboarding, mandatory wallet connection, and heavy pay-to-play economics, **OddOne** eliminates all entry friction. It serves as both a viral casual game and an onboarding tool for the Botchain ecosystem.

---

## 2. The Problem & Solution

### The Problem
* **High Onboarding Friction:** Most Web3 games require wallet connection, signature approvals, and gas tokens before a user can even interact with the application.
* **Overcomplicated Mechanics:** Many dApps focus heavily on speculative tokenomics and NFT staking rather than core, fun gameplay loops.
* **Heavy Centralized Dependencies:** Games often rely on centralized backends, databases (Firebase, Supabase), and proprietary servers that contradict Web3 decentralization principles.

### The Solution: OddOne
* **Frictionless Entry:** Play instantly in any browser without connecting a wallet or paying gas.
* **Instant Gratification:** Fast rounds (4 cards, 1 question) with real-time feedback and explanations across popular culture, gaming, anime, and science.
* **Optional, Meaningful Web3 Integration:** Wallet connection is only required when players choose to immortalize their scores on-chain.
* **Zero Backend / Serverless:** Fully decentralized architecture. The client handles gameplay logic, while the verified smart contract manages public score history and the leaderboard.

---

## 3. Product & Gameplay Loop

```
┌─────────────────┐       ┌─────────────────┐       ┌──────────────────┐
│   1. Play Now   │ ───►  │  2. Spot Oddity │ ───►  │  3. Real Feedback│
│ (Instant Start) │       │ (4 Option Cards)│       │  & Explanation   │
└─────────────────┘       └─────────────────┘       └──────────────────┘
                                                              │
                                                              ▼
┌─────────────────┐       ┌─────────────────┐       ┌──────────────────┐
│  6. Leaderboard │ ◄───  │ 5. Record Score │ ◄───  │ 4. Round Summary │
│ (Live On-Chain) │       │   (On-Chain)    │       │ (Score/Accuracy) │
└─────────────────┘       └─────────────────┘       └──────────────────┘
```

1. **Instant Session Start:** Players launch a 10-question round with a single click.
2. **Four-Option Mechanic:** Dynamic cards challenge pattern recognition across Anime, Tech, Food, Gaming, Animals, and General Knowledge.
3. **Educational Feedback:** Explains *why* the option was the outlier, reinforcing knowledge and replayability.
4. **Final Scoring:** Accuracy metrics, streak ratings, and total points calculated locally.
5. **On-Chain Recording:** One-click MetaMask transaction submits the verified score to the `OddOneScores` smart contract.
6. **Decentralized Leaderboard:** Live RPC-driven board displaying wallet addresses, scores, accuracy percentages, and block timestamps.

---

## 4. Technical Architecture

* **Smart Contract:** Solidity `0.8.24` (`OddOneScores.sol`), compiled via Hardhat with optimizer enabled (200 runs).
* **Blockchain:** Botchain Mainnet (`https://rpc.botchain.ai`, Chain ID `677`, BotchainScan explorer).
* **Frontend:** Next.js 14 App Router, TypeScript, Tailwind CSS, Lucide Icons.
* **Web3 Libraries:** Wagmi v2 & Viem v2 for reactive wallet states and RPC interaction.
* **Decentralization Guarantee:** No Firebase, No Supabase, No Node.js backend server. Direct read/write to the Botchain RPC.

### Smart Contract Highlights (`OddOneScores.sol`)
* **Integrity Validation:** Rejects scores higher than total questions and zero-length sessions.
* **Player Statistics:** Tracks career game counts and personal best records per address.
* **Event Emission:** Emits `ScoreSubmitted(address, uint256, uint256, uint256)` for indexers and explorer verification.
* **Ultra-Low Gas:** Deployment gas cost was only **0.00869 BOT** (~434,659 gas units).

---

## 5. Ecosystem Value for Botchain

1. **Active Wallet Driver:** Every completed game incentivizes an active on-chain transaction on Botchain Mainnet.
2. **Consumer Onboarding Portal:** Ideal introductory dApp to help new Web3 users switch to Botchain (Chain ID 677) and execute their first mainnet transaction.
3. **High Replayability & Micro-Transactions:** Short game loops encourage repeated submissions, testing network throughput and wallet responsiveness.
4. **Co-Marketing Potential:** Viral trivia format ideal for community tournaments, Discord events, and social media campaigns.

---

## 6. Official Links & Resources

* **GitHub:** [https://github.com/liljhnxn/oddone](https://github.com/liljhnxn/oddone)
* **Mainnet Contract Address:** `0xDfA9407DD6D940A4613E07c73f2ef838cc64Da15`
* **Verified Contract Code:** [https://scan.botchain.ai/address/0xDfA9407DD6D940A4613E07c73f2ef838cc64Da15#code](https://scan.botchain.ai/address/0xDfA9407DD6D940A4613E07c73f2ef838cc64Da15#code)
* **RPC Endpoint:** `https://rpc.botchain.ai`
* **Chain ID:** `677`
* **Native Token:** BOT
