declare namespace demo01 {
  export const sum = (...args: number[]) => number;
  export default sum;
}

export as namespace demo01;

export = demo01;
