/* eslint-disable no-console */
/* eslint-disable func-names */
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function () {
  console.log(`Hello! I'm ${this.name} and I'm ${this.age} years old.`);
};

const person1 = new Person('Fenil', 21);
const person2 = new Person('Het', 23);

person1.greet();
person2.greet();
