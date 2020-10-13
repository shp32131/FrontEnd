# vue.js 
## vue脚手架安装与创建vue项目
- vue cli (command line interface)是安装vue的脚手架工具，也就是官方命令行工具，可以使用命令快速创建vue项目 
- vue cli 2.x老版本脚手架安装创建vue项目 
```shell
# 安装vue cli 脚手架工具 
npm install --global vue-cli / cnpm install --global vue-cli 
# 创建vue项目
vue init webpack demo
cd demo 
cnpm install 
# 运行项目
npm run dev 

# 另外一种推荐创建vue项目方式 
vue init webpack-simple demo 
cd demo02
cnpm install 
npm run dev 
```

- 新版本vue cli3.0及以上版本，脚手架工具安装创建`vue`项目
- 如果有老版本的vue cli ,得先卸载，再安装新 vue cli 工具 
- 查看脚手架@vue/cli版本 `vue  --version`,目前最新为`4.4.6`版本
```shell
# 全局安装新版本vue cli 工具
cnpm install  -g@vue/cli
# 或 yarn global add @vue/cli

# 创建vue项目
vue create hello-world
# 编译项目
npm run build 
# 运行项目
npm run serve
```
> 使用新脚手架工具创建vue项目不会自动创建`vue.config.js`,其内部高度集成了`webpack`，要修改默认配置可创建`vue.config.js`配置文件  

## vue 
