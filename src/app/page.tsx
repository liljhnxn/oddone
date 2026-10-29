'use client';

import React, { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { GameCard } from '@/components/GameCard';
import { AnswerFeedback } from '@/components/AnswerFeedback';
import { FinalScore } from '@/components/FinalScore';
import { Leaderboard } from '@/components/Leaderboard';
import { Footer } from '@/components/Footer';
import { QUESTIONS } from '@/data/questions';
import { Question } from '@/types/game';

type SessionStage = 'idle' | 'playing' | 'feedback' | 'completed';

// Number of questions per play session (e.g. 10 questions for a brisk game)
const SESSION_QUESTION_COUNT = 10;

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Home() {
  const [stage, setStage] = useState<SessionStage>('idle');
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>(() =>
    QUESTIONS.slice(0, SESSION_QUESTION_COUNT)
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submittedAnswer, setSubmittedAnswer] = useState<string>('');
  const [isCurrentCorrect, setIsCurrentCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const currentQuestion = sessionQuestions[currentIndex] || sessionQuestions[0];

  // Start fresh game session
  const handleStartGame = () => {
    const shuffled = shuffleArray(QUESTIONS).slice(0, SESSION_QUESTION_COUNT);
    setSessionQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setSubmittedAnswer('');
    setIsCurrentCorrect(false);
    setScore(0);
    setStage('playing');
  };

  // Select an option
  const handleSelectAnswer = (answer: string) => {
    if (stage === 'playing') {
      setSelectedAnswer(answer);
    }
  };

  // Submit answer
  const handleSubmitAnswer = () => {
    if (!selectedAnswer || stage !== 'playing') return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setIsCurrentCorrect(isCorrect);
    setSubmittedAnswer(selectedAnswer);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setStage('feedback');
  };

  // Proceed to next question or final score
  const handleNextQuestion = () => {
    if (currentIndex + 1 < sessionQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setSubmittedAnswer('');
      setStage('playing');
    } else {
      setStage('completed');
    }
  };

  // Play again
  const handlePlayAgain = () => {
    handleStartGame();
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0f0f13] text-zinc-200">
      <Header />

      <main className="flex-1">
        {/* Stage 1: Hero / Idle */}
        {stage === 'idle' && (
          <Hero
            onStartGame={handleStartGame}
            totalQuestions={QUESTIONS.length}
          />
        )}

        {/* Stage 2: Question Active */}
        {stage === 'playing' && (
          <GameCard
            question={currentQuestion}
            currentIndex={currentIndex}
            totalQuestions={sessionQuestions.length}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleSelectAnswer}
            onSubmitAnswer={handleSubmitAnswer}
            currentScore={score}
          />
        )}

        {/* Stage 3: Answer Feedback */}
        {stage === 'feedback' && (
          <AnswerFeedback
            question={currentQuestion}
            userAnswer={submittedAnswer}
            isCorrect={isCurrentCorrect}
            currentScore={score}
            totalAnswered={currentIndex + 1}
            totalQuestions={sessionQuestions.length}
            onNext={handleNextQuestion}
          />
        )}

        {/* Stage 4: Completed / Final Score */}
        {stage === 'completed' && (
          <FinalScore
            score={score}
            totalQuestions={sessionQuestions.length}
            onPlayAgain={handlePlayAgain}
          />
        )}

        {/* Leaderboard Section (Always accessible on page) */}
        <Leaderboard />
      </main>

      <Footer />
    </div>
  );
}

