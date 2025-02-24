import chalk from 'chalk';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import { promisify } from 'util';

const figletPromise = promisify(figlet);

export const sleep = (ms = 2000): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms));

export async function showWelcomeMessage(): Promise<void> {
  const rainbowTitle = chalkAnimation.rainbow(
    'Who Wants To Be A JavaScript Millionaire? \n'
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue('HOW TO PLAY')} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right...
  `);
}

export async function handleAnswer(
  isCorrect: boolean, 
  playerName: string
): Promise<void> {
  const spinner = createSpinner('Checking answer...').start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
  } else {
    spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
    process.exit(1);
  }
}

export async function showWinner(playerName: string): Promise<void> {
  console.clear();
  const data = await figletPromise(`Congrats , ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`);
  console.log(gradient.pastel.multiline(data) + '\n');

  console.log(
    chalk.green(
      `Programming isn't about what you know; it's about making the command line look cool`
    )
  );
} 