/* eslint-disable no-magic-numbers */
/* eslint-disable no-undef */
import { mount, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import I18n from 'vue-i18n';
import Vuex from 'vuex';

import List from './list';
import { findByTestAttr, localVue } from '#/test/testUtils';
import i18n from '@/i18n';

localVue.use(Vuetify);
localVue.use(I18n);
localVue.use(Vuex);

const vuetify = new Vuetify();

const actions = {
	findItemForDelete: jest.fn(),
	findItemForEdit: jest.fn(),
	clearState: jest.fn(),
	changeNotified: jest.fn(),
};

const getters = {
	items: () => [
		{
			item: 'Bread',
			count: 1,
			date: '2021-10-19',
			time: '23:15'
		}
	],
	item: () => '',
	count: () => 1,
	date: () => new Date().toISOString().slice(0, 10),
	time: () => null
};

const store = new Vuex.Store({
	actions,
	getters
});

/**
 * Mounts List.vue with shallowMount and returns a shallowWrapper.
 * 
 * @payload localVue, vuetify, i18n, store.
 * @returns {ShallowWrapper} a shallowWrapper from List.vue
 */
const setup = () => {
	return shallowMount(List, {
		localVue,
		vuetify,
		store,
		i18n
	});
};

/**
 * Mounts List.vue with mount and returns a wrapper.
 * 
 * @payload vuetify, i18n, store.
 * @returns {Wrapper} a wrapper from List.vue
 */
const setupMount = () => {
	return mount(List, {
		vuetify,
		store,
		i18n
	});
};

describe('List.vue', () => {

	describe('elements', () => {

		test('renders search', () => {
			const wrapper = setup();

			const listSearch = findByTestAttr(wrapper, 'list-search');
			expect(listSearch.exists()).toBe(true);
		});

		test('renders data-table', () => {
			const wrapper = setup();

			const listDataTable = findByTestAttr(wrapper, 'list-data-table');
			expect(listDataTable.exists()).toBe(true);
		});

		test('renders edit button', () => {
			const mountedWrapper = setupMount();

			const listEditButton = findByTestAttr(mountedWrapper, 'list-edit-button');
			expect(listEditButton.exists()).toBe(true);
		});

		test(
			'click on edit button will show edit dialog and will dispatch findItemForEdit',
			async () => {
				const mountedWrapper = setupMount();

				const listEditButton = findByTestAttr(mountedWrapper, 'list-edit-button');
				await listEditButton.trigger('click');

				const value = mountedWrapper.vm.$data.dialog;
				expect(value).toBe(true);
				expect(actions.findItemForEdit).toHaveBeenCalled();
			});

		test('renders delete button', () => {
			const mountedWrapper = setupMount();

			const listDeleteButton = findByTestAttr(mountedWrapper, 'list-delete-button');
			expect(listDeleteButton.exists()).toBe(true);
		});

		test(
			'click on delete button will show delete dialog and will dispatch findItemForDelete',
			async () => {
				const mountedWrapper = setupMount();

				const listDeleteButton = findByTestAttr(mountedWrapper, 'list-delete-button');
				await listDeleteButton.trigger('click');

				const value = mountedWrapper.vm.$data.dialogDelete;
				expect(value).toBe(true);
				expect(actions.findItemForDelete).toHaveBeenCalled();
			});
	});

	describe('data', () => {
		const wrapper = setup();

		test('search is an empty string', () => {
			const value = wrapper.vm.$data.search;
			expect(value).toBe('');
		});

		test('dialog is false', () => {
			const value = wrapper.vm.$data.dialog;
			expect(value).toBe(false);
		});

		test('dialogDelete is false', () => {
			const value = wrapper.vm.$data.dialogDelete;
			expect(value).toBe(false);
		});

		test('type is equal to "update"', () => {
			const value = wrapper.vm.$data.type;
			expect(value).toBe('update');
		});
	});

	describe('methods', () => {
		let wrapper;

		beforeEach(() => {
			wrapper = setup();
		});

		test('editItem will open dialog and dispatch findItemForEdit', async () => {
			await wrapper.vm.editItem();

			const value = wrapper.vm.$data.dialog;
			expect(value).toBe(true);
			expect(actions.findItemForEdit).toHaveBeenCalled();
		});

		test('deleteItem will open dialogDelete and dispatch findItemForDelete', async () => {
			await wrapper.vm.deleteItem();

			const value = wrapper.vm.$data.dialogDelete;
			expect(value).toBe(true);
			expect(actions.findItemForDelete).toHaveBeenCalled();
		});

		test('closeDialog will close dialog and dispatch clearState', async () => {
			await wrapper.vm.editItem();

			await wrapper.vm.closeDialog();

			const value = wrapper.vm.$data.dialog;
			expect(value).toBe(false);
			expect(actions.clearState).toHaveBeenCalled();
		});

		test('closeDelete will close dialogDelete and dispatch clearState', async () => {
			await wrapper.vm.deleteItem();

			await wrapper.vm.closeDelete();

			const value = wrapper.vm.$data.dialogDelete;
			expect(value).toBe(false);
			expect(actions.clearState).toHaveBeenCalled();
		});

		test('changeNotifiedItems fires actions.changeNotified', async () => {
			await wrapper.vm.changeNotifiedItems();

			expect(actions.changeNotified).toHaveBeenCalled();
		});
	});
});