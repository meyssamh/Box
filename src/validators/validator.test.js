/* eslint-disable no-magic-numbers */
/* eslint-disable no-undef */
import { 
	nameRequired, countRequired, countMinimum, validDate, 
	timeRequired, validTime 
} from './validator';

describe('validator.js', () => {

	const count = 5;
	const today = new Date();
	const tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);
	const date = new Date().toISOString().slice(0, 10);
	const time = new Date().toString().slice(16, 21);
	const falseDate = new Date(1).toISOString().slice(0, 10);

	test('nameRequired returns true if the given value is a filled string', () => {
		const value = nameRequired('Bread');
		expect(value).toBe(true);
	});

	test('nameRequired returns an error message if the given value is an empty string', () => {
		const value = nameRequired('');
		expect(value).toBe('Item is required.');
	});

	test('countRequired returns true if the given value is not empty', () => {
		const value = countRequired(count);
		expect(value).toBe(true);
	});

	test('countRequired returns an error message  if the given value is empty', () => {
		const value = countRequired();
		expect(value).toBe('Count is required.');
	});

	test('countMinimum returns true if the given value is equal or greater than 1', () => {
		const value = countMinimum(count);
		expect(value).toBe(true);
	});

	test('countMinimum returns an error message if the given value is less than 1', () => {
		const value = countMinimum(-1);
		expect(value).toBe('Count must be equal or greater that 1.');
	});

	test('validDate returns true if the chosen date is valid', () => {
		const value = validDate(date);
		expect(value).toBe(true);
	});

	test('validDate returns an error message if the given value is past', () => {
		const value = validDate(falseDate);
		expect(value).toBe('Invalid date');
	});

	test('timeRequired returns true if the given time is not empty', () => {
		const value = timeRequired(time);
		expect(value).toBe(true);
	});

	test('timeRequired returns an error message if the given value is empty', () => {
		const value = timeRequired('');
		expect(value).toBe('Time is required.');
	});

	test('validTime returns true if the given date is valid', () => {
		const value = validTime(tomorrow, time);
		expect(value).toBe(true);
	});

	test('validTime returns true if the given date and time are valid', () => {
		const value = validTime(date, time);
		expect(value).toBe(true);
	});

	test('validTime returns an error message if the given time is not valid', () => {
		const oneMinuteInMilliseconds = 60000;
		const nowInMilliseconds = new Date().getTime();
		const falseTime = new Date(nowInMilliseconds - oneMinuteInMilliseconds)
			.toString().slice(16, 21);

		const value = validTime(date, falseTime);
		expect(value).toBe('Invalid time');
	});

	test('validTime returns an error message if the given date is not valid', () => {
		const value = validTime(falseDate, time);
		expect(value).toBe('Invalid date and time');
	});
});