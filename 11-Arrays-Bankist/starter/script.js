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

const displayMovements = function (movements, sort = false) {
  // Empty out the elements in the list
  containerMovements.innerHTML = '';

  const newMovements = sort ? [...movements].sort((a, b) => a - b) : movements;

  newMovements.forEach((movement, index) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
      <div class="movements__value">${movement}€</div>
    </div>
    `;

    // Add html into an element
    // eg.<h1>...NEW_HTML</h1>
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);

const calculateDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((sum, movement) => sum + movement, 0);
  labelBalance.textContent = `${acc.balance}€`;
};
// calculateDisplayBalance(account1.movements);

const calcDisplaySummary = function (account) {
  const income = account.movements
    .filter(movement => movement > 0)
    .reduce((sum, movement) => sum + movement, 0);

  labelSumIn.textContent = `${income}€`;
  const out = Math.abs(
    account.movements
      .filter(movement => movement <= 0)
      .reduce((sum, movement) => sum + movement, 0)
  );
  labelSumOut.textContent = `${out}€`;
  const interest = account.movements
    .filter(movement => movement > 0)
    .map(movement => (account.interestRate / 100) * movement)
    .filter(interest => interest >= 1)
    .reduce((sum, interest) => sum + interest, 0);
  labelSumInterest.textContent = `${interest}€`;
};
// calcDisplaySummary(account1.movements);

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

const updateUI = function (acc) {
  // Displace movements, balance, and summary
  displayMovements(acc.movements);
  calculateDisplayBalance(acc);
  calcDisplaySummary(acc);
};

let currentAccount;
const login = function (e) {
  // Prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(account => {
    return (
      account.username === inputLoginUsername.value &&
      account.pin === Number(inputLoginPin.value)
    );
  });
  if (currentAccount) {
    // Display UI and message
    containerApp.style.opacity = 1;
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = ''; // Works because assignment goes right to left
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
};
btnLogin.addEventListener('click', login);

const transfer = function (e) {
  e.preventDefault();
  const target = accounts.find(acc => acc.username === inputTransferTo.value);
  const amt = Number(inputTransferAmount.value);
  if (
    target &&
    target.username !== currentAccount.username &&
    amt > 0 &&
    amt <= currentAccount.balance
  ) {
    currentAccount.movements.push(-amt);
    target.movements.push(amt);

    inputTransferTo.value = inputTransferAmount.value = '';
    updateUI(currentAccount);
  }
};
btnTransfer.addEventListener('click', transfer);

const closeAccount = function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    inputCloseUsername.value = inputClosePin.value = '';

    // Delete account
    accounts.splice(
      accounts.findIndex(acc => acc.username === currentAccount.username),
      1
    );

    // Hide UI
    containerApp.style.opacity = 0;
  }
};
btnClose.addEventListener('click', closeAccount);

const loan = function (e) {
  e.preventDefault();
  const loanAmt = Number(inputLoanAmount.value);
  const loanable =
    loanAmt > 0 &&
    currentAccount.movements.some(movement => movement >= 0.1 * loanAmt);

  if (loanable) {
    currentAccount.movements.push(loanAmt);
    updateUI(currentAccount);
  }

  // Clear loan input field
  inputLoanAmount.value = '';
};
btnLoan.addEventListener('click', loan);

let isSorted = false;
const sort = function () {
  isSorted = !isSorted;
  displayMovements(currentAccount.movements, isSorted);
};
btnSort.addEventListener('click', sort);

/////////////////////////////////////////////////
// LECTURES
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// Array
/*
// Array are objects with access to built in methods
let arr = [...'estelle'];

// arr.slice(...)
// Array's .slice behave the same as String's .slice
console.log(arr.slice(2, 4));
// Creating shallow copy
console.log(arr.slice());
console.log([...arr]);

// slice vs spread in copying
const arr = new Array(3);
console.log([...arr]);
console.log(arr.slice());

// arr.splice(...)
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

// arr.reverse()
// Reverse the order of items
// Note. Mutates the actual array
arr.reverse();
console.log(arr);

// arr.concat(...)
// Returns an array that is a concat of 2 arrays
arr = [...'estelle'];
console.log(arr.concat([...'bright']));

// arr.join()
// Join the array elements into a string with a given seperator
console.log(arr.join('|'));

// arr.at(...)
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

// arr.map(...)
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

// arr.filter(...)
// Returns a new array containing the elements that passed a specificed test function
// Similar to forEach, has access to the element, index and the original array
const deposits = movements.filter((movement, index, arr) => movement > 0);
console.log(deposits);
const withdrawals = movements.filter(movement => movement < 0);
console.log(withdrawals);

// arr.reduce(...)
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

// Chaining array methods
const totalDepositsUsd = movements
  .filter(movement => movement > 0)
  .map(deposit => deposit * eurToUsd)
  .reduce((sum, deposit) => sum + deposit, 0);
console.log(totalDepositsUsd);

// arr.find(...)
// Return the 1st element that returns true when executing the given callback function
const account = accounts.find(account => account.owner === 'Sarah Smith');
console.log(accounts, account);

// arr.includes(...)
// CHECK IF ANY ELEMENT EQUALS TO THE GIVEN VALUE
// Return a bool on whether the array has a certain value as its element
console.log(movements.includes(3000)); // true
console.log(movements.includes(-3000)); // false

// arr.some(...)
// CHECK IF ANY ELEMENT SATISFIES THE GIVEN FUNCTION
// Returns a bool on whether the array has at least 1 element that satisfies the given function
console.log(movements.some(movement => movement < 0)); // true
console.log(movements.some(movement => movement === 0)); // false

// arr.every(...)
// CHECK IF ALL ELEMENTS SATIFIES THE GIVEN FUNCTION
// Returns a bool on whether all elements in the array satisfies the given function
console.log(movements.every(movement => movement > 0)); // false
console.log(account4.movements.every(movement => movement > 0)); // true

// arr.flat()
// Returns a new array that is flatten from a nest array (ie. lost depth)
const arr = [1, 2, [3, [4, 5]]];
console.log(arr.flat()); // Default depth: 1
console.log(arr.flat(2)); // Custom depth
// Example
const overallBalance = accounts
  .map(account => account.movements)
  .flat()
  .reduce((sum, movement) => sum + movement, 0);
console.log(overallBalance);

// arr.flatMap(...)
// Combines .map(...) and .flat(), map an array and then flatting it
const overallBalance2 = accounts
  .flatMap(account => account.movements)
  .reduce((sum, movement) => sum + movement, 0);
console.log(overallBalance2);

// arr.sort(..)
// Default: The array is sorted by treating the elements as strings and sort them in ascending order
// Custom: Given a compareFunction, it sorts the array accordingly
//
// Placing a based on the return value: [...<0...] b [...>0...]
// Return >0 --> b, a
// Return <0 --> a, b
// Return 0 --> Order remains
const arr2 = [...movements];
console.log(arr2.sort()); // -130, -400, -650, 1300, 200, 3000, 450, 70 (IN STRING ORDER)
console.log(
  arr2.sort((a, b) => {
    // Ascending order
    return a - b;
  })
);
console.log(
  arr2.sort((a, b) => {
    // Descending order
    return b - a;
  })
);


// Ways to create and fill array

// Equivalent
// console.log([1, 2, 3, 4, 5, 6, 7]);
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Array of empty elements
let arr = new Array(7);
console.log(arr); // [empty x 7]

// arr.fill(...)
// Fill the array with a value from a start index to end index (Similar to slice)
// When no index is given, the value fills the entire array
// Element's default value = empty
arr.fill(1, 3, 5);
console.log(arr); // [empty × 3, 1, 1, empty × 2]
arr.fill(1);
console.log(arr); // [1, 1, 1, 1, 1, 1, 1]

// Array.from(...)
// Create a shallow copy Array instance from an array-like or iterable object.
// If a mapping function is passed, each element will be mapped as well
//
// array-like object --> An object with a length property (non-negative integer) and indexed properties
// eg. {0: "apple", 1: "pear", length: 2}
// eg. NodeList
// iterable object --> Array, String, Map, Set etc
//
// Element's default value = Undefined
arr = Array.from({ length: 7 });
console.log(arr); // [undefined, undefined, undefined, undefined, undefined, undefined, undefined]
arr = Array.from({ length: 7 }, (curr, index) => index + 1);
console.log(arr); // [1, 2, 3, 4, 5, 6, 7]
*/

///////////////////////////////////////////////////////////////////////////////////
/*
// Coding Challenge #2
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

// Coding Challenge #3
function calcAverageHumanAge2(ages) {
  return ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4)) // Convert to human age
    .filter(age => age >= 18) // Only allow adult age
    .reduce((sum, age, _, arr) => sum + age / arr.length, 0); // Add "average-ed" age
}
console.log(`Results 1: ${calcAverageHumanAge2(data1)}`);
console.log(`Results 2: ${calcAverageHumanAge2(data2)}`);
*/

//////////////////////////////////////////////////////////////////////
// Array practice
/*
// Total deposits across the bank
const bankDeposits = accounts
  .flatMap(account => account.movements) // Map then flatten
  .filter(movement => movement > 0) // Deposits only
  .reduce((sum, curr) => sum + curr, 0);
console.log(`Total deposits: ${bankDeposits}`);

// How many deposits in the bank of at least $1000
const depositsOver1000 = accounts
  .flatMap(account => account.movements) // Map then flatten
  .reduce((count, movement) => (movement >= 1000 ? count + 1 : count), 0);
// const depositsOver1000 = accounts
//   .flatMap(account => account.movements) // Map then flatten
//   .filter(movement => movement >= 1000)
//   .reduce(count => count + 1, 0);
console.log(`# of deposits >= 1000: ${depositsOver1000}`);

// An object with the sum of deposits and withdrawal
const depositsWithdrawals = accounts
  .flatMap(account => account.movements)
  .reduce(
    (obj, movement) =>
      movement > 0
        ? { ...obj, sumDeposit: obj.sumDeposit + movement }
        : { ...obj, sumWithdrawal: obj.sumWithdrawal + Math.abs(movement) },
    { sumDeposit: 0, sumWithdrawal: 0 }
  );
console.log(depositsWithdrawals);

// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
  return title
    .toLowerCase()
    .split(' ')
    .map(word =>
      exceptions.includes(word)
        ? word
        : `${word[0].toUpperCase()}${word.slice(1)}`
    )
    .join(' ');
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
*/

//////////////////////////////////////////////////////////////////////
// Coding Challenge #4
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1
dogs.forEach(
  dog => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
);
console.log(dogs);

// 2
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
function eatsTooLittle(dog) {
  return dog.curFood < dog.recommendedFood;
}
function eatsTooMuch(dog) {
  return dog.curFood > dog.recommendedFood;
}
eatsTooLittle(dogSarah) && console.log("Sarah's dog eats too little");
eatsTooMuch(dogSarah) && console.log("Sarah's dog eats too much");

// 3
const ownersEatTooMuch = dogs
  .filter(dog => eatsTooMuch(dog))
  .flatMap(dog => dog.owners);
const ownersEatTooLittle = dogs
  .filter(dog => eatsTooLittle(dog))
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch, ownersEatTooLittle);

// 4
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// 5
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// 6
function eatsOkay(dog) {
  return (
    dog.curFood > 0.9 * dog.recommendedFood &&
    dog.curFood < 1.1 * dog.recommendedFood
  );
}
console.log(dogs.some(eatsOkay));

// 7
const dogsOkay = dogs.filter(eatsOkay);
console.log(dogsOkay);

// 8
const dogsSorted = dogs
  .slice()
  .sort((curr, next) => curr.recommendedFood - next.recommendedFood);
console.log(dogsSorted);
