import { expect, test } from 'vitest';
import { sum } from './1-sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
