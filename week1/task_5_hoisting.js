/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable vars-on-top */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */

// Hoisting in var

// in global scope

console.log(v1); // undefined
var v1 = 1000;
console.log(v1); // 1000

// explanation : here we are accessing the variable before declaring it. at first it wil print undefined because the variable is declared but not initialized yet. so it holds undefined value, and at second it is already initialized so will prints its actual value (1000)

// in functions

var tech = 'nodejs';
var name;

function myFun() {
  console.log(`Hello my name is ${name} and currently I'm learning ${tech}!`); // 'Hello my name is undefined and currently I'm learning nodejs!'
}

myFun();
name = 'Fenil';

// explanation : here the myFun function is able to access the variable in its lexographical scope so can access the tech variable, also we have initialized the variable with a value before calling the function so it will print its actual value not undefined. but when we try to access the name variable it will print undefined because it is not initialized before the funtion call

// in block

var v2 = 'nodejs';

{
  console.log(v2); // 'nodejs'
  v2 = 'reactjs'; // changing the value of v2
}

console.log(v2); // 'reactjs'

// explanation : here the v2 variable is global scoped, so we can access its value inside the block. also when we change its value it gets changed globally. because var is global variable

// in let variable

// in global

// console.log(l1); // It will throw an error, because we can not access the let variable before its declaration
let l1;
console.log(l1); // undefined
l1 = 'nodejs';
console.log(l1); // 'nodejs'

// explanation : The first will give error because we can not access the let variables before declaring it, the second one will print undefined value because we have not initialized the value of let variable, and the third one will print 'nodejs' because we have initialized the value of let variable

// in functions

function myFunc() {
  console.log(`Currently I'm learning ${myTech}`); // 'Currently I'm learning nodejs'
  // console.log(myName); // It will thorw an error because the let variable myName is not declared before the function call
  console.log(`My city : ${city}`); // undefined
}

let myTech = 'nodejs';
let city;
myFunc();
city = 'Gandhinagar';
let myName = 'Fenil';

// explanation : at first it will print nodejs because the value of myTech variable is declared and initialized before the function call, in second line the value is not declared before the function call so it will thorw an error, in third line the value is declared but not initialized so it will print undefined value

// in block

let L1 = 1000;
let L2 = 2000;

console.log(L1); // 1000

{
  console.log(L2); // 2000
  L2 = 5000;

  let L1 = 50;
  console.log(L1); // 50
  L1 = 500;
}

console.log(L1); // 1000
console.log(L2); // 5000

// explanation : at first simply it will prints L1's value which is 1000, in block it will prints L2's value whcih is 2000, it will create a new local variable L1 and will prints its value which is 50, now even if we changes the local L1's value it does not affect the value of global L1, but since there is no local L2 when we change L2's value in block it will change the L2's values which is in global
