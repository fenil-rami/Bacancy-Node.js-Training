/* eslint-disable no-console */
/* eslint-disable func-names */
function multiply(a, b) {
  return a * b;
}

// using closure
function curryMultiply(a) {
  return function (b) {
    return multiply(a, b);
  };
}

const multiplyBy2Closure = curryMultiply(2);

console.log(multiplyBy2Closure(4));

// using bind
const multiplyBy2Bind = multiply.bind(null, 2);

console.log(multiplyBy2Bind(10));
