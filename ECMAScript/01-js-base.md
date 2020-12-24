# Base Of JavaScript 基础知识

## JavaScript在HTML页面中的加载运行
- 1.HTML页面中内嵌JS脚本 
```html
<!-- 在html文档中可以像style标签一样，使用script标签嵌入js代码   -->
<script>
    alert('hello javascript');
</script>
```
- 2.外部JS文件引入HTML页面中
```html
<!-- 通过设置script标签的src属性引入js -->
<script src="test.js"></script>
```
> 使用`<script></script>`标签的`src`属性引入外部JS文件时,标签中的JS代码不会执行  
```html
<!-- 以下console.log('hello javascript')不会执行 -->
<script src='test.js'>
    //不会被执行 
    console.log('hello javascript');
</script>
```
> 在`HTML`文档中，如果`head`标签中有JS代码，则要等到`head`标签中的JS代码加载并解析完成后,浏览器才会开始渲染解析`body`标签中的`HTML`内容，所以JS代码一般放在`body`标签中    

## 数据类型  
- 六种基本数据类型  
  + number 
  + string 
  + boolean
  + undefined 
  + null 
  + symbol <sup>es6</sup> 
- 一种引用类型数据`Object`   
  + object
  + array
  + set
  + map 
> `JavaScript`是弱类型脚本语言，变量的类型由其所引用的值类型决定   
```JavaScript
// String字面量声明方式
let test = "hello";
console.log(typeof test);// string

// String构造函数声明方式
test = new String('world');
console.log(typeof test);// object

test = 123;
console.log(typeof test);//number

test = {};
console.log(typeof test);//object

function fn(){}
console.log(typeof fn);// 'function'

let arr  = []
console.log(arr);// 'object'

```

## 变量声明 var,let<sup>es6</sup>,const<sup>es6</sup>
- `变量声明关键字使用规则`：能用`const`就用`const`,不能用`const`就用`let`
- `变量提升`: JS解析器解析JS代码时,会先把变量的声明提升到变量作用域的最前面(变量的赋值还是在原位置),这就叫变量的提升   
> 使用`var`声明的变量，变量的声明会提升到最前面，赋值语句还在原位置  
```JavaScript
console.log(test);// undefined
var test = 'hello';
/*以上代码解析执行过程如下*/
var test;// 变量声明提升
console.log(test);
test = 'hello';// 变量赋值还在原位置

/*let,const声明的变量不具有变量提升*/
console.log(x);//cannot access 'x' before initialization
let x = 10;
```
> `TDZ变量暂时性死区`:指变量在作用域内已经存在,但必须在`let,const`声明的语句后面才能使用，否则报错    
- TDZ限制:变量虽然在作用域内可见,但一定要在变量声明语句之后才能使用
- 使用`let,const`声明的变量,在声明语句前存在TDZ,如果在声明语句之前使用时会发生错误  
- `var`声明的变量没有TDZ特性    
- 变量声明建议使用`let,const`，而少使用`var`,变量要先声明后使用   
```JavaScript
var a = 20;
function fn(){
    console.log(a);// 因为fn函数作用域内已经存在 a变量,所以不会打印出20,因为TDZ会出错
    let a = 10; // let,const声明的变量存在TDZ不允许变量未声明就使用
}
fn();// error
```
> `作用域`:全局作用域,函数作用域,块作用域   
- 用`{}`声明一个块作用域,`let,const`声明的变量具有块作用域,`var`声明的变量没有块作用域       
```JavaScript
{
    var a = 1;
    let b = 2;
    const C = 3;
}
console.log(a);// 1
console.log(b);// Uncaught ReferenceError: b is not defined
```
> 同作用域内变量重复声明: `var`重复声明不会报错;`let,const`会报错，不能重复声明 
```JavaScript
var a = 1;
var a = 2;
```
> 使用`Object.freeze()`冻结变量后，变量不可以修改了，如果是严格模式("use strict";)，则会报错    
```javascript
const HTTP = {
    url: 'www.baidu.com',
    port: '8080'
};
Object.freeze(HTTP);
HTTP.port = '8000';//cannot assign to readonly property
```
> 立即执行函数:主要为了隔离作用域，避免变量污染
- 使函数立即执行有两个条件 :
  + 函数体必须是函数表达式,函数体上有运算符(`(),!,+,-,=`将匿名函数或函数声明转换为函数表达式)    
  + 函数体后面要有小括号`()`   
```javascript
//前面两种是最常见的   
(function(str){...})(str)
(function(num){...}(num))

!function(arg){}(arg) 
+function(arg){}(arg) 
-function(arg){}(arg) 
=function(arg){}(arg) 
```

> 使用`var`声明变量
- 1.`var`声明的变量存在于最近的函数或全局作用域中  
```HTML
<script>
// HTML中 var 全局声明的变量也存在window对象属性中
var a = 10;
console.log(window.a);//10
</script>
```
- 2.`var`会发生变量提升  
```JavaScript
console.log(a);//undefined
var a = 10;
```
- 3.`var`有函数作用域，但没有块作用域,容易污染全局变量
```JavaScript
//1. var声明的变量，没有块作用域
{
    var a = 11;
    var b = 22;
}
console.log(a,b);//11 22
//上面{}块作用域中，如果用let/const声明变量，则块作用域外不能访问  

//2. 容易污染全局变量
var i = 100;
for(var i = 0;i < 3;i++)
{
    console.log(i);//0,1,2
    setTimeout(()=>{
        console.log(i);//3,3,3,setTimeout()是在for循环结束后才执行
    });
}
console.log(i);//3,全局变量i被污染
//上面for语句中如果换成let i = 0;则不会污染全局

//3.在do/while语句中使用var声明的变量可以在语句外部访问到 
var num = 0;
function show() {
var step = 10;
do {
    var res = 0;
    console.log(num = step++);
    res = num;
} while (step < 20);
console.log(`结果是${res}`);
}
show();

//4. ES6之前没有let/const时，使用立即执行函数模拟var的块作用域,避免变量污染   
(function(str){
    console.log(str);// hello
    return str;
})('hello')

```

> 使用`let`<sup>es6</sup>声明变量      
```javascript
let i = 20;
for(let i =0;i < 3;i++)
{
    console.log(i);//0,1,2
}
console.log(i);//20
//块作用域
{
    var v = 100;
    let a = 10;
}
console.log(v);//100
console.log(a);//ReferenceError:not defined
```

> 使用 `const`<sup>es6</sup>声明变量    
- JS使用`const`声明只读变量，即常量     
  + `const`声明常量的本质是变量所指向的内存空间存储的数据(栈数据)不允许改变   
  + `const`声明的基本数据类型是一个常量，但引用类型的实际值(堆数据)不受影响可以改变   
  + `const`声明变量时要同时赋值,不允许再次赋值
  + 和`let`一样拥有块，函数，全局作用域
  + 常量名建议全部大写
```javascript
const HTTP = {
    url: 'www.baidu.com',
    port: '8080'
};
HTTP.port = '7000';
console.log(HTTP);//7000
```

> `var`与`let,const`的区别与共同点    
- `var`与`let,const`声明变量的区别:
  + `let,const`没有变量提升特性,`let,const`有TDZ暂时死区  
  + `let,const`有块作用域
  + `let,const`不允许在同一作用域内重复声明同一个变量  
- `var`与`let,const`声明变量的共同点:
  + `var`,`let`<sup>es6</sup>,`const`<sup>es6</sup>共同点是父级作用域中定义的变量，通过作用域链，可以在子作用域使用  
  + 都有函数作用域，函数中声明的变量，只能在函数及其子函数中使用(闭包概念)  
```javascript
//函数作用域和闭包 
var a = 1;
let b = 2;
const c = 3
function test()
{
    var aa = 4;
    let bb = 5;
    const cc = 6;
    console.log(a);
    console.log(b);
    console.log(c);
}
test();//1,2,3
console.log(aa);//not defined
```
## JS基本数据类型和引用数据类型存储值方式是不一样的      
- 基本数据(`number,string,boolean,symbol,null,undefined`),实际值保存在内存中,是栈数据     
- 复合引用类型数据(`object,array,function,set,map...`),实际值保存在硬盘中，是堆数据，内存中保存的是实际值的指针   
- 基本数据传值，引用数据传址    
  + 基本类型赋值是值的复制，互相不影响
  + 引用类型赋值时，变量保存的是引用对象的指针，多个变量引用的是同一个对象 
```javascript
let a = 100;
let b = a;
a = 200;
console.log(b);//100
let aa = {
  web: "test"
};
let bb = aa;
aa.web = "hello";
console.log(bb);//hello
```
## null和undefined
- `null`用于定义一个空对象，即如果一个变量要用来保存引用类型，则可以用`null`初始化这个变量  
  + 转换数值时为 0 
  + JS先有的`null`后面才出现`undefined`  

- `undefined`:对声明但未赋值的变量使用`typeof`运算符时，返回类型为`undefined`,表示值未定义   
  + 对未声明的变量使用会报错(`ReferenceError:not defined`)  
  + 使用typeof判断类型时显示`undefined`  
  + 未赋值与未声明定义的变量值类型都为`undefined`,所以声明变量应该设置一个初始值，这样可以区分变量状态  
  + `undefined`类型转换为数值类型是`NaN`
```javascript
let a;
console.log(typeof a)//undefined

console.log(b);//Uncaught ReferenceError
console.log(typeof b);//undefined
```
## 严格模式
- 开启严格模式 `use strict;`
- 严格模式可以及早发现错误，使代码更规范安全  
- 主流框架都采用严格模式，严格模式是JS的标准   
- 严格模式与非严格模式的差异
  + 变量必须使用关键词声明，未声明的变量不允许赋值   
  + 强制声明防止污染全局  
  + 关键词不允许做变量使用  
  + 变量不允许重复定义  
  + 为防止全局设置严格模式，对其他非严格模式模块的影响，可以将其放在一个立即执行函数中  
  + 解构差异:非严格模式可以不使用声明指令，严格模式必须使用声明 
```javascript
"use strict";
a = 10;//a is not defined

function test(str,str){...}//不允许参数重名

[a,b,c] = [1,2,3];   // 出错要加变量声明 
// let [a,b,c] = [1,2,3];
```

### 运算符与流程控制
> `if,is/else,三元表达式,switch,while,do/while,for,break/continue,label,for/in,for/of `      
- `for/in`
  + 用于遍历对象所有的属性，`for/in`主要用于遍历对象，不建议用来遍历数组 
  + 遍历的是对象的`key`,而不是`value`
  + 对象不是迭代器，数组默认就是迭代器  
```javascript
let web = {
    name:"myweb",
    url:"www.myweb.com"
}
for(let key in web){
    if(web.hasProperty(key)){
        console.log(web.key);
        // console.log(web[key]);
    }
}
```
- `for/of` <sup>es6</sup>
  + 用来遍历`Arrays,Strings,Maps,Sets`等可迭代的数据结构   
  + 对象可通过`Object.keys(),Object.values(),Object.entries()`转为可迭代数据结构  
  + `for/of`直接遍历数组值`value`,`for/in`遍历对象的`key`  
```javascript
let arr = [1,2,3];
for(const iterator of arr){
    console.log(iterator);
}
//使用迭代特性遍历数组
let web = ["hello","world"];
for(const(key,value) of web.entries()){
    console.log(key,value);
}
```
### 基本类型
- 六种基本数据类型:`number,string,boolean,undefined,null`,`symbol`<sup>es6</sup> 
- 一种引用类型数据`object`,`function,array,set,map...`都是`object`  
### 类型检测 typeof
- `typeof`用于返回以下原始数据类型   
  + 基本类型: `number,string,boolean,symbol` ( `typeof NaN == 'number'` )     
  + 引用类型: `Function,Array,Object` ( `typeof null == 'object'` )    
  + `undefined`(变量未赋值或不存在时)     
> 备注: typeof 不能区分数组和对象,可以用instanceof区分    
### 特殊值判断
- 判断数组 `Array.isArray()`
- 判断`NaN` `Number.isNaN()`
- `Object.is(ref1,ref2)`
### instanceof
- 判断对象是否是一个构造函数的实例   
- 可以判断引用类型，区分`array`和`object`  
- `instanceof`用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上   
```javascript
//区分数组和对象  
let a = [];
let b = {};
console.log(a instanceof Array);//true
console.log(b instanceof Array);//false
```
### 值类型与对象
> 使用字面量与对象方法创建字符串时，返回的是不同类型  
```javascript
let a = "good";
let b = new String("good");
console.log(typeof a,a.length);//string 4
console.log(typeof b,b.length);//object 4
```
> 只有对象才有方法调用，但也可以使用值类型调用方法，它会在执行时将值转换为对象    
```javascript
console.log('abc'.length);//3
```