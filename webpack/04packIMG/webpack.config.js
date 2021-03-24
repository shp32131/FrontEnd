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
                test: /\.css$/,
                use: ["style-loader","css-loader"]
            },
            {
                test: /\.less$/,
                use: ["style-loader","css-loader","less-loader"]
            },
            //css样式中引入的图片打包，url()
            {
                test: /\.(jpg|png|gif)$/,
                //需要两个loader url-loader, file-loader
                loader: "url-loader",
                options: {
                    //转换base64的大小条件，小于则用base64转换图片通常8-12kb，大于则不用
                    //优势：减少服务器请求数量,减轻服务器压力 缺点：会比图片原先格式大
                    limit: 10 * 1024,

                    //url-loader默认使用es6模块化解析，html-loader引入图片是CommonJS模块化解析
                    //关闭es6模块化解析
                    esModule: false,

                    //给图片重新命名
                    //[hash:10]-->取图片hash名的前10位
                    //[ext] --> 取原来文件的扩展名
                    // name: '[hash:10].[ext]'
                    //[ext] --> 取原来文件的扩展名
                    name: '[hash:10].[ext]',
                    //输出路径
                    outputPath: "imgs"

                }
            },
            //html页面中引入的图片 img
            {
                test: /\.html$/,
                //html-loader 引入html页面的图片,然后让url-loader进行打包处理
                loader: "html-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./src/template/index.html" })
    ],
    mode: "development"

}