/* eslint-disable no-console */
const fs = require('fs');

setTimeout(() => {
  console.log('Set time out [2000 ms]');
}, 2000);

setTimeout(() => {
  console.log('Set time out [0 ms]');
}, 0);

const p = new Promise((resolve) => setTimeout(resolve, 5000));

const data = fs.readFileSync(`${__dirname}/task_5_input.txt`, 'utf-8', (err) => {
  if (err) {
    console.log('Some error occurred while reading data from file :', err);
  }
});

if (data !== undefined) {
  console.log('Data : ', data);
}

setTimeout(() => {
  console.log('Set time out [5000 ms]');
}, 5000);

p.then(() => {
  console.log('Promise [5000 ms]');
});
