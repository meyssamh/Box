<template>
  <!-- HEADER -->
  <div>
    <v-app-bar dark flat data-test="component-app-bar">
      <!-- NAVIGATION ICON -->
      <v-app-bar-nav-icon 
        :disabled="disabled"
        data-test="component-nav-icon"
        @click="showDrawer"
      >
      </v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <!-- TITLE -->
      <v-app-bar-title data-test="component-title">
        BOX
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-menu dark offset-y>
        <template #activator="{ on, attrs }">
          <!-- DROPDOWN BUTTON -->
          <v-btn 
            depressed 
            class="pa-0" 
            v-bind="attrs" 
            data-test="component-language-button" 
            v-on="on"
          >
            <img 
              :src="languageFlag" 
              data-test="component-flag-icon"
            />
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <!-- FLAGS -->
        <v-list data-test="component-dropdown">
          <!-- GERMAN FLAG -->
          <v-list-item
            :disabled="isButtonActive('de')"
            data-test="german-flag"
            @click="changeLanguage('de')"
          >
            <img :src="german" alt="german" />
          </v-list-item>
          <!-- US FALG -->
          <v-list-item
            :disabled="isButtonActive('en')"
            data-test="english-flag"
            @click="changeLanguage('en')"
          >
            <img :src="english" alt="english" />
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <!-- DRAWER -->
    <v-navigation-drawer
      v-if="!disabled"
      v-model="drawer"
      data-test="header-drawer"
      dark
      absolute
      temporary
    >
      <v-container>
        <v-row align="center" class="ma-0">
          <!-- NOTIFICATION TEXT -->
          <p class="mb-1 white--text">
            {{ $t('activateNotifications') }}:
          </p>
          <v-spacer></v-spacer>
          <!-- NOTIFICATION SWITCHER -->
          <v-switch 
            v-model="switchNotifications" 
            color="green"
          >
          </v-switch>
        </v-row>
      </v-container>
    </v-navigation-drawer>
  </div>
</template>

<script>
import EnglishFlag from '%/static/flags/en.png';
import GermanFlag from '%/static/flags/de.png';
const urlBase64ToUint8Array = () => import('&/urlBase64ToUint8Array');

export default {
	name: 'Header',
	data() {
		return {
			german: GermanFlag,
			english: EnglishFlag,
			drawer: false,
			disabled: false,
			switchNotifications: false,
		};
	},
	computed: {
		// Defines which flag must be shown for language.
		languageFlag() {
			const locale = this.$i18n.locale;
			if (locale === 'de') {
				return GermanFlag;
			} else if (locale === 'en') {
				return EnglishFlag;
			} else {
				return EnglishFlag;
			}
		},
	},
	watch: {
		/**
		 * A mechanism for getting permission from users to send the notifications.
		 * 
		 * @param {Boolean} val - value of the switch
		 */
		switchNotifications(val) {
			if (val) {
				this.getRequestPermission();
			}
			localStorage.setItem('notifications', val);
		}
	},
	created() {
		this.disableNavigationMenu();
		this.initializeNotificationSwitcher();
	},
	methods: {
		// Changes language to selected language.
		changeLanguage(language) {
			this.$i18n.locale = language;
			localStorage.setItem('locale', language);
		},
		// Finds out if the language is selected and disables selected language button.
		isButtonActive(language) {
			return this.$i18n.locale === language ? true : false;
		},
		// Shows/Hides navigation drawer.
		showDrawer() {
			this.drawer = !this.drawer;
		},
		// Disables the navigation menu button.
		disableNavigationMenu() {
			if (!('serviceWorker' in navigator)) {
				return this.disabled = true;
			}

			if (!('PushManager' in window)) {
				return this.disabled = true;
			}
		},
		// Recieves the notifications from localStorage ( if th user wants to 
		// recieve notifications) and sets its value to switchNotifications.
		initializeNotificationSwitcher() {
			const value = JSON.parse(localStorage.getItem('notifications'));

			this.switchNotifications = value;
		},
		// Asks user for Notifications request permission and after that 
		// subscribes user to pushManager.
		getRequestPermission() {
			// An if-statement for requesting permission to send Notifications to the user.
			if (!('Notification' in window)) {
				alert(this.$t('alertNotifications'));
			}

			// If Notification.permission is not granted yet,
			// will ask the user for permission.
			const permission = Notification.permission;
			if (permission !== 'granted') {
				Notification.requestPermission()
					.then(result => {
						if (result === 'granted') {
							this.subscribeUserToPush();
						} else {
							this.switchNotifications = false;
						}
					});
			}
		},
		// Subscribes user to pushManager.
		subscribeUserToPush() {
			if (!('serviceWorker' in navigator)) {
				// we will return and do nothing if the is no serviceWorker in navigator.
				return;
			} else {
				navigator.serviceWorker.ready
					.then(registration => {
						// Subscribes user to PushManager with the correct options.
						const vapidPublicKey = /* PUT VAPID PUBLIC KEY THERE --> */'';
						const convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
						const subscribeOptions = {
							userVisibleOnly: true,
							applicationServerKey: convertedVapidPublicKey,
						};

						return registration.pushManager.subscribe(subscribeOptions);
					})
					.then(pushSubscription => {
						// Sends the push subscription promise to database for future uses.
						return fetch(/* PUT YOUR DATABASE ADDRESS THERE --> */'', 
							{
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
									'Accept': 'application/json'
								},
								body: JSON.stringify(pushSubscription)
							});
					})
					.then(response => {
						// If the response is ok (with status 200) will show the user a
						// notification message from service worker.
						if (response.ok) {
							this.displayNotificationConfirmation();
						}
					})
					.catch(err => {
						// Throws Error when something goes wrong.
						throw new Error(err);
					});
			}
		},
		// Shows a Notification message to the user from service worker.
		displayNotificationConfirmation() {
			if ('serviceWorker' in navigator) {
				const options = {
					body: this.$t('notificationBody'),
					icon: '/static/icons/favicon-144x144.png',
					// eslint-disable-next-line no-magic-numbers
					vibrate: [100, 50, 150, 200, 50],
					tag: 'confirm-notification',
					renotify: true,
					badge: 'static/icons/favicon-48x48.png',
					actions: [
						{ 
							action: 'confirm', 
							title: this.$t('confirm'), 
							icon: '/static/icons/favicon-144x144.png'
						},
						{ 
							action: 'cancel', 
							title: this.$t('cancel'), 
							icon: '/static/icons/favicon-144x144.png'
						},
					],
				};

				navigator.serviceWorker.ready
					.then(registration => {
						registration.showNotification(this.$t('notificationTitle'), options);
					});
			}
		},
	},
};
</script>
						