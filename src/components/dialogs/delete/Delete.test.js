/* eslint-disable no-undef */
import { shallowMount, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import VueI18n from 'vue-i18n';
import Vuex from 'vuex';

import Delete from './Delete';
import { findByTestAttr, localVue } from '#/test/testUtils';
import i18n from '@/i18n';

localVue.use(Vuetify);
localVue.use(VueI18n);
localVue.use(Vuex);

const actions = {
	deleteItem: jest.fn()
};

const store = new Vuex.Store({
	actions
});

const vuetify = new Vuetify();

const propsData = {
	closeDelete: jest.fn()
};

/**
 * Mounts Delete.vue with shallowMount and returns a shallowWrapper.
 * 
 * @payload localVue, i18n, vuetify, store.
 * @returns {ShallowWrapper} a shallowWrapper from Delete.vue.
 */
const setup = () => {
	return shallowMount(Delete, {
		localVue,
		i18n,
		vuetify,
		store,
		propsData
	});
};

/**
 * Mounts Delete.vue with mount and returns a wrapper.
 * 
 * @payload i18n, vuetify, store.
 * @returns {Wrapper} a wrapper from Delete.vue.
 */
const mountSetup = () => {
	return mount(Delete, {
		i18n,
		vuetify,
		store,
		propsData
	});
};

describe('Delete.vue', () => {

	describe('elements', () => {

		test('renders dialog text', () => {
			const wrapper = setup();

			const deleteDialogText = findByTestAttr(wrapper, 'delete-dialog-text');
			expect(deleteDialogText.exists()).toBe(true);
		});

		test('renders yes button', () => {
			const wrapper = setup();

			const deleteYesButton = findByTestAttr(wrapper, 'delete-yes-button');
			expect(deleteYesButton.exists()).toBe(true);
		});

		test('click on yes button will dispatch deleteItem and fire closeDelete', async () => {
			const wrapper = mountSetup();

			const deleteYesButton = findByTestAttr(wrapper, 'delete-yes-button');
			await deleteYesButton.trigger('click');

			expect(actions.deleteItem).toHaveBeenCalled();
			expect(wrapper.vm.$props.closeDelete).toHaveBeenCalled();
		});

		test('renders no button', () => {
			const wrapper = setup();

			const deleteNoButton = findByTestAttr(wrapper, 'delete-no-button');
			expect(deleteNoButton.exists()).toBe(true);
		});

		test('click on no button will fire closeDelete', async () => {
			const wrapper = mountSetup();

			const deleteNoButton = findByTestAttr(wrapper, 'delete-no-button');
			await deleteNoButton.trigger('click');

			expect(wrapper.vm.$props.closeDelete).toHaveBeenCalled();
		});
	});

	describe('props', () => {

		test('closeDelete is required', () => {
			const required = Delete.props.closeDelete.required;
			expect(required).toBe(true);
		});
		
		test('closeDelete is a Function', () => {
			const type = Delete.props.closeDelete.type;
			expect(type).toBe(Function);
		});
	});

	describe('methods', () => {
		let wrapper;

		beforeEach(() => {
			wrapper = setup();
		});

		test('confirmDeleteItem will dispatch deleteItem and fire closeDelete', async () => {
			await wrapper.vm.confirmDeleteItem();

			expect(actions.deleteItem).toHaveBeenCalled();
			expect(wrapper.vm.$props.closeDelete).toHaveBeenCalled();
		});

		test('cancel will fire closeDelete', async () => {
			await wrapper.vm.cancel();

			expect(wrapper.vm.$props.closeDelete).toHaveBeenCalled();
		});
	});
});