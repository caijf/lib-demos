// test async function
export async function asyncFunction() {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
}

// test spreadArray
const arr = ['a', 'b', 'c'];
export const spreadArray = [...arr];
