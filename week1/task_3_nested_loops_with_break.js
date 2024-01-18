/* eslint-disable no-console */
for (let i = 1; i <= 3; i += 1) {
  for (let j = 1; j <= 5; j += 1) {
    if (i === j) break;
    // eslint-disable-next-line prefer-template
    console.log('Outer count : ' + i + ', Inner Count : ' + j);
  }
}
