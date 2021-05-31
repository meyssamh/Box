<template>
  <!-- FORM -->
  <v-form>
    <v-card>
      <!-- TITLE -->
      <v-card-title class="primary">
        <h4 class="text-h6 mx-auto">
          {{ $t(type) }}
        </h4>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <!-- ITEM NAME FIELD -->
          <v-text-field
            v-model.trim="item"
            data-test="item-text-field"
            class="pt-7"
            :label="$t('item')"
            :placeholder="$t('itemPlaceholder')"
            :rules="[itemNameRequired]"
            outlined
            dense
            clearable
          >
          </v-text-field>
          <!-- ITEM COUNT FIELD -->
          <v-text-field
            v-model.number="count"
            data-test="count-text-field"
            :label="$t('count')"
            :rules="[itemCountRequired, itemCountMinimum]"
            type="number"
            min="1"
            outlined
            dense
          >
          </v-text-field>
          <!-- DATE PICKER -->
          <app-date-picker 
            data-test="app-date-picker"
            :validDate="itemValidDate"
          >
          </app-date-picker>
          <!-- TIME PICKER -->
          <app-time-picker 
            data-test="app-time-picker"
            :validTime="itemValidTime" 
            :timeRequired="itemTimeRequired"
          >
          </app-time-picker>
        </v-form>
      </v-card-text>
      <!-- LINE -->
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- ADD OR EDIT BUTTON -->
        <v-btn 
          class="primary" 
          data-test="item-submit-button" 
          :disabled="disable"
          @click="submitNewItem"
        >
          {{ $t(type) }}
        </v-btn>
        <!-- CANCEL BUTTON -->
        <v-btn 
          class="error--text" 
          data-test="item-cancel-button" 
          text 
          @click="cancel"
        >
          {{ $t("cancel") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex';

import DatePicker from '~/pickers/datePicker/DatePicker';
import TimePicker from '~/pickers/timePicker/TimePicker';
import { 
	nameRequired, countRequired, countMinimum, timeRequired, validDate, validTime
} from '_/validator';

export default {
	name: 'Add',
	components: {
		'app-date-picker': DatePicker,
		'app-time-picker': TimePicker,
	},
	props: {
		close: {
			type: Function,
			required: true
		},
		type: {
			type: String,
			required: true
		}
	},
	computed: {
		...mapGetters({
			itemField: 'item',
			countField: 'count',
			dateField: 'date',
			timeField: 'time' 
		}),
		// Gets and sets value of item input field.
		item: {
			get: function() {
				return this.itemField;
			},
			set: function(value) {
				this.$store.dispatch('setItem', value);
			}
		},
		// Gets and sets value of count input field.
		count: {
			get: function() {
				return this.countField;
			},
			set: function(value) {
				this.$store.dispatch('setCount', value);
			}
		},
		// Returns error when item input field is empty.
		itemNameRequired() {
			return nameRequired(this.itemField);
		},
		// Returns error when count input field is empty.
		itemCountRequired() {
			return countRequired(this.countField);
		},
		// Returns error when minimum rule is not fulfilled in count input field.
		itemCountMinimum() {
			return countMinimum(this.countField);
		},
		// Returns error when date is not valid.
		itemValidDate() {
			return validDate(this.dateField);
		},
		// Returns error when time input field is empty.
		itemTimeRequired() {
			return timeRequired(this.timeField);
		},
		// Returns error when date and time are not valid.
		itemValidTime() {
			return validTime(this.dateField, this.timeField);
		},
		// Disables the submit button.
		disable() {
			if (
				typeof this.itemNameRequired != 'boolean' ||
				typeof this.itemCountRequired != 'boolean' ||
				typeof this.itemCountMinimum != 'boolean' ||
				typeof this.itemValidDate != 'boolean' ||
				typeof this.itemTimeRequired != 'boolean' ||
				typeof this.itemValidTime != 'boolean'
			) {
				return true;
			}
			return false;
		},
	},
	methods: {
		// Submits the item and closes the dialog.
		submitNewItem() {
			this.$store.dispatch('newItem');
			this.close();
		},
		// Closes the dialog.
		cancel() {
			this.close();
		}
	},
};
</script>
