// https://jestjs.io/zh-Hans/docs/asynchronous

function fetchData(cb?: (res: string) => void) {
  const responseData = "peanut butter";

  if (typeof cb === "function") {
    setTimeout(() => {
      cb(responseData);
    }, 1000);
  } else {
    return new Promise<string | Error>((resolve, reject) => {
      setTimeout(() => {
        resolve(responseData);
        // reject('error');
      }, 1000);
    });
  }
}

// 回调
test('the data is peanut butter', done => {
  function callback(data: string) {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});

// Promises
test('the data is peanut butter', () => {
  return fetchData()?.then(data => {
    expect(data).toBe('peanut butter');
  });
});

// test('the fetch fails with an error', () => {
//   expect.assertions(1);
//   return fetchData()?.catch(e => expect(e).toMatch('error'));
// });

// .resolves / .rejects
test('the data is peanut butter', () => {
  return expect(fetchData()).resolves.toBe('peanut butter');
});

// test('the fetch fails with an error', () => {
//   return expect(fetchData()).rejects.toMatch('error');
// });

// Async/Await
test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

// test('the fetch fails with an error', async () => {
//   expect.assertions(1);
//   try {
//     await fetchData();
//   } catch (e) {
//     expect(e).toMatch('error');
//   }
// });


