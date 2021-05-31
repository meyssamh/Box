import { createLocalVue } from '@vue/test-utils';

/**
 * Creates a local Vue for shallowMount.
 */
export const localVue = createLocalVue();

/**
 * Finds an Element Node in the given wrapper and returns it.
 * 
 * @param {Wrapper} wrapper - Wrapper that we want to search in.
 * @param {string} val - Data-test value that we want to search for.
 * @returns {elementNode} Element Node we search for.
 */
export const findByTestAttr = (wrapper, val) => {
	const elementNode = wrapper.find(`[data-test="${val}"]`);
	return elementNode;
};