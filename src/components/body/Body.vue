<template>
  <!-- BODY -->
  <div>
    <v-container v-if="hasSavedItems" fluid>
      <v-row>
        <v-col md="10" offset-md="1" xl="6" offset-xl="3">
          <!-- LIST OF PRODUCTS -->
          <app-list data-test="body-list"></app-list>
        </v-col>
      </v-row>
    </v-container>
    <!-- EMPTY PAGE WITH INFO -->
    <app-sheet v-else data-test="body-sheet"></app-sheet>
    <!-- ALERT -->
    <app-alert v-if="renderAlert" data-test="body-alert"></app-alert>
    <!-- ACTION BUTTON -->
    <app-action-button data-test="body-fab"></app-action-button>
  </div>
</template>

<script>
// Async imports for build
// const List = () => import('~/list/List');
// const Sheet = () => import('~/sheet/Sheet');
// const ActionButton = () => import('~/actionButton/ActionButton');
// const Alert = () => import('~/alert/Alert');

// Sync imports for test
import List from '~/list/List';
import Sheet from '~/sheet/Sheet';
import ActionButton from '~/actionButton/ActionButton';
import Alert from '~/alert/Alert';

export default {
	name: 'Body',
	components: {
		'app-sheet': Sheet,
		'app-action-button': ActionButton,
		'app-list': List,
		'app-alert': Alert,
	},
	computed: {
		// Checks if the user have saved items, so we can render list and
		// don't render the app-sheet.
		hasSavedItems() {
			// eslint-disable-next-line no-magic-numbers
			return this.$store.getters.items.length !== 0 ? true : false;
		},
		// Renders alert message for notification permission only if the 
		// user has the ability to get them.
		renderAlert() {
			if(!('serviceWorker' in navigator)) {
				return false;
			}
			
			if (!('PushManager' in window)) {
				return false;
			}

			return true;
		},
	}
};
</script>
