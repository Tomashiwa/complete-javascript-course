// Remember, we're gonna use strict mode in all scripts now!
"use strict";

// Console
/*
console.assert(1 === 1, "Assertion pass");
console.assert(1 === 2, "Assertion violated");
console.assert(1 === 2, { msg: "Assertion violated" });

console.warn("Warning here");
console.warn({ msg: "Warning 1..." }, { msg: "Warning 2..." });

console.error("Error here");
console.error({ msg: "Error 1..." }, { msg: "Error 2..." });

console.table([12, 29, 19, 11, 80]);
console.table({ rarity: "SSR", name: "The Shrine", desc: "..." });

console.log([12, 29, 19, 11, 80]);
console.log({ rarity: "SSR", name: "The Shrine", desc: "..." });
*/

// Coding Challenge #1
const printForecast = function (temps) {
	let str = "...";
	temps.forEach((temp, index) => {
		str = str.concat(` ${temp}C in ${index + 1} days ...`);
	});
	console.log(str);
};

const data1 = [17, 21, 23];
const data2 = [12, 5, -5, 0, 4];

printForecast(data1);
printForecast(data2);
