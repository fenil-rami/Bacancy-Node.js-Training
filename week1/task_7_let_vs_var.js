/* eslint-disable vars-on-top */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable prefer-const */

// Block scoped variable in let

{
  let a = 100;
  console.log(a);
}

// console.log(a); // It will give a reference error (a is not defined) because a is not in the lexographical scope of global execution context

// function scoped variable in var

var val = 100;

function outer() {
  var name = 'Fenil';
  function inner() {
    console.log(`My name is ${name}`); // My name is Fenil (can access the name variable because it is in the lexographical scope of execution context)
  }
  inner();
  console.log(val); // 100 (can access the val, because it is in function execution context's lexographical scope)
}

outer();
// console.log(name); // It will give a regerence error (name is not defined) because name variable is not in the lexographical scope of the execution context (here global execution context)
console.log(val); // The val variable can be accessed because it is in the lexographical scope
