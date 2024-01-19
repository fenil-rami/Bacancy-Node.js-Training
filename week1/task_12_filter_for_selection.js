/* eslint-disable no-console */
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const even_vals = values.filter((value) => value % 2 === 0);

console.log('Original array :', values); // Original array : [1, 2, 3, 4,  5, 6, 7, 8, 9, 10 ]
console.log('Even values :', even_vals); // Even values : [ 2, 4, 6, 8, 10 ]
