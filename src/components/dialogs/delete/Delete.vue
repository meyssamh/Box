<template>
  <!-- DELETE DIALOG -->
  <v-card>
    <!-- TITLE -->
    <v-card-title class="primary">
      <h4 class="text-h6 mx-auto">
        {{ $t("delete") }}
      </h4>
    </v-card-title>
    <!-- MESSAGE -->
    <v-card-text>
      <p 
        class="text-body-1 mt-8" 
        data-test="delete-dialog-text"
      >
        {{ $t("deleteMessage") }}
      </p>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <!-- YES BUTTON -->
      <v-btn 
        class="error" 
        data-test="delete-yes-button" 
        @click="confirmDeleteItem"
      >
        {{ $t("yes") }}
      </v-btn>
      <!-- NO BUTTON -->
      <v-btn 
        class="primary--text" 
        text 
        data-test="delete-no-button" 
        @click="cancel"
      >
        {{ $t("no") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
	name: 'Delete',
	props: {
		closeDelete: {
			type: Function,
			required: true
		}
	},
	methods: {
		// Deletes the item and closes the dialog.
		confirmDeleteItem() {
			this.$store.dispatch('deleteItem');
			this.closeDelete();
		},
		// Closes the dialog.
		cancel() {
			this.closeDelete();
		}
	}
};
</script>