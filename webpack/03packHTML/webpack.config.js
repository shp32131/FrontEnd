/**
 * loader: 1.下载 2.使用(配置loader)
 * plugins: 1.下载 2.引入 3.使用
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname,'build')
    },
    module: {
        rules: [
            //loader配置
        ]
    },
    plugins: [
        //plugins配置
        //html-webpack-plugin
        //功能：默认会创建一个空的HTML，自动引入打包输出的所有资源(js/css)
        //需求：需要有特定结构的HTML页面,传入一个HTML模板页面的对象参数
        new HtmlWebpackPlugin({template: './src/template/index.html'})
    ],
    mode: 'development',
    // mode: 'production'

}