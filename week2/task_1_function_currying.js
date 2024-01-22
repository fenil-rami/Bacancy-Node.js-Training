/* eslint-disable no-console */
/* eslint-disable func-names */
function multiply(a, b) {
  return a * b;
}

function curryMultiply(a) {
  return function (b) {
    return multiply(a, b);
  };
}

const multiplyBy2 = curryMultiply(2);

console.log(multiplyBy2(4));
