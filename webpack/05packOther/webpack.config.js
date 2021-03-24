const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "built.js",
        path: resolve(__dirname,"build")
    },
    module: {
        rules:[
            {
                test: /\.css$/,
                use: ["style-loader","css-loader"]
            },
            {
                // exclude: /\.(js|css|html|less|jpg|png|gif)$/,
                test: /\.(svg|woff|ttf|eot)$/,
                //加载其他资源用 file-loader
                loader: "file-loader",
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: "iconfonts"
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./src/index.html"})
    ],
    mode: "development"
}