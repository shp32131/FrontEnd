**父子组件传值**    
- 1.`Props`
- 2.`this.$refs.childrenData` 父组件主动获取子组件数据与方法,在子组件添加属性`refs="childrenData"`,然后父组件调用`this.$refs.childrenData.data`  
- 3.`this.$parent` 子组件主动获取父组件数据与方法,子组件中直接调用`this.$parent.data`就可以直接获取父组件中的data
```JavaScript

```
**非父子组件传值**
- `$emit`