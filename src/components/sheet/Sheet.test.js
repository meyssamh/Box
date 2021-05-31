/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import VueI18n from 'vue-i18n';

import Sheet from './Sheet';
import { localVue, findByTestAttr } from '#/test/testUtils';
import i18n from '@/i18n';

localVue.use(Vuetify);
localVue.use(VueI18n);

const vuetify = new Vuetify();

/**
 * Mounts Sheet.vue with shallowMount and retunrs a wrapper.
 * 
 * @payload localVue, i18n, vuetify.
 * @returns {ShallowWrapper} A wrapper from Sheet.vue.
 */
const setup = () => {
	return shallowMount(Sheet, {
		localVue,
		i18n,
		vuetify
	});
};

describe('Sheet.vue', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = setup();
	});

	describe('elements', () => {

		test('renders v-sheet', () => {
			const componentVSheet = findByTestAttr(wrapper, 'component-v-sheet');
			expect(componentVSheet.exists()).toBe(true);
		});

		test('renders informational text', () => {
			const componentH4 = findByTestAttr(wrapper, 'component-h4');
			const unavailableLength = 0;
			const locale = wrapper.vm.$i18n.locale;
			const text = i18n.messages[locale].info;
			expect(componentH4.text().length).not.toBe(unavailableLength);
			expect(componentH4.text()).toBe(text);
		});
	});
});