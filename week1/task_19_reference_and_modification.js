/* eslint-disable no-console */
const originalObject = {
  key1: 'val1',
  key2: 'val2',
  key3: 'val3',
};
const modifiedObject = originalObject;

modifiedObject.key2 = 'modified_val2';
console.log(originalObject); // { key1: 'val1', key2: 'modified_val2', key3: 'val3' }
// due to reference the change in modifiedObject also reflects in originalObject
