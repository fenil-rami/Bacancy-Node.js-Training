/* eslint-disable prefer-object-spread */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const originalPerson = {
  name: 'Fenil',
  age: 21,
  hobbies: ['Football', 'Cricket', 'Music'],
};

// shallow copy
const shallowCopyPerson = originalPerson;

shallowCopyPerson.hobbies[2] = 'Cooking';

console.log(shallowCopyPerson.hobbies);
console.log(originalPerson.hobbies);

// deep copy
const deepCopyPerson = structuredClone(originalPerson);

deepCopyPerson.hobbies[1] = 'Running';

console.log(deepCopyPerson.hobbies);
console.log(originalPerson.hobbies);

// Output :
// [ 'Football', 'Cricket', 'Cooking' ]
// [ 'Football', 'Cricket', 'Cooking' ]
// [ 'Football', 'Running', 'Cooking' ]
// [ 'Football', 'Cricket', 'Cooking' ]
