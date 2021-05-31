/* eslint-disable no-magic-numbers */
/* eslint-disable no-undef */
import { shallowMount, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';

import ActionButton from './ActionButton';
import { localVue, findByTestAttr } from '#/test/testUtils';
import i18n from '@/i18n';

localVue.use(VueI18n);
localVue.use(Vuetify);
localVue.use(Vuex);

const actions = {
	clearState: jest.fn()
};

const getters = {
	item: () => '',
	count: () => 1,
	date: () => new Date().toISOString().slice(0, 10),
	time: () => null
};

const store = new Vuex.Store({
	actions,
	getters
});

const vuetify = new Vuetify();

/**
 * Mounts ActionButton.vue with shallowMount and returns a ShallowWrapper.
 * 
 * @payload localVue, vuetify, store.
 * @returns {ShallowWrapper} a shallowWrapper from ActionButton.vue
 */
const setup = () => {
	return shallowMount(ActionButton, {
		localVue,
		vuetify,
		store,
	});
};

/**
 * Mounts ActionButton.vue with mount and returns a Wrapper.
 * 
 * @payload i18n, vuetify, store.
 * @returns {Wrapper} a wrapper from ActionButton.vue
 */
const setupMount = () => {
	return mount(ActionButton, {
		i18n,
		vuetify,
		store,
	});
};

describe('ActionButton.vue', () => {

	describe('elements', () => {

		test('renders v-btn', () => {
			const wrapper = setupMount();

			const componentFAB = findByTestAttr(wrapper, 'component-fab');
			expect(componentFAB.exists()).toBe(true);
		});

		test('renders icon mdi-plus', () => {
			const wrapper = setupMount();

			const componentIcon = findByTestAttr(wrapper, 'component-icon');
			expect(componentIcon.exists()).toBe(true);
		});

		test('renders app-add-or-edit', () => {
			const wrapper = setup();

			const componentAddDialog = findByTestAttr(wrapper, 'component-add-dialog');
			expect(componentAddDialog.exists()).toBe(true);
		});

		test('click on button will change dialog to true', async () => {
			const wrapper = setupMount();

			const componentFAB = findByTestAttr(wrapper, 'component-fab');
			await componentFAB.trigger('click');

			expect(wrapper.vm.$data.dialog).toBe(true);
		});
	});

	describe('data', () => {

		test('dialog must be false', () => {
			const wrapper = setup();

			const dialog = wrapper.vm.$data.dialog;
			expect(dialog).toBe(false);
		});

		test('type must be equal to "add"', () => {
			const wrapper = setup();

			const type = wrapper.vm.$data.type;
			expect(type).toBe('add');
		});
	});

	describe('methods', () => {

		test('closeDialog changes dialog to false and dispatches clearState',
			async () => {
				const wrapper = setup();

				wrapper.vm.$data.dialog = true;
				await wrapper.vm.closeDialog();

				expect(wrapper.vm.$data.dialog).toBe(false);
				expect(actions.clearState).toHaveBeenCalled();
			});
	});
});