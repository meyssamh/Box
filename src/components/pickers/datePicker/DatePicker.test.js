/* eslint-disable no-magic-numbers */
/* eslint-disable no-undef */
import { mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';

import DatePicker from './DatePicker';
import { findByTestAttr } from '#/test/testUtils';
import i18n from '@/i18n';

const actions = {
	setDate: () => jest.fn()
};

const getters = {
	date: () => new Date().toISOString().slice(0, 10),
};

const store = new Vuex.Store({
	actions,
	getters
});

const vuetify = new Vuetify();

const propsData = {
	validDate: () => ''
};

/**
 * Mounts DatePicker.vue with mount and returns a wrapper.
 * 
 * @payload i18n, vuetify, store, propsData.
 * @returns {Wrapper} a wrapper from DatePicker.vue
 */
const setup = () => {
	return mount(DatePicker, {
		i18n,
		vuetify,
		store,
		propsData
	});
};

describe('DatePicker.vue', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = setup();
	});

	describe('elements', () => {

		test('renders TextField', () => {
			const datePickerTextField = findByTestAttr(wrapper, 'date-picker-text-field');
			expect(datePickerTextField.exists()).toBe(true);
		});

		test('renders datePicker', async () => {
			await wrapper.setData({
				menu: true
			});

			const datePickerDatePicker = findByTestAttr(wrapper, 'date-picker-date-picker');
			expect(datePickerDatePicker.exists()).toBe(true);
		});

		test('renders ok button', async () => {
			await wrapper.setData({
				menu: true
			});

			const datePickerOKButton = findByTestAttr(wrapper, 'date-picker-ok-button');
			expect(datePickerOKButton.exists()).toBe(true);
		});

		test('renders cancel button', async () => {
			await wrapper.setData({
				menu: true
			});

			const datePickerCancelButton = findByTestAttr(wrapper, 'date-picker-cancel-button');
			expect(datePickerCancelButton.exists()).toBe(true);
		});

		test('click on cancel button will close menu', async () => {
			await wrapper.setData({
				menu: true
			});

			const datePickerCancelButton = findByTestAttr(wrapper, 'date-picker-cancel-button');
			await datePickerCancelButton.trigger('click');

			const menu = wrapper.vm.$data.menu;
			expect(menu).toBe(false);
		});
	});

	describe('data', () => {

		test('menu have to be false', () => {
			const menu = wrapper.vm.$data.menu;
			expect(menu).toBe(false);
		});
	});

	describe('methods', () => {

		test('cancel will close menu', async () => {
			await wrapper.setData({
				menu: true
			});

			await wrapper.vm.cancel();

			const menu = wrapper.vm.$data.menu;
			expect(menu).toBe(false);
		});
	});
});