const path = require("path");;
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");


module.exports = {
    mode: "development",
    entry: path.join(__dirname, "src", "entry_point", "index-dev.js"),
    output: {
        path: path.join(__dirname, "dev"),
        filename: "bundle.js",
    },
    devServer: {
        contentBase: path.join(__dirname, 'dev'),
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.m?js|\.m?jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/react', '@babel/preset-env']
                        },
                    },
                    'eslint-loader'
                ]
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    }
};
