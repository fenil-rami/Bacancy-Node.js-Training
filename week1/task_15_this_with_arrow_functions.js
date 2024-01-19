/* eslint-disable prefer-template */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
const calculator = {
  x: 10,
  y: 5,
  calculate: function (operation) {
    const add = () => this.x + this.y;
    const subtract = () => this.x - this.y;
    const multiply = () => this.x * this.y;
    const divide = () => this.x / this.y;

    switch (operation) {
    case 'add':
      console.log(`Addition of ${this.x} and ${this.y} = ` + add());
      break;
    case 'subtract':
      console.log(`Subtraction of ${this.x} and ${this.y} = ` + subtract());
      break;
    case 'multiply':
      console.log(`Multiplication of ${this.x} and ${this.y} = ` + multiply());
      break;
    case 'divide':
      console.log(`Division of ${this.x} and ${this.y} = ` + divide());
      break;
    default:
      throw new Error(`'${operation}' is not a valid operation!`);
    }
  },
};

calculator.calculate('add');
calculator.calculate('subtract');
calculator.calculate('multiply');
calculator.calculate('divide');
// calculator.calculate('not_a_valid_operation'); // Will throw an error
