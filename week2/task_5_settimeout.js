/* eslint-disable no-console */
/* eslint-disable no-plusplus */
function print(i, n) {
  if (i <= n) {
    setTimeout(() => {
      console.log(i);
      print(i + 1, n);
    }, 1000);
  }
}
print(1, 10);
