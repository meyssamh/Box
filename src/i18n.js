import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

// A function for loading our local messages.
function loadLocaleMessages() {
	// eslint-disable-next-line no-undef
	const locales = require.context(
		'./locales',
		true,
		/[A-Za-z0-9-_,\s]+\.json$/i
	);
	const messages = {};
	locales.keys().forEach(key => {
		const matched = key.match(/([A-Za-z0-9-_]+)\./i);
		const index = 1;
		if (matched && matched.length > index) {
			const locale = matched[index];
			messages[locale] = locales(key);
		}
	});
	return messages;
}

export default new VueI18n({
	locale: 'de',
	fallbackLocale: 'en',
	messages: loadLocaleMessages(),
});