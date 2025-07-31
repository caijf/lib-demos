// https://jestjs.io/zh-Hans/docs/timer-mocks

function timerGame(callback?: () => void) {
  console.log('Ready....go!');
  setTimeout(() => {
    console.log("Time's up -- stop!");
    callback?.();
  }, 1000);
}

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

describe('Basic', () => {
  test('waits 1 second before ending the game', () => {
    timerGame();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });
});

describe('Run All Timers', () => {
  test('calls the callback after 1 second', () => {
    const callback = jest.fn();

    timerGame(callback);

    // 在这个时间点，定时器的回调不应该被执行
    expect(callback).not.toBeCalled();

    // “快进”时间使得所有定时器回调被执行
    jest.runAllTimers();

    // 现在回调函数应该被调用了！
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('Advance Timers by Time', () => {
  it('calls the callback after 1 second via advanceTimersByTime', () => {
    const callback = jest.fn();

    timerGame(callback);

    // 在这个时间点，回调函数不应该被执行
    expect(callback).not.toBeCalled();

    // “快进”时间，使得所有定时器回调都被执行
    jest.advanceTimersByTime(1000);

    // 到这里，所有的定时器回调都应该被执行了！ expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
