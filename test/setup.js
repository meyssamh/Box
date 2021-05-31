import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
import 'core-js';
import 'regenerator-runtime';

Vue.use(Vuetify);
Vue.use(Vuex);
Vue.use(VueI18n);
registerRequireContextHook();