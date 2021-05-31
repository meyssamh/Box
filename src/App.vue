<template>
  <!-- V-APP -->
  <v-app data-test="component-app">
    <!-- HEADER -->
    <app-header data-test="component-header"></app-header>
    <!-- BODY -->
    <app-body data-test="component-body"></app-body>
  </v-app>
</template>

<script>
/* eslint-disable no-console */
import { mapActions } from 'vuex';

// Async import for build
// const Header = () => import('~/header/Header');
// const Body = () => import('~/body/Body');

// Sync import for test
import Header from '~/header/Header';
import Body from '~/body/Body';

export default {
	name: 'App',
	components: {
		'app-header': Header,
		'app-body': Body,
	},
	created() {
		this.initializeItems();
		this.initializeLocale();
		this.registerServiceWorker();
		this.notificationAlertDisplay();
	},
	methods: {
		...mapActions([
			'initialItems', 
			'setAlertDisplay', 
			'disableNavigationMenu'
		]),
		// Checks if there is items in localStorage and if this is true
		// it will initialize items to store.
		initializeItems() {
			const items = JSON.parse(localStorage.getItem('items'));

			if (items) {
				this.initialItems(items);
			}
		},
		// Finds the locale and sets it to locale in i18n.
		initializeLocale() {
			const locale = localStorage.getItem('locale');
			// Checks if we have locale in localStorage and sets it as $i18n locale.
			if (locale) {
				this.$i18n.locale = locale;
			// Checks navigator.language ans sets it as i18n locale.
			} else if (navigator.language) {		
				// eslint-disable-next-line no-magic-numbers
				this.$i18n.locale = navigator.language.slice(0,2);
			}
		},
		// Checks if there is alertDisplay in localStorage
		initializeAlertDisplay() {
			const alertDisplay = localStorage.getItem('alertDisplay');

			if (alertDisplay) {
				return true;
			}
			return false;
		},
		// Shows a message after 10 seconds of first load and
		// gives user information about push notification.
		notificationAlertDisplay() {
			const initializeAlertDisplay = this.initializeAlertDisplay();

			if (initializeAlertDisplay) {
				this.setAlertDisplay(false);
			} else {
				const timer = 5000;
				setTimeout(() => {
					this.setAlertDisplay(true);
				}, timer);
			}
		},
		// Registers serviceWorker.
		registerServiceWorker() {
			// An if-else-statement for registering ./service-worker.js
			// if the navigator has the possibility.
			if (!('serviceWorker' in navigator)) {
				localStorage.setItem('alertDisplay', true);
				return;
			} else {
				window.addEventListener('load', () => {
					navigator.serviceWorker.register('/service-worker.js');
				});
			}
		},
	}
};
</script>
