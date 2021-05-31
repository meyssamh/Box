<template>
  <!-- ACTION BUTTON -->
  <div class="text-center">
    <v-dialog v-model="dialog" width="500" dark>
      <template #activator="{ on, attrs }">
        <!-- BUTTON -->
        <v-btn
          fab
          dark
          fixed
          right
          bottom
          data-test="component-fab"
          color="black"
          v-bind="attrs"
          v-on="on"
        >
          <!-- ICON -->
          <v-icon data-test="component-icon">
            mdi-plus
          </v-icon>
        </v-btn>
      </template>
      <!-- ADD OR EDIT COMPONENT -->
      <app-add-or-edit 
        data-test="component-add-dialog" 
        :close="closeDialog" 
        :type="type"
      >
      </app-add-or-edit>
    </v-dialog>
  </div>
</template>

<script>
// Async import for build
// const AddOrEdit = () => import('~/dialogs/addOrEdit/AddOrEdit');

// Sync import for test
import AddOrEdit from '~/dialogs/addOrEdit/AddOrEdit';

export default {
	name: 'Add',
	components: {
		'app-add-or-edit': AddOrEdit
	},
	data() {
		return {
			dialog: false,
			type: 'add'
		};
	},
	watch: {
		dialog(val) {
			val || this.closeDialog();
		},
	},
	methods: {
		// Closes the dialog and resets some of state items.
		closeDialog() {
			this.dialog = false;
			this.$store.dispatch('clearState');
		}
	}
};
</script>
