/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function asyncLoop(time, start, end) {
  for (let i = start; i <= end; i++) {
    console.log(i);
    await sleep(time);
  }
}

asyncLoop(1000, 1, 10);
