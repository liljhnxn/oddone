'use client';

import React from 'react';
import { Question } from '@/types/game';
import { Tag, HelpCircle, CheckCircle, ArrowRight } from 'lucide-react';

interface GameCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  onSubmitAnswer: () => void;
  currentScore: number;
}

export function GameCard({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onSubmitAnswer,
  currentScore,
}: GameCardProps) {
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      {/* Question Header & Progress */}
      <div className="rounded-2xl border border-white/10 bg-[#15151e] p-6 shadow-xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/20 bg-purple-950/40 px-3 py-1 text-xs font-semibold text-purple-300">
              <Tag className="h-3 w-3" />
              {question.category}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-zinc-400">
            <span>
              Question <strong className="text-zinc-200">{currentIndex + 1}</strong> of {totalQuestions}
            </span>
            <span className="rounded-md border border-white/5 bg-zinc-900/80 px-2 py-0.5 text-zinc-300">
              Score: <strong className="text-purple-400">{currentScore}</strong>
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-900 mb-6">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question Prompt */}
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
            Find the odd one out
          </span>
          <h2 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
            {question.prompt}
          </h2>
        </div>

        {/* 4 Answer Option Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
          {question.options.map((option, idx) => {
            const isSelected = selectedAnswer === option;
            const letter = optionLetters[idx] || String.fromCharCode(65 + idx);

            return (
              <button
                key={option}
                onClick={() => onSelectAnswer(option)}
                className={`relative flex items-center gap-3.5 rounded-xl border p-4 text-left transition-all duration-150 ${
                  isSelected
                    ? 'border-purple-500 bg-purple-950/30 text-white shadow-md shadow-purple-950/40 ring-1 ring-purple-500'
                    : 'border-white/5 bg-[#1a1a24] text-zinc-300 hover:border-zinc-700 hover:bg-[#20202c]'
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold font-mono transition-colors ${
                    isSelected
                      ? 'bg-purple-600 text-white'
                      : 'border border-white/10 bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {letter}
                </div>
                <span className="text-sm font-medium leading-tight">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Submit Answer Button */}
        <div className="flex justify-end pt-2 border-t border-white/5">
          <button
            onClick={onSubmitAnswer}
            disabled={!selectedAnswer}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-purple-950/40 hover:bg-purple-500 active:scale-[0.99] transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>Submit Answer</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

