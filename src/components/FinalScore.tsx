'use client';

import React, { useState } from 'react';
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
  useSwitchChain,
  useConnect,
} from 'wagmi';
import { ODDONE_CONTRACT_ADDRESS, ODDONE_CONTRACT_ABI } from '@/config/contract';
import { botchainTestnet } from '@/config/chain';
import {
  Trophy,
  RotateCcw,
  UploadCloud,
  CheckCircle2,
  ExternalLink,
  AlertTriangle,
  Loader2,
  Wallet,
  ShieldCheck,
  Info,
} from 'lucide-react';

interface FinalScoreProps {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
  onScoreSubmittedOnChain?: () => void;
}

export function FinalScore({
  score,
  totalQuestions,
  onPlayAgain,
  onScoreSubmittedOnChain,
}: FinalScoreProps) {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const { connectors, connect } = useConnect();

  const isWrongNetwork = isConnected && chainId !== botchainTestnet.id;
  const isContractConfigured = Boolean(
    ODDONE_CONTRACT_ADDRESS && ODDONE_CONTRACT_ADDRESS.startsWith('0x') && ODDONE_CONTRACT_ADDRESS.length === 42
  );

  const percentage = Math.round((score / totalQuestions) * 100);

  // Wagmi contract write hooks
  const {
    data: txHash,
    writeContract,
    isPending: isWritePending,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmError,
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const isSubmitting = isWritePending || isConfirming;

  const handleRecordScore = () => {
    if (!isContractConfigured) {
      return;
    }
    resetWrite();
    writeContract({
      address: ODDONE_CONTRACT_ADDRESS,
      abi: ODDONE_CONTRACT_ABI,
      functionName: 'submitScore',
      args: [BigInt(score), BigInt(totalQuestions)],
    });
  };

  const handleConnectWallet = () => {
    const injected = connectors.find((c) => c.id === 'injected') || connectors[0];
    if (injected) {
      connect({ connector: injected });
    }
  };

  const handleSwitchNetwork = () => {
    if (switchChain) {
      switchChain({ chainId: botchainTestnet.id });
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="rounded-2xl border border-white/10 bg-[#15151e] p-6 sm:p-8 shadow-2xl shadow-black/50 text-center">
        {/* Trophy icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 shadow-lg shadow-purple-900/40 mb-4">
          <Trophy className="h-8 w-8 text-white" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Challenge Completed!</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Here is how your instincts performed in this session.
        </p>

        {/* Score Statistics Cards */}
        <div className="my-6 grid grid-cols-3 gap-3 rounded-xl border border-white/5 bg-[#1a1a24] p-4 text-center">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Final Score</span>
            <div className="text-2xl sm:text-3xl font-black text-purple-400">
              {score}
              <span className="text-sm font-normal text-zinc-500">/{totalQuestions}</span>
            </div>
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Accuracy</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              {percentage}%
            </div>
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Questions</span>
            <div className="text-2xl sm:text-3xl font-black text-zinc-200">
              {totalQuestions}
            </div>
          </div>
        </div>

        {/* Rating text */}
        <p className="text-sm text-zinc-300 mb-6">
          {percentage >= 80
            ? '🔥 Outstanding! Your pattern recognition instincts are exceptional.'
            : percentage >= 50
            ? '⚡ Solid performance! You spotted the majority of oddities.'
            : '🌱 Good effort! Keep training your radar and try again.'}
        </p>

        {/* Web3 On-Chain Score Recording Section */}
        <div className="mb-6 rounded-xl border border-purple-500/20 bg-purple-950/20 p-5 text-left">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="h-4 w-4 text-purple-400" />
            <h3 className="text-sm font-bold text-white">Record Score on Botchain Testnet</h3>
          </div>
          <p className="text-xs text-zinc-400 mb-4">
            Optionally preserve your result on-chain. On-chain score records are public and verifiable on BohrScan.
          </p>

          {/* Condition 1: Smart Contract Not Configured */}
          {!isContractConfigured ? (
            <div className="rounded-lg border border-amber-500/20 bg-amber-950/30 p-3 text-xs text-amber-200 flex items-start gap-2.5">
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-300">Contract Not Configured</p>
                <p className="text-[11px] text-amber-200/80 mt-0.5">
                  The smart contract address has not been configured in <code className="font-mono bg-black/40 px-1 py-0.5 rounded">NEXT_PUBLIC_ODDONE_CONTRACT_ADDRESS</code>. Deploy the contract using the deployment script to record scores on-chain.
                </p>
              </div>
            </div>
          ) : !isConnected ? (
            /* Condition 2: Wallet Disconnected */
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-lg border border-white/5 bg-[#14141c] p-3 text-xs">
              <div className="flex items-center gap-2 text-zinc-300">
                <Wallet className="h-4 w-4 text-purple-400 shrink-0" />
                <span>Connect your wallet to record this score on-chain.</span>
              </div>
              <button
                onClick={handleConnectWallet}
                className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow hover:bg-purple-500 transition"
              >
                <span>Connect Wallet</span>
              </button>
            </div>
          ) : isWrongNetwork ? (
            /* Condition 3: Connected to Wrong Network */
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-lg border border-amber-500/30 bg-amber-950/30 p-3 text-xs">
              <div className="text-amber-200">
                Connected to wrong network. Switch to Botchain Testnet (Chain ID 968) to continue.
              </div>
              <button
                onClick={handleSwitchNetwork}
                disabled={isSwitching}
                className="flex items-center gap-1.5 rounded-lg bg-amber-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-amber-500 transition disabled:opacity-50"
              >
                {isSwitching && <Loader2 className="h-3 w-3 animate-spin" />}
                <span>Switch Network</span>
              </button>
            </div>
          ) : isConfirmed ? (
            /* Condition 4: Successfully Confirmed On-Chain */
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/40 p-4 text-xs text-emerald-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Score Confirmed On-Chain!</span>
              </div>
              <p className="text-[11px] text-zinc-300">
                Your score of <strong>{score}/{totalQuestions}</strong> was permanently recorded by wallet{' '}
                <span className="font-mono text-zinc-200">{address}</span>.
              </p>
              {txHash && (
                <div className="pt-2 border-t border-emerald-500/20">
                  <a
                    href={`https://scan.bohr.life/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-purple-400 hover:text-purple-300 hover:underline"
                  >
                    <span>View on BohrScan Explorer</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </div>
          ) : (
            /* Condition 5: Ready to Submit */
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-lg border border-white/5 bg-[#14141c] p-3 text-xs">
                <div>
                  <span className="text-zinc-400">Wallet: </span>
                  <span className="font-mono text-zinc-200">{address?.slice(0, 8)}...{address?.slice(-6)}</span>
                </div>
                <button
                  onClick={handleRecordScore}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-purple-950/50 hover:bg-purple-500 active:scale-[0.99] transition disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>{isWritePending ? 'Waiting for signature...' : 'Confirming on Botchain...'}</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="h-3.5 w-3.5" />
                      <span>Record Score On-Chain</span>
                    </>
                  )}
                </button>
              </div>

              {/* Status or error feedback */}
              {isConfirming && txHash && (
                <div className="flex items-center gap-2 text-xs text-purple-300 bg-purple-950/40 border border-purple-800/40 rounded-lg p-2.5">
                  <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0 text-purple-400" />
                  <span>Transaction broadcasted. Awaiting block confirmation on BohrScan...</span>
                </div>
              )}

              {(writeError || confirmError) && (
                <div className="rounded-lg border border-rose-500/30 bg-rose-950/30 p-3 text-xs text-rose-300 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
                  <div>
                    <span className="font-semibold">Transaction Failed: </span>
                    <span>{(writeError || confirmError)?.message.slice(0, 180)}...</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Play Again Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={onPlayAgain}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-800/90 px-6 py-3 text-sm font-semibold text-zinc-100 hover:border-purple-500/40 hover:bg-zinc-700/80 active:scale-[0.99] transition shadow-md"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Play Again</span>
          </button>
        </div>
      </div>
    </div>
  );
}

