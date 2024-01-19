/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable vars-on-top */
/* eslint-disable block-scoped-var */
/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable no-console */

// block scoping

// var is global scoped and let and const are block scoped, so whenever we want to use a variable in a scope which does no affect the value of same named variable out side the scope we should use let and const

var a = 100;
const b = 100;
const c = 100;

{
  var a = 500;
  console.log(a); // 500
  let b = 500;
  console.log(b); // 500
  const c = 500;
  console.log(c); // 500

  // use let or const if you dont want the value of variable outside the scope to be affected which has same name as varibale inside the block scope
}

// here value of a is changed but b and c still hold the same value
console.log(a); // 500
console.log(b); // 100
console.log(c); // 100

// hoisting

// only var can be used before declaration (though it will give undefined value);
// To avoid this we should be using let and const, which prevent us to use a variable before declaring it (by reference error)

console.log(`My name is ${v1}`); // 'My name is undefined'
var v1 = 'Fenil';

// console.log(`My name is ${l1}`); // Reference error
let l1 = 'Fenil';

// console.log(`My name is ${c1}`); Reference error
const c1 = 'Fenil';

// immutability

// Whenever we want a variable value to be fixed we must use const

const fixed_val = 'THIS_FIXED_VAL';

// fixed_val = 'CHANGED_VAL'; // this will throw an error which prevent us to change the value of a const variable

// whenever we want a variable value to be mutable we should use let or var

let val = 'nodejs';
val = 'reactjs'; // value of a let variable can be changed
