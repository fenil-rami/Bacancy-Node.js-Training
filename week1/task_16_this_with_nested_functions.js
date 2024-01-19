/* eslint-disable no-console */
/* eslint-disable indent */
/* eslint-disable space-before-function-paren */
function Car (brand) {
  this.brand = brand;
  this.carInfo = {
      displayInfo: (param) => {
          console.log(`The parameter passed to the displayInfo method : ${param}`);
          console.log(`Brand of the car is ${this.brand}`);
      },
  };
}

const myCar = new Car('Mahindra');
myCar.carInfo.displayInfo('paramter_value');
