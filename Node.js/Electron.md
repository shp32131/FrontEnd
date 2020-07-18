## Node.js的桌面应用开发 Electron   
用Node.js开发桌面应用主要有 nw.js和electron，
- nw.js比较早,知名产品有 微信web开发工具，钉钉  
- electron比较新，知名作品有 atom ,vs code   
> electron基本文件   
- 元数据 package.json   
- 代码  main.js   
- 图形用户界面 index.html  

> electron做了哪些事情   
- 将nodejs和chromium的结合起来，让使用者可以调用node.js的函数，让你可以使用几乎所有的nodejs社区里的module。
- 合并nodejs和chromium两者里的web引擎（都基于v8）。这样所有javascript运行在一个context下。
- 修改沙箱模型，去除很多对桌面应用而言没有意义的安全手段，让应用可以最大程度访问本地资源（比如文件，本地网络等）。

一旦环境跑起来，就跟做一个网页几乎就没什么区别，加载CSS，图片啊，JS就可以了。因为本质上，electron就是给你搞了一个Chrome浏览器的壳子，
只是比传统网页多了一个访问桌面文件的功能，跟cordova其实没有多大的差别，只是底层和运行环境稍有不同。
所以不管是什么jquery，vue，react，cycle.js，bs，dojo，prototype拉起来就是干，也不用担心兼容性。

> electron主打功能
- 自动更新
- 原生的菜单 & 通知
- 崩溃报告
- 调试 & 性能分析
- Windows 安装程序

> 环境搭建  
- 相关包安装   
```JavaScript
//安装Electron包 
npm install -g electron
//安装asar打包工具
npm install -g  asar
//安装packager发布工具
npm install -g electron-packager
//创建一个空Node.js项目
npm init
```
- 创建index.js  
```JavaScript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600,autoHideMenuBar :true})

  win.setMenu(null);

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  //win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
``` 

- 添加index.html文件  
```HTML
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8"/>
    <title>Hello World</title>
</head>
<body>
Hello World!
</body>
</html>
``` 

- 运行Electron
```JavaScript
electron  .
```

- 打包项目
```JavaScript
asar demo path app.asar
```

- 发布项目  
```JavaScript
electron-packager . demo --out  . 
```