# vue-router
- `hash`模式,`http://www.aaa.com/#/hello`
- `history`模式,`http://www.aaa.com/hello`
- 浏览器的`hash`和`history`模式都属于浏览器自身的特性,`vue-router`利用这两个特性实现前端的路由 
  + `URL`改变，不会请求后端,不会重新加载页面
  + `history`有个缺点,F5刷新时，会去请求服务器，所以需要在服务器设置一个默认页面来专门响应这种请求
- `vue`中引用`vue-router`
  + 把`vue-router`添加进来,将组件映射到路由，指明在哪里渲染 
## 基础
```JavaScript
// 1.引入vue-router
import VueRouter from 'vue-router'
Vue.user(VueRouter)
// 2.定义组件
const Foo = {template:'<div>foo</div>'}
const Bar = {template:'<div>bar</div>'}
// 3.定义路由
const routers = [
  {path:'/foo',component:Foo},
  {path:'/bar',component:Bar}
]
// 4.创建router实例
const router = new VueRouter({
  routers
})
// 5.挂载到根实例
const app = new Vue({
  router
}).$mount('#app')

```
### 动态路由匹配
- 需求:有一个User组件,对于所有id各不相同的用户，都要使用这个组件来渲染，这时可以使用`动态路径参数`来达到这个要求
- 经常需要把某种模式匹配到的所有路由，全都映射到同个组件

### 嵌套路由
### 编程式导航
### 命名路由
### 命名视图
### 重定向和别名
### 路由组件传参
### HTML5 History模式
## 进阶
### 导航守卫
### 路由元信息
### 过渡动效
### 滚动行为
### 路由懒加载
