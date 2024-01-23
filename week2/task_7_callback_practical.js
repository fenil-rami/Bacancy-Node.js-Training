/* eslint-disable no-console */
/* eslint-disable no-plusplus */
function getModifiedArray(arr, callback) {
  const newArray = [];

  for (let i = 0; i < arr.length; i++) {
    newArray.push(callback(arr[i]));
  }
  return newArray;
}

const myArr = [1, 2, 3, 4, 5, 6];
console.log('Original array : ', myArr);

const square = (x) => x * x;
const squarredArray = getModifiedArray(myArr, square);
console.log('Squrred array : ', squarredArray);
