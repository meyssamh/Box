/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import I18n from 'vue-i18n';

import App from './App';
import { findByTestAttr, localVue } from '#/test/testUtils';
import i18n from './i18n';

localVue.use(Vuetify);
localVue.use(Vuex);
localVue.use(I18n);

const actions = {
	initialItems: jest.fn(),
	setAlertDisplay: jest.fn(),
	disableNavigationMenu: jest.fn(),
};

const store = new Vuex.Store({
	actions
});

const vuetify = new Vuetify();

/**
 * Mounts App.vue with shallowMount and returns a wrapper.
 * 
 * @payload localVue, vuetify, i18n, store.
 * @returns {ShallowWrapper} a shallowWrapper from App.vue.
 */
const setup = () => {
	return shallowMount(App, {
		localVue,
		vuetify,
		store,
		i18n
	});
};

test('sanity test', () => {
	expect(true).toBe(true);
});

describe('App.vue', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = setup();
	});

	describe('elements', () => {
		
		test('renders v-app', () => {
			const componentApp = findByTestAttr(wrapper, 'component-app');
			expect(componentApp.exists()).toBe(true);
		});

		test('renders Header', () => {
			const componentHeader = findByTestAttr(wrapper, 'component-header');
			expect(componentHeader.exists()).toBe(true);
		});
		
		test('renders Body', () => {
			const componentBody = findByTestAttr(wrapper, 'component-body');
			expect(componentBody.exists()).toBe(true);
		});
	});

	describe('methods', () => {

		test('by create action.setAlertDisplay will be called', () => {
			expect(actions.setAlertDisplay).toHaveBeenCalled();
		});
	});
});