'use client';

import React, { useState } from 'react';
import { Play, Sparkles, Brain, ShieldCheck, ExternalLink, Copy, Check } from 'lucide-react';
import { ODDONE_CONTRACT_ADDRESS } from '@/config/contract';

interface HeroProps {
  onStartGame: () => void;
  totalQuestions: number;
}

export function Hero({ onStartGame, totalQuestions }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const contractAddress = ODDONE_CONTRACT_ADDRESS;

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden py-10 md:py-14 text-center">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-64 w-96 rounded-full bg-purple-900/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl px-4">
        {/* BOT CHAIN ECOSYSTEM FRONT BAR */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 rounded-2xl border border-white/10 bg-[#15151e]/90 p-2.5 sm:p-3 shadow-lg shadow-black/40 backdrop-blur-md">
          <div className="flex items-center gap-2 border-r border-white/10 pr-3">
            <img
              src="/botchain-logo.png"
              alt="BOT Chain Logo"
              className="h-6 w-6 rounded-md object-contain border border-white/15 bg-black"
            />
            <div className="text-left">
              <span className="text-xs font-bold text-white block leading-none">BOT Chain</span>
              <span className="text-[10px] text-emerald-400 font-mono font-medium">Mainnet 677</span>
            </div>
          </div>

          <a
            href="https://botchain.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/5 bg-zinc-900/90 px-3 py-1.5 text-xs font-semibold text-zinc-200 hover:border-purple-500/50 hover:text-white transition group"
          >
            <img src="/botchain-logo.png" alt="BOT Chain" className="h-3.5 w-3.5 rounded-sm object-contain" />
            <span>BOT Chain Website</span>
            <ExternalLink className="h-3 w-3 text-zinc-500 group-hover:text-purple-400 transition" />
          </a>

          <a
            href="https://scan.botchain.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/5 bg-zinc-900/90 px-3 py-1.5 text-xs font-semibold text-zinc-200 hover:border-purple-500/50 hover:text-white transition group"
          >
            <img src="/botchain-logo.png" alt="BOT Chain" className="h-3.5 w-3.5 rounded-sm object-contain" />
            <span>BOT Chain Explorer</span>
            <ExternalLink className="h-3 w-3 text-zinc-500 group-hover:text-purple-400 transition" />
          </a>
        </div>

        {/* VERIFIED MAINNET CONTRACT BADGE ON THE FRONT */}
        <div className="mb-8 inline-flex flex-wrap items-center justify-center gap-2 rounded-xl border border-purple-500/30 bg-purple-950/30 px-3.5 py-1.5 text-xs text-purple-200 shadow-sm">
          <span className="font-semibold text-purple-300">Verified Mainnet Contract:</span>
          <a
            href={`https://scan.botchain.ai/address/${contractAddress}#code`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-purple-300 underline hover:text-white inline-flex items-center gap-1"
            title="View verified contract on BOT Chain Explorer"
          >
            <span>{contractAddress}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
          <button
            onClick={handleCopy}
            className="ml-1 rounded bg-purple-900/60 p-1 text-purple-300 hover:bg-purple-800 hover:text-white transition"
            title="Copy contract address"
          >
            {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
          </button>
        </div>

        {/* Hero Heading */}
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          Can You Spot the <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Odd One?</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-zinc-400">
          Four options. One doesn&apos;t belong. Trust your instincts.
        </p>

        {/* Action Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartGame}
            className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-950/50 hover:bg-purple-500 active:scale-[0.99] transition"
          >
            <Play className="h-5 w-5 fill-white" />
            <span>Play Now</span>
          </button>
        </div>

        {/* Highlights feature list */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <div className="rounded-xl border border-white/5 bg-[#14141b] p-3.5">
            <div className="flex items-center gap-2 text-purple-400 font-medium text-sm mb-1">
              <Brain className="h-4 w-4" />
              <span>{totalQuestions} Questions</span>
            </div>
            <p className="text-xs text-zinc-400">Curated across Anime, Tech, Gaming, Food & Science.</p>
          </div>

          <div className="rounded-xl border border-white/5 bg-[#14141b] p-3.5">
            <div className="flex items-center gap-2 text-purple-400 font-medium text-sm mb-1">
              <Sparkles className="h-4 w-4" />
              <span>Instant Local Play</span>
            </div>
            <p className="text-xs text-zinc-400">Play instantly without needing a wallet or gas fees.</p>
          </div>

          <div className="rounded-xl border border-white/5 bg-[#14141b] p-3.5">
            <div className="flex items-center gap-2 text-purple-400 font-medium text-sm mb-1">
              <ShieldCheck className="h-4 w-4" />
              <span>On-Chain Record</span>
            </div>
            <p className="text-xs text-zinc-400">Submit your final score to the verified BOT Chain contract.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
