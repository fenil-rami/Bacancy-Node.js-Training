/* eslint-disable no-console */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-undef */
const targetButton = document.getElementById('myButton');

targetButton.addEventListener('click', function () {
  function func1() {
    console.log(`Text content of the button in normal function : ${this.textContent}`); // will print undefined because here this referes to the window object
  }

  const func2 = () => {
    console.log(`Text content of the button in arrow function : ${this.textContent}`); // will print actual text content because here this refers to the button element
  };
  func1();
  func2();
});
