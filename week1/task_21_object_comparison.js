/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-console */
const user1 = {
  name: 'Fenil',
  age: 21,
};

const user2 = {
  name: 'Sujal',
  age: 21,
};

function compareObjects() {
  for (const key in user1) {
    if (!user2.hasOwnProperty(key)) {
      console.log('The objects does not have similar properties');
      return;
    }
  }
  for (const key in user2) {
    if (!user1.hasOwnProperty(key)) {
      console.log('The objects does not have similar properties');
      return;
    }
  }
  console.log('The objects have similar properties');
}

compareObjects();
