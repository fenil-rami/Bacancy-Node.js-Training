/* eslint-disable no-console */
const fs = require('fs');

const myReadStream = fs.createReadStream(`${__dirname}/task_5_input.txt`, 'utf-8');
const myWriteStream = fs.createWriteStream(`${__dirname}/task_5_output.txt`);

myReadStream.on('data', (chunk) => {
  console.log('New chunk of data received : ', chunk);
  myWriteStream.write(chunk);
});
