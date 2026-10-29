'use client';

import React from 'react';
import { useReadContract } from 'wagmi';
import { ODDONE_CONTRACT_ADDRESS, ODDONE_CONTRACT_ABI } from '@/config/contract';
import { Medal, ExternalLink, RefreshCw, Clock, Trophy, AlertCircle } from 'lucide-react';

interface ScoreRecordItem {
  player: string;
  score: bigint;
  totalQuestions: bigint;
  timestamp: bigint;
}

export function Leaderboard() {
  const isContractConfigured = Boolean(
    ODDONE_CONTRACT_ADDRESS && ODDONE_CONTRACT_ADDRESS.startsWith('0x') && ODDONE_CONTRACT_ADDRESS.length === 42
  );

  const {
    data: recentScoresRaw,
    isLoading,
    refetch,
    isRefetching,
    error,
  } = useReadContract({
    address: ODDONE_CONTRACT_ADDRESS,
    abi: ODDONE_CONTRACT_ABI,
    functionName: 'getRecentScores',
    args: [BigInt(20)],
    query: {
      enabled: isContractConfigured,
      refetchInterval: 15000, // Poll every 15s for new scores
    },
  });

  const scores: ScoreRecordItem[] = (recentScoresRaw as ScoreRecordItem[]) || [];

  const shortenAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatTimestamp = (timestampBigInt: bigint) => {
    try {
      const ms = Number(timestampBigInt) * 1000;
      if (isNaN(ms) || ms <= 0) return 'Recent';
      const date = new Date(ms);
      return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Recent';
    }
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <div className="rounded-2xl border border-white/10 bg-[#15151e] p-6 sm:p-8 shadow-xl shadow-black/40">
        {/* Leaderboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-400">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>On-Chain Records</span>
                <span className="text-xs font-medium rounded-full bg-zinc-800 px-2 py-0.5 text-zinc-400 border border-white/5">
                  Botchain Testnet
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Recent game submissions retrieved directly from the OddOneScores smart contract.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            {isContractConfigured && (
              <button
                onClick={() => refetch()}
                disabled={isRefetching || isLoading}
                className="flex items-center gap-1.5 rounded-lg border border-white/5 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300 hover:border-zinc-700 hover:text-white transition disabled:opacity-50"
                title="Refresh Records"
              >
                <RefreshCw className={`h-3 w-3 ${isRefetching ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-6">
          {!isContractConfigured ? (
            /* Empty State 1: Contract not configured */
            <div className="rounded-xl border border-white/5 bg-[#121217] p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 border border-white/5 text-zinc-500 mb-3">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-200">Contract Not Configured</h3>
              <p className="mx-auto mt-1 max-w-md text-xs text-zinc-400">
                To view live scores from Botchain Testnet, set <code className="text-purple-300 font-mono">NEXT_PUBLIC_ODDONE_CONTRACT_ADDRESS</code> in your environment file.
              </p>
            </div>
          ) : isLoading ? (
            /* Loading State */
            <div className="py-12 text-center text-xs text-zinc-500 flex flex-col items-center gap-2">
              <RefreshCw className="h-5 w-5 animate-spin text-purple-400" />
              <span>Fetching verified score records from Botchain Testnet...</span>
            </div>
          ) : scores.length === 0 ? (
            /* Empty State 2: No scores submitted yet */
            <div className="rounded-xl border border-white/5 bg-[#121217] p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 border border-white/5 text-zinc-500 mb-3">
                <Medal className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-200">No On-Chain Scores Yet</h3>
              <p className="mx-auto mt-1 max-w-md text-xs text-zinc-400">
                Be the first player to complete a round and record your score on Botchain Testnet!
              </p>
            </div>
          ) : (
            /* Scores Table */
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/5 text-zinc-500 font-medium uppercase tracking-wider text-[10px]">
                    <th className="pb-3 pl-3">#</th>
                    <th className="pb-3">Player Wallet</th>
                    <th className="pb-3 text-center">Score</th>
                    <th className="pb-3 text-center">Accuracy</th>
                    <th className="pb-3 text-right pr-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                  {scores.map((record, index) => {
                    const scoreNum = Number(record.score);
                    const totalNum = Number(record.totalQuestions);
                    const pct = totalNum > 0 ? Math.round((scoreNum / totalNum) * 100) : 0;

                    return (
                      <tr key={`${record.player}-${index}`} className="hover:bg-white/[0.02] transition">
                        <td className="py-3 pl-3 font-mono text-zinc-500">
                          {index + 1}
                        </td>
                        <td className="py-3">
                          <a
                            href={`https://scan.bohr.life/address/${record.player}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-zinc-200 hover:text-purple-400 transition"
                          >
                            <span>{shortenAddress(record.player)}</span>
                            <ExternalLink className="h-3 w-3 text-zinc-500" />
                          </a>
                        </td>
                        <td className="py-3 text-center">
                          <span className="font-bold text-white">
                            {scoreNum}
                          </span>
                          <span className="text-zinc-500">/{totalNum}</span>
                        </td>
                        <td className="py-3 text-center">
                          <span
                            className={`rounded px-1.5 py-0.5 font-semibold text-[11px] ${
                              pct >= 80
                                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/30'
                                : pct >= 50
                                ? 'bg-purple-950/60 text-purple-300 border border-purple-800/30'
                                : 'bg-zinc-800 text-zinc-400'
                            }`}
                          >
                            {pct}%
                          </span>
                        </td>
                        <td className="py-3 text-right pr-3 font-mono text-zinc-400 text-[11px]">
                          <div className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3 text-zinc-500" />
                            <span>{formatTimestamp(record.timestamp)}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Disclaimer Footer Note */}
        <div className="mt-6 pt-4 border-t border-white/5 flex items-start gap-2 text-[11px] text-zinc-500">
          <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-zinc-400" />
          <p>
            Scores displayed here are self-reported by players upon completing game sessions and recorded directly into the <code className="font-mono text-zinc-400">OddOneScores</code> smart contract. Gameplay is not independently validated on-chain.
          </p>
        </div>
      </div>
    </section>
  );
}

