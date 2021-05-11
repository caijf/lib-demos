export function sum(...args) {
  return Array.from(args).reduce((prev, curr) => prev + curr, 0);
}

export function divide(...args) {
  return Array.from(args).reduce((prev, curr) => prev / curr, 1);
}