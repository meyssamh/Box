import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import App from './App';
import i18n from './i18n';
import store from './store/store';

Vue.use(Vuetify);

const vuetify = new Vuetify();

new Vue({
	el: '#root',
	i18n,
	store,
	vuetify,
	render: h => h(App)
});