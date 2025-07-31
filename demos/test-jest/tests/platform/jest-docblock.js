import { parseWithComments } from 'jest-docblock';

const code = `
/**
 * This is a sample
 * 
 * @flow
 */

console.log('Hello World!');
`;

const parsed = parseWithComments(code);

console.log(parsed);
