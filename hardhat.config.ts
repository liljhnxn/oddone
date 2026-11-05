import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const BOTCHAIN_TESTNET_RPC_URL = process.env.BOTCHAIN_RPC_URL || "https://rpc.bohr.life";
const BOTCHAIN_MAINNET_RPC_URL = process.env.BOTCHAIN_MAINNET_RPC_URL || "https://rpc.botchain.ai";

const rawKey = (process.env.PRIVATE_KEY || "").trim();
const formattedKey = rawKey
  ? (rawKey.startsWith("0x") ? rawKey : `0x${rawKey}`)
  : "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},
    botchainTestnet: {
      url: BOTCHAIN_TESTNET_RPC_URL,
      chainId: 968,
      accounts: [formattedKey],
    },
    botchainMainnet: {
      url: BOTCHAIN_MAINNET_RPC_URL,
      chainId: 677,
      accounts: [formattedKey],
    },
  },
  etherscan: {
    apiKey: {
      botchainTestnet: "none",
      botchainMainnet: "none",
    },
    customChains: [
      {
        network: "botchainTestnet",
        chainId: 968,
        urls: {
          apiURL: "https://scan.bohr.life/api",
          browserURL: "https://scan.bohr.life",
        },
      },
      {
        network: "botchainMainnet",
        chainId: 677,
        urls: {
          apiURL: "https://scan.botchain.ai/api",
          browserURL: "https://scan.botchain.ai",
        },
      },
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

export default config;
