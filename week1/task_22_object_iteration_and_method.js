/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable no-console */
const student = {
  name: 'Fenil',
  age: 21,
  grades: [89, 92, 85, 90, 92],
  calculateAverage() {
    let avg = 0.0;
    for (let i = 0; i < this.grades.length; i++) {
      avg += this.grades[i];
    }
    avg /= this.grades.length;
    return avg;
  },
};

for (const key in student) {
  if (Object.hasOwnProperty.call(student, key)) {
    const value = student[key];
    console.log(`${key} : ${value}`);
  }
}

console.log(`Average of the grades : ${student.calculateAverage()}`);
