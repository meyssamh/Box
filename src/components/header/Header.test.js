/* eslint-disable no-undef */
import { mount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import Header from './Header';
import { findByTestAttr } from '#/test/testUtils';
import i18n from '@/i18n';

const vuetify = new Vuetify();

/**
 * Mounts Header.vue with mount and returns a wrapper.
 * 
 * @payload i18n, vuetify.
 * @returns {Wrapper} a wrapper from Header.vue.
 */
const setup = () => {
	const wrapper = mount(Header, {
		vuetify,
		i18n,
	});
	return wrapper;
};

describe('Header.vue', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = setup();
	});

	describe('elements', () => {

		test('renders v-app-bar', () => {
			const componentAppBar = findByTestAttr(wrapper, 'component-app-bar');
			expect(componentAppBar.exists()).toBe(true);
		});

		test('renders v-app-bar-nav-icon', () => {
			const componentNavIcon = findByTestAttr(wrapper, 'component-nav-icon');
			expect(componentNavIcon.exists()).toBe(true);
		});

		test('renders title', () => {
			const componentAppBar = findByTestAttr(wrapper, 'component-title');
			expect(componentAppBar.exists()).toBe(true);
		});

		test('renders flag icon', () => {
			const componentFlagIcon = findByTestAttr(wrapper, 'component-flag-icon');
			expect(componentFlagIcon.exists()).toBe(true);
		});

		test('clicking on language button will show a dropdown with two flags', async () => {
			const componentFlagIcon = findByTestAttr(wrapper, 'component-language-button');
			await componentFlagIcon.trigger('click');

			const componentDropdown = findByTestAttr(wrapper, 'component-dropdown');
			expect(componentDropdown.exists()).toBe(true);

			const germanFlag = findByTestAttr(wrapper, 'german-flag');
			expect(germanFlag.exists()).toBe(true);
			
			const englishFlag = findByTestAttr(wrapper, 'english-flag');
			expect(englishFlag.exists()).toBe(true);
		});

		test('clicking on a dropdown item will change language', async () => {
			const value = wrapper.vm.$i18n.locale;

			const componentFlagIcon = findByTestAttr(wrapper, 'component-language-button');
			await componentFlagIcon.trigger('click');

			const englishFlag = findByTestAttr(wrapper, 'english-flag');
			await englishFlag.trigger('click');

			const locale = wrapper.vm.$i18n.locale;
			expect(locale).not.toBe(value);
			expect(locale).toBe('en');
		});
	});

	describe('computed', () => {

		test('languageFlag returns a mocked value (because of jest import problem)', () => {
			const value = wrapper.vm.languageFlag;
			expect(value).toBe('');
		});
	});

	describe('methods', () => {

		test('isButtonActive disables the correct language button (or flag icon)', () => {
			const locale = wrapper.vm.$i18n.locale;
			const disableValue = wrapper.vm.isButtonActive(locale);
			expect(disableValue).toBe(true);
		});

		test('showDrawer will change the drawer value in data', async () => {
			const value = wrapper.vm.$data.drawer;
			expect(value).toBe(false);

			await wrapper.vm.showDrawer();

			const newValue = wrapper.vm.$data.drawer;
			expect(newValue).toBe(true);
		});

		test('disableNavigationMenu will disable navigation-button if there is no serviceWorker in navigator or PushManager in window', () => {
			const value = wrapper.vm.$data.disabled;
			expect(value).toBe(true);
		});
	});
});