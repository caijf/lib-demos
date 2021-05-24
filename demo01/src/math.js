/**
 * sum
 * 
 * @param  {...number} args 相加的数值
 * @returns 总和
 */
export function sum(...args) {
  return Array.from(args).reduce((prev, curr) => prev + curr, 0);
}

/**
 * divide
 * 
 * @param  {...number} args 相除的数值
 * @returns 值
 */
export function divide(...args) {
  return Array.from(args).reduce((prev, curr) => prev / curr);
}