export function sum(...args: number[]) {
  return Array.from(args).reduce((prev, curr) => prev + curr, 0);
}

export function divide(...args: number[]) {
  return Array.from(args).reduce((prev, curr) => prev / curr, 1);
}
