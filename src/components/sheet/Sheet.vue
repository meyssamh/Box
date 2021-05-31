<template>
  <!-- EMPTY PAGE WITH INFO -->
  <v-sheet 
    :height="sheetHeight" 
    data-test="component-v-sheet"
  >
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <!-- INFORMATION -->
        <h4 
          class="text-h4 mx-2" 
          align="center" 
          data-test="component-h4"
        >
          {{ $t('info') }}
        </h4>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
	name: 'Sheet',
	computed: {
		//  Defines hight of the sheet.
		sheetHeight() {
			const maxAppBarHeight = 70;
			return window.innerHeight - maxAppBarHeight;
		},
	},
};
</script>
