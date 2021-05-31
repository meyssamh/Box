<template>
  <div>
    <!-- OVERLAY -->
    <v-overlay 
      data-test="alert-overlay"
      :value="alertDisplay" 
      :z-index="210"
    >
    </v-overlay>
    <!-- ALERT -->
    <v-alert
      data-test="alert-alert"
      :value="alertDisplay"
      class="ml-4"
      type="info"
      color="brown lighten-1"
      border="left"
      elevation="10"
      transition="slide-x-transition"
      max-width="90%"
      style="position: absolute; bottom: 10px; z-index: 215;"
    >
      <!-- ALERT TITLE -->
      <h3 class="text-h6">
        {{ $t('alertTitle') }}
      </h3>
      <!-- LINE -->
      <v-divider
        class="my-4"
      >
      </v-divider>
      <v-row
        align="center"
        no-gutters
      >
        <!-- ALERT MESSAGE -->
        <p class="text-caption" data-test="alert-message">
          {{ $t('alertMessage') }}
        </p>
        <br>
        <!-- ALERT MESSAGE -->
        <p class="text-caption" data-test="alert-tipp">
          {{ $t('alertTipp') }}
        </p>
        <v-row class="mt-6 mb-2 mr-2">
          <v-spacer></v-spacer>
          <!-- BUTTON -->
          <v-btn
            data-test="alert-button"
            small
            class="brown"
            elevation="4"
            @click="hideAlert"
          >
            {{ $t('close') }}
          </v-btn>
        </v-row>
      </v-row>
    </v-alert>
  </div>
</template>

<script>
export default {
	name: 'Alert',
	computed: {
		// takes display situation of alert from store.
		alertDisplay() {
			return this.$store.getters.alertDisplay;
		}
	},
	methods: {
		// closes the alert.
		hideAlert() {
			this.$store.dispatch('setAlertDisplay', false);
		},
	}
};
</script>