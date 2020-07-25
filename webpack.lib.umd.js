const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");


module.exports = {
	mode: "production",
	entry: path.join(__dirname, "src", "entry_points", "index-umd.js"),
	output: {
		path: path.join(__dirname, "build"),
		filename: "atcalendar.js",
		library: "AtCalendar",
	    libraryTarget: "umd",
	    umdNamedDefine: true
	},
	externals: {
		"react-dom": "ReactDOM",
		"react" : "React",
		"moment": "moment"
	},
	optimization: {
		minimizer: [new OptimizeCssAssetsPlugin({})]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'atcalendar.min.css',
			ignoreOrder: false,
		}),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\*.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorPluginOptions: {
				preset: ['default', { discardComments: { removeAll: true } }],
			},
		})
	],
	module: {
		rules: [
			{
				test: /\.m?js|\.m?jsx$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
			        options: {
			          presets: ['@babel/react', '@babel/preset-env']
			        },
				}
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			}
		]
	}
};
