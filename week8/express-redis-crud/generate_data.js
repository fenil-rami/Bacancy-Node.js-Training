import fs from 'fs'

// Function to generate a random name
function generateRandomName() {
  const firstNames = ['John', 'Emma', 'Michael', 'Sophia', 'William', 'Olivia', 'James', 'Ava', 'Alexander', 'Mia',
      'Liam', 'Charlotte', 'Daniel', 'Emily', 'Benjamin', 'Abigail', 'Logan', 'Harper', 'Matthew', 'Evelyn',
      'Lucas', 'Amelia', 'Jackson', 'Elizabeth', 'David', 'Sofia', 'Joseph', 'Victoria', 'Samuel', 'Madison',
      'Henry', 'Ella', 'Sebastian', 'Scarlett', 'Andrew', 'Grace', 'Gabriel', 'Chloe', 'Christopher', 'Avery',
      'Anthony', 'Mila', 'Isaac', 'Eleanor', 'Elijah', 'Penelope', 'Nathan', 'Luna', 'Ryan', 'Samantha'
  ];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor',
      'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson',
      'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King', 'Wright',
      'Lopez', 'Hill', 'Scott', 'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter', 'Mitchell', 'Perez',
      'Roberts', 'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins', 'Stewart', 'Sanchez',
      'Morris', 'Rogers', 'Reed', 'Cook', 'Morgan', 'Bell', 'Murphy', 'Bailey', 'Rivera', 'Cooper', 'Richardson',
      'Cox', 'Howard', 'Ward', 'Torres', 'Peterson', 'Gray', 'Ramirez', 'James', 'Watson', 'Brooks', 'Kelly',
      'Sanders', 'Price', 'Bennett', 'Wood', 'Barnes', 'Ross', 'Henderson', 'Coleman', 'Jenkins', 'Perry', 'Powell'
  ];

  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${randomFirstName} ${randomLastName}`;
}

// Function to generate a random array of objects
function generateRandomArray(size) {
  const array = [];
  for (let i = 0; i < size; i++) {
      const obj = {
          id: i + 1,
          name: generateRandomName()
      };
      array.push(obj);
  }
  return array;
}

// Generate a random array of size 1 million
const randomArray = generateRandomArray(50000);

fs.writeFile('./data.json', JSON.stringify(randomArray), (err) => {
  if(err) {
    console.log('Error while writing data to file', err);
  }
  else {
    console.log('File has been written successfully')
  }
})

console.log(randomArray.length); // Output: 1000000
