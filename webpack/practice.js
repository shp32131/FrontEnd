const { resolve } = require('path');

module.exports = {
    mode: "development",
    entry: "./src/js/index.js",
    output: {
        filename: "js/built.js",
        path: resolve(__dirname,"bundle")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ["style-loader","css-loader"]
            },
            {
                test: /\.less$/,
                loader: ["style-loader","css-loader","less-loader"]
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: "url-loader",
                options: {
                    limit: 10 * 1024,
                    name: '[hash:10].[ext]',
                    outputPath: "imgs"
                }
            },
            {
                test: /\.(eot|woff|svg|ttf)$/,
                loader: "file-loader",
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: "font"
                }
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            // minify: {
                // collapseWhite: true,
                // removeComments: true
            // }
        })
    ],
    devServer: {
        contentBase: resolve(__dirname,"bundle"),
        compress: true,
        port: 3000,
        open: true
    }
}