// @ts-check

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

// test async function
export async function asyncFunction() {
  await new Promise(resolve => {
    setTimeout(resolve, 2000);
  })
}

// test spreadArray
const arr = ["a", "b", "c"];
export const spreadArray = [...arr];