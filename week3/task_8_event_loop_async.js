/* eslint-disable no-console */
const fs = require('fs');

const p = new Promise((resolve) => setTimeout(resolve, 5000));

setTimeout(() => {
  console.log('Set time out [500 ms]');
}, 500);

fs.readFile(`${__dirname}/task_5_input.txt`, 'utf-8', (err, data) => {
  if (err) console.log('Some error occurred while reading data form file :', err);
  else console.log('Data : ', data);
});

setTimeout(() => {
  console.log('Set time out [5 ms]');
}, 5);

setTimeout(() => {
  console.log('Set time out [0 ms]');
}, 0);

setTimeout(() => {
  console.log('Set time out [5000 ms]');
}, 5000);

p.then(() => {
  console.log('Promise [5000 ms]');
});
