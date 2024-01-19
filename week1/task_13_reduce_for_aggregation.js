/* eslint-disable no-console */
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const sum = values.reduce((curr_sum, val) => curr_sum + val);

console.log('Original array :', values); // Original array : [1, 2, 3, 4,  5, 6, 7, 8, 9, 10 ]

console.log('Sum of elements of array :', sum); // Sum of elements of array : 55
