## 简单实现深拷贝
- `let cloneObj = JSON.parse(JSON.stringify(obj))`
- `数组清洗`
- array.filter(Boolean)
## 数字字符串转number
- 使用`+`
## 数字千分位格式化 
- `number.toLocalString("en-US",{minimumFractionDigits: 5})` minimumFractionDigits 代表小数点保留多少位，默认是三位
- `(1234).toLocalString('en-US')` ==> 1,234
## 数组清洗
`array.filter(Boolean)`
## 进制转换
- 十进制数据转换成其他进制数据用 `toString()`
- `(10).toString(2)` ==> '1010'
- 其他进制数据转换成十进制数据用 parseInt(num,进制)
- 转换成10进制，`parseInt(value,8)` 将value以8进制大小转换成10进制数
## 对象打印
- 对象要打印出的,对象的外层再包一个对象'{}'
```js
let a = {name:'a'}
let b = {name:'b'}
let c = {name:'c'}
console.log(a,b,c)  => 只看到对象的属性和值
console.log({a,b,c})  => 清晰分清哪个对象名是哪个对象内容
```
- 给打印函数`console.log()`添加样式,'console.log("%c aaaa","color:#FF9900")'
- 对于[obj1,obj2] 用 console.table([obj1,obj2]),更直观看对象字段名和值，调api接口极有用
##  解构赋值用法
- 理解！！！
```js
let shp = {
  name: 'lql',
  age: 31,
  job: 'H5'
}
function info({name,age,job}) {
  console.log(`${name},---${age}===>${job}`)
}
```
## 数组去重
- let arr = [...new Set(arr)]

## 循环嵌套 `break + 标签` 自由退出具体的嵌套循环
## 必传参数
## 