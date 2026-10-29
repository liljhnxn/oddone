'use client';

import React from 'react';
import { Question } from '@/types/game';
import { CheckCircle2, XCircle, ArrowRight, Award, Info } from 'lucide-react';

interface AnswerFeedbackProps {
  question: Question;
  userAnswer: string;
  isCorrect: boolean;
  currentScore: number;
  totalAnswered: number;
  totalQuestions: number;
  onNext: () => void;
}

export function AnswerFeedback({
  question,
  userAnswer,
  isCorrect,
  currentScore,
  totalAnswered,
  totalQuestions,
  onNext,
}: AnswerFeedbackProps) {
  const isLastQuestion = totalAnswered >= totalQuestions;

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <div className="rounded-2xl border border-white/10 bg-[#15151e] p-6 sm:p-8 shadow-xl shadow-black/40">
        {/* Outcome Header Banner */}
        <div
          className={`flex items-start gap-4 rounded-xl p-4 mb-6 border ${
            isCorrect
              ? 'border-emerald-500/30 bg-emerald-950/30 text-emerald-200'
              : 'border-rose-500/30 bg-rose-950/30 text-rose-200'
          }`}
        >
          <div className="shrink-0 mt-0.5">
            {isCorrect ? (
              <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            ) : (
              <XCircle className="h-6 w-6 text-rose-400" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold">
              {isCorrect ? 'Correct! Instinct confirmed.' : 'Not quite right!'}
            </h3>
            <p className="mt-0.5 text-xs text-zinc-300">
              {isCorrect
                ? '+1 point added to your score.'
                : '+0 points for this question.'}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <span className="text-xs uppercase font-semibold tracking-wider text-zinc-400">Score</span>
            <div className="text-xl font-black text-white">{currentScore}</div>
          </div>
        </div>

        {/* Revealed Answer Comparison */}
        <div className="mb-6 space-y-3">
          <div className="rounded-xl border border-white/5 bg-[#1a1a24] p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-medium text-zinc-400">Odd One Out (Correct Answer):</span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/40 px-3 py-1 text-sm font-bold text-emerald-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                {question.correctAnswer}
              </span>
            </div>

            {!isCorrect && (
              <div className="mt-2.5 pt-2.5 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-medium text-zinc-400">Your Selection:</span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-950/40 px-3 py-1 text-sm font-semibold text-rose-300">
                  <XCircle className="h-4 w-4 text-rose-400" />
                  {userAnswer}
                </span>
              </div>
            )}
          </div>

          {/* Explanation Box */}
          <div className="rounded-xl border border-purple-500/20 bg-purple-950/20 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1.5">
              <Info className="h-3.5 w-3.5 text-purple-400" />
              <span>Explanation</span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {question.explanation}
            </p>
          </div>
        </div>

        {/* Next Question / Finish Button */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-xs text-zinc-400">
            Completed {totalAnswered} of {totalQuestions}
          </span>
          <button
            onClick={onNext}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-purple-950/40 hover:bg-purple-500 active:scale-[0.99] transition"
          >
            <span>{isLastQuestion ? 'View Final Results' : 'Next Question'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

