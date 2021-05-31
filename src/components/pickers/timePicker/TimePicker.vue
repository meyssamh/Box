<template>
  <!-- TIME PICKER MENU -->
  <v-menu
    ref="menu"
    v-model="modal"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="time"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template #activator="{ on, attrs }">
      <!-- INPUT FIELD -->
      <v-text-field
        v-model="time"
        data-test="time-picker-text-field"
        dense
        :label="$t('time')"
        prepend-inner-icon="mdi-clock-outline"
        :rules="[validTime, timeRequired]"
        readonly
        outlined
        v-bind="attrs"
        v-on="on"
      >
      </v-text-field>
    </template>
    <!-- TIME PICKER -->
    <v-time-picker
      v-if="modal"
      v-model="time"
      data-test="time-picker-time-picker"
      dark
      color="primary"
      format="24hr"
    >
      <v-spacer></v-spacer>
      <!-- OK BUTTON -->
      <v-btn 
        class="primary" 
        data-test="time-picker-ok-button" 
        @click="submit"
      >
        {{ $t('ok') }}
      </v-btn>
      <!-- CANCEL BUTTON -->
      <v-btn 
        class="error--text" 
        data-test="time-picker-cancel-button" 
        text 
        @click="cancel"
      >
        {{ $t("cancel") }}
      </v-btn>
    </v-time-picker>
  </v-menu>
</template>

<script>
export default {
	name: 'TimePicker',
	props: ['validTime', 'timeRequired'],
	data() {
		return {
			menu: false,
			modal: false
		};
	},
	computed: {
		// Takes time from store and sets it to the store.
		time: {
			get: function() {
				return this.$store.getters.time;
			},
			set: function(value) {
				this.$store.dispatch('setTime', value);
			}
		}
	},
	methods: {
		// Submits time and closes the menu.
		submit() {
			this.$refs.menu.save(this.time);
		},
		// Closes the menu.
		cancel() {
			this.modal = false;
		}
	}
};
</script>