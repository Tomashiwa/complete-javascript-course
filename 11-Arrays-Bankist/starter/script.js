'use strict';
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  // Empty out the elements in the list
  containerMovements.innerHTML = '';

  movements.forEach((movement, index) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${index} ${type}</div>
      <div class="movements__value">${movement}</div>
    </div>
    `;

    // Add html into an element
    /*
      eg.
      <h1>
        ...
        NEW_HTML
      </h1>
    */
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

const calculateDisplayBalance = function (movements) {
  const balance = movements.reduce((sum, movement) => sum + movement, 0);
  labelBalance.textContent = `$${balance} EUR`;
};
calculateDisplayBalance(account1.movements);

const createUsernames = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ') // Split name into words
      .map(word => word[0]) // Just take the 1st letter of each word
      .join('');
  });
};
createUsernames(accounts);

/////////////////////////////////////////////////
// LECTURES
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// Array
/*
// Array are objects with access to built in methods
let arr = [...'estelle'];

// Array.slice(...)
// Array's .slice behave the same as String's .slice
console.log(arr.slice(2, 4));
// Creating shallow copy
console.log(arr.slice());
console.log([...arr]);

// Array.splice(...)
// Delete/Replace/Insert elements starting from an index
// Note. Mutates the actual array
// Delete
arr.splice(2, 3);
console.log(arr);

// Replace
arr.splice(2, 3, ...'abc');
console.log(arr);

// Insert
arr.splice(0, 0, ...'abc');
console.log(arr);

// Array.reverse()
// Reverse the order of items
// Note. Mutates the actual array
arr.reverse();
console.log(arr);

// Array.concat(...)
// Returns an array that is a concat of 2 arrays
arr = [...'estelle'];
console.log(arr.concat([...'bright']));

// Array.join()
// Join the array elements into a string with a given seperator
console.log(arr.join('|'));

// Array.at(...)
// Access an element through an index
// Similar to [] notation but can use negative index to count from right to left
arr = [...'estlle'];
console.log(arr.at(-1)); // last element - e
*/

// String.at(...)

// ForEach
/*
// ForEach with array
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// For loop has access to index and element via .entries()
for (const [index, movement] of movements.entries()) {
  console.log(`[Movement ${index}]: ${movement}`);
  if (index >= 2) break;
}
console.log('-------------------');
// forEach has access to index, element and the array
// forEach cannot be "break" or "continue"
movements.forEach((movement, index, arr) => {
  console.log(`[Movement ${index}]: ${movement}`);
  index === arr.length - 1 && console.log(arr);
});

// ForEach with map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
currencies.forEach((value, key, map) => {
  console.log(`${key}: ${value}`);
});

// ForEach with set
const items = new Set(['potion', 'quartz', 'potion', 'fries']);
// Second parameter is the same as value but was maintained to be consistent with other data structures
items.forEach((value, _, set) => {
  console.log(`${value}: ${value}`);
});
*/

///////////////////////////////////////////////////////////////////////////////////

// Coding Exercise #1
/*
const julia1 = [3, 5, 2, 12, 7];
const kate1 = [4, 1, 15, 8, 3];

const julia2 = [9, 16, 6, 8, 3];
const kate2 = [10, 5, 6, 1, 4];

function checkDogs(dogsJulia, dogsKate) {
  const dogsCorrected = [...dogsJulia];
  dogsCorrected.splice(0, 1);
  dogsCorrected.splice(-2, 2);
  const dogsTotal = [...dogsCorrected, ...dogsKate];

  console.log(dogsTotal);

  dogsTotal.forEach((dog, index) => {
    const str =
      dog >= 3 ? `is an adult, and is ${dog} years old` : `is still a puppy 🐶`;
    console.log(`Dog number ${index + 1} ${str}`);
  });
}

checkDogs(julia1, kate1);
console.log('-------------');
checkDogs(julia2, kate2);
*/

///////////////////////////////////////////////////////////////////////////////////

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Array.map(...)
// Returns a new array containing the results of applying a function on all original array elements
const eurToUsd = 1.1;
const movementsUsd = movements.map(movement => movement * eurToUsd);
// Similar to forEach, has access to the element, index, and the original array
const movementsLogs = movements.map(
  (movement, index, arr) =>
    `Movement ${index + 1}: You've ${
      movement > 0 ? 'deposited' : 'withdrawed'
    } $${Math.abs(movement)}.`
);
console.log(movements, movementsUsd, movementsLogs);

// Array.filter(...)
// Returns a new array containing the elements that passed a specificed test function
// Similar to forEach, has access to the element, index and the original array
const deposits = movements.filter((movement, index, arr) => movement > 0);
console.log(deposits);
const withdrawals = movements.filter(movement => movement < 0);
console.log(withdrawals);

// Array.reduce(...)
// Reduces all array elements down to 1 value through an callback and an initial vlaue
const balance = movements.reduce((sum, movement, index, arr) => {
  console.log(`iter ${index}: ${sum} before adding ${movement}`);
  return sum + movement;
}, 0); // Initial value of accumulator
console.log(`Total balance: ${balance}`);
// Example - Find max value
const max = movements.reduce(
  (max, curr) => (curr > max ? curr : max),
  movements[0]
);
console.log(movements, max);
*/

///////////////////////////////////////////////////////////////////////////////////

// Coding Challenge #2
/*
const data1 = [5, 2, 4, 1, 15, 8, 3];
const data2 = [16, 6, 10, 5, 6, 1, 4];

function calcAverageHumanAge(ages) {
  const humanAges = ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18);
  console.log(humanAges);
  return humanAges.reduce((sum, curr) => sum + curr, 0) / humanAges.length;
}
console.log(`Results 1: ${calcAverageHumanAge(data1)}`);
console.log(`Results 2: ${calcAverageHumanAge(data2)}`);
*/
