import { sum, divide } from '../src/index';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('divide 4 / 2 to equal 2', () => {
  expect(divide(4, 2)).toBe(2);
});
