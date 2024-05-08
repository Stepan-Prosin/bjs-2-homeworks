"use strict"

function solveEquation(a, b, c) {
	let arr = [];
	let d = b ** 2 - 4 * a * c;
	if (d > 0) {
		let x1 = (-b + Math.sqrt(d)) / (2 * a);
		let x2 = (-b - Math.sqrt(d)) / (2 * a);
		arr.push(x1, x2);
	} else if (d === 0) {
		let x = -b / (2 * a);
		arr.push(x);
	}
	return arr;
} 

function calculateTotalMortgage(percent_get, contribution, amount, countMonths) {
	let percent = percent_get / 100 / 12;
	let monthly_payment = (amount - contribution) * (percent + (percent / (((1 + percent) ** countMonths) - 1)));
	let totalAmount = monthly_payment * countMonths;

	return +totalAmount.toFixed(2);
}