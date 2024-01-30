/* eslint-disable no-console */
const operator1 = parseFloat(process.argv[2]);
const operator2 = parseFloat(process.argv[3]);
const operation = process.argv[4].toString();

if (Number.isNaN(operator1) || Number.isNaN(operator2)) {
  console.log('Please provide valid operators(valid numeric values)!');
  process.exit();
}

let ans = 0;

switch (operation) {
case 'addition':
  ans = operator1 + operator2;
  console.log(`Addition of ${operator1} and ${operator2} is ${ans}`);
  break;
case 'subtraction':
  ans = operator1 - operator2;
  console.log(`Subtraction of ${operator1} and ${operator2} is ${ans}`);
  break;
case 'division':
  ans = operator1 / operator2;
  console.log(`Division of ${operator1} and ${operator2} is ${ans}`);
  break;
case 'multiplication':
  ans = operator1 * operator2;
  console.log(`Multiplication of ${operator1} and ${operator2} is ${ans}`);
  break;
default:
  console.log('Please provide a valid operation, (valid operations : addition, subtraction, division, multiplication');
  break;
}
