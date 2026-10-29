'use client';

import React from 'react';
import { Play, Sparkles, Brain, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onStartGame: () => void;
  totalQuestions: number;
}

export function Hero({ onStartGame, totalQuestions }: HeroProps) {
  return (
    <section className="relative overflow-hidden py-12 md:py-16 text-center">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-64 w-96 rounded-full bg-purple-900/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-2xl px-4">
        {/* Category Badge Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-950/40 px-3.5 py-1 text-xs font-medium text-purple-300 mb-6">
          <Sparkles className="h-3.5 w-3.5 text-purple-400" />
          <span>Interactive Web3 Challenge</span>
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
            <p className="text-xs text-zinc-400">Submit your final score to the Botchain smart contract.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

