import moment from "moment";
import memoize from "memoize-one";

export const MODE_YEAR = "YEAR";
export const MODE_MONTH = "MONTH";
export const MODE_DAY = "DAY";

export const MATRIX_COUNT_ELEMENTS = 42;
export const MATRIX_EMPTY_ELEMENT_VAL = "-";

export function cssClassHelper(rules) {
	let str = "";
	Object.keys(rules).forEach((className) => {
		str += rules[className] ? className + " " : "";
	});
	return str.trim();
}

export const generateWithValue = memoize(function (count, val) {
	let array = [];
	for (let i = 0; i < count; ++i) {
		array.push(val);
	}
	return array;
});

export function generateWithFunction(count, func) {
	let array = [];
	for (let i = 0; i < count; ++i) {
		array.push(func(i));
	}
	return array;
}

export function makeDayMatrix(showedMoment) {
	const startDay = moment(showedMoment).date(1).day();
	const countOfDate = showedMoment.daysInMonth();

	return generateWithValue(startDay, MATRIX_EMPTY_ELEMENT_VAL)
			.concat(generateWithFunction(countOfDate, (i) => i + 1))
			.concat(generateWithValue(MATRIX_COUNT_ELEMENTS - startDay - countOfDate, MATRIX_EMPTY_ELEMENT_VAL));
}

export function makeYearsMatrix(showedMoment) {
	const currentYear = showedMoment.year();
	return Array.from(generateWithFunction(20, (i) => i).reverse(), (x) => currentYear - x);
}

export function formatNumberOfMonth(i) {
	return i < 10 ? `0${i}` : i;
}