// eslint-disable-next-line no-undef
module.exports = {
	'moduleFileExtensions': [
		'js',
		'json',
		'vue',
	],
	'transform': {
		'.*\\.(vue)$': 'vue-jest',
		'.*\\.(js)$': 'babel-jest',
	},
	'moduleNameMapper': {
		'\\.(png)$': '<rootDir>/mocks/fileMock.js',
		'#/(.*)$': '<rootDir>/$1',
		'@/(.*)$': '<rootDir>/src/$1',
		'~/(.*)$': '<rootDir>/src/components/$1',
		'_/(.*)$': '<rootDir>/src/validators/$1',
		'&/(.*)$': '<rootDir>/src/middleware/$1',
		'%/(.*)$': '<rootDir>/public/$1',
	},
	'setupFilesAfterEnv': ['./test/setup.js'],
};