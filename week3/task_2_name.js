/* eslint-disable no-console */
const args = process.argv.slice(2);

if (args.length > 0) {
  console.log('Your name is ', args.join(''), '!');
} else {
  console.log('Please provider your name!');
}
