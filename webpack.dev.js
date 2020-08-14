const path = require("path");


module.exports = {
    mode: "development",
    // eslint-disable-next-line no-undef
    entry: path.join(__dirname, "src", "dev", "index.js"),
    output: {
        // eslint-disable-next-line no-undef
        path: path.join(__dirname, "build"),
        filename: "bundle.js",
    },
    devServer: {
        // eslint-disable-next-line no-undef
        contentBase: path.join(__dirname, "public"),
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.m?js|\.m?jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/react", "@babel/preset-env"],
                        },
                    },
                    "eslint-loader",
                ],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
};
