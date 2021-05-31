/* eslint-disable no-magic-numbers */

// Our language preference with english chosen as default.
export const locale = localStorage.getItem('locale') ?
	localStorage.getItem('locale') :
	navigator.language.slice(0, 2) === 'en' ?
		'en' :
		navigator.language.slice(0, 2) === 'de' ?
			'de' :
			'en';