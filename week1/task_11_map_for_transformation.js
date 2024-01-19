/* eslint-disable no-console */
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const squares = values.map((value) => (value * value));

console.log('Original Array :', values); // Original Array : [1, 2, 3, 4,  5, 6, 7, 8, 9, 10 ]
console.log('Squared Array :', squares); // Squared Array : [1,  4,  9, 16,  25,36, 49, 64, 81, 100]
