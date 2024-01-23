/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-undef */
const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');

let intFun;

startButton.addEventListener('click', function () {
  intFun = setInterval(() => { console.log(Math.random() * 10); }, 1000);
});

stopButton.addEventListener('click', function () {
  clearInterval(intFun);
});
