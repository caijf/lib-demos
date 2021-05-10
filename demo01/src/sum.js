function sum(...args) {
  return Array.from(args).reduce((prev, curr) => prev + curr, 0);
}

export default sum;