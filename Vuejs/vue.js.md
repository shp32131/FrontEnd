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

## vue介绍
### vue是什么?
- `vue`是一套用于构建用户界面的渐进式框架，自底向上逐层应用 
- `vue`核心库只关注视图层，易于上手
- `vue`的核心是一个允许采用简洁的模板语法来声明式地将数据渲染进`DOM`的系统 
```HTML
<div id="app">
    {{message}}
    <span v-bind:title="value">鼠标悬停查看title属性</span>
</div>

<script>
// 将Vue应用挂载到DOM元素上(#app)
let app = new Vue({
    el: `#app`,
    data: {
        message: "hello Vue",
        value: "span标签"
    }
})
</script>
```
### vue指令 
- 在`vue`中，像`v-bind attribute`这样称为指令，带有`v-`前缀表示是`vue`提供的特殊`attribute` 
- `v-bind` 数据绑定 `<span v-bind:title="value">`或`<span :title="value">` 绑定属性数据指令 
- `v-if` 条件显示或隐藏 `v-if`指令 `<p v-if="seen"></p>` 当`seen=true`就会显示`<p>`标签内容 
- `v-for` 列表循环 `<li v-for="todo in todos">`
```HTML
<div id="app">
    <ul>
        <li v-for="todo in todos">
            {{todo.title}}>
        </li>
    </ul>
</div>
<script>
    let app = new Vue({
        el: '#app'
        data: {
            todos: [
                {title: 'javascript'},
                {title: 'html'},
                {title: 'css'},
            ]
        }
    })
</script>
```
- `v-on` 添加事件监听器 `<button v-on:click="reverseMessage">反转消息</button>` 
  + 简写`<button @click="reverseMessage">反转消息</button>`
```HTML
<div id="app">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">反转消息</button>
</div>
<script>
var app5 = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})
</script>
```
- `v-model` 数据双向绑定 `<input v-model="message">` 
```HTML
<div id="app">
    <p>{{message}}</p>
    <input v-model = "message">
<div>
<script>
    let app = new Vue({
        el: "#app",
        data: {
            message: 'hello'
        }
    })
</script>
```
- `v-show / v-if` 
- `v-once`
- `v-html`
### vue组件化应用构建
- 在`vue`中，把一个页面抽象一个个小型的,独立的,可复用的组件,然后组成一个大型的应用界面 
- 一个组件本质上就是一个拥有预定义选项的一个`vue`实例 
- 使用`Vue.component('item',{template:'',props:[]})`注册组件 

------------------------------------------------Vue实例------------------------------------------------------------
## vue 实例
### 创建一个 vue 实例
```javascript
let vm =  new Vue({
    // 选项
})
```
- 选项列表 
  + 数据 `data,props,propsData,computed,methods,watch`
  + DOM `el,template,render,renderError`
  + 生命周期钩子 `beforeCreate,created,beforeMount,mounted,beforeUpdate,updated,activated,beforeDestroy,destroyed,errorCaptured`
  + 资源 `directives,filters,components`
  + 其它 `name,delimiters,functional,model,inheritAttrs,comments`
> 一个`vue`应用由一个通过`new Vue`创建的根`Vue`实例，以及可选的嵌套的，可复用的组件树组成     
### 数据与方法
- 当一个`Vue`实例被创建时，它将`data`对象中的所有的`property`加入到`Vue`的响应式系统中 
```javascript
// 当这些 property 的值发生改变时，视图将会产生“响应”，即匹配更新为新的值 
// 我们的数据对象
let data = { a: 1 } 
// 该对象被加入到一个 Vue 实例中
let vm = new Vue({
  data: data
})
// 获得这个实例上的 property
// 返回源数据中对应的字段
vm.a == data.a // => true
// 设置 property 也会影响到原始数据
vm.a = 2
data.a // => 2
// 反之亦然
data.a = 3
vm.a // => 3
```
- 当这些数据改变时,视图会进行重渲染,值得注意的是只有当实例被创建时就已经存在于`data` 中的`property`才是响应式的 
- `Object.freeze(property)`，会阻止修改现有的`property`，响应系统无法追踪其变化   
- 除了`property`，`Vue`实例还暴露了一些有用的实例`property`与方法，它们都带有前缀`$`，以便与用户定义的`property`区分开来 
  + `vm.$data === data`
  + `vm.$el === document.getElementById('app')`
```javascript
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // => true
vm.$el === document.getElementById('example') // => true

// $watch 是一个实例方法
vm.$watch('a', function (newValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
})

```
### 实例生命周期钩子
- 每个`Vue`实例在被创建时都要经过一系列的初始化过程，这些过程包括设置数据监听,编译模板,挂载实例到`DOM`...
- `Vue`实例在初始化过程中会运行一些生命周期钩子函数，用户可由此在不同阶段添加自己的代码 
```javascript
new Vue({
  data: {
    a: 1
  },
  created: function () {
    // `this` 指向 vm 实例 在vue中不要使用前头函数 
    console.log('a is: ' + this.a)
  }
})
// => "a is: 1"
```
-------------------------------------- 准备开始 -----------------------------------------------------------------------
## 模板语法 
### 插值
- 文本插入 数据绑定最常见的形式就是使用“Mustache”语法 (双大括号) 的文本插值 
  + `<span>Message: {{ msg }}</span>`
- `v-once`指令，可以一次性的插值，数据改变时，插值处的内容不会更新  
  + `<span v-once>这个将不会改变: {{ msg }}</span>`
- `html`插入 使用 `v-html`指令 
  + `<p>Using v-html directive: <span v-html="rawHtml"></span></p>`
- Attribute插入 `<div v-bind:id="dynamicId"></div>`  
- 使用`javascript`表达式 
  + 对于所有的数据绑定，`Vue.js` 都提供了完全的`JavaScript`表达式支持
  + 有个限制就是，每个绑定都只能包含单个表达式 
  + 不应该在模板表达式中试图访问用户定义的全局变量
```HTML
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}
<div v-bind:id="'list-' + id"></div>

<!-- 下面不会生效 这是语句，不是表达式 -->
{{ var a = 1 }}
<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
```
### 指令 directives
- 指令`Directives`是带有 `v-` 前缀的特殊`attribute` 
- 指令`attribute`的值预期是单个`JavaScript`表达式 (`v-for`是例外情况，稍后我们再讨论) 
- 指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于`DOM`
```HTML
<!-- v-if 指令将根据表达式 seen 的值的真假来插入/移除 <p> 元素-->
<p v-if="seen">现在你看到我了</p>
```
- `参数` 一些指令可以接收一个'参数'，在指令名称之后以冒号表示,`<a v-bind:href="url">...</a>`中`href`是参数 
  + `<a v-on:click="doSomething">...</a>` 这里`click`是监听的事件名 
- `vue2.6.0`新增动态参数，用方括号`[]`括起来的`JavaScript`表达式作为一个指令的参数 
  + 对动态参数的值的约束 动态参数预期值是一个字符串，异常情况为`null`,任何非字符串值都会触发警告 
  + 对动态参数表达式的约束 动态参数表达式有一些语法约束，因为某些字符，如空格和引号，放在 `HTML attribute` 名里是无效的 
```HTML
<a v-bind:[attributeName]="url">a link</a>
<script>
let app = new Vue({
    data: {
        attributeName: 'href' 
    }
})
</script>
```
- 修饰符 修饰符 (modifier) 是以半角句号`.`指明的特殊后缀，用于指出一个指令应该以特殊方式绑定 
  + `<form v-on:submit.prevent="onSubmit">...</form>`中`.prevent`修饰符告诉`v-on`指令对于触发的事件调用`event.preventDefault()` 
- 缩写 `v-bind` === `:`  `v-on` === `@`
## 计算属性与侦听器 

## Class与Style绑定 
## 条件渲染 
## 事件处理 
## 表单输入绑定 
## 组件基础 
-------------------------------------- 深入了解组件 --------------------------------------------------------------------
## 组件注册
## Prop
## 自定义事件
## 插槽
## 动态组件与异步组件
## 处理边界情况
-------------------------------------- 过渡与动画 -----------------------------------------------------------------------
## 进入与离开和列表过渡
## 状态过渡 
-------------------------------------- 可复用性与组合 --------------------------------------------------------------------
## 混入
## 自定义指令
## 渲染函数
## 插件
## 过滤器
-----------------------------------------工具-----------------------------------------------------------------------------
## 单文件组件
## 测试
## TypeScript支持
## 生产环境部署
--------------------------------------------规模化-------------------------------------------------------------------------
## 路由
### vue-router

## 状态管理
### vuex

## 服务端渲染
## 安全
-------------------------------------------内在--------------------------------------------------------------------------------
## 深入响应式原理  
### 如何追踪变化 
- `vue`是非侵入性的响应式系统，数据模型是普通的`javascript`对象,当被修改时，视图会进行更新  
- 原理:`Vue`遍历实例的`data`对象的所有`property`，使用`Object.defineProperty(data,property,{set(){...}},...)`，把所有`property`转为`getter/setter`跟踪变化 
- 每个组件实例都是一个`watcher`实例，在渲染过程中把接触过的数据`property`记录为依赖，当依赖的`setter`触发时，通知`watcher`，关联组件重新渲染 
```javascript
let obj = {};
let bValue = 38;
// 在对象中添加一个设置了存取描述符属性
Object.defineProperty(obj, "a", {
    // 下面两个缩写等价于：
    // get : function() { return bValue; },
    // set : function(newValue) { bValue = newValue; },
    get() { return bValue; },
    set(newValue) { bValue = newValue; },
    enumerable : true,
    configurable : true
});
console.log(obj.a);// 38
// 数据描述符和存取描述符不能混合使用
Object.defineProperty(obj, "conflict", {
  value: 0x9f91102,// 数据描述符
  get() { return 0xdeadbeef; } //存取描述符
});
// 抛出错误 TypeError: value appears only in data descriptors, get appears only in accessor descriptors
```
### 检测变化的注意事项
> 由于`javascript`限制,`Vue`不能检测数组和对象的变化，有一些办法可以回避这些限制保证数组与对象的响应性    
#### 对于对象
- `Vue`无法检测`property`的添加或移除,由于`Vue`会在初始化实例时对`property`执行`getter/setter`转化，所以`property`必须在`data`对象上存在才能让`Vue`将它转换为响应式的  
```javascript
let vm = new Vue({
  data:{
    a:1
  }
})
// `vm.a` 是响应式的
vm.b = 2
// `vm.b` 是非响应式的
```
- 对于已经创建的实例`Vue`不允许动态添加根级别的响应式`property`但是，可以使用`Vue.set(object, propertyName, value)`方法向嵌套对象添加响应式`property`  
- 也可以使用`vm.$set`实例方法，这是全局`Vue.set`的别名，`this.$set(this.someObject,'b',2)`  
- 为已有对象赋值新的`property`，需要使用原对象与要混进去的对象的`property`一起创建一个新对象 
  + `this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })`
#### 对于数组
```javascript
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的
```
- `Vue`不能检测以下数组的变动 
  + 1.当你利用索引直接设置一个数组项时，如`vm.items[index]=newValue` 
```javascript
// 解决办法1 vm.set 可以用 vm.$set 代替
Vue.set(vm.items, index, newValue)
// 解决办法2
// Array.prototype.splice
vm.items.splice(index, 1, newValue)
```
  + 2.当你修改数组的长度时，如`vm.items.length=newLength` 
```javascript
// 解决办法
vm.items.splice(newLength)
```
> 尽量在初始化实例前声明所有根级响应式`property`,必要时可以为一个空值    

### 异步更新队列
- `vue`在更新`DOM`是异步执行的，侦听到数据变化,`vue`开启一个队列,并缓冲在同一事件循环中发生的所有数据变更 
- 如果一个`watcher`多次触发，只会推入队列一次   
- 然后在下一个事件循环`tick`中，`vue`刷新队列并执行实际工作(已去重)  
- `vue`在内部对异步队列尝试使用原生的`Promise.then,MutationObserver,setImmediate`,不支持才会采用`setTimeout(fn,0)`代替  
> 也可以在数据变化后，立即调用`Vue.nextTick(callback)`，主动更新`DOM`  
```HTML
<div id="example">{{message}}</div>
<script>
    var vm = new Vue({
        el: '#example',
        data: {
            message: '123'
        }
    })
    vm.message = 'new message' // 更改数据
    vm.$el.textContent === 'new message' // false
    Vue.nextTick(function () {
    vm.$el.textContent === 'new message' // true
    })   
</script>
```
- 在组件内部使用`vm.$nextTick()`实例方法更方便，不需要全局的`Vue`，并且回调函数中的`this`将自动绑定到当前的`Vue`实例上  
```javascript
Vue.component('example', {
  template: '<span>{{ message }}</span>',
  data: function () {
    return {
      message: '未更新'
    }
  },
  methods: {
    updateMessage: function () {
      this.message = '已更新'
      console.log(this.$el.textContent) // => '未更新'
      this.$nextTick(function () {
        console.log(this.$el.textContent) // => '已更新'
      })
    }
  }
})
// 因为 $nextTick() 返回一个 Promise 对象，所以你可以使用新的 ES2017 async/await 语法完成
methods: {
  updateMessage: async function () {
    this.message = '已更新'
    console.log(this.$el.textContent) // => '未更新'
    await this.$nextTick()
    console.log(this.$el.textContent) // => '已更新'
  }
}
```
## Vue 全家桶 
> vue + vue-router + vuex + axios + ui框架