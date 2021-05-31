/* eslint-disable no-undef */
const path = require('path');

module.exports = {
	entry: './src/index.js',
	bail: true,
	output: {
		filename: 'static/js/[name].[contenthash].js',
		chunkFilename: 'static/js/[name].[contenthash].chunk.js',
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/',
		clean: true
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'@': path.resolve(__dirname, '../src'),
			'~': path.resolve(__dirname, '../src/components'),
			'_': path.resolve(__dirname, '../src/validators'),
			'&': path.resolve(__dirname, '../src/middleware'),
			'%': path.resolve(__dirname, '../public'),
		},
	},
};