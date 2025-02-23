export interface QuizQuestion {
  name: string;
  message: string;
  choices: string[];
  correctAnswer: string;
}

export interface SpinnerOptions {
  text: string;
} 