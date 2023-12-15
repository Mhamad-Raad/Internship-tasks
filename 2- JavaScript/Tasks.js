// 1- Define list of objects to store data of four movies (name of movie, genre, year of publish and three casting team including their names, gender, nationality)
const Movies = [
  {
    name: 'The Dark Knight',
    genre: 'Action',
    publication: 2008,
    castingTeam: [
      {
        name: 'Health Ledger',
        gender: 'male',
        nationality: 'Australian',
      },
      {
        name: 'Christian Bale',
        gender: 'male',
        nationality: 'American',
      },
      {
        name: 'Gary Oldman',
        gender: 'male',
        nationality: 'British',
      },
    ],
  },
  {
    name: 'Shrek',
    genre: 'Animation',
    publication: 2001,
    castingTeam: [
      {
        name: 'Mike Myers',
        gender: 'male',
        nationality: 'Canadian',
      },
      {
        name: 'Eddie Murphy',
        gender: 'male',
        nationality: 'American',
      },
      {
        name: 'Cameron Diaz',
        gender: 'female',
        nationality: 'American',
      },
    ],
  },
  {
    name: 'Law Abiding citizen',
    genre: 'Thriller',
    publication: 2009,
    castingTeam: [
      {
        name: 'Ambert Tavares',
        gender: 'male',
        nationality: 'Portuguese',
      },
      {
        name: 'Michelle Monaghan',
        gender: 'female',
        nationality: 'American',
      },
      {
        name: 'Jamie Foxx',
        gender: 'male',
        nationality: 'American',
      },
    ],
  },
];

// -----------------------------------------------------------
// 2- write program defines two numbers and find positive/negative, even/odd, max/min
const num1 = 5;
const num2 = 10;

if (num1 <= 0) {
  console.log('First number is negative or equal to zero');
} else {
  console.log('First number is positive');
}

if (num2 <= 0) {
  console.log('Second number is negative');
} else {
  console.log('Second number is positive');
}

if (num1 > 0 && num2 > 0) {
  console.log(' both positive');
} else if (num1 < 0 && num2 < 0) {
  console.log('both negative');
}

if (num1 % 2 === 0) {
  console.log('First number is even');
} else {
  console.log('First number is odd');
}
if (num2 % 2 === 0) {
  console.log('Second number is even');
} else {
  console.log('Second number is odd');
}

// find min and max between the two numbers
if (num1 > num2 && num1 !== num2) {
  console.log('First number is greater than second number');
} else {
  console.log('Second number is greater than first number or they are equal');
}

// -----------------------------------------------------------
// 3- write a program to count from 15 to -2 
let i = 15;
while (i >= -2) {
  console.log(i);
  i--;
}

// -----------------------------------------------------------
// 4- write program find the sum of even numbers between 1 to 200 
let sum = 0;
for (let i = 1; i <= 200; i++) {
  if (i % 2 === 0) {
    sum += i;
  }
}

console.log(sum);

// -----------------------------------------------------------
// 5- write program to sort array  in descending order (array elements is 3, 1, 7, -9, 0, 38)

const arr = [3, 1, 7, -9, 0, 38];
arr.sort((a, b) => b - a);

console.log(arr);


// -----------------------------------------------------------
// 6- write a program to define and print these types of variables: number, string, and boolean 
const num = 5;
const str = 'Hello';
const bool = true;

console.log(num);
console.log(str);
console.log(bool);