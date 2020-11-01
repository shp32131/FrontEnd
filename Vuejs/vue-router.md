# vue-router@2.0.0
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
```JavaScript
const User = {
  template: '<div>User</div>'
}
const router = new VueRouter({
  router: [
    // 动态路径参数 以冒号开头 这样 /user/foo 和 /user/bar 都将映射到相同的路由
    { path:'/user/:id',component: User }
  ]
})
```
- 一个路径参数使用冒号`:`标记,当匹配到一个路由时,参数值会被设置到 `this.$route.params`,可以在每个组件内使用 
```JavaScript
const User = {
  template: `<div>User {{ $route.params.id }} </div>`
}
```
- 响应路由参数的变化
- 捕获所有路由或404 not found路由
- 高级匹配模式
- 匹配优先级
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

### 数据获取 
> 有时候进入某个路由后，需要从服务器获取数据，有两种方式来实现,是两种不同的用户体验    
- 导航完成之后获取：先完成导航，然后在接下来的组件生命周期钩子中获取数据，在数据获取期间显示"加载中..."之类的提示 
```JavaScript
// 有一个post组件,需要基于$route.params.id获取文章数据
<template>
  <div class="post">
    <div v-if="loading" class="loading">
      loading
    </div>
    <div v-if="error;" class="error">
      {{error}}
    </div>
    <div v-fi="post" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      post: null,
      error: null
    }
  },
  created () {
    // 组件创建完获取数据，此时data已经被observed了
    this.fetchData()
  },
  watch: {
    // 如果路由有变化，再次触发该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.loading = true
      getPost(this.$route.params.id,(err,result) => {
        this.loading = false
        if(err) {
          this.error = err.toString()
        }else {
          this.post = result
        }
      })
    }
  }
}
</script>
```

- 导航完成之前获取：导航完成之前，在路由进入的守卫中获取数据，在数据获取成功后执行导航 
```JavaScript
```

### 滚动行为

### 路由懒加载
