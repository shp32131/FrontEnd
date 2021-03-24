const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "js/built.js",
        path: resolve(__dirname,"build")
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                use: ["style-loader","css-loader"]
            },
            {
                test: /\.less$/,
                use: ["style-loader","css-loader","less-loader"]
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: "url-loader",
                options: {
                    limit: 10 * 1024,
                    name: '[hash:10].[ext]',
                    esModule: false,
                    outputPath: 'imgs'
                }
            },
            {
                test: /\.html$/,
                loader: "html-loader",
            },
            {
                test: /\.(svg|woff|ttf|eot)$/,
                loader: "file-loader",
                options: {
                    outputPath: "iconfont",
                    name: '[hash:10].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./src/template/template.html" })
    ],
    mode: "development",
    devServer: {
        contentBase: resolve(__dirname,"build"),
        compress: true,
        port: 300,
        open: true
    }
}