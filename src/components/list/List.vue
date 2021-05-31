<template>
  <div>
    <v-container>
      <!-- TITLE FOR SCREENS BIGGER THAN XS -->
      <v-row align="center" class="hidden-xs-only">
        <span class="text-h6 font-weight-bold">
          {{ $t('list') }}
        </span>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          data-test="list-search"
          append-icon="mdi-magnify"
          :label="$t('search')"
          single-line
        >
        </v-text-field>
      </v-row>
      <!-- TITLE FOR XS SCREEN -->
      <v-row align="center" class="hidden-sm-and-up">
        <span class="text-h6 font-weight-bold">
          {{ $t('list') }}
        </span>
      </v-row>
      <v-row align="center" class="hidden-sm-and-up">
        <!-- SEARCH -->
        <v-text-field
          v-model="search"
          data-test="list-search"
          append-icon="mdi-magnify"
          :label="$t('search')"
          single-line
        >
        </v-text-field>
      </v-row>
    </v-container>
    <!-- LIST -->
    <v-data-table
      data-test="list-data-table"
      dark
      :headers="headers"
      :items="items"
      item-key="name"
      :search="search"
      hide-default-footer
    >
      <!-- DIALOGS -->
      <template #top>
        <!-- EDIT DIALOG -->
        <v-dialog 
          v-model="dialog" 
          dark 
          max-width="500px"
        >
          <app-edit :close="closeDialog" :type="type"></app-edit>
        </v-dialog>
        <!-- DELETE DIALOG -->
        <v-dialog 
          v-model="dialogDelete" 
          max-width="500px" 
          dark
        >
          <app-delete :close-delete="closeDelete"></app-delete>
        </v-dialog>
      </template>
      <!-- ACTIONS -->
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.actions="{ item }">
        <!-- EDIT BUTTON -->
        <v-icon
          data-test="list-edit-button"
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <!-- DELETE BUTTON -->
        <v-icon
          data-test="list-delete-button"
          class="error--text"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import moment from 'moment';

// Async imports for build
// const Delete = () => import('~/dialogs/delete/Delete');
// const Edit = () => import('~/dialogs/addOrEdit/AddOrEdit');

// Sync imports for test
import Delete from '~/dialogs/delete/Delete';
import Edit from '~/dialogs/addOrEdit/AddOrEdit';

export default {
	name: 'List',
	components: {
		'app-edit': Edit,
		'app-delete': Delete
	},
	data() {
		return {
			search: '',
			dialog: false,
			dialogDelete: false,
			type: 'update',
			pushNotificationTimer: null
		};
	},
	computed: {
		// Defines the header of the list.
		headers() {
			return [
				{
					text: this.$t('item'), value: 'name'
				},
				{
					text: this.$t('count'), value: 'count'
				},
				{
					text: this.$t('date'), value: 'date'
				},
				{
					text: this.$t('time'), value: 'time'
				},
				{
					text: 'Actions', value: 'actions', sortable: false
				}
			];
		},
		// Defines list items and how the date must be shown.
		items() {
			moment.locale(this.$i18n.locale);

			let savedItems = JSON.parse(JSON.stringify(this.$store.getters.items));

			for (let item of savedItems) {
				item.date = moment(item.date).format('L');
			}

			return savedItems;
		},
	},
	watch: {
		dialog(val) {
			val || this.closeDialog();
		},
		dialogDelete(val) {
			val || this.closeDelete();
		},
	},
	created() {
		this.timer();
	},
	beforeDestroy() {
		clearInterval(this.pushNotificationTimer);
	},
	methods: {
		// Finds out which item we want to edit and opens edit dialog.
		editItem(item) {
			this.$store.dispatch('findItemForEdit', item);
			this.dialog = true;
		},
		// Finds out which item we want to delete and opens delete dialog.
		deleteItem(item) {
			this.$store.dispatch('findItemForDelete', item);
			this.dialogDelete = true;
		},
		// Closes edit dialog and resets some of values in state.
		closeDialog() {
			this.dialog = false;
			this.$store.dispatch('clearState');
		},
		// Closes delete dialog and resets some of values in state.
		closeDelete() {
			this.dialogDelete = false;
			this.$store.dispatch('clearState');
		},
		// Timer for sending push notification.
		timer() {
			const timer = 5000;

			this.pushNotificationTimer = setInterval(() => {
				this.filterSavedItems();
			}, timer);
		},
		// Filters saved items and finds out 
		// for which one we have to send push notifications.
		filterSavedItems() {
			const savedItems = this.$store.getters.items;
			const now = new Date().getTime();
				
			const sendNotifications = localStorage.getItem('notifications');

			savedItems.filter((item, index) => {
				const notified = item.notified;
				const name = item.name;
				const count = item.count;
				const date = item.date;
				const time = item.time;

				const chosenDate = new Date(`${date} ${time}`).getTime();

				if (!notified && chosenDate < now) {
					sendNotifications ? this.sendPushNotification(name, count) : null;
					this.changeNotifiedItems(index);
				}
			});
		},
		/**
		 * Sends push notifications to server.
		 * 
		 * @param {String} item - Name of the item
		 * @param {Number} count - item's count
		 */
		sendPushNotification(item, count) {
			// Finds out the chosen language, 
			// so we can send the message in chesen language.
			const locale = this.$i18n.locale;

			fetch(/* PUT YOUR SERVER ADDRESS THERE --> */'',{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					item,
					count,
					lang: locale
				})
			});
		},
		/**
		 * A function to mark items, that we sent push notifications to them.
		 * 
		 * @param {Number} index - Index of the item, that we sent a push notification for.
		 */
		changeNotifiedItems(index) {
			this.$store.dispatch('changeNotified', index);
		},
	},
};
</script>