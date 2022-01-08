// Importing specific named exports
// Imported varibles can be renamed with "as", with RHS being the new name
/*
import {
  addToCart,
  totalPrice as price,
  totalQuantity as quantity,
} from './shoppingCart.js';

console.log('Importing module'); // Executed after shoppingCart module is imported and executed
addToCart('Banana', 10);
console.log(price, quantity);
*/

// Importing all named exports from a module
/*
// import shoppingCart from './shoppingCart.js';
import * as ShoppingCart from './shoppingCart.js';
ShoppingCart.addToCart('Banana', 10);
console.log(ShoppingCart.totalPrice);
*/

// Importing default export
// No {} around the thing to export
// Can put any name you desired
/*
import anotherAddToCart from './shoppingCart.js';
anotherAddToCart('Egg', 10);
*/

// Proof that what's imported is the reference of the value instead of a copy of the value
/*
import { cart } from './shoppingCart.js';
addToCart('a', 1);
addToCart('b', 2);
addToCart('c', 3);
console.log('Cart:', cart); // Cart is no longer empty which it is during import
*/

// Top level await (ES2022)
// "await" can now be used at the top level (ie. no nesting) without being in an async function
// -> Only in modules
// -> Can block the whole module's execution while awaiting
//         -> By blocking the module's execution, the modules that are dependent on that module are blocked as well
/*
const res = await fetch('https://api.magicthegathering.io/v1/sets');
const sets = await res.json();
console.log(sets);
console.log('SHOULD HAVE LOGGED BEFORE RESPONSE FROM API'); // Blocked from logging

const getLastSet = async function () {
  const res = await fetch('https://api.magicthegathering.io/v1/sets');
  const { sets } = await res.json();
  return { name: sets.at(-1).name, releaseAt: sets.at(-1).releaseDate };
};
console.log('Attempt for set:', getLastSet()); // async fucntion
getLastSet().then(set => console.log('Attempt for set:', set));

const awaitedSet = await getLastSet();
console.log('Attempt for set:', awaitedSet);
*/

// Module pattern: What was used before Modules are available natively
// Since const and let variables is block scoped, these variables below are private to the function
// giving the return object the illusion of a Public API while allow its method to still have access
// to the private variables
/*
const ShoppingCart = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 123;
  const totalQuantity = 10;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} has been added to cart`);
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();
// Through closure, the variable environment for .addToCart(...) is accessible. With that,
// the actual cart variable remains accessible and modificable
console.log(ShoppingCart);
ShoppingCart.addToCart('banana', 5);
console.log(ShoppingCart);
*/

// CommonJS - The module system that Node.JS uses before adopt ES Modules
// Many packages are still using this module system
// Rough example for importing and exporting with Common JS:
/*
  const {addToCart} = require("./shoppingCart.js")
  ...
  export.addToCart = function(...) {...}
*/

// Basic terminal commands
/*
  "cd" can be tabbed to autocomplete
  mkdir FOLDER_NAME
  touch FILE_TO_CREATE.FORMAT [, ...]
  rm FILE_TO_DELETE.FORMAT
  mv FILE_TO_MOVE.FORMAT DEST_DIRECTORY
*/

// NPM commands
/*
npm init
npm install
npm install PACKAGE_NAME [, ...]
npm install PACKAGE_NAME --save-dev
npm install PACKAGE_NAME -g

npx COMMAND => Execute a command (eg. parcel index.html) in the context of NPM
*/

// Example of importing and using a module (eg. Lodash)
// Importing without any module bundler, impractical
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
// Importing with Parcel, path can be shorter as Parcel can find the module and corresponding file
import { cloneDeep } from 'lodash-es';

const state = {
  hand: [
    { suit: 'Spade', value: 2 },
    { suit: 'Heart', value: 10 },
  ],
  player: { name: 'Sam', balance: 250 },
};
const nativeClone = Object.assign({}, state);
const lodashClone = cloneDeep(state);
state.player.balance = 999;
// native's copy was modified | lodash's copy was not modified
// Lodash is performing true deep copy
console.log(nativeClone, lodashClone);

import addToCart, { cart } from './shoppingCart.js';
addToCart('a', 1);
addToCart('b', 2);
addToCart('c', 3);

// How to bundle with Parcel
/*
  1) npx parcel ENTRY_POINT
  2) Add "parcel ENTRY_POINT" as a NPM script into package.json
  where ENTRY_POINT is a file like index.html
*/

// Hot module replacement
// If this module is updated, saving this module will inject the changes
// to the browser without trigger whole page reload
//  -> Allow the application to maintain state if unrelated modules are updated
if (module.hot) {
  module.hot.accept();
}

// What is module bundling
/*
  Joining all the modules and packages that the developer uses into
  1 large .js file with code compression and removal of unnecessary code. 
  This gives the benefits of:
    1) Support for older browsers that does not support modules
    2) Much faster transfer to client through lesser files and smaller size
*/

// Transpiling
/*
  Convert >ES5 code into backwards compatible code for older browsers
  that does not provide new features (Eg. es6's modules)
    -> Some features are impossible to directly convert them into older JS code and
    they will require polyfilling
*/
// Examples on impossible to rewrite features
console.log(cart.find(item => item.quantity >= 2));
Promise.resolve('DONE').then(res => console.log(res));

// Babel
/*
  A toolchain that uses plugins or presets to determine and convert the
  given code to backwards compatible code
*/

// Polyfilling
/*
  Providing modern functionality by re-creating them with older code
  eg. Providing Array.find() by re-creating .find() and adding to Array.prototype
*/
// Some polyfill libraries
import 'core-js/stable';
import 'regenerator-runtime/runtime'; // polyfill async functions
