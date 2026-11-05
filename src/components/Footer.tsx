'use client';

import React from 'react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { ODDONE_CONTRACT_ADDRESS } from '@/config/contract';

export function Footer() {
  const contractAddress = ODDONE_CONTRACT_ADDRESS;

  return (
    <footer className="mt-16 border-t border-white/5 bg-[#0b0b0e] py-10 text-xs text-zinc-400">
      <div className="mx-auto max-w-5xl px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Branding & Tagline */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2.5 text-zinc-200 font-bold text-base">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 text-xs font-black text-white shadow-sm shadow-purple-900/40">
              O
            </span>
            <span>OddOne</span>
          </div>
          <p className="mt-1 text-xs text-zinc-400">
            Spot the odd one out. Prove your instincts.
          </p>
        </div>

        {/* BOT Chain Ecosystem Links & Logo Section */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          {/* BOT Chain Identifier Badge */}
          <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-zinc-900/90 px-3.5 py-2">
            <img
              src="/botchain-logo.png"
              alt="BOT Chain Logo"
              className="h-6 w-6 rounded-md object-contain bg-black border border-white/10"
            />
            <div className="text-left">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>BOT Chain</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </div>
              <div className="text-[10px] text-zinc-400">Chain ID: 677</div>
            </div>
          </div>

          {/* Official Required Links with Logo at the front */}
          <div className="flex items-center gap-3">
            <a
              href="https://botchain.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/5 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-purple-500/40 hover:text-white transition group"
              title="BOT Chain Official Website"
            >
              <img
                src="/botchain-logo.png"
                alt="BOT Chain"
                className="h-4 w-4 rounded-sm object-contain"
              />
              <span>BOT Chain Website</span>
              <ExternalLink className="h-3 w-3 text-zinc-400 group-hover:text-purple-400 transition" />
            </a>

            <a
              href="https://scan.botchain.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/5 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-purple-500/40 hover:text-white transition group"
              title="BOT Chain Block Explorer"
            >
              <img
                src="/botchain-logo.png"
                alt="BOT Chain"
                className="h-4 w-4 rounded-sm object-contain"
              />
              <span>BOT Chain Explorer</span>
              <ExternalLink className="h-3 w-3 text-zinc-400 group-hover:text-purple-400 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Mainnet Verified Contract Address Banner */}
      <div className="mx-auto max-w-5xl px-4 mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-400 text-xs">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
          <span>Mainnet Contract:</span>
          <a
            href={`https://scan.botchain.ai/address/${contractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-purple-400 hover:text-purple-300 hover:underline flex items-center gap-1"
          >
            <span>{contractAddress}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <span className="text-[11px] text-zinc-400 font-medium">Native Token: BOT (Chain ID 677)</span>
      </div>

      {/* Required Disclaimer */}
      <div className="mx-auto max-w-5xl px-4 mt-4 pt-3 border-t border-white/5 text-center text-[11px] text-zinc-400">
        <p>
          Disclaimer: OddOne score records are submitted directly by players on-chain to the verified OddOneScores smart contract. Scores are self-reported and verifiable on BOT Chain Explorer. No monetary rewards, tokens, or prizes are distributed.
        </p>
      </div>
    </footer>
  );
}
