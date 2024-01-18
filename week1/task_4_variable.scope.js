/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable block-scoped-var */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-redeclare */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-console */

//   ===> VAR <===

// value of a var variable can be changed
var v1 = 100;
console.log(v1); // 100
v1 = 1000;
console.log(v1); // 1000

// a var variable can be re-declared
var v2 = 1000;
console.log(v2); // 1000
var v2 = 'nodejs';
console.log(v2); // 'nodejs'

// var is global scope variable
var v3 = 1000;
console.log(v3); // 1000
{
  var v3 = 'nodejs';
  console.log(v3); // 'nodejs'
}
console.log(v3); // 'nodejs'

//   ===> LET <===

// value of a let variable can be changed
let l1 = 1000;
console.log(l1); // 1000
l1 = 'nodejs';
console.log(l1); // 'nodejs'

// a let variable can not be re-declared
let l2 = 'javascript';
console.log(l2); // 'javascript'
// let l2 = 'nodejs'; // This will give an error

// let is a block scope variable
let l3 = 1000;
console.log(l3); // 1000
{
  let l3 = 'nodejs';
  console.log(l3); // 'nodejs'
}
console.log(l3); // 1000

//   ===> CONST <===

// value of a const variable can not be changed
const c1 = 1000;
console.log(c1); // 1000
// c1 = 500; // This will give an error

// a const variable must be initialized
const c2 = 1000; // Works fine
// const c2; // Will give an error

// a const variable can not be redeclared
const c3 = 'nodejs';
console.log(c3); // 'nodejs'
// const c3 = 'reactjs'; // This will give an error

// const is a block scope variable
const c4 = 'nodejs';
console.log(c4); // 'nodejs'
{
  const c4 = 'reactjs';
  console.log(c4); // 'reactjs'
}
console.log(c4); // 'nodejs'
