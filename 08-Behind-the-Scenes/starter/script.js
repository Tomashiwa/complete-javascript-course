'use strict';

// Variable lookup through scope chain
/*
function lookupTest() {
  const str = 'Just a string';
  if (true) {
    const str = 'Just another string';
    console.log(`Block-scope: ${str}`);
  }
  console.log(`Function-scope: ${str}`);
}

lookupTest();
*/

// Hoisting
// Make variables accessible/usable before they are declared in the code
// (Before execution, code are scanned for declarations and new properties are created in variable environment object)

/*
// Variable hoisting
// console.log(card1); // Accessible but undefined
// console.log(card2); // Cannot access, still initializing
// console.log(card3); // Cannot access, still initializing
var card1 = 'Spade';
const card2 = 'Heart';
let card3 = 'Club';

// Function hoisting
// Based on what keyword was used (var/let/const)
// attack1(10); // Actual function
// attack2(10); // Undefined, cannot be used as a function
// attack3(10); // Cannot access, still initializing
function attack1(dmg) {
  console.log(`You've dealt ${dmg} damage`);
}
var attack2 = function (dmg) {
  console.log(`You've dealt ${dmg} damage`);
};
const attack3 = dmg => {
  console.log(`You've dealt ${dmg} damage`);
};
*/

// this keyword
/*
// Global execution context
console.log(this); // window

// Standard execution context (in function)
const attack1 = function () {
  console.log(this);
};
// Simple call -> undefined
attack1();

const attack2 = () => {
  console.log(this);
};
// Arrow function call -> window
attack2();

const player = {
  attack3: function () {
    console.log(this);
  },
};
// Call from object -> player object
player.attack3();
*/

function create() {
  return {
    foo: 42,
    bar: function () {
      console.log(this);
      console.log(this.foo);
    },
  };
}
// "this" in bar()
// -> bar() is a function expression that is called from the returned object
// -> method call from the returned object
// -> "this" === returned object
create().bar();

function create2() {
  return {
    foo: 42,
    bar: () => {
      console.log(this);
      console.log(this.foo);
    },
  };
}
// "this" in bar()
// -> bar() is an arrow function
// -> refer to create2's "this"
// -> create2 is called as a simple function (ie. create2())
// -> "this" === undefined
create2().bar();
