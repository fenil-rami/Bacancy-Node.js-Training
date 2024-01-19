/* eslint-disable no-console */
const person = {
  name: 'Fenil',
  age: 21,
  introduce() {
    console.log(`Hello, my name is ${this.name}. I'm ${this.age} years old!`);
  },
};

person.introduce(); // Hello, my name is Fenil. I'm 21 years old!
