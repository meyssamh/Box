/* eslint-disable no-magic-numbers */
import { locale } from '&/locale';

// Error messages defined in both languages.
const errors = {
	en: {
		nameRequired: 'Item is required.',
		countRequired: 'Count is required.',
		countMinimum: 'Count must be equal or greater that 1.',
		validDate: 'Invalid date',
		timeRequired: 'Time is required.',
		validTime: {
			time: 'Invalid time',
			date: 'Invalid date and time',
		},
	},
	de: {
		nameRequired: 'Artikel ist erforderlich.',
		countRequired: 'Anzahl ist erforderlich.',
		countMinimum: 'Die Anzahl muss gleich oder größer als 1 sein.',
		validDate: 'ungültiges Datum',
		timeRequired: 'Zeit ist erforderlich.',
		validTime: {
			time: 'ungültige Zeit',
			date: 'ungültiges Datum und Uhrzeit',
		},
	},
};

/**
 * It checks if the item field ( input field ) is filled.
 * 
 * @param {String} value - value of item field
 * @returns true if item field is filled and error message if not.
 */
export const nameRequired = value => !!value || errors[locale].nameRequired;

/**
 * It checks if the count field ( input field ) is filled.
 * 
 * @param {Number} value - value of count field
 * @returns true if count field is filled and error message if not.
 */
export const countRequired = value => !!value || errors[locale].countRequired;

/**
 * It checks if the value of count field is equal or greater than one.
 * 
 * @param {Number} value - value of count field
 * @returns true if the value is equal or greater than one and error message if not.
 */
export const countMinimum = value => value >= 1 || errors[locale].countMinimum;

/**
 * It checks if the chosen date is valid.
 * 
 * @param {String} date - chosen date
 * @returns true if the chosen date is valid and error message if not.
 */
export const validDate = date => {
	const today = Date.parse(new Date().toISOString().slice(0, 10));
	const chosenDay = Date.parse(date);
	return chosenDay >= today || errors[locale].validDate;
};

/**
 * It checks if the time field is filled.
 * 
 * @param {String} value - chosen time
 * @returns true if time field is filled and error message if not.
 */
export const timeRequired = value => !!value || errors[locale].timeRequired;

/**
 * It checks if the chosen time is valid.
 * 
 * @param {String} date - chosen date
 * @param {String} time - chosen time
 * @returns true if the chosen time is valid and error message if not.
 */
export const validTime = (date, time) => {
	const parsedDate = Date.parse(date);
	const today = Date.parse(new Date().toISOString().slice(0, 10));
	const chosenDay = validDate(date);
	const currentTime = new Date().toString().slice(16, 21);
	return chosenDay === true ?
		parsedDate > today ||
		parsedDate === today && time >= currentTime ||
		errors[locale].validTime.time :
		errors[locale].validTime.date;
};