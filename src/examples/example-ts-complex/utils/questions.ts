import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    name: 'question_1',
    message: 'JavaScript was created in 10 days then released on\n',
    choices: [
      'May 23rd, 1995',
      'Nov 24th, 1995',
      'Dec 4th, 1995',
      'Dec 17, 1996',
    ],
    correctAnswer: 'Dec 4th, 1995'
  },
  {
    name: 'question_2',
    message: 'What is x? var x = 1_1 + "1" + Number(1)\n',
    choices: ['4', '"4"', '"1111"', '69420'],
    correctAnswer: '"1111"'
  },
  {
    name: 'question_3',
    message: `What is the first element in the array? ['🐏', '🦙', '🐍'].length = 0\n`,
    choices: ['0', '🐏', '🐍', 'undefined'],
    correctAnswer: 'undefined'
  },
  {
    name: 'question_4',
    message: 'Which of the following is NOT a primitive type?\n',
    choices: [
      'boolean',
      'number',
      'null',
      'object',
    ],
    correctAnswer: 'object'
  },
  {
    name: 'question_5',
    message: 'JS is a high-level single-threaded, garbage-collected,\n' +
      'interpreted(or just-in-time compiled), prototype-based,\n' +
      'multi-paradigm, dynamic language with a ____ event loop\n',
    choices: ['multi-threaded', 'non-blocking', 'synchronous', 'promise-based'],
    correctAnswer: 'non-blocking'
  }
]; 