# OddOne — Spot the Odd One Out 🎯

**Tagline:** Spot the odd one out. Prove your instincts.

OddOne is a lightweight, responsive Web3 mini-game deployed on **Botchain Mainnet**. Players are challenged with four options, identify the item that doesn't belong, receive instant feedback with educational explanations, and can optionally record their game score on-chain via the verified `OddOneScores` smart contract.

---

## 🌟 Key Features

- **Instant Local Gameplay**: Play anytime without connecting a wallet or paying gas fees.
- **24+ Predefined Curated Questions**: Across Anime, Gaming, Animals, Food, Technology, and General Knowledge.
- **Interactive Feedback**: Instant feedback displaying the correct answer, the player's choice, and a clear explanation.
- **Web3 Score Recording**: Connect MetaMask and optionally record completed scores to Botchain Mainnet.
- **Live On-Chain Leaderboard**: Reads recent score records directly from the smart contract via RPC (`eth_call` / view functions), with no central backend or database.
- **Botchain Mainnet Support**: One-click network switching/adding directly to MetaMask with native BOT currency metadata.
- **Dark Charcoal Aesthetic**: Polished design using dark charcoal backgrounds, muted purple accents, emerald green feedback, and subtle borders.

---

## ⛓️ Botchain Mainnet Configuration

| Parameter | Value |
| :--- | :--- |
| **Network Name** | Botchain Mainnet |
| **Chain ID** | `677` (`0x2a5`) |
| **RPC URL** | `https://rpc.botchain.ai` |
| **Native Token** | `BOT` |
| **Total Supply** | 150 Million |
| **Decimals** | `18` |
| **Block Explorer** | [https://scan.botchain.ai](https://scan.botchain.ai) |
| **Verified Contract** | [`0xDfA9407DD6D940A4613E07c73f2ef838cc64Da15`](https://scan.botchain.ai/address/0xDfA9407DD6D940A4613E07c73f2ef838cc64Da15#code) |

---

## 🏗️ Architecture & Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons
- **Web3 / Wallet**: wagmi v2, viem v2, @tanstack/react-query v5
- **Smart Contracts**: Solidity `^0.8.24`, Hardhat, ethers.js v6
- **Storage / Backend**: No centralized backend, database, Firebase, or Supabase. Questions are embedded in client memory; scores and statistics are stored on Botchain.

---

## 📁 Project Structure

```
├── contracts/
│   └── OddOneScores.sol       # Solidity smart contract for recording scores
├── scripts/
│   └── deploy.ts              # Hardhat deployment script for Botchain
├── test/
│   └── OddOneScores.test.ts   # Comprehensive unit tests for contract
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with Wagmi & React Query providers
│   │   ├── page.tsx           # Single-page game state machine
│   │   ├── providers.tsx      # Web3 Wagmi and TanStack Query providers
│   │   └── globals.css        # Tailwind styles & theme variables
│   ├── components/
│   │   ├── Header.tsx         # Logo, Botchain indicator & MetaMask connect button
│   │   ├── Hero.tsx           # Title, subtitle, and Play Now trigger
│   │   ├── GameCard.tsx       # 4 selectable cards, progress bar, category tag
│   │   ├── AnswerFeedback.tsx # Outcome banner, correct reveal & explanation
│   │   ├── FinalScore.tsx     # Score summary, accuracy & on-chain submit
│   │   ├── Leaderboard.tsx    # Live on-chain score feed & empty state
│   │   └── Footer.tsx         # Branding, explorer links & disclaimer
│   ├── config/
│   │   ├── chain.ts           # BOT Chain definition
│   │   ├── contract.ts        # Contract address & ABI
│   │   └── wagmi.ts           # Wagmi client configuration
│   ├── data/
│   │   └── questions.ts       # 24 original predefined questions & explanations
│   └── types/
│       └── game.ts            # TypeScript interfaces
├── hardhat.config.ts          # Hardhat configuration for Botchain Mainnet
├── package.json
└── tsconfig.json
```

---

## 🧪 Smart Contract Testing & Compilation

### Compile the Solidity Contract
```bash
npm run compile
```

### Run Unit Tests
```bash
npm run test:contract
```

The test suite covers:
- Submitting valid scores
- Rejecting scores greater than total questions
- Rejecting zero-question submissions
- Updating player's best score
- Tracking total games submitted per player
- Emitting the `ScoreSubmitted` event
- Retrieving recent score records in reverse chronological order

---

## 🚢 Deploying to Botchain Mainnet

1. Set your deployer's private key in `.env.local`:
   ```env
   PRIVATE_KEY=0xYourPrivateKeyHere
   BOTCHAIN_MAINNET_RPC_URL=https://rpc.botchain.ai
   ```
2. Run the deployment script:
   ```bash
   npx hardhat run scripts/deploy.ts --network botchainMainnet
   ```
3. Verify on BotchainScan:
   ```bash
   npx hardhat verify --network botchainMainnet <DEPLOYED_CONTRACT_ADDRESS>
   ```

---

## 💻 Running the Frontend

### Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```

---

## ⛽ Gas & Transaction Notice

- **Free Actions (No Gas / No Wallet Required)**:
  - Playing the game locally
  - Viewing question explanations
  - Viewing the leaderboard (reads directly via RPC view calls)
- **Actions Requiring Gas**:
  - Submitting a completed game score on-chain (`submitScore` function: ~45,000 gas, < 0.001 BOT)

---

## 🛡️ Disclaimer

Scores displayed on the leaderboard are self-reported by players upon completing game sessions and recorded directly into the `OddOneScores` smart contract. The contract does not independently verify gameplay off-chain. Scores are publicly verifiable on BotchainScan explorer. No monetary rewards, tokens, or prizes are distributed.
