import diff from 'jest-diff';

const a = { a: { b: { c: 5 } } };
const b = { a: { b: { c: 6 } } };

const result = diff(a, b);

console.log(result);