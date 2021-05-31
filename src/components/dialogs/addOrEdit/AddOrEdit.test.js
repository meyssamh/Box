/* eslint-disable no-magic-numbers */
/* eslint-disable no-undef */
import { mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';

import AddOrEdit from './AddOrEdit';
import { findByTestAttr } from '#/test/testUtils';
import i18n from '@/i18n';

const actions = {
	setCount: jest.fn(),
	setItem: jest.fn(),
	newItem: jest.fn(),
};

const getters = {
	item: () => 'Bread',
	count: () => 3,
	date: () => new Date().toISOString().slice(0, 10),
	time: () => '23:59',
};

const store = new Vuex.Store({
	actions,
	getters,
});

const vuetify = new Vuetify();

const propsData = {
	close: jest.fn(),
	type: 'add',
};

/**
 * Mounts AddOrEdit.vue with mount and returns a wrapper.
 * 
 * @payload i18n, vuetify, store, propsData.
 * @returns {Wrapper} a wrapper from AddOrEdit.vue
 */
const setup = () => {
	return mount(AddOrEdit, {
		vuetify,
		i18n,
		store,
		propsData,
	});
};

describe('AddOrEdit.vue', () => {

	describe('elements', () => {

		let wrapper;

		beforeEach(() => {
			wrapper = setup();
		});

		test('renders item textField', () => {
			const itemTextField = findByTestAttr(wrapper, 'item-text-field');
			expect(itemTextField.exists()).toBe(true);
		});

		test('renders count textField', () => {
			const countTextField = findByTestAttr(wrapper, 'count-text-field');
			expect(countTextField.exists()).toBe(true);
		});

		test('renders app-date-picker', () => {
			const appDatePicker = findByTestAttr(wrapper, 'app-date-picker');
			expect(appDatePicker.exists()).toBe(true);
		});

		test('renders app-time-picker', () => {
			const appTimePicker = findByTestAttr(wrapper, 'app-time-picker');
			expect(appTimePicker.exists()).toBe(true);
		});

		test('renders submit button', () => {
			const itemSubmitButton = findByTestAttr(wrapper, 'item-submit-button');
			expect(itemSubmitButton.exists()).toBe(true);
		});

		test('click on submit button will dispatch newItem and fire close', async () => {
			const itemSubmitButton = findByTestAttr(wrapper, 'item-submit-button');
			await itemSubmitButton.trigger('click');

			expect(actions.newItem).toHaveBeenCalled();
			expect(propsData.close).toHaveBeenCalled();
		});

		test('renders cancel button', () => {
			const itemCancelButton = findByTestAttr(wrapper, 'item-cancel-button');
			expect(itemCancelButton.exists()).toBe(true);
		});

		test('click on cancel button will fire close', async () => {
			const itemCancelButton = findByTestAttr(wrapper, 'item-cancel-button');
			await itemCancelButton.trigger('click');

			expect(propsData.close).toHaveBeenCalled();
		});
	});
});