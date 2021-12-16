// let js = "amazing";
// if (js === "amazing") alert("JavaScript is SAD!");

// EXPLICTLY return a variable to the console to be printed
// console.log("Toma");

// Variables and Values
/*
let country = "Singapore";
let continent = "SEA";
let population = 2;
console.log(`Country: ${country}, Continent: ${continent}, Population: ${population} million`);
*/

// Data Types
/*
let isIsland = true;
let language;
console.log(typeof isIsland);
console.log(typeof population);
console.log(typeof country);
console.log(typeof language);
*/

// 3 ways to declare variables
/*
// Let -> Mutable (Block scoped)
let age = 30;
age = 31;
// Const -> Immutable, cannot be empty
const birthYear = 1996;
// Var -> Legacy way, similar to Let (Function scoped)
var job = "programmer";
job = "teacher";
*/

// Unique operators
// 2 to the power of 3
/*
console.log(2 ** 3);
*/

// Operator precedence
/*
const now = 2021;
const ageJoshua = now - 1991;
const ageEstelle = now - 1992;
// Parenthesis not required for this expression to evaluate correctly
// JS operator precedence helps to guarantee the correctness
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
console.log(now - 1991 > now - 2018);

let x, y;
// Assign operator is evaluated right to left according to the operator precedence
x = y = 25 - 10 - 5; // x = y = 10; x = 10;
*/

//////////////////////////////////////////////////////////////////////////////////////

// Coding Challenge #1
/*
const MARK_MASS_1 = 78;
const MARK_HEIGHT_1 = 1.69;
const MARK_BMI_1 = MARK_MASS_1 / MARK_HEIGHT_1 ** 2;

const JOHN_MASS_1 = 92;
const JOHN_HEIGHT_1 = 1.95;
const JOHN_BMI_1 = JOHN_MASS_1 / JOHN_HEIGHT_1 ** 2;

let markHigherBMI = MARK_BMI_1 > JOHN_BMI_1;
console.log(`Mark BMI: ${MARK_BMI_1}, John BMI: ${JOHN_BMI_1}`);
console.log(`Mark has higher BMI than John in Test 1: ${markHigherBMI}`);

const MARK_MASS_2 = 95;
const MARK_HEIGHT_2 = 1.88;
const MARK_BMI_2 = MARK_MASS_2 / MARK_HEIGHT_2 ** 2;

const JOHN_MASS_2 = 85;
const JOHN_HEIGHT_2 = 1.76;
const JOHN_BMI_2 = JOHN_MASS_2 / JOHN_HEIGHT_2 ** 2;

markHigherBMI = MARK_BMI_2 > JOHN_BMI_2;
console.log(`Mark BMI: ${MARK_BMI_2}, John BMI: ${JOHN_BMI_2}`);
console.log(`Mark has higher BMI than John in Test 2: ${markHigherBMI}`);
*/

//////////////////////////////////////////////////////////////////////////////////////

// String
/*
const userName = "Toma";
const year = 2021;
const birthYear = 1996;
const job = "programmer";
// Concatenate strings
console.log("I'm " + userName + ", a " + (year - birthYear) + " years old " + job + "!");
// Multi-line string
console.log("String with \n\
multiple \n\
lines");
*/

// Template literals
/*
// Concatenate strings
console.log(`I'm ${userName}, a ${year - birthYear} years old ${job}!`);
// Multi-line string
console.log(`String with 
multiple
lines`);
*/

//////////////////////////////////////////////////////////////////////////////////////

// Coding Challenge #2
/*
const MARK_MASS_1 = 78;
const MARK_HEIGHT_1 = 1.69;
const MARK_BMI_1 = MARK_MASS_1 / MARK_HEIGHT_1 ** 2;

const JOHN_MASS_1 = 92;
const JOHN_HEIGHT_1 = 1.95;
const JOHN_BMI_1 = JOHN_MASS_1 / JOHN_HEIGHT_1 ** 2;

let markHigherBMI = MARK_BMI_1 > JOHN_BMI_1;
if (markHigherBMI) {
	console.log(`Mark's BMI (${MARK_BMI_1}) is higher than John's (${JOHN_BMI_1})!`);
} else {
	console.log(`John's BMI (${JOHN_BMI_1}) is higher than Mark's (${MARK_BMI_1})!`);
}

const MARK_MASS_2 = 95;
const MARK_HEIGHT_2 = 1.88;
const MARK_BMI_2 = MARK_MASS_2 / MARK_HEIGHT_2 ** 2;

const JOHN_MASS_2 = 85;
const JOHN_HEIGHT_2 = 1.76;
const JOHN_BMI_2 = JOHN_MASS_2 / JOHN_HEIGHT_2 ** 2;

markHigherBMI = MARK_BMI_2 > JOHN_BMI_2;
if (markHigherBMI) {
	console.log(`Mark's BMI (${MARK_BMI_2}) is higher than John's (${JOHN_BMI_2})!`);
} else {
	console.log(`John's BMI (${JOHN_BMI_2}) is higher than Mark's (${MARK_BMI_2})!`);
}
*/

//////////////////////////////////////////////////////////////////////////////////////

// Type Conversion - Manually convert data types
/*
console.log(Number("21"));
console.log(typeof Number("21"));
console.log(String(21));
console.log(typeof String(21));
console.log(Boolean(1));
console.log(typeof Boolean(1));
// Invalid conversion will get invalid value of that type
console.log(Number("abc"));
console.log(typeof Number("abc")); // Return NaN -> Invalid num
*/

// Type Coercion
// Happens when an operator encounters 2 values with different types, JS convert 1 to match another to allow execution of that operator
/*
console.log("12" + 3); // 123 -> 3 is converted into String
console.log("12" - 3); // 9 -> "12" is converted into Number
console.log("abc" + 3); // abc3
console.log("abc" - 3); // NaN -> Invalid number
*/

// Falsy values - Values that become false when converted into Boolean
// Only 5 falsy values: 0, '', undefined, null, NaN
// Truthy values - Values that become true when converted into Boolean
// Any values that are not falsy
/*
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean("Toma")); // True
console.log(Boolean(NaN));
console.log(Boolean({})); // True
*/

// === vs ==, same for !== vs !=
/*
const age = 18;
// Strict equality, same data type same value
console.log(age === 18);
// Loose equality, perform Type Coercion before comparing
console.log(age == "18");
console.log(age === "18");
*/

//////////////////////////////////////////////////////////////////////////////////////
// Coding Challenge #3

/*
// Data 1 - No one wins
// const dolphinsScore = [96, 108, 89];
// const koalasScore = [88, 91, 110];
// Data Bonus 1 - Koalas wins
// const dolphinsScore = [97, 112, 101];
// const koalasScore = [109, 95, 123];
// Data Bonus 2 - Draw
const dolphinsScore = [97, 112, 101];
const koalasScore = [109, 95, 106];

const dolphinsAverage = (dolphinsScore[0] + dolphinsScore[1] + dolphinsScore[2]) / 3;
const koalasAverage = (koalasScore[0] + koalasScore[1] + koalasScore[2]) / 3;

if (dolphinsAverage > koalasAverage && dolphinsAverage >= 100) {
	console.log(`Dolphins wins (D: ${dolphinsAverage}, K: ${koalasAverage})`);
} else if (koalasAverage > dolphinsAverage && koalasAverage >= 100) {
	console.log(`Koalas wins (D: ${dolphinsAverage}, K: ${koalasAverage})`);
} else if (koalasAverage === dolphinsAverage && koalasAverage >= 100 && dolphinsAverage >= 100) {
	console.log(`Draw. (D: ${dolphinsAverage}, K: ${koalasAverage})`);
} else {
	console.log(`No one wins. (D: ${dolphinsAverage}, K: ${koalasAverage})`);
}
*/

//////////////////////////////////////////////////////////////////////////////////////

// Switch statement
/*
const day = "friday";
// Comparing day with other values using strict equality (ie. day === ...)
switch (day) {
	case "monday":
		console.log("Monday blue");
		break;
	case "tuesday":
		console.log("Prepwork");
		break;
	case "wednesday": // "wednesday" OR "thursday"
	case "thursday":
		console.log("Grinding");
		break;
	case "friday":
		console.log("Record videos");
		break;
	case "saturday":
	case "sunday":
		console.log("Weekend freedom");
		break;
	default:
		console.log("Invalid day");
		break;
}
*/

//////////////////////////////////////////////////////////////////////////////////////
// Coding Challenge #4
const billValues = [275, 40, 430];

billValues.forEach((value) => {
	const tip = value >= 50 && value <= 300 ? 0.15 * value : 0.2 * value;
	console.log(`The bill was ${value}, the tip was ${tip}, and the final value is ${value + tip}`);
});
