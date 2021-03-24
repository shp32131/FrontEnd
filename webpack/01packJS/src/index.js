/**
 * webpack 入口文件index.js
 * 1.运行指令：
 * 开发环境： webpack ./src/index.js -o ./build/build.js --mode=development
 * webpack 以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/build.js文件中，整体打包环境为 开发环境  
 * 生产环境：会压缩
 * 开发环境： webpack ./src/index.js -o ./build/build.js --mode=production
 * webpack 以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/build.js文件中，整体打包环境为 开发环境  
 * 2.结论：
 * webpack可以直接处理JavaScript和json文件,不能打包css/img资源
 * 生产环境和开发环境能将ES6模块化编译成浏览器能识别的模块化
 * 生产环境会将JavaScript代码压缩
 * 
 */
// let data = require('./data.json');
// import './index.css'
import data from './data.json';

console.log(data.name);

 function add(x,y){
     return x+y;
 }
 console.log(add(3,2));