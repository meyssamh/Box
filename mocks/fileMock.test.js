/* eslint-disable no-undef */
import FileMock from './fileMock';

describe('fileMock.js', () => {

	test('returns an empty string', () => {
		const value = FileMock;
		expect(value).toBe('');
	});
});