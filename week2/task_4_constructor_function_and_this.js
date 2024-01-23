/* eslint-disable func-names */
/* eslint-disable no-console */
function Car(name, brand, year) {
  this.name = name;
  this.brand = brand;
  this.year = year;

  this.displayInfo = function () {
    console.log(`The car ${this.name} is from ${this.brand} and was launched in ${this.year}!`);
  };
}

const myCar = new Car('XUV 700', 'Mahindra', '2021');
myCar.displayInfo();
