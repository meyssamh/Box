<template>
  <!-- DATE PICKER MENU -->
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    max-width="290px"
    min-width="auto"
  >
    <template #activator="{ on, attrs }">
      <!-- INPUT FIELD -->
      <v-text-field
        :value="formattedDateWithMomentjs"
        data-test="date-picker-text-field"
        dense
        :label="$t('date')"
        :rules="[validDate]"
        prepend-inner-icon="mdi-calendar-outline"
        readonly
        outlined
        v-bind="attrs"
        v-on="on"
      >
      </v-text-field>
    </template>
    <!-- DATE PICKER -->
    <v-date-picker
      v-model="date"
      data-test="date-picker-date-picker"
      dark
      color="primary"
      :locale="$i18n.locale"
    >
      <v-spacer></v-spacer>
      <!-- OK BUTTON -->
      <v-btn 
        class="primary"
        data-test="date-picker-ok-button"
        @click="submitDate"
      >
        {{ $t('ok') }}
      </v-btn>
      <!-- CANCEL BUTTON -->
      <v-btn 
        class="error--text" 
        data-test="date-picker-cancel-button" 
        text 
        @click="cancel"
      >
        {{ $t("cancel") }}
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
import moment from 'moment';

export default {
	name:'DatePicker',
	props: ['validDate'],
	data() {
		return {
			menu: false,
		};
	},
	computed: {
		// Takes date from store and sets it to the store.
		date: {
			get: function() {
				return this.$store.getters.date;
			},
			set: function(value) {
				this.$store.dispatch('setDate', value);
			}
		},
		// Formates the date for the preferred language.
		formattedDateWithMomentjs() {
			moment.locale(this.$i18n.locale);
			return this.date ? moment(this.date).format('L') : '';
		}
	},
	methods: {
		// Submits date and closes the menu.
		submitDate () {
			this.$refs.menu.save(this.date);
		},
		// Closes the menu.
		cancel () {
			this.menu = false;
		}
	}
};
</script>