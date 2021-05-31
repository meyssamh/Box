/* eslint-disable no-undef */
const path = require('path');

const { merge } = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VuetifyLoaderPlugin } = require('vuetify-loader');

const webpackBase = require('./webpack.config.js');

module.exports = merge(
	webpackBase,
	{
		mode: 'development',
		module: {
			rules: [
				{
					test: /\.vue$/,
					use: {
						loader: 'vue-loader'
					}
				},
				{
					test: /\.json$/,
					type: 'javascript/auto',
					loader: '@intlify/vue-i18n-loader',
					include: [
						path.resolve(__dirname, 'src/locales')
					]
				},
				{
					test: /\.js$/,
					use: {
						loader: 'babel-loader',
						options: {
							envName: 'dev'
						}
					}
				},
				{
					test: /\.css$/,
					use: [
						{
							loader: 'vue-style-loader'
						},
						{
							loader: 'css-loader'
						}
					]
				},
				{
					test: /\.s(c|a)ss$/,
					use: [
						{
							loader: 'vue-style-loader'
						},
						{
							loader: 'css-loader'
						},
						{
							loader: 'sass-loader',
							options: {
								implementation: require('sass'),
								sassOptions: {
									indentedSyntax: true
								},
							},
						},
					],
				},
				{
					test: /\.(png|jpg|svg|ico)$/,
					use: [
						{
							loader: 'file-loader'
						}
					]
				}
			]
		},
		plugins: [
			new VueLoaderPlugin(),
			new HtmlWebpackPlugin({
				template: './public/index.html',
				title: 'BOX',
				favicon: './public/favicon.ico'
			}),
			new VuetifyLoaderPlugin(),
		],
		devServer: {
			hot: true,
			historyApiFallback: true,
			open: {
				app: ['Chrome']
			},
			overlay: true,
			port: 8000
		},
		optimization: {
			usedExports: true,
		},
	}
);