'use client';

import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/5 bg-[#0b0b0e] py-8 text-xs text-zinc-500">
      <div className="mx-auto max-w-5xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Branding & Tagline */}
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-zinc-300 font-bold">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-purple-600 text-[10px] text-white">
              O
            </span>
            <span>OddOne</span>
          </div>
          <p className="mt-1 text-[11px] text-zinc-500">
            Spot the odd one out. Prove your instincts.
          </p>
        </div>

        {/* Network & Explorer Link */}
        <div className="flex items-center gap-4 text-center sm:text-right">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Botchain Testnet (Chain ID 968)</span>
          </div>
          <a
            href="https://scan.bohr.life"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 transition"
          >
            <span>BohrScan</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Required Disclaimer */}
      <div className="mx-auto max-w-5xl px-4 mt-6 pt-4 border-t border-white/5 text-center text-[11px] text-zinc-500">
        <p>
          Disclaimer: OddOne score records are submitted directly by players on-chain and are self-reported. Scores are not cheat-proof. No monetary rewards, tokens, or prizes are distributed.
        </p>
      </div>
    </footer>
  );
}

