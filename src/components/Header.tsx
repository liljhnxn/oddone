'use client';

import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useSwitchChain, useChainId } from 'wagmi';
import { botchainTestnet } from '@/config/chain';
import { ShieldAlert, Wallet, ExternalLink, RefreshCw, CheckCircle2 } from 'lucide-react';

export function Header() {
  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending: isConnecting, error: connectError } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const [showNetworkInfo, setShowNetworkInfo] = useState(false);

  const isWrongNetwork = isConnected && chainId !== botchainTestnet.id;

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleConnect = () => {
    const injectedConnector = connectors.find((c) => c.id === 'injected') || connectors[0];
    if (injectedConnector) {
      connect({ connector: injectedConnector });
    }
  };

  const handleSwitchNetwork = () => {
    if (switchChain) {
      switchChain({ chainId: botchainTestnet.id });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0f0f13]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 font-black text-white shadow-lg shadow-purple-900/30">
            <span className="text-xl">O</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white">OddOne</span>
              <span className="rounded bg-purple-950/80 px-1.5 py-0.5 text-[10px] font-medium text-purple-300 border border-purple-800/40">
                Web3
              </span>
            </div>
            <p className="text-xs text-zinc-400 hidden sm:block">Spot the odd one out</p>
          </div>
        </div>

        {/* Network & Wallet Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Botchain Network Indicator */}
          <button
            onClick={() => setShowNetworkInfo(!showNetworkInfo)}
            className="flex items-center gap-2 rounded-lg border border-white/5 bg-zinc-900/80 px-2.5 py-1.5 text-xs text-zinc-300 hover:border-zinc-700 transition"
            title="Botchain Testnet Info"
          >
            <span className={`h-2 w-2 rounded-full ${isConnected && isWrongNetwork ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
            <span className="hidden md:inline font-medium">Botchain Testnet</span>
            <span className="text-zinc-500 text-[11px] font-mono">968</span>
          </button>

          {/* Network Switcher Button if connected to wrong chain */}
          {isWrongNetwork && (
            <button
              onClick={handleSwitchNetwork}
              disabled={isSwitching}
              className="flex items-center gap-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 transition disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isSwitching ? 'animate-spin' : ''}`} />
              <span>Switch to Botchain</span>
            </button>
          )}

          {/* Wallet Action */}
          {!isConnected ? (
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="flex items-center gap-2 rounded-lg bg-purple-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-purple-900/20 hover:bg-purple-500 transition disabled:opacity-50"
            >
              <Wallet className="h-3.5 w-3.5" />
              <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <a
                href={`https://scan.bohr.life/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-zinc-800/80 px-2.5 py-1.5 text-xs font-mono text-zinc-200 hover:border-purple-500/40 transition"
              >
                <span>{shortenAddress(address!)}</span>
                <ExternalLink className="h-3 w-3 text-zinc-400" />
              </a>
              <button
                onClick={() => disconnect()}
                className="rounded-lg border border-white/5 bg-zinc-900/80 px-2.5 py-1.5 text-xs font-medium text-zinc-400 hover:text-rose-300 hover:border-rose-900/50 transition"
                title="Disconnect Wallet"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Network Modal / Dropdown info */}
      {showNetworkInfo && (
        <div className="border-t border-white/5 bg-[#14141b] px-4 py-3 text-xs text-zinc-400">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-zinc-500">Chain:</span>{' '}
                <span className="font-semibold text-zinc-200">Botchain Testnet (968)</span>
              </div>
              <div>
                <span className="text-zinc-500">Currency:</span>{' '}
                <span className="font-semibold text-zinc-200">BOT (18 decimals)</span>
              </div>
              <div>
                <span className="text-zinc-500">RPC:</span>{' '}
                <span className="font-mono text-zinc-300">https://rpc.bohr.life</span>
              </div>
            </div>
            <a
              href="https://scan.bohr.life"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-purple-400 hover:underline"
            >
              <span>BohrScan Explorer</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      )}

      {/* Connect Error Toast */}
      {connectError && (
        <div className="bg-rose-950/60 border-b border-rose-900/50 px-4 py-2 text-xs text-rose-300 text-center">
          Failed to connect wallet: {connectError.message}
        </div>
      )}
    </header>
  );
}

