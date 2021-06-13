## 复杂数据类型引用问题
```javascript
function fun1 () {
  // 每次返回一个新对象数据
  return { a: 1, b: 2 }
}

function fun2 () {
 const obj = { a: 1, b: 2 } 
 // 返回是ojb的内存地址
 return obj
}
```
## '?'和'??'以及'||'的用法
- `let obj = a && b`, 如果`!!a`为`false`,则`obj == a`,否则`obj == b`
- `let obj = a || b`, 如果`!!a`为`false`,则`obj == b`,否则`obj == a`

## 判断为普通对象
```js
function isPlainObject(param) {
  return Object.prototype.toString.call(param) === '[object Object]';
}
```

## 简单实现深拷贝
- `let cloneObj = JSON.parse(JSON.stringify(obj))`
- `let arr1 = [...arr]`,这种方式是属于浅拷贝
- `数组清洗`
- `array.filter(Boolean)`

## 数字字符串转 number
- 使用`+`

## 数字千分位格式化.toLocaleString
- `number.toLocaleString("en-US",{minimumFractionDigits: 5})` minimumFractionDigits 代表小数点保留多少位，默认是三位
- `(1234).toLocaleString('en-US')` ==> 1,234

## 数组清洗
`array.filter(Boolean)`


## 进制转换
- 十进制数据转换成其他进制数据用 `toString()`  
- `(10).toString(2)` ==> '1010'
- 其他进制数据转换成十进制数据用 `parseInt`(num,进制)
- 转换成10进制，`parseInt(value,8)` 将`value`以8进制大小转换成10进制数

## console用法细节
- `console.info(), console.log(), console.error(), console.warn(), console.table()`
- 操作对象用`console.log({a, b, c})`  => 外层再包一个对象`{}`,可以清晰分清哪个对象名是哪个对象内容
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
- `let arr = [...new Set(arr)]`, 这个不能对对象元素去重, 适合对基本数据类型去重

## 循环嵌套 `break + 标签` 自由退出具体的嵌套循环
## 必传参数
