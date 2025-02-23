import test from 'ava';
import { orderPizza } from './index';

test.before(async t => {
  console.log('Starting tests!');
});

test('can order a veggie pizza', async t => {
  let result = await orderPizza(true, 'veggie');
  t.true(result.includes('veggie'));
});