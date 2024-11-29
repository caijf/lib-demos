type ResolvedReturnType<T extends (...args: any[]) => any> =
  ReturnType<T> extends Promise<infer R> ? R : ReturnType<T>;

const asyncFn = (a: number, b: number) => {
  const sum = a + b;
  return sum > 0 ? sum : '';
};

// type R1 = number | ""
type R1 = ResolvedReturnType<typeof asyncFn>;
