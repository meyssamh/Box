/* eslint-disable no-undef */
const path = require('path');

const { merge } = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VuetifyLoaderPlugin } = require('vuetify-loader');
const createAttributeRemover = require('vue-remove-attributes');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webapckBase = require('./webpack.config');

module.exports = merge(
	webapckBase,
	{
		mode: 'production',
		module: {
			rules: [
				{
					test: /\.vue$/,
					use: {
						loader: 'vue-loader',
						options: {
							compilerOptions: {
								modules: [
									createAttributeRemover('data-test')
								]
							}
						}
					}
				},
				{
					test: /\.(json5?|ya?ml)$/,
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
							loader: MiniCssExtractPlugin.loader
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
							loader: MiniCssExtractPlugin.loader
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
							loader: 'file-loader',
							options: {
								outputPath: './static/images/'
							}
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
				favicon: './public/favicon.ico',
			}),
			new MiniCssExtractPlugin({
				filename: 'static/css/[name].[contenthash].css',
				chunkFilename: 'static/css/[name].[contenthash].chunk.css',
				ignoreOrder: true,
			}),
			new VuetifyLoaderPlugin(),
			new WebpackManifestPlugin({
				fileName: 'asset-manifest.json',
				publicPath: '/',
			}),
			new CopyWebpackPlugin({
				patterns: [
					{
						from: './public/manifest.json',
						to: './',
						toType: 'dir',
					},
					{
						from: './public/static/icons/',
						to: './static/icons/[name][ext]',
						toType: 'template',
					},
				],
			}),
			new WorkboxPlugin.InjectManifest({
				swSrc: './src/service-worker.js',
				swDest: './service-worker.js',
			}),
			new BundleAnalyzerPlugin(),
		],
	}
);