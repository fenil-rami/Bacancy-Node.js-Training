/* eslint-disable no-continue */
/* eslint-disable no-console */
const arr = [4, 2, 3, 1, 2, 5, 3, 7, 1, 4, 15];

for (let i = 0; i < arr.length; i += 1) {
  console.log(arr[i]);
  if (arr[i] > 5) break;
  if (arr[i] === 3) continue;
  console.log(arr[i]);
}
