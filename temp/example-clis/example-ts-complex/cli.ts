#!/usr/bin/env node
import { program } from 'commander';
import inquirer from 'inquirer';
import { showWelcomeMessage, handleAnswer, showWinner } from './utils/quiz';
import { quizQuestions } from './utils/questions';

let playerName: string;

async function askName(): Promise<void> {
  const answers = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your name?',
    default() {
      return 'Player';
    },
  });

  playerName = answers.player_name;
}

async function askQuestion(questionIndex: number): Promise<void> {
  const question = quizQuestions[questionIndex];
  const answer = await inquirer.prompt({
    name: question.name,
    type: 'list',
    message: question.message,
    choices: question.choices,
  });

  await handleAnswer(answer[question.name] === question.correctAnswer, playerName);
}

async function startQuiz(): Promise<void> {
  console.clear();
  await showWelcomeMessage();
  await askName();

  // Ask all questions in sequence
  for (let i = 0; i < quizQuestions.length; i++) {
    await askQuestion(i);
  }

  await showWinner(playerName);
  process.exit(0);
}

program
  .version('1.0.0')
  .description('JavaScript Millionaire CLI Game')
  .action(startQuiz);

program.parse();
