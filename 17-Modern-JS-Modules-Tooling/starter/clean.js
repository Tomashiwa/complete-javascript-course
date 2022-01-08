'strict mode';

// Change all "var" to "const"

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// Change "limits" to "spendingLimits"
// Change object to be immutable with Object.freeze(...), no addition or modification of properties in an object
// Shallow freeze
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

// Change "add" to "addExpense" for readability
// Adding "state" and "limits" as parameter to make this a function with no dependence to external variables
// Change to no more side effect, only make a copy, modify that copy and return
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  // if (!user) user = 'jonas'; // Same as setting default value for user
  const cleanUser = user.toLowerCase();
  // user = user.toLowerCase();

  // Change "var" to "let"
  // Change "lim" to "limit"
  const limit = limits[cleanUser] || 0;
  // let limit;
  // if (spendingLimits[user]) {
  //   lim = spendingLimits[user];
  // } else {
  //   lim = 0;
  // }

  return value <= limit
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;

  // if (value <= limit) {
  //   // budget.push({ value: -value, description, user });
  //   // budget.push({ value: -value, description: description, user: user });
  // }
};
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');
console.log(newBudget3);

// Change "check" to "checkExpenses"
// Change to pure function by removing side effect and passing in more params
const check = function (state, limits) {
  return state.map(entry => {
    const limit = limits[entry.user] || 0;
    return entry.value < -limit ? { ...entry, flag: 'limit' } : entry;
  });

  /*
  for (const entry of budget) {
    // Change "var" to "let"
    // Change "lim" to "limit"
    const limit = spendingLimits[entry.user] || 0;
    // let limit;
    // if (spendingLimits[entry.user]) {
    //   limit = spendingLimits[entry.user];
    // } else {
    //   limit = 0;
    // }

    if (entry.value < -limit) {
      entry.flag = 'limit';
    }
  }
  */
};
const newBudget4 = check(newBudget3, spendingLimits);
console.log(newBudget4);
// check();

// Change "bigExpenses" to "logBigExpenses"
// Change "limit" to "bigLimit"
// Change this function to pure with no side effect and use more declarative way of writing
const logBigExpenses = function (state, bigLimit) {
  return (bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / '));

  /*
  // Change var to let
  let output = '';
  // Change "el" to "entry"
  for (const entry of budget) {
    output +=
      entry.value <= -bigLimit ? entry.description.slice(-2) + ' / ' : '';
    // if (entry.value <= -bigLimit) {
    //   output += entry.description.slice(-2) + ' / '; // Emojis are 2 chars
    // }
  }
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
  */
};
console.log(logBigExpenses(newBudget4, 1000));
