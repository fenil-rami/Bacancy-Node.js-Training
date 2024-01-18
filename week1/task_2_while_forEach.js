/* eslint-disable no-console */
const strs = ['nodejs', 'reactjs', 'mongodb', 'expressjs', 'mysql', 'nestjs'];

let i = 0;

while (i < strs.length) {
  strs[i].split('').forEach((str) => process.stdout.write(str));
  console.log('!');
  if (strs[i].length > 8) break;
  i += 1;
}
// Difference between while and forEach in this context :
// Here "while" loop needs a condition for termination while "forEach" does not need a condition it will automatically iterate over the full string (converted array) and will give each element while iterating over it
// Also the increment operation is also required to be written in "while" loop, while there is no need to write any incremental operation in "forEach"
// Also "forEach" method can only be used on arrays, while "while" loops can be used to iterate over array or strings
