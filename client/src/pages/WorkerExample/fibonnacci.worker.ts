/* eslint-disable import/no-unused-modules */

onmessage = (event) => {
  const n = event.data;
  const result = fibonacci(n);
  postMessage(result);
};

function fibonacci(n: number): number {
  let prevPrev = 0;
  let prev = 1;
  let res = 0;

  if (n === 0) {
    return 0;
  }

  if (n === 1) {
    return 1;
  }

  for (let i = 1; i < n; i += 1) {
    res = prev + prevPrev;
    prevPrev = prev;
    prev = res;
  }

  return res;
}

