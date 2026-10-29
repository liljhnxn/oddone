export type QuestionCategory =
  | 'Anime'
  | 'Gaming'
  | 'Animals'
  | 'Food'
  | 'Technology'
  | 'General Knowledge';

export interface Question {
  id: number;
  category: QuestionCategory;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export type GameState = 'idle' | 'playing' | 'answered' | 'completed';

export interface ScoreRecord {
  player: string;
  score: number;
  totalQuestions: number;
  timestamp: number;
  txHash?: string;
}

