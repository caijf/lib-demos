/* eslint-disable */
// ref: https://blog.csdn.net/KlausLily/article/details/108878205
// ref: https://www.e-learn.cn/topic/3752913
// ref: https://blog.csdn.net/KlausLily/article/details/108878205

// https://juejin.cn/post/6850418120616738823

function greetingA<T extends any[]>(
  x: T extends (infer R)[] ? R[] : T
): T extends (infer R)[] ? R : T {
  const [c] = x;
  return c;

  // return x
}

function greetingB() {
  return greetingA([1]);
}
