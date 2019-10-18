import moment from "moment";
import { debug } from "./logger.js";

export const MODE_YEAR = "YEAR";
export const MODE_MONTH = "MONTH";
export const MODE_DAY = "DAY";

export const MATRIX_COUNT_ELEMENTS = 42;
export const MATRIX_EMPTY_ELEMENT_VAL = "-";

export function cssClassHelper(rules) {
	let str = "";
	for (let className in rules) {
		str += rules[className] ? className + " " : "";
	}

	return str;
}

export function generateWithValue(count, val) {
	let array = [];
	for (var i = 0; i < count; ++i) {
		array.push(val);
	}
	return array;
}

export function generateWithFunction(count, func) {
	let array = [];
	for (var i = 0; i < count; ++i) {
		array.push(func(i));
	}
	return array;
}

export function makeDayMatrix(showedMoment) {
	const startDay = moment(showedMoment).date(1).day();
	debug("startDay: ", startDay);
	const countOfDate = showedMoment.daysInMonth();
	debug("countOfDate: ", countOfDate);

	let daysInMonth = generateWithValue(startDay, MATRIX_EMPTY_ELEMENT_VAL)
			.concat(generateWithFunction(countOfDate, (i) => i + 1))
			.concat(generateWithValue(MATRIX_COUNT_ELEMENTS - startDay - countOfDate, MATRIX_EMPTY_ELEMENT_VAL));
	debug("daysInMonth: ", daysInMonth);
	return daysInMonth;
}

export function makeYearsMatrix(showedMoment) {
	const currentYear = showedMoment.year();
	debug("currentYear: ", currentYear);

	const years = Array.from(generateWithFunction(20, (i) => i).reverse(), (x) => currentYear - x);
	debug("years: ", years);
	return years;
}

export function formatNumberOfMonth(i) {
	return i < 10 ? `0${i}` : i;
}