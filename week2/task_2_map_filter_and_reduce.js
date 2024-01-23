/* eslint-disable no-useless-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
const students = [
  {
    name: 'jeel',
    age: 20,
  },
  {
    name: 'anjali',
    age: 25,
  },
  {
    name: 'ram',
    age: 10,
  },
  {
    name: 'rahul',
    age: 18,
  },
  {
    name: 'neha',
    age: 19,
  },
  {
    name: 'ayesha',
    age: 21,
  },
];

// using map, filter chaining
const mapFilterArray = students.filter((student) => student.age > 18).map((student) => student.name);
console.log('Array using map filter chaining :', mapFilterArray);

// using reduce
const reduceArray = students.reduce((acc, student) => {
  if (student.age > 18) {
    acc.push(student.name);
  }
  return acc;
}, []);
console.log('Array using reduce :', reduceArray);
