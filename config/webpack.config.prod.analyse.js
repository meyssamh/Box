const { merge } = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webapckProduction = require('./webpack.config.prod');

module.exports = merge(
	webapckProduction,
	{
		plugins: [
			new BundleAnalyzerPlugin(),
		],
	}
);