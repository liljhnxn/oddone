export const ODDONE_CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_ODDONE_CONTRACT_ADDRESS || '').trim() as `0x${string}`;

export const ODDONE_CONTRACT_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "score",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalQuestions",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256"
      }
    ],
    name: "ScoreSubmitted",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "player",
        type: "address"
      }
    ],
    name: "getPlayerBestScore",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "player",
        type: "address"
      }
    ],
    name: "getPlayerGameCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "limit",
        type: "uint256"
      }
    ],
    name: "getRecentScores",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "player",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "score",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "totalQuestions",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256"
          }
        ],
        internalType: "struct OddOneScores.ScoreRecord[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getTotalSubmissions",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "playerBestScore",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "playerGameCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "score",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "totalQuestions",
        type: "uint256"
      }
    ],
    name: "submitScore",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
] as const;

