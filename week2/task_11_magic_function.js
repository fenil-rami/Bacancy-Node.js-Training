/* eslint-disable no-console */
let sum = 0;

function magic(param) {
  if (param === undefined) return sum;
  sum += param;
  return magic;
}

console.log(magic(2)(3)(4)(5)());
