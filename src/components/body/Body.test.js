/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';

import Body from './Body';
import { findByTestAttr, localVue } from '#/test/testUtils';

localVue.use(Vuetify);
localVue.use(Vuex);

const vuetify = new Vuetify();

const getters = {
	items: () => []
};

const store = new Vuex.Store({
	getters
});

/**
 * Mounts Body.vue with shallowMount and returns a wrapper.
 * 
 * @payload localVue, vuetify, store.
 * @returns {ShallowWrapper} a shallowWrapper from Body.vue.
 */
const setup = () => {
	return shallowMount(Body, {
		localVue,
		vuetify,
		store,
	});
};

test('sanity test', () => {
	expect(true).toBe(true);
});

describe('Body.vue', () => {

	describe('elements', () => {

		test('renders body-list if $store.getters.items.length is greater than zero', () => {
			const newGetters = {
				items: () => [
					{
						item: 'Bread',
						count: 1,
						date: '2021-10-19',
						time: '23:15'
					},
					{
						item: 'Apple',
						count: 4,
						date: '2022-01-01',
						time: '10:44'
					}
				]
			};

			const newStore = new Vuex.Store({
				getters: newGetters
			});

			const wrapper = shallowMount(Body, {
				localVue,
				vuetify,
				store: newStore,
			});

			const bodyList = findByTestAttr(wrapper, 'body-list');
			expect(bodyList.exists()).toBe(true);
		});

		test('renders Sheet if $store.getters.item.length is zero', () => {
			const wrapper = setup();

			const bodySheet = findByTestAttr(wrapper, 'body-sheet');
			expect(bodySheet.exists()).toBe(true);
		});

		test('does not render alert when we don\'t have serviceWorker in navigator or PushManager in window',
			() => {
				const wrapper = setup();

				const bodyAlert = findByTestAttr(wrapper, 'body-alert');
				expect(bodyAlert.exists()).toBe(false);
			});

		test('renders flying action button', () => {
			const wrapper = setup();

			const bodyFAB = findByTestAttr(wrapper, 'body-fab');
			expect(bodyFAB.exists()).toBe(true);
		});
	});
});