"use strict";

// Turning on Strict Mode:
// -> Throws errors that are otherwise silent
// -> Prevent usage of syntax that are likely to be defined in future versions of ES
// When is the code interpreted with Strict Mode: https://262.ecma-international.org/6.0/#sec-strict-mode-code
/*
let hasDriversLicense = true;
hasDriverLicense = false; // Naming error only detect with Strict Mode
*/

// Function is considered as a value in JS
// Function declaration
// Hoisted to the top of the .js file (ie. Can be used before the declaration)
/*
function concat1(str1, str2) {
	return `${str1}${str2}`;
}
*/
// Function expression (Anonymous function)
// Storing function value into a variable
// Does not get hoisted
/*
const concat2 = function (str1, str2) {
	return `${str1}${str2}`;
};
*/
// Arrow function
// Short form of function expression
// Cannot use the "this" keyword
/*
const concat3 = (str1, str2) => `${str1}${str2}`;
console.log(
	concat1("Estelle", "Bright"),
	concat2("Estelle", "Bright"),
	concat3("Estelle", "Bright")
);
*/

////////////////////////////////////////////////////////////////////////////////////////////////
// Coding Challenge #1
/*
const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;
// Can be shorten
// const calcAverage = (score1, score2, score3) => {
// 	return (score1 + score2 + score3) / 3;
// };

// Data 1 - No one wins
const scoreDolphins = [44, 23, 71];
const scoreKoalas = [65, 54, 49];
// Data 2 - Dolphins win
// const scoreDolphins = [85, 54, 41];
// const scoreKoalas = [23, 34, 27];

const averageDolphins = calcAverage(scoreDolphins[0], scoreDolphins[1], scoreDolphins[2]);
const averageKoalas = calcAverage(scoreKoalas[0], scoreKoalas[1], scoreKoalas[2]);

function checkWinner(avgDolphins, avgKoalas) {
	if (avgDolphins >= 2 * avgKoalas) {
		console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
	} else if (avgKoalas >= 2 * avgDolphins) {
		console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
	} else {
		console.log(`No one wins (Dolphins: ${avgDolphins}, Koalas: ${avgKoalas})`);
	}
}

checkWinner(averageDolphins, averageKoalas);
*/

////////////////////////////////////////////////////////////////////////////////////////////////
// Coding Challenge #2
/*
function calcTip(bill) {
	return bill >= 50 && bill <= 300 ? 0.15 * bill : 0.2 * bill;
}
console.log(calcTip(100));

const bills = [125, 555, 44];
const tips = bills.map((bill) => calcTip(bill));
const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
console.log(bills);
console.log(tips);
console.log(totals);
*/

////////////////////////////////////////////////////////////////////////////////////////////////

// Object member access
/*
const party = {
	tanker: "Sam",
	dps: "Daniel",
	support: "Richard",
};
// Dot notation - Use when the member name is known at compile time
console.log(party.tanker);
// Bracket notation - Use when the member name is only known at runtime (ie. Name is computed or obtained at runtime)
console.log(party["tanker"]);
*/

// Array is considered as an object in JS, its methods like .push() and .pop() are just an object's method

////////////////////////////////////////////////////////////////////////////////////////////////
// Coding Challenge #3
/*
const mark = {
	fullName: "Mark Miller",
	mass: 78,
	height: 1.69,
	// using "this" keyword allow decoupling from this object's name
	calcBMI: function () {
		this.bmi = this.mass / this.height ** 2;
		return this.bmi;
	},

	// "this" keyword cannot be used due to arrow function's limitation
	// calcBMI: () => {
	// 	console.log(this);
	// 	this.bmi = this.mass / this.height ** 2;
	// 	return this.bmi;
	// },
};

const john = {
	fullName: "John Smith",
	mass: 92,
	height: 1.95,
	calcBMI: function () {
		this.bmi = this.mass / this.height ** 2;
		return this.bmi;
	},
};

mark.calcBMI();
john.calcBMI();

if (mark.bmi > john.bmi) {
	console.log(
		`${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s (${john.bmi})`
	);
} else if (john.bmi > mark.bmi) {
	console.log(
		`${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s (${mark.bmi})`
	);
} else {
	console.log(
		`${mark.fullName} and ${john.fullName} have the same BMI (${mark.bmi}, ${john.bmi})`
	);
}
*/

////////////////////////////////////////////////////////////////////////////////////////////////
// Coding Challenge #4
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

function calcTip(bill) {
	return bill >= 50 && bill <= 300 ? 0.15 * bill : 0.2 * bill;
}

for (let i = 0; i < bills.length; i++) {
	tips.push(calcTip(bills[i]));
	totals.push(bills[i] + tips[i]);
}

function calcAverage(arr) {
	let total = 0;
	for (let i = 0; i < arr.length; i++) {
		if (typeof arr[i] !== "number") {
			throw "The given array has a non-number member...";
		}
		total += arr[i];
	}
	return total / arr.length;
}

console.log(bills, tips);
console.log(totals);
// Average of totals: 275.19
console.log(`Average of totals: ${calcAverage(totals)}`);
console.log(`Average of tips: ${calcAverage(tips)}`);
