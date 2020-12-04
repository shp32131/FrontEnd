# 文件目录规范

# 命名规范
## component组件命名
- 在项目中,在单文件组件中和字符串模板中组件名总是PascalCase格式的,而在DOM模板中总是kebab-case的
 + 单文件就是把一个页面拆分为多个,多层次的组件,通过多层引用大大缩短vue文件的长度和页面复杂度
```html
<!-- 单文件组件和字符串模板中 -->
<MyComponent/>
<script>
import MyComponent from './MyComponent.vue' 
</script>>
```
- 在DOM模板中总是kebab-case格式的
```html
<my-component></my-component>
```
## 单文件组件: PascalCase.vue
- 组件名应该始终是多个单词大写开头的PascalCase，根组件App以及<transition>,<component>之类的Vue内置组件除外
 + 这样做可以避免跟现有的以及未来的HTML元素相冲突，因为所有的HTML元素命名都是单个单词的
- 组件名应该以高级别的单词开头,以描述性的修饰词结尾
 + 用`SearchButtonClear`而不用`ClearSearchButton`
- 组件名用完整单词而不用缩写
## 基础组件命名: Base开头
- 应用特定样式和约定的基础组件(也就是展示类的,无逻辑的或无状态的组件),全部以一个特定的前缀开头: Base
- 这些组件为你的应用奠定了一致的基础样式和行为，它们可能只包括:
 + HTML元素
 + 其他基础组件
 + 第三方UI组件库
 + 以上这些绝不会包含全局状态(比如来自Vuex store)
## 单例组件命名: The开头
- 只应该拥有单个活跃实例的组件应该以The前缀命名，以示其唯一性
 + 意味每个页面只使用这个组件一次
 + 这些组件永远不接受任何prop，因为它们是应用定制的，而不是应用中的上下文
## 紧密耦合的组件名
- 和父组件紧密耦合的子组件应该以父组件名作为前缀命名
 + 如果一个组件在某个父组件的场景下有意义，这层关系应该体现在其名字上
 + 比如`ToDoList,ToDoListItem`
## 路由文件的命名: kebab-case 
- 在views文件夹下，代表路由的.vue文件使用横线连接(kebab-case)，代表路由的文件夹也是同样的规则
 + 比如'error-page.vue'
- 使用kebab-case来命名views有以下考虑:
 + 官方推荐的命名规范
 + views下的.vue文件代表的是一个路由，需要和component进行区分
 + 页面的url也是横线连接的，如'https://www.xx.admin/export-excel'
## Prob命名
- ESLint能自动检测
- 在声明prop的时候，其命名始终使用cameCase，而在模板和JSX中应该始终使用kebab-case
```javascript
props: {
  greetingText: String
}
<WelcomeMessage greeting-text='hi'>
```
# 代码书写规范
## 缩进
- 缩进为两个空格
## 单双引号
- javascript字符串用单引号
- import引入用单引号
- 元素特性值用双引号
## 单文件顶级元素的顺序
- 单文件顶级元素的顺序
 + <template>
 + <script>
 + <style>
## 自闭合组件
- 在单文件组件，字符串模板和JSX中没有内容的组件应该是自闭合的
 + 但在DOM模板里永远不要这样做
## 元素特性的顺序
- 元素特性的顺序
 + is
 + v-for
 + v-if
 + v-else-if
 + v-else
 + v-show
 + v-cloak
 + v-pre
 + v-once
 + id
 + ref
 + key
 + slot
 + v-model
 + :
 + (attribute)
 + @
 + v-html
 + v-text
## 多特性元素分行写
- 多个特性的元素应该分多行撰写
## 指令缩写
- v-bind ==> :
- v-on ==> @
## 组件-实例选项的顺序
- 组件-实例选项的顺序
 + el
 + `name`
 + parent
 + functional
 + delimiters
 + comments
 + `components`
 + directives
 + `filters`
 + extends
 + mixins
 + inheritAttrs
 + model
 + `props/propsData`
 + `data`
 + `computed`
 + `watch`
 + beforeCreate
 + `created`
 + beforeMount
 + mounted
 + beforeUpdate
 + updated
 + template/render
 + renderError
## Prob定义
- Prop定义应该尽量详细
```javascript
props: {
  status: String
}
// 以下为更好的做法
props: {
  status: {
    type: String,
    required: true,
    validator: function(value) {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].indexOf(value) !== -1
    }
  }
}
```
## 组件data选项必须是函数
- 非根组件的`data`选项必须是一个函数
## 设置样式作用域scope
- 为组件样式设置作用域`scope`
- 在`scope`样式中，类选择器比元素选择器更好，因为大量使用元素选择器是很慢的
## 简单的表达式
- 组件模板应该只包含简单的表达式，复杂的表达式应该重构为计算属性或方法
## 简单的计算属性
- 应该把复杂计算属性分割为尽可能多的更简单的属性
## 为v-for设置key键值
- 在组件上总是必须用`key`配合`v-for`，以便维护内部组件及子组件树的状态
## 避免v-for与v-if用在一起
- 避免`v-for`和`v-if`用在一起
## 在v-if,v-else-if,v-else中使用key
- 如果一组`v-if+v-else`的元素类型相同，最好使用`key`(比如两个`div`元素)
```html
<div
  v-if="error"
  key="search-status"
>
{{error}}
</div>>
<div
  v-else
  key="search-status"
>
{{result}}
</div>
```
## 隐藏的父子组件通信-谨慎使用
- 一个理想的`Vue`应用是`prop`向下传递，事件是向上传递的，不要为了一时的方便而牺牲数据流向的简洁性
 + 父组件使用`props`把数据传给子组件
 + 子组件使用`this.$emit`触发父组件的自定义事件
# ESLint代码规范
- 行尾不能有空格
- 缩进为两个空格
- ...
# element规范
- 按需引入，用一个开一个
 + 配置地址，'src/config/element-ui.config.js'