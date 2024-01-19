/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
let days = ['Monday'];

days.push('Tuesday');
days.push('Wednesday');
days.push('Thursday');
days.push('Friday');
days.push('Saturday');
days.push('Sunday');

console.log(days); // ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

days.pop();

console.log(days); // [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]

days.pop();

console.log(days); // [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ]

days.shift();

console.log(days); // [ 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ]

days.unshift('Monday');

console.log(days); // [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ]

console.log(days.indexOf('Monday')); // 0
console.log(days.indexOf('Thursday')); // 3

console.log(days.indexOf('Sunday')); // -1 ('Sunday' does not exists in the array)
