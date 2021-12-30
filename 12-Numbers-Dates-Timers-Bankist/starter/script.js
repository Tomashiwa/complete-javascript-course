'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2011-11-18T21:31:17.178Z',
    '2011-12-23T07:42:02.383Z',
    '2021-01-28T09:15:04.904Z',
    '2021-12-20T10:17:24.185Z',
    '2021-12-26T14:11:59.604Z',
    '2021-12-27T17:01:17.194Z',
    '2021-12-27T23:36:17.929Z',
    '2021-12-28T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const computeDaysPassed = (d1, d2) =>
  Math.floor(Math.abs(d2 - d1) / (1000 * 60 * 60 * 24));

const formatMovementDate = function (date, locale) {
  const daysPassed = computeDaysPassed(Date.now(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, '0');
    // const month = `${date.getMonth() + 1}`.padStart(2, '0');
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCurr = function (value, locale, curr) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: curr,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = formatMovementDate(
      new Date(acc.movementsDates[i]),
      acc.locale
    );
    const formattedMov = formatCurr(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${date}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${formatCurr(
    acc.balance,
    acc.locale,
    acc.currency
  )}`;
};

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${formatCurr(income, acc.locale, acc.currency)}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${formatCurr(out, acc.locale, acc.currency)}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${formatCurr(
    interest,
    acc.locale,
    acc.currency
  )}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    time--;
  };

  let time = 120;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// Internationlization API
// Provides string comparision and formatting of number, date and time for localization purpose
// Can provide an Option object to customize the localization
const date = new Date();
const option = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};
const locale = navigator.language;
console.log(locale);
labelDate.textContent = new Intl.DateTimeFormat(locale, option).format(date);

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Displaying current date
    const now = new Date();
    const option = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      option
    ).format(now);

    // const date = `${now.getDate()}`.padStart(2, '0');
    // const month = `${now.getMonth() + 1}`.padStart(2, '0');
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, '0');
    // const minutes = `${now.getMinutes()}`.padStart(2, '0');
    // labelDate.textContent = `${date}/${month}/${year}, ${hour}:${minutes}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movements.push(amount);
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(Number(inputLoanAmount.value));

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Fake delay to simulate time taken to process loan
    setTimeout(() => {
      // Add movement
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 3000);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// Numbers
/*
// All numbers in JS are floating point (ie. decimals)
console.log(23 === 23.0);

// Numbers are in base 2 instead of base 10
// --> Certain decimals cannot be represented accurately
// --> Mathematic accuracy is not a strong point
console.log(0.1 + 0.2);

// Convert into Number
console.log(Number('21'));
console.log(+'21'); // Type coercion

// Parse into Number
console.log(Number.parseInt(' 2.1 rem   '));
console.log(Number.parseFloat('2.1rem   '));

// Check if value is NaN
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN(+'20')); // false
console.log(Number.isNaN(+'20px')); // true
console.log(Number.isNaN(23 / 0)); // infinity --> false

// Check if value is number
console.log(Number.isFinite(21)); // true
console.log(Number.isFinite('21')); // false
console.log(Number.isFinite(+'21x')); // false
console.log(Number.isFinite(21 / 0)); // false

console.log(Number.isInteger(21));
console.log(Number.isInteger(21.0));
console.log(Number.isInteger(21 / 0));
*/

// Math operation
/*
// Power & root
console.log(Math.pow(2, 3));
console.log(Math.sqrt(4));
console.log(Math.pow(4, 1 / 2));
console.log(4 ** (1 / 2));

// Get max number
console.log(Math.max(2, 3, 9, 1, 8, 4));

// Get min number
console.log(Math.min(2, 3, 9, 1, 8, 4));

// Constants
console.log(Math.PI);

// Generate random number
console.log(Math.random()); // 0 to 1
// Custom function to generate a random integer between a min and max
const rand = (min, max) => Math.round(Math.random() * (max - min) + min);
console.log(rand(10, 20));

// Rounding to integers
// Truncate to integer
console.log(Math.trunc(21.1111)); // 21

// Round to nearest integer
console.log(Math.round(21.1111)); // 21

// Round up
console.log(Math.ceil(21.1111)); // 22

// Round down
console.log(Math.floor(21.1111)); // 21

// Number.toFixed(NUM_DECIMAL_PLACES)
// Rounding decimals to a specified number of decimal places
// Return a string of the rounded value
console.log(+(21.111).toFixed(0)); // 21
console.log(+(21.111).toFixed(2)); // 21.11
*/

// Numeric seperator
// Numbers can be seperated with "_" into digits for readability
// (eg. 2000000 can be declared as 2_000_000 instead)
// Can only be placed between digits
/*
console.log(21000000);
console.log(21_000_000);
console.log(12.34_56_78);
*/

// BigInt
/*
// Creating a BigInt
console.log(12321335254365545241565464576456n);
console.log(BigInt(456254352));

// Operations
const huge = 459830968549073063409580395n;
const num = 21;
// console.log(huge + num); // Cannot mix BigInt and other types
console.log(huge + BigInt(num));
console.log(20n > 15);
console.log(20n === 20); // false, different types
console.log(20n == '20'); // true with type coercion
console.log(huge + ' is REALLY big '); // true with type coercion
console.log(10n / 3n); // 3n because is integer, has no decimal places
*/

// Date
// Internally represented as the number of milliseconds that passed since Jan 1, 1970, midnight
/*
// Creating a Date
// Default
console.log(new Date());
// By string
console.log(new Date('December 21, 2021'));
console.log(new Date(account1.movementsDates[0]));
// By parameters (ie. year, month, day, hours, mins, secs)
console.log(new Date(2021, 10, 21, 21, 0, 0));
// By timestamp
console.log(new Date(1637499600000));

// Has getters and setters
const date = new Date(2021, 10, 21, 21, 0, 0);
console.log(date.getFullYear());
console.log(date.getMonth()); // Month is 0 based
console.log(date.getDate());
console.log(date.getDay()); // 0 - Sunday, 1 - Monday, ...
console.log(date.getHours());
console.log(date.getMinutes());

// International standard representation
console.log(date.toISOString());

// Timestamp
console.log(date.getTime());

// Elapsed date can be obtained with direct subtraction due to its internal representation
const daysPassed = (d1, d2) => Math.abs(d2 - d1) / (1000 * 60 * 60 * 24);
console.log(
  daysPassed(new Date(2021, 10, 20, 21, 0), new Date(2021, 10, 19, 21, 0))
);
*/

// Internationlization API
// Provides string comparision and formatting of number, date and time for localization purpose
// Can provide an Option object to customize the localization
/*
// Date time
const date = new Date();
const option = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

// Retrieving browser's locale
const locale = navigator.language;
console.log(locale);

labelDate.textContent = new Intl.DateTimeFormat(locale, option).format(date);
*/

// Numbers
/*
const num = 123456.789;
console.log(new Intl.NumberFormat('en-US').format(num));
console.log(new Intl.NumberFormat('de').format(num));
console.log(new Intl.NumberFormat('ja-JP').format(num));
console.log(new Intl.NumberFormat(navigator.language).format(num));
// Similar to datetime, can pass an option object
console.log(
  new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'USD',
  }).format(num)
);
*/

// Set Timeout
// Schedule a function to be executed once some time in the future
// Time is given in ms, Parameters to the function can be provided
/*
const player = 'misaki';
const timer = setTimeout(
  (spell1, spell2) => {
    console.log(this);
    console.log(`${player} Casting ${spell1} and ${spell2}...`);
  },
  3000,
  'Curaga',
  'Slowra'
);
*/

// Set Interval
// Schedule a function to be executed every time a preset period of time has passed
// Time is given in ms and Parameters to the function can be provided
// setInterval(() => {
//   console.log(
//     new Intl.DateTimeFormat(navigator.language, {
//       hour: 'numeric',
//       minute: 'numeric',
//       second: 'numeric',
//     }).format(new Date())
//   );
// }, 1000);
