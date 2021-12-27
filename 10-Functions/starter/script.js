'use strict';

// Default parameter in function
/*
function attack(dmg = 1, type = 'raw') {
  console.log(`Dealt ${dmg} ${type} damage`);
}
attack(10, 'ice');
attack();
attack(10);
// Can put undefined to use the default parameter and continue with later parameters
attack(undefined, 'shadow');
*/

// Passing arguments
/*
const dmg = 5;
const player = {
  health: 10,
};
// Primitive are passed as a copy of the value
// Objects are passed as a reference (memory address)
function attack(dmg, target) {
  dmg = 1;
  target.health -= dmg;
  console.log(`---Attack with ${dmg} damage---`);
  console.log(`Target's health:`, target);
  console.log('------------------------');
}
attack(dmg, player);
console.log(dmg, player);
*/

// Higher-order functions
// Functions that take functions as parameters or return a function
/*
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...other] = str.split(' ');
  return [first.toUpperCase(), ...other].join(' ');
};

// A higher-order function that takes in functions as parameers
const transform = function (str, ...transformers) {
  let result = str;
  for (const transformer of transformers) {
    result = transformer(result);
  }
  return result;
};

console.log(
  transform('Destroyed Vintage Watch - Part 2', oneWord, upperFirstWord)
);

// A higher-order function that returns a function
const createStrega = function (series) {
  return function (designer) {
    console.log(`${series} Stregas - ${designer}`);
  };
};
const designStrega = createStrega('Silver Trail');
designStrega('Estelle Bright');

// Arrow function version
const createStrega2 = series => designer =>
  console.log(`${series} Stregas - ${designer}`);
const designStrega2 = createStrega2('Silver Trail');
designStrega2('Estelle Bright');
*/

// "Call" and "Apply" methods in a function
// Calls the function with a "this" value and arguments given explicity
// For "Apply", an array is used to pass arguments instead
/*
const player = {
  name: 'Estelle',
  health: 10,
  attack: 4,
};
const monster = {
  name: 'Slime',
  health: 5,
  attack: 2,
};
function attack(target) {
  // "this" here is undefined as its just a simple function call, no caller
  target.health -= this.attack;
  console.log(
    `${this.name} attacked ${target.name} with ${this.attack} damage, ${target.name}'s health: ${target.health}`
  );
}
// Executing the method "call" on the function "attack" allows us to bind a value to "this"
attack.call(player, monster);
// Similar to the method "call", but "apply" takes in array of arguments instead
attack.apply(player, [monster]);
*/

// "Bind" method in a function
// Creates a new function from a function, with a preset "this" and parameters if any is provided
/*
const playerAttack = attack.bind(player);
playerAttack(monster);
const monsterAttackPlayer = attack.bind(monster, player);
monsterAttackPlayer();
monsterAttackPlayer();
// Practical example - Explicitly set "this" for a callback function of a button
const buyItem = function () {
  console.log(this);
  console.log(`${this.name} have bought a potion...`);
};
document.querySelector('.buy').addEventListener('click', buyItem); // "this" is undefined
document.querySelector('.buy').addEventListener('click', buyItem.bind(player)); // "this" is player
// Practical example - Partial application (Apply some parameters of a function)
const formSentence = function (...words) {
  return words.join(' ');
};
const formGreetings = formSentence.bind(null, 'Good', 'Morning');
console.log(formGreetings('Ms', 'Smith'));

// Replicating "bind" with a higher-order function
const formPartial = function (...greetings) {
  return function (...words) {
    return formSentence(...greetings, ...words);
  };
};
// A function with partial application
const formGreetings2 = formPartial('Good', 'Morning');
console.log(formGreetings2('Ms', 'Lloyd'));
*/

////////////////////////////////////////////////////////////////
// Coding Challenge #1
/*
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),

  // 1
  registerNewAnswer() {
    const question = `${this.question}\n${this.options.join(
      '\n'
    )}\n(Write option number)`;
    const chosen = Number(prompt(question));

    // Increment answers array with Short-ciruiting
    typeof chosen === 'number' &&
      chosen >= 0 &&
      chosen < this.options.length &&
      this.answers[chosen]++;

    // 4
    this.displayResults();
    this.displayResults('string');
  },

  // 3
  displayResults(type = 'array') {
    if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    } else if (type === 'array') {
      console.log(this.answers);
    } else {
      console.log('Invalid type');
    }
  },
};

// 2
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

// 5
var answers = [5, 2, 3];
// var answers = [1, 5, 3, 9, 6, 1];
const displayResultsEx = poll.displayResults.bind(window);
displayResultsEx();
*/
////////////////////////////////////////////////////////////////

// Closure
// The mechanism whereby a function always has access to the variable environment of the execution context
// where the function is created, even after the context is gone
/*
// Timer with closure
const scheduleMsg = function (msg) {
  setTimeout(function () {
    // Always have access to scheduleMsg's variable environment
    console.log(msg);
  }, 2000);
};

const msg = 'Joshua';
// Variable in closure takes priority over the scope chain's
scheduleMsg('Estelle');
*/

// Immediately invoked function expression (IIFE)
// A 1-time disposable function that runs once immediately and lost after that
/*
// Parenthesis around the functions are necessary to let JS treat it as a function
// expression
(function () {
  console.log('Temporary function');
})();
(() => {
  console.log('Temporary arrow');
})();
*/

////////////////////////////////////////////////////////////////
// Coding Challenge #2
/*
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
*/

/*
The callback function is declared and attached to the body element while having access to the 
variable environment of its parent function's execution context through closure.

This variable environment provides the header that is needed by the callback function to 
change the text color to blue.
*/
