import moment from "moment";

import {
	generateWithValue,
	generateWithFunction,
	makeDayMatrix,
	makeYearsMatrix,
	formatNumberOfMonth,
	cssClassHelper
} from "../src/share/util";

test('generateWithValue(2, 1) to equal [1, 1]', () => {
	expect(generateWithValue(2, 1)).toEqual([1,1])
});

test('generateWithFunction(2, (i) => i + 1)) to equal [1, 2]', () => {
	expect(generateWithFunction(2, (i) => i + 1)).toEqual([1,2])
});

test('makeDayMatrix for 10/2019', () => {
	expect(makeDayMatrix(moment("10/2019", "MM/YYYY"))).toEqual([
		"-", "-", 1, 2, 3, 4, 5,
		6, 7, 8, 9, 10, 11, 12, 13,
		14, 15, 16, 17, 18, 19, 20,
		21, 22, 23, 24, 25, 26, 27,
		28, 29, 30, 31, "-", "-", "-", 
		"-", "-", "-", "-", "-", "-"
	]);
});

test('makeYearsMatrix for current year', () => {

	const years = [];
	for (var i = moment().year(); i > moment().year() - 20; --i) {
		years.push(i);	
	}

	expect(makeYearsMatrix(moment("2020", "YYYY"))).toEqual(years.reverse());
});

test('formatNumberOfMonth', () => {
	expect(formatNumberOfMonth(1)).toBe('01');
	expect(formatNumberOfMonth(10)).toBe(10);
});

test('cssClassHelper', () => {
	expect(cssClassHelper({
		"a": true,
		"b": true,
		"c": false
	})).toBe("a b");
});