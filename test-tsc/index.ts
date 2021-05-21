// const a = [...[1, 2, 3]]

// console.log(a, 2);

// export {
//   a
// }

// 仅为了触发引入 tslib
// const arr = [..."test"];
// export { arr }


let count = 1;

const timer = setInterval(async () => {
  if (count >= 3) {
    const module = await import("./test");
    console.log(module);
    clearInterval(timer);
  } else {
    count++;
  }
}, 1000);

export { }