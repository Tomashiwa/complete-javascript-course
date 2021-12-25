'use strict';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (...itemIndexes) {
    const items = [...this.starterMenu, ...this.mainMenu].filter(
      (item, index) => itemIndexes.includes(index)
    );
    return `You've ordered ${items}`;
  },
};

// Optional chaining (?.) - ES2020
// Returns the return value from left operand if it is not nullish. Otherwise, return undefined

/*
// Chaining a value/object
// Since coordinates does not exists, x is undefined
const x = restaurant.coordinates?.x;
console.log(x);
// Since mon does not exists in openingHours, openingMon is undefined
const openingMon = restaurant.openingHours?.mon?.open;
console.log(openingMon);

// Chaining a method
// Since order exists, the proper value is returned
console.log(restaurant.order?.(1, 3));
// Since orderItems does not exist, undefined is returned
console.log(restaurant.orderItems?.(1, 3));

// Chaining an array element
const fourthMain = restaurant.mainMenu[3]?.price;
console.log(fourthMain);

// Combining with nullish coalescene operator
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  const opening = restaurant.openingHours[day]?.open ?? 'NOT FOUND';
  console.log(`Opening hours of ${restaurant.name} on ${day}: ${opening}`);
}
*/

// Looping through object's properties
/*
// Iterate by properties' keys
const openingDays = Object.keys(restaurant.openingHours);
console.log(openingDays);
// Iterate by properties' values
const openingTimings = Object.values(restaurant.openingHours);
console.log(openingTimings);
// Iterate by properties' entries (ie. [key, value])
for (const [day, { open, close }] of Object.entries(restaurant.openingHours)) {
  console.log(`${restaurant.name} opens on ${day} from ${open} to ${close}`);
}
*/

// Destructuring array
// Splitting array items into individual variables
/*
let [dish1, , dish3] = restaurant.mainMenu;
console.log(dish1, dish3);

// Shortcut for swapping variable values
[dish1, dish3] = [dish3, dish1];
console.log(dish1, dish3);

// Splitting nested arrays
const [spell1, [spell2, spell3, spell4]] = ['Fire', ['Cure', 'Cura', 'Curaga']];
console.log(spell1, spell2, spell3, spell4);

// Setting default values
const [num1, num2, num3 = -1] = [1, 2];
console.log(num1, num2, num3);
*/

// Destructuring object
/*
// Extracting attributes into individual variables, attribute name and variable name must be the same
const {
  mainMenu,
  openingHours: {
    fri,
    sat: { open },
  },
} = restaurant;
console.log(mainMenu, fri, open);

// Can rename and set default value
const {
  name: restaurantName,
  location: address,
  coordinates = [],
} = restaurant;
console.log(restaurantName, address, coordinates);

// Can destructure when passing object into functions
const player = { id: 1, name: 'Eyon', gender: 'Male', occupation: 'Axemaster' };
function printProfile({ id, name, gender, occupation }) {
  console.log(`${name} (#${id}) is a ${gender} ${occupation}.`);
}
printProfile(player);

// Modify existing variables with destructured values
let a = 11;
let b = 22;
({ a, b } = { a: 1, b: 2, c: 3 });
console.log(a, b);
*/

// Spread operator
/*
// Supported by Arrays, Strings, Maps, Sets, Objects
const arr = [1, 2, 3];
const str = 'Enryu';
const map = new Map([
  ['1', 'a'],
  ['2', 'b'],
]);
const set = new Set([3, 2, 1]);
const obj = { a: 1, b: 2, c: 3 };
console.log(...arr);
console.log(...str);
console.log(...map);
console.log(...set);
console.log({ ...obj });

// Shallow copying
const arr2 = [...arr];
console.log(arr, arr2);

// Conjunction
const arr3 = [...arr, 4, 5, 6, ...arr];
console.log(arr3);

// Passing into function
function sumTrio(num1, num2, num3) {
  console.log(num1 + num2 + num3);
}
sumTrio(...arr);

// Deep copy the top-level data and shallow copy the sub-level data (nested data)
// Deep copy --> Clone object by copying the values of the object to new memory address
// Shallow copy --> Clone object by copying the memory address of the original object
const obj2 = { id: '123', desc: { item: 'knife' } };
const obj3 = { ...obj2 };
obj3.id = '456';
obj3.desc.item = 'Tomahawk';
console.log(obj2, obj3);
*/

// Rest operator
/*
// Used at left side of assignment to gather trailing array elements as an array or remaining object properties as an object
const [item1, ...otherItems] = restaurant.starterMenu;
console.log(item1, otherItems);
const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat, weekdays);

// Used to gather trailing parameters as an array that is passed into a function
function constructChair(material, ...components) {
  console.log(`Construct a ${material} chair with ${components}`);
}
constructChair('Wooden', 'Wheels', 'Lambar Support', 'Armrest');
*/

// Short-ciruiting (Using OR or AND on non-boolean variables)
/*
// OR operator -> Return the left operand if it is truthy. Otherwise, return the right operand
console.log(123 || 'Toma'); // 123
console.log('' || 'Toma'); // Toma
console.log(true || 'Toma'); // true
console.log(undefined || ''); // ""
console.log('' || undefined || 0 || 'Toma' || null || 123); // "Toma"

// Assigning default value if does not exist
const coordinates = restaurant.coordinates || { x: 1, y: 2, z: 3 };
console.log(coordinates); // {x: 1, y: 2, z: 3}
console.log('............................................');

// AND operator -> Return the left operand if it is falsy. Otherwise, return the right operand
console.log(0 && 'Toma'); // 0
console.log(123 && 'Toma'); // Toma
console.log(true && 'Toma' && undefined && 123); // undefined

// Checking existance before accessing it
function generateMsg() {
  return 'PDF successfully archived.';
}
console.log(restaurant.generateErr && restaurant.generateErr()); // undefined
console.log(generateMsg && generateMsg()); // PDF successfully archived
*/

// Nullish coalescing operator (??)
// Return the left operand if it is not nullish. Otherwise, return the right operand.
// Nullish values -> null, undefined
/*
let str = restaurant.address ?? 'ADDRESS NOT FOUND';
console.log(str); // ADDRESS NOT FOUND
str = restaurant.name ?? 'NAME NOT FOUND';
console.log(str); // Classico Italiano
*/

// Coding challenge #1
/*
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const [players1, players2] = game.players;
console.log(players1, players2);

const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

const allPlayers = [...players1, ...players2];
console.log(allPlayers);

const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

function printGoals(...players) {
  players.forEach(player => console.log(player));
  console.log(`# of goals scored: ${players.length}`);
}
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);

let winner = (game.odds.team1 <= game.odds.team2 && 'team1') || 'team2';
console.log(winner);
*/

/////////////////////////////////////////////////////////////////////////////////////

// Other ways of iterating with for loops
/*
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item);

for (const [index, element] of menu.entries())
  console.log(`${index + 1}: ${element}`);
*/

// Enhanced object literals
// Can compute property name at run time
/*
const player = {
  name: 'Toma',
  [`class${1 + 2}`]: 'Priest',
};
console.log(player);
*/

/////////////////////////////////////////////////////////////////////////////////
// Coding challenge #2
/*
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1
for (const [index, player] of game.scored.entries()) {
  console.log(`Goal ${Number(index) + 1}: ${player}`);
}

// 2
const odds = Object.values(game.odds);
let averageOdds = 0;
for (const value of odds) {
  averageOdds += value;
}
averageOdds /= odds.length;
console.log(averageOdds);

// 3
for (const [alignment, odd] of Object.entries(game.odds)) {
  const result = game[alignment] ? `victory ${game[alignment]}` : 'draw';
  console.log(`Odd of ${result}: ${odd}`);
}

// 4
const scorers = {};
for (const scorer of game.scored) {
  scorers[scorer] = (scorers[scorer] ?? 0) + 1;
}
console.log(scorers);
*/

// Set

/*
// Can be created by passing in an iterable
const spells = ['Fira', 'Firaga', 'Cure', 'Fira', 'Cure'];
const spellSet = new Set(spells);
console.log(spellSet);

// Set is mainly to check whether an unique element exists
console.log(spellSet.has('Cure'));
console.log(spellSet.has('Curaga'));

// Adding and removing elements
spellSet.add('Blizzard');
spellSet.add('Blizzara');
spellSet.delete('Fira');
console.log(spellSet);

// Converting to an array
const uniqueSpells = [...spellSet]; // Set is also an iterable
console.log(uniqueSpells);
*/

// Map
// Stores key-value pair (of any type, primitives or objects)
// Difference with Object
// 1. Object's key can only be a string or symbol
// 2. Map is an iterable, Object is not
// 3. Map's pairs are ordered by insertion order, Object's entries ordering are not guranteed
/*
const map = new Map();
map.set('KEY_HERE', 'VALUE_HERE');
console.log(map);
console.log(map.size);
console.log(map.has('KEY_HERE'));
console.log(map.get('KEY_HERE'));

// When using an object as a key, must store its memory address for reuse (retrieving etc)
const ticket = { id: 12345, pass: 'abcde' };
map.set(ticket, true);
console.log(map);
console.log(map.get({ id: 12345, pass: 'abcde' }));
console.log(map.get(ticket));

map.delete('KEY_HERE');
console.log(map);

// Map can be represented as a 2D array and thus, can be constructed using it
const question = new Map([
  ['question', "What is Estelle's surname?"],
  [1, 'Ashtray'],
  [2, 'Bright'],
  [3, 'Russell'],
  ['correct', 2],
  [true, "Congrats, you're a trails freak 🚆"],
  [false, 'Try again!'],
]);
console.log(question);

// Arrays of [key, value]
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Answer ${key}: ${value}`);
  }
}

const answer = Number(prompt("What's your answer?"));
console.log(question.get(question.get('correct') === answer));

console.log([...question]);
console.log(question.keys());
console.log(question.values());
*/

/////////////////////////////////////////////////////////////////////////////////////
// Coding Challenge #3
/*
const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁  Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁  Substitution'],
  [64, '🔶  Yellow card'],
  [69, '🔴  Red card'],
  [70, '🔁  Substitution'],
  [72, '🔁  Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶  Yellow card'],
]);

// 1
const eventSet = new Set(gameEvents.values());
const events = [...eventSet];
console.log(events);

// 2
gameEvents.delete(64);

// 3
const occurances = new Map();
for (const [timing, event] of gameEvents.entries()) {
  const count = (occurances.get(event) ?? 0) + 1;
  occurances.set(event, count);
}
console.log(occurances);
for (const [event, occurance] of occurances) {
  console.log(
    `${event} happened, on average ${occurance / 10} times, every 9 minutes`
  );
}
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);

// 4
for (const [timing, event] of gameEvents) {
  console.log(
    `[${timing <= 45 ? 'FIRST HALF' : 'SECOND HALF'}] ${timing}: ${event}`
  );
}
*/

//////////////////////////////////////////////////////////////////////////////

// String
/*
const sCraft = 'Wheel Of Time';

console.log(sCraft[0]); // W
console.log('Estelle'[3]); // e

console.log(sCraft.length); // 13
console.log('Estelle'.length); // 7

// Find index of char/word in the string
console.log(sCraft.indexOf('Time')); // 9
console.log(sCraft.lastIndexOf('e')); // 12

// Extracting substring with .slice(beginIndex, endIndex) from beginIndex to endIndex (not inclusive)
// Cases:
// beginIndex not given --> Extract from the beginning
// beginIndex < 0 --> Extract from str.length + beginIndex
// beginIndex >= str.length --> ""
//
// endIndex not given || endIndex >= str.length --> Extract till the end
// endIndex < beginIndex --> ""
// endIndex < 0 --> Extract till str.length + endIndex

console.log(sCraft.slice()); // Wheel Of Time
console.log(sCraft.slice(6)); // Of Time
console.log(sCraft.slice(6, 8)); // Of
console.log(sCraft.slice(-4)); // Time
console.log(sCraft.slice(6, -4)); // Of

console.log(sCraft.slice(0, sCraft.indexOf(' '))); // Wheel
console.log(sCraft.slice(sCraft.lastIndexOf(' ') + 1)); // Time

// Changing character casing
function normalizeCase(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}
console.log(normalizeCase('OlIvIeR'));

// Trimming spaces and new line
const email = '   estelle@bracer.org  \n';
console.log(email.trim());

// Replacing (can use regular expression)
console.log(sCraft.replace('Time', 'Flame'));

console.log(sCraft.includes('Of'));
console.log(sCraft.startsWith('Wheel'));

// Spilt strings into an array of substrings by a substring
console.log(sCraft.split(' '));
// Joining array of substrings into a  string
console.log(['Supreme', ...sCraft.split(' '), 'EX'].join(' '));

// Padding string until it hits the target length
console.log(sCraft.padStart(20, '@').padEnd(25, '@'));

// Masking string
console.log(sCraft.slice(5).padStart(sCraft.length, '*'));

// Repeat string
console.log('Yubi'.repeat(10));
*/

///////////////////////////////////////////////////////////////////////////////////
// Coding challenge #4
/*
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

function camelise() {
  const names = document.querySelector('textarea').value.split('\n');
  for (const [index, name] of names.entries()) {
    const [first, second] = name.toLowerCase().trim().split('_');
    console.log(
      `${first}${second[0].toUpperCase() + second.slice(1)}`.padEnd(20, ' ') +
        '✅'.repeat(index + 1)
    );
  }
}
document.querySelector('button').addEventListener('click', camelise);
*/
///////////////////////////////////////////////////////////////////////////////////

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const entries = flights.split('+');

for (const entry of entries) {
  let [event, from, to, timing] = entry.split(';');

  event = event.slice(1).replace('_', ' ');
  event = `${event.includes('Delayed') ? '🔴 ' : ''}${event}`;
  from = from.slice(0, 3).toUpperCase();
  to = to.slice(0, 3).toUpperCase();
  timing = `(${timing.replace(':', 'h')})`;

  console.log(`${event} from ${from} to ${to} ${timing}`.padStart(50, ' '));
}
