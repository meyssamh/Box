/* eslint-disable no-undef */
import { mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';

import TimePicker from './TimePicker';
import { findByTestAttr } from '#/test/testUtils';
import i18n from '@/i18n';


const getters = {
	time: () => null
};

const actions = {
	setTime: jest.fn()
};

const store = new Vuex.Store({
	actions,
	getters
});

const vuetify = new Vuetify();

const propsData = {
	validTime: () => '',
	timeRequired: () => ''
};

/**
 * Mounts TimePicker.vue with mount and returns a wrapper.
 * 
 * @payload i18n, vuetify, store, propsData.
 * @returns {Wrapper} a wrapper from TimePicker.vue
 */
const setup = () => {
	return mount(TimePicker, {
		i18n,
		vuetify,
		store,
		propsData
	});
};

describe('TimePicker.vue', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = setup();
	});

	describe('elements', () => {
		
		test('renders v-text-field', () => {
			const timePickerTextField = findByTestAttr(wrapper, 'time-picker-text-field');
			expect(timePickerTextField.exists()).toBe(true);
		});
		
		test('renders time-picker', async () => {
			await wrapper.setData({
				modal: true
			});

			const timePickerTimePicker = findByTestAttr(wrapper, 'time-picker-time-picker');
			expect(timePickerTimePicker.exists()).toBe(true);
		});

		test('renders ok button', async () => {
			await wrapper.setData({
				modal: true
			});
			
			const timePickerOKButton = findByTestAttr(wrapper, 'time-picker-ok-button');
			expect(timePickerOKButton.exists()).toBe(true);
		});

		test('renders cancel button', async () => {
			await wrapper.setData({
				modal: true
			});
			
			const timePickerCancelButton = findByTestAttr(wrapper, 'time-picker-cancel-button');
			expect(timePickerCancelButton.exists()).toBe(true);
		});

		test('click on cancel button will close the modal', async () => {
			await wrapper.setData({
				modal: true
			});

			const timePickerCancelButton = findByTestAttr(wrapper, 'time-picker-cancel-button');
			await timePickerCancelButton.trigger('click');

			expect(wrapper.vm.$data.modal).toBe(false);
		});
	});

	describe('data', () => {

		test('menu have to be false', () => {
			const menu = wrapper.vm.$data.menu;
			expect(menu).toBe(false);
		});

		test('modal have to be false', () => {
			const modal = wrapper.vm.$data.modal;
			expect(modal).toBe(false);
		});
	});

	describe('methods', () => {

		test('cancel will close the modal', async () => {
			await wrapper.setData({
				modal: true
			});

			await wrapper.vm.cancel();

			const modal = wrapper.vm.$data.modal;
			expect(modal).toBe(false);
		});
	});
});