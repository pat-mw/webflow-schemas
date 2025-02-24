import test from 'ava';
import { showWelcomeMessage, handleAnswer, showWinner } from './utils/quiz';
import { quizQuestions } from './utils/questions';

// Mock console.log and process.exit to prevent actual output/exit during tests
test.before(() => {
  global.console.log = () => {};
  global.process.exit = (code?: number | undefined): never => {
    throw new Error('process.exit called with code: ' + code);
  };
});

test('quiz questions are properly structured', t => {
  t.is(quizQuestions.length, 5, 'Should have 5 questions');
  
  quizQuestions.forEach((question, index) => {
    t.true(question.name.includes('question_'), `Question ${index + 1} should have proper name`);
    t.true(question.choices.length === 4, `Question ${index + 1} should have 4 choices`);
    t.true(question.choices.includes(question.correctAnswer), 
      `Question ${index + 1} should have correct answer in choices`);
  });
});

test('handleAnswer processes correct answer properly', async t => {
  await t.notThrowsAsync(
    handleAnswer(true, 'TestPlayer'),
    'Should not throw error for correct answer'
  );
});

test('handleAnswer handles incorrect answer', async t => {
  const error = await t.throwsAsync(
    handleAnswer(false, 'TestPlayer'),
    { instanceOf: Error }
  );
  t.true(error !== undefined, 'Should exit on wrong answer');
});

test('specific question content is correct', t => {
  const firstQuestion = quizQuestions[0];
  t.is(firstQuestion.correctAnswer, 'Dec 4th, 1995', 
    'First question should have correct answer');
  t.true(firstQuestion.choices.includes('May 23rd, 1995'), 
    'First question should have expected choice');
});

test('welcome message can be displayed', async t => {
  await t.notThrowsAsync(
    showWelcomeMessage(),
    'Welcome message should display without errors'
  );
});

test('winner message can be displayed', async t => {
  await t.notThrowsAsync(
    showWinner('TestPlayer'),
    'Winner message should display without errors'
  );
}); 