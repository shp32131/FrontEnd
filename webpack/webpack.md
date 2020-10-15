# webpack

## webpack是什么？

> webpack是一个前端资源构建工具:  

- Webpack是一个模块打包器 module bundler，但你也可以用它来运行任务  
- Webpack依赖于`依赖图`工作 Webpack遍历所有的源文件生成依赖图，然后它根据这个依赖图结合配置来生成最终的文件  
- Webpack依赖 loaders 和 plugins。Loaders操作的是模块；plugins依赖webpack提供的钩子，并能很好的访问它的执行过程   
- Webpack的 configuration 描述了如何转换图形这样的静态资源，以及它应该如何输出。部分配置信息引入原类型的静态资源，如：code splitting 这样的功能被引入 
- Hot Module Replacement (HMR) 使webpack流行开来。这个功能可以在浏览器中更新代码，而不需要刷新整个页面，极大地增强了开发体验 
- Webpack可以生成文件的同时生成一个 hashes ，当文件的内容发生改变时，这个对应的hashes也将发生变化  

## webpack安装
```shell

//先进入项目目录,再选择进行操作
cnpm init # 在当前目录初始化生成 package.json 文件
cnpm init -y # 在当前目录初始化生成 package.json 文件,跳过选项配置...

cnpm install webpack webpack-cli --save  #安装webpack webpack-cli 并添加版本信息到 package.json中的dependencies依赖中

cnpm install webpack webpack-cli --save-dev  #安 装webpack 和 webpack-cli 并添加到package.json中的devDependencies依赖中
cnpm install webpack webpack-cli -D # 上面的简化版

// webpack webpack-cli 不需要全局安装 本地安装比较好控制版本 ./node_module/.bin/webpack
npx webpack-dev-server   #本地执行 webpack-dev-server (这个模块不是全局安装的，是本地安装的)

cnpm install webpack webpack-cli -g # 全局安装 

```

## webpack 五个基础配置
```JavaScript

//.js和.json模块可以使用命令 npx webpack ./src/index.js  -o ./build/built.js  --mode=development

//filename: webpack.config.js
module.exports = {
    //1.打包入口模块
    entry: "",
    //2.打包后的输出
    output: {
        filename: "",
        path: ""
    },
    //3.loaders 处理.css .less .stylus .sass img font 等
    module: {
        rules: [
            {
                test：/\.**$/，
                // loader: ""
                use: []
            }
        ]
    },
    //4.plugins 处理.html模块
    plugins: [
        new HtmlWebpackPlugin({template: ""})
    ],
    //5.env development or  production  or none
    mode: "development"
}
```
--------------------------------------------------------------------------------------------------
## 开发环境基本配置 
```JavaScript
/*
    filename: webpack.config.js
    webpack 可以直接打包js,json模块
    css,images需要相关loader支持处理
    html 需要plugins支持,如html-webpack-plugin
    font 等其他静态资源 file-loader
*/
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //打包入口点
    entry: "./src/index.js"，
    //打包后的输出到 ./build/built.js
    output: {
        filename: "js/built.js",
        path: resolve(__dirname,"build")
    },
    //模块打包配置
    module: {
        rules: [
            //处理.css样式模块,样式模块内容是保存在entry中的js模块中的
            {
                test: /\.css$/,
                //loader使用有顺序从右往左，从后面到前面
                //css-loader解析css模块整合到js模块中，style-loader将解析好的css模块插入到页面中
                use: ["style-loader","css-loader"]
            },
            //处理.less样式模块
            {
                test: /\.less$/,
                use: ["style-loader","css-loader","less-loader"]
            },
            //处理.css样式模块中url()引入的图片,默认使用ES6模块化
            {
                test: /\.(jpg|png|gif)$/,
                //url-loader 需要 file-loader支持
                loader: "url-loader",
                options: {
                    //重命名为原hash名取前10位，扩展名取原来一样的
                    name: "[hash:10].[ext]",
                    //小于10kb的以base64编码格式打包(会比原图片大一些)，减少服务器请求次数，减轻请求压力
                    limit: 10 * 1024,
                    //关闭url-loader的es6模块化引用，使用和html-loader一样的CommonJS模块化
                    esModule: false,
                    //处理后图片输出的目录
                    outputPath: 'imgs'
                }
            },
            //解析.html模块页面中<img src=""> 引入的图片,默认使用CommomJS模块化，然后交给 url-loader 处理
            {
                test:/\.html$/,
                loader: "html-loader"
            },
            //处理其他，比如fonts字体，原封不动直接输出的资源
            {
                test: /\.(svg|woff|ttf|eot)$/,
                loader: "file-loader",
                options: {
                    //重命名
                    name: '[hash:10].[ext]',
                    //字体输出的目录
                   outputPath: 'fonts'
               } 
            }

        ] 
    },
    //plugins
    plugins: [
        //以特定的页面模板，生成新的页面，并自动引入打包好的built.js
        new HtmlWebpackPlugin({ template: "./src/template.html" })
    ],
    //开发服务器,自动完成编译打包(在内存中编译打包，终止时在内存中删除，不会有任何实际的文件生成)
    devServer: {
        //运行的内容目录,不会生成实际的文件，在内存中编译打包
        contentBase: resolve(__dirname,'build'),
        //启动gzip压缩
        compress: true,
        //端口
        port: 3000,
        //自动打开默认浏览器
        open: true
    }
    //环境选择 development production none 
    mode: "development"
}

```
--------------------------------------------------------------------------------------------------
## webpack生产环境

> 两种环境模式:

- 1.`development`: 能让代码本地调试运行的环境  
  + 会将`process.env.NODE_ENV`的值设为'development'  
  + 启用`NameChunksPlugin` 和 `NameModulesPlugin`

- 2.`production`: 能让代码优化上线运行的环境  
  + 会将`process.env.NODE_ENV`的值设为'production'  
  + 启用`FlagDependencyChunksPlugin`,`FlagIncludeChunksPlugin`,`ModuleConcatenationPlugin`,`NoEmitOnErrorsPlugin`,`OccurrenceOrderPlugin`,`UglifyJsPlugin` 

- 生产环境包括：
  + CSS: 提取，压缩，兼容
  + JS: 压缩，语法检查，兼容
  + HTML: 压缩

### 提取css成单独文件 mini-css-extract-plugin
```JavaScript
//filename webpack.config.js
const { resolve }  = require('path');
//以指定模板生成html页面，自动引入相关js,css,压缩html
const HtmlWebpackPlugin = require('html-webpack-plugin');
//提取css成单独文件的plugin: mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // mode: 'development',
    mode: 'production',
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname,'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                //style-loader的作用：创建style标签，将样式放入,提取单独css文件时，这里不需要style-loader了
                // use: ['style-loader','css-loader']
                use: [
                    MiniCssExtractPlugin.loader,//提取js中的css成单独文件
                    //css-loader的作用:将css整合到js文件中
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        })
    ],
    devServer: {
        contentBase: resolve(__dirname,'build'),
        compress: true,
        port: 3000,
        open: true
    }
}

```
### CSS兼容性与压缩 

- CSS兼容性  
  + `postcss-loader` 兼容性处理
  + `postcss-preset-eny` 帮postcss找到package.json中的browserslist里面的配置，通过配置加载指定的css兼容样式,兼容到某一个浏览器的版本  
- CSS压缩  
  + `optimize-css-assets-webpack-plugin` 压缩css

```JavaScript

//filename: webpack.config.js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//提取js中的css成单独文件
const MiniCssExtractPlugin = require('min-css-extract-plugin');
//压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

//定义Node.js环境变量，指定postcss加载package.json中的browserslist相关兼容配置
process.eny.NODE_ENV = 'development';

module.exports = {
    mode: 'production',
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname,'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                //帮postcss找到package.json中的browserslist里面的配置，通过配置加载指定的css兼容样式
                                //默认是以Node.js的默认是生产环境执行
                                require('postcss-preset-eny')()
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        //提取css
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        }),
        //压缩css
        new OptimizeCssAssetsWebpackPlugin()
    ],
    devServer: {
        contentBase: resolve(__dirname,'build'),
        compress: true,
        port: 3000,
        open: true
    }
}

```

> 在package.json中添加css兼容配置   

```JSON
"browserslist": {
    "development": [ "last 1 chrome version", "last 1 firefox version", "last 1 safari version" ],
    "production": [ ">02%", "not dead", "not op_mini all" ]
}
```

- json文件中不能写注释，用双引号""而不用单引号''
- 相关兼容说明： 
  + ">02%",//大于99.8%的浏览器  
  + "not dead",//已经死的浏览器不管,比如ie10  
  + "not op_mini all"//欧朋mini浏览器已经死完了  
- 默认会启用 "production" 模式

### js语法检查eslint
- loader: eslint-loader ( 依赖eslint库 )
- 推荐使用`airbnb`风格:  
  + 需要三个node_module: `eslint`,`eslint-config-airbnb-base`,`eslint-plugin-import`
  + 在JS中添加 `// eslint-disable-next-line` 可对特定行不启用eslint检查  

```JavaScript
//file-name: webpack.config.js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js'
        path: resolve(__dirname,'build')
    },
    module: {
        rules: [
            {
                /*
                    只检查自己写的代码，第三方的库不检查
                    检查规则在package.json中的eslintConfig中配置
                    "eslintConfig": {
                        "extends": "airbnb-base"
                    }
                    推荐使用airbnb
                    使用airbnb风格需要三个node_module: eslint eslint-config-airbnb-base eslint-plugin-import
                */
                test: /\.js$/,
                //不检查第三方的库
                exclude: /node_module/,
                //优先执行
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    fix: true
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}

```
### JS兼容处理 babel-loader
- loader: `babel-loader`(依赖核心库 @babel/core)
- node_module: `@babel/core`,`@babel/preset-eny`,`@babel-polyfill`,`core-js`
- 1.基本语法兼容：`@babel-preset-eny`  
  + 使用：loader引入  
  + 问题：不能转换 promise等语法

- 2.全部js兼容性处理: `@babel-polyfill` 
  + 使用：不用在loader引入，在JS中引入就可 `import '@babel-polyfill'` 
  + 问题: 所有的兼容性代码都引入了，体积太大了

- 3.按需引入：`core-js` 
  + 使用：loader引入
- 完美方案： 使用1.基本语法兼容 和 3.高级语法兼容
```JavaScript
// filename: webpack.config.js
module.exports = {
    ...
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_module/,
                loader: 'babel-loader',
                options: {
                    //预设处理
                    preset: [
                        //1.基本js语法兼容
                        '@babel/preset-eny'
                        {
                            //3.core-js按需加载
                            useBuiltIns: 'usage',
                            //指定core-js版本
                            corejs: {
                                version: 3
                            },
                            //指定兼容性做到哪个版本
                            targets: {
                                chrome: '60',
                                safari: '10',
                                firefox: '60',
                                ie: '9',
                                edge: '17'
                            }
                        }
                    ]
                }
            }
        ]
    }
    ...
}

```
### JS和HTML压缩
- 当 `mode = 'production'`时，内部自动使用`UglifyJsPlugin`压缩JS代码  
- HTML压缩,在`html-webpack-plugin`中传入`minify:{collapseWhitespace:true,removeComments:true}`压缩参数  
```JavaScript
// filename: webpack.config.js
module.exports = {
    ...
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    ...
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            //压缩HTML设置
            minify: {
                //清除空白
                collapseWhitespace: true,
                //去掉注释
                removeComments: true
            }
        })
    ]
    ...
}
```

### 生产环境基本配置
- css
  + 提取为单独css文件
  + 兼容性处理
  + 压缩
  + css图片处理
- js
  + eslint风格检查
  + 兼容性处理
  + 压缩
- html
  + 压缩
  + html中图片处理
- 其他文件处理
  + `file-loader`
```JavaScript
// filename: webpack.config.js

```

## webpack优化配置

> 开发环境需求   

- 优化打包构建速度 HMR  
- 优化代码调试 source-map

> 生产环境需求   

- 优化打包速度  
  + oneOf
  + babel缓存
  + 多进程打包
  + externals
  + dll

- 优化代码运行的性能  
  + 缓存 hash-chunkhash-contenthash(chunkhash:同一个入口就会同一个chunk)
  + tree shaking 去除应用中没有使用的代码 
  + code split
  + 懒加载，预加载
  + pwa 离线也能访问，兼容性差
  
### 开发环境

### 生产环境


## webpack原理分析

## webpack5



## 问题出现与解决
> 运行webpack进行打包时报错webpack : 无法加载文件 D:\nodejs\node_global\webpack.ps1，因为在此系统上禁止运行脚本    
解决方案：
1.以管理员身份运行vs code
2.执行：get-ExecutionPolicy，显示Restricted，表示状态是禁止的 ==> 执行：set-ExecutionPolicy RemoteSigned   