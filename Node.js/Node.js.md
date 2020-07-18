# Node.js 

--------------------------
## Node.js是什么？
--------------------------
- Node.js是一个能够在服务器端运行js的开放源代码，跨平台js运行环境    
- Node.js采用Google v8引擎运行js代码，使用事件驱动，非阻塞和异步I/O模型等技术来提高性能，可优化应用程序的传输量和规模   
- Node.js是单线程的，浏览器也是单线程，js也是单线程    

## Node.js代码提示功能
```shell
cnpm install typing -g

#在项目目录下执行
cnpm install @types/node --save

```

--------------------------------
## 第一个Node.js应用
--------------------------------
- web服务器的功能主要是: 接收HTTP请求并提供Web页面    

> 一个Node.js应用主要由三部分组成：
- 1.引入required模块：使用required指令载入需要的Node.js模块   
`let http = require('http')`

- 2.创建服务器： 服务器可以监听客户端的请求，类似于Apache,Nginx等HTTP服务器   
`http.createServer(function(request,response){}).listen(8888)`

- 3.接收请求与响应请求：服务器很容易创建，客户端可以使用浏览器或终端发送HTTP请求，服务器接收请求后返回相应响应数据   

```JavaScript
/*
 * filename: server.js
 */
//引入http模块
let http = require('http');

//创建服务器
http.createServer(function(request,response){
    //发送HTTP头部
    //HTTP状态值：200 OK
    //内容类型：text/plain
    response.writeHead(200,{'Content-Type': 'text/plain'});

    //发送响应数据
    response.end("hello world\n");

}).listen(8888);


//终端打印如下信息
console.log('Server running at http://127.0.0.1:8888');

```

接下来执行 `node server.js`,然后用浏览器打开 `http:127.0.0.1:8888`

--------------------------------
## 模块系统
--------------------------------
**ECMAScript标准的缺陷**
- 没有模块化系统,标准库比较少,没有标准接口,缺乏管理系统  

> Node.js中使用CommomJS对模块定义: 模块引用,模块定义,模块标识   

- 在Node中，一个js文件就是一个模块  
- 在Node中，每一个js文件中的js代码都是独立运行在一个函数中，而不是全局作用域，所以一个模块中的变量和函数在其他模块中无法直接访问         
```JavaScript
//当Node.js在执行文件中代码时，它会默认首先在代码的最顶部，添加如下代码,文件中代码都在这个函数中   
function (exports,require,module,__filename,__dirname){
    //some codes
    console.log(arguments);
    console.log(arguments.callee.toString());//当前执行的函数名
}
```

> Node.js中默认添加的最外层函数五个关键参数：`exports`,`require`,`module`,`__filename`,`__dirname`   
- Node.js中，通过`exports`来向外部导出变量和方法，要导出的变量和方法为exports对象的变量和方法    
- Node.js中，通过`require()`引入一个模块,返回一个模块对象，通过这个对象访问模块中的数据
- `exports`是`module.exports`的一个引用，用法有区别:  module.exports = { };exports不可以这样用   
```JavaScript
//01module.js中
exports.a =  1000;
exports.fun = function(a,b){
    return a+b;
}

//02module.js中
let m = require("./01module.js");
console.log(m.a);
console.log(m.fun(10,20));
```  

- Node.js中分为两类模块，核心模块和用户定义模块  
```JavaScript
let fs = require('fs');//系统核心模块，不用写路径

let m = require("./01module.js");//用户定义模块
```

- Node.js中有一个全局对象变量为`global`，类似于浏览器中的 window     
```JavaScript

var a = 100;//不是全局变量
b = 10；//全局变量

console.log(global.a);//undefined
console.log(global.b);//10

```

--------------------------------
## Node Package Manager
--------------------------------
### npm 'Node package manager'
- npm帮助Node.js完成了第三方模块的安装，依赖,发布等   
- Node.js借助npm与第三方模块之间形成了很好的一个生态系统    

- CommonJS的包规范由包结构和包描述文件两个部分组成   
- Node.js的包本质是一个压缩文件模块，解压以后还原为目录 符合规范的目录包含以下文件：  
```shell
# 包结构
--package.json    #描述文件(这个是必须的),描述包的相关信息，以供外部读取分析
--bin         #可执行文件
--lib         #js代码
--doc         #文档
--test        #单元测试
```

### npm命令
```shell
npm     -v          #查看npm的版本  
npm     version     #查看所有模块的版本  

npm     search      <package>       #搜索包
npm     install/i   <package>       #安装一个包
npm     remove/r    <package>       #删除一个包
npm     update      <package>       #更新一个包

npm     init        #生成一个包的描述文件 package.json
npm     install                                 #下载安装项目所依赖的包(根据package.json中dependencies节点依赖的包名) 
npm     install     <package>     --save        #安装包并将包信息添加到依赖中(package.json中dependencies节点依赖的包名)
npm     install     <package>     --save-dev    #安装包并将包信息添加到开发develop依赖中(package.json中devDependencies节点中)
npm     install     <package>     -D            #简写方式，安装包并将包信息添加到开发develop依赖中(package.json中devDependencies节点中)
npm     install     <package>     -g            #全局安装包(全局安装的包一般是计算机运行环境需要的工具包)  

npx     webpack    #在本地查找包执行(webpack不是全局安装时用这个),相当于执行 ./node_module/.bin/webpack   
```
 
### 配置cnpm  
`npm install -g cnpm --registry=https://registry.npm.taobao.org`  

### Node.js搜索包的流程  
- 1.先在当前目录的node_modules中寻找模块，如果有直接使用   
- 2.如果没有则去当前目录的上级目录的node_modules寻找，直到根目录，没找到则报错   

---------------------
## Buffer
---------------------
- Buffer是Node.js自带的一个缓冲区   
- Buffer的结构和数组很像，操作的方法也和数组类似   
- Buffer以字节存储数据，每个字节8位，2^8 = 256  
- 数组不能存储二进制数据(图片，图像数据),而buffer就是专门用来存储二进制数据  
- Buffer的内存不是通过JavaScript分配的，是通过底层C++申请的   
- Buffer大小一旦创建不能修改   

```javascript
let str = "hello world";

//node自带Buffer不需要require模块操作
let buf = Buffer.from(str);
console.log(buf); //在buffer中存储的是二进制数据，但是输出显示是以16进制显示的

//创建一个指定大小的buffer
//buffer所有构建函数都废弃了
//buffer大小一旦创建不能修改
let buf2 = new Buffer(1024)//这种方式废弃

let buf2 = Buffer.alloc(1024)
```