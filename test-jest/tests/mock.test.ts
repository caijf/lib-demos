function forEach(items: any[], callback: Function) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

const mockCallback = jest.fn(x => 42 + x);
forEach([0, 1], mockCallback);

console.log(mockCallback.mock);

test("calls length", () => {
  // 此 mock 函数被调用了两次
  expect(mockCallback.mock.calls.length).toBe(2);
});

test("first call arguments be 0", () => {
  // 第一次调用函数时的第一个参数是 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);
});

test("second call arguments be 1", () => {
  // 第二次调用函数时的第一个参数是 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);
});

test("first call result be 42", () => {
  // 第一次函数调用的返回值是 42
  expect(mockCallback.mock.results[0].value).toBe(42);
});

test("mock function was match specified arg", () => {
  expect(mockCallback).toHaveBeenCalledWith(1);
});

// test("mock function snapshot", () => {
//   expect(mockCallback).toMatchSnapshot();
// });