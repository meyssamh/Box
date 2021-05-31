/* eslint-disable no-undef */
import { shallowMount, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import I18n from 'vue-i18n';

import Alert from './Alert';
import { localVue, findByTestAttr } from '#/test/testUtils';
import i18n from '@/i18n';

localVue.use(Vuex);
localVue.use(Vuetify);
localVue.use(I18n);

const vuetify = new Vuetify();

const actions = {
	setAlertDisplay: jest.fn()
};

const getters = {
	alertDisplay: () => false
};

const store = new Vuex.Store({
	actions,
	getters
});

/**
 * Mounts Alert.vue with shallowMount and returns a shallowWrapper.
 * 
 * @payload localVue, vuetify, i18n, store.
 * @returns {ShallowWrapper} a shallowWrapper from Alert.vue
 */
const setup = () => {
	return shallowMount(Alert, {
		localVue,
		vuetify,
		i18n,
		store
	});
};

/**
 * Mounts Alert.vue with mount and returns a wrapper.
 * 
 * @payload vuetify, i18n, store.
 * @returns {Wrapper} a wrapper from Alert.vue
 */
const setupMount = () => {
	return mount(Alert, {
		vuetify,
		i18n,
		store
	});
};

describe('Alert.vue', () => {

	let wrapper;

	beforeEach(() => {
		wrapper = setup();
	});

	describe('elements', () => {

		test('renders overlay', () => {
			const alertOverlay = findByTestAttr(wrapper, 'alert-overlay');
			expect(alertOverlay.exists()).toBe(true);
		});

		test('renders alert', () => {
			const alertAlert = findByTestAttr(wrapper, 'alert-alert');
			expect(alertAlert.exists()).toBe(true);
		});

		test('renders alert message', () => {
			const alertMessage = findByTestAttr(wrapper, 'alert-message');
			expect(alertMessage.exists()).toBe(true);
		});

		test('renders alert tipp', () => {
			const alertTipp = findByTestAttr(wrapper, 'alert-tipp');
			expect(alertTipp.exists()).toBe(true);
		});

		test('renders alert button', () => {
			const alertButton = findByTestAttr(wrapper, 'alert-button');
			expect(alertButton.exists()).toBe(true);
		});

		test('click on button will close alert by firing actions.setAlertDisplay', async () => {
			const wrapperMount = setupMount();

			const alertButton = findByTestAttr(wrapperMount, 'alert-button');
			await alertButton.trigger('click');

			expect(actions.setAlertDisplay).toHaveBeenCalled();
		});
	});

	describe('computed', () => {

		test('alertDisplay returns a boolean value for displaying the alert', () => {
			const value = wrapper.vm.alertDisplay;
			expect(value).toBe(false);
		});
	});

	describe('methods', () => {

		test('hideAlert will hide the alert', async () => {
			await wrapper.vm.hideAlert();

			expect(actions.setAlertDisplay).toHaveBeenCalled();
		});
	});
});