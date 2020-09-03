## Base Of JavaScript 基础知识

### JavaScript在HTML页面中的加载运行

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
    console.log('hello javascript');//不会被执行 
</script>
```
> 在`HTML`文档中，如果`head`标签中有JS代码，则要等到`head`标签中的JS代码加载并解析完成后,浏览器才会开始渲染解析`body`标签中的`HTML`内容，所以JS代码一般放在`body`标签中    

### 数据类型  
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
let test = "hello";//String字面量声明方式
console.log(typeof test);//string

test = new String('world');// String构造函数声明方式
console.log(typeof test);// object

test = 123;
console.log(typeof test);//number

test = {};
console.log(typeof test);//object
```

### 变量声明 var,let<sup>es6</sup>,const<sup>es6</sup>
> 变量提升: JS解析器解析JS代码时,会先把变量的声明提升到变量作用域的最前面(变量的赋值还是在原位置),这就叫变量的提升   
- 使用`var`声明的变量，变量的声明会提升到最前面，赋值还在原位置  
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

> TDZ变量暂时性死区:指变量在作用域内已经存在,但必须在`let,const`声明的语句后面才能使用，否则报错    
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

> 作用域:全局作用域,函数作用域,块作用域   
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
### JS基本数据类型和引用数据类型存储值方式是不一样的      
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

### null和undefined
- `null`用于定义一个空对象，即如果一个变量要用来保存引用类型，则可以用`null`初始化这个变量  
  + 转换数值时为 -1
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


### 严格模式
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

### String
> 字符串类型是使用非常多的数据类型，也是相对简单的数据类型   
#### 声明定义
> 字符串使用单，双引号包裹，结果没有区别   
```javascript
let str = "good";
console.log(str,str.length);//good 4
let a = new String('good afternoon');
console.log(a.toString(),a.length);
```
#### 转义符号 \\ 
- 有双层含义的字符，通常要使用到转义字符\\  
- \\t 制表符，\\n 换行符,\\'单引号等
#### 字符串连接运算符  
- 使用`+`可以连接多个内容组合成字符串，经常用于组合输出内容使用  
- 使用`+=`在字符串上追加字符内容  
```javascript
let str = 'hello';
str += 'world';
console.log(str+'good');
```
#### 模板字面量 <sup>es6</sup> 
> 使用 \`   \` ( 漂号 )符号的字符串可以写入变量与表达式  
- 支持换行操作，不会产生错误  
- 模板字面量支持嵌套使用  
```javascript
let url = `http://www.baidu.com`;
console.log(`web addr is ${url}`);
function test(str){
    return 'str';
}
console.log(`${test()}`);
```

#### 标签模板
> 标签模板是提取出普通字符串与变量，交由标签函数处理  
```javascript
let lesson = 'css';
let web = '后盾人';
tag `访问${web}学习${lesson}前端知识`;

function tag(strings, ...values) {
    console.log(strings); //["访问", "学习", "前端知识"]
    console.log(values); // ["后盾人", "css"]
}
```

#### 字符串函数
- 获取字符串长度,使用length属性可以获取字符串长度  
- 大小写转换,str.toUpperCase()\/str.toLowerCase()  
- 使用str.trim(),去年字符串str左右两侧的空白
- str.trimLeft()\/str.trimRight()去掉左边和右边的空格  
- 获取单个字符，从0位置开始  
```javascript
console.log('hello world'.charAt(3));//l
console.log('hello world'[3]);//l
```

##### 截取字符串  
> 使用slice(start,end),substring(start,stop),substr(start,length)函数都可以截取字符串   
> - string.slice(start,end)截取一个包括start到end处字符的子串，start,end都可为负整数,为负数时是从反方向开始计数    
> - string.substring(start,stop)截取一个包括start到不包括stop处字符的子字符串，start,stop不能为负整数   
> - string.substr(start,length) 第二个参数为获取的字符数量   

```javascript
let web = 'www.myweb.com';
console.log(web.slice(4)); //myweb.com
console.log(web.substring(4)); //myweb.com
console.log(web.substr(4)); //myweb.com

console.log(web.slice(4, 6)); //my
console.log(web.substring(4, 6)); //my
console.log(web.substring(4, 0)); //www.较小的做为起始位置
console.log(web.substr(4, 6)); //myweb.

console.log(web.slice(4, -1)); //myweb.co第二个为负数表示从后面算的字符
console.log(web.slice(-2));//om 从末尾取
console.log(web.substring(4, -9)); //www.负数转为0
console.log(web.substr(-4, 2)); //.c从后面第三个开始取两个
```
##### 分割字符串
> 使用split(separate,limit),以一个分隔符将字符串截断，返回一个数组   
```JavaScript
let url = "https://live.bilibili.com/21441066?live_lottery_type=1&broadcast_type=0&visit_id=akujg97k7ok0";
let arr = url.split('?');
console.log(arr[0]);//https://live.bilibili.com/21441066
```

##### 查找字符串  
> string.indexOf(searchvalue,fromindex)从fromindex位置开始检索searchvalue子字符串，如果检索到searchvalue则返回第一次找到的位置，找不到时返回-1  
```javascript
console.log('hello'.indexOf('ll'));//2,第一个为0位置
console.log('hello'.indexOf('ll',2));//2,从第2个字符开查找 
```

> 从结尾往前来搜索字符串位置string.lastIndexOf() 
```javascript
console.log('hello'.lastIndexOf('e')); //1
console.log('hello'.lastIndexOf('l')); //3从第7个字符向前搜索
```

> string.search(regexp)方法用于检索字符串中指定的子字符串，也可以使用正则表达式,可以加忽略大小写。但search()方法不执行全局匹配，总是从字符串开始位置检索，然后返回第一个匹配的位置,没找到则返回 -1     
```javascript
let str = "refuse play the game";
console.log(str.search('game'));
console.log(str.search(/game/i));
```

> includes()查找字符串中是否包含指定的值,第二个参数为查找开始位置  
```javascript
console.log('world'.includes('l'));//true
console.log('world'.includes('l',2));//true
```

> startsWith()是否以指定字符开始，第二个参数为查找的开始位置  
```javascript
console.log('hello'.startsWith('h')); //true
console.log('hello'.startsWith('e', 1)); //true
```

> endsWith()是否以指定字符结束,第二个参数为查找的结束位置  
```javascript
console.log('myweb.com'.endsWith('com')); //true
console.log('myweb.com'.endsWith('o', 2)); //true
//查找关键词示例
const words = ["php", "css"];
const title = "我在学习php与css知识";
const status = words.some(word => {
  return title.includes(word);
});
console.log(status);
```

##### 替换字符串  
> string.replace(regexp/substr,replacement)方法用于在字符串用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串,默认只替换一次，如果要全局替换需要使用正则加g  
```javascript
let web = 'myweb.com';
let a = web.replace('myweb','youweb');
console.log(a);//youweb.com
```

##### 重复生成  
```javascript
function star(num = 3){
    return '*'.repeat(num);
}
console.log(star());//***

//隐藏部分电话号码
let phone = '13511335599';
let ph = phone.slice(0,3)+"*".repeat(5)+phone.slice(8,phone.length);
console.log(ph);//135*****599
```

##### 类型转换  
> javascript中大部分类型都是对象，可以使用类方法toString()转化为字符串
>
> - string.split(separator,howmany) 把分割字符串成字符串数组
```javascript
let str = "1,3,4,5";
let arr = str.split(',');
console.log(arr);//[1,3,4,5]
```
> 隐匿类型转换会根据类型自动转换类型 
```javascript
let num = 22;
console.log(typeof (num+''));//string
```

> 使用String构造函数可以显示转换字符串类型  
```javascript
let num = 11;
console.log(typeof String(num));//string
```

### Boolean
> 布尔类型包括true和false两个值，布尔类型开发中使用较多的数据类型  
#### 声明定义
```javascript
let a = new Boolean(true);
let b = new Boolean(false);
//建议使用字面量创建布尔类型
let c = true;
```

#### 显式转换
> 使用`!!`转换布尔类型  
```javascript
let hd = '';
let str = ' ';
console.log(!!hd); //false
console.log(!!str);//true
hd = 0;
console.log(!!hd); //false
hd = null;
console.log(!!hd); //false
hd = new Date("2020-2-22 10:33");
console.log(!!hd); //true
```
> 使用Boolean()显式转换布尔类型  
```javascript
console.log(Boolean(''));//false
console.log(Boolean(' '));//true
```

#### 隐式转换
> 所有的类型都可以转换为Boolean类型  

|数据类型|true|false|
|:--:|:--:|:--:|
|String|非空字符串|空字符串|
|Number|非0的数值|0,NaN|
|Array|数组不参与比较时|参与比较的数组|
|Object|所有对象| |
|undefined| |undefined|
|null| |null|
|NaN| |NaN|

> 如果使用Boolean与数值比较时，会隐式的转换true为1,false为0  
```javascript
console.log(2 == true);//false
console.log(0 == false);//true
```

> 字符串与Boolean比较时，会先将两边用Number()转换为数值再进行比较  
```javascript
console.log(Number("str")); //NaN
console.log(Boolean("str")); //true
console.log("str" == true); //false,"str"转换为数值时为NaN
console.log("1" == true); //true
```

> 数组与Boolean比较时,和字符串一样，先两边用Number()转换为数值再比较  
```javascript
console.log(Number([])); //0
console.log(Number([3])); //3
console.log(Number([1, 2, 3])); //NaN
console.log([] == false); //true
console.log([1] == true); //true
console.log([1, 2, 3] == true); //false
```

> 引用类型的Boolean值为真，如数组和对象  
```javascript
console.log(Boolean([]));//true
console.log(Boolean({}));//true
if([] && {}){
    console.log("tue");//true
}
```

#### 实例操作
```js
while (true) {
  let n = prompt("请输入后盾人成立年份").trim();
  if (!n) continue;
  alert(n == 2010 ? "回答正确" : "答案错误！看看官网了解下");
  break;
}
```

### Number
#### 声明定义
```javascript
//use the way of object to define
let n = new Number(2);
//Number用于表示integer和float
let n1 = 11;
```

#### 基本函数
> Number.isInteger()判断是否为integer  
>
> - to.Fixed()指定返回的小数位数可以四舍五入  
```javascript
console.log(Number.isInteger(3.14));
console.log((3.1415926).toFixed(2));//3.14
```

#### NaN
> NaN means Not a Number 表示无效的数值  
>
> - NaN不能使用 == 进行比较，可以使用Number.isNaN()/Object.is(num,NaN)进行判断  
> - typeof NaN == 'number'
```javascript
//产生一个NaN
console.log(Number('hello'));//NaN
console.log(11 / 'hello');//NaN  
//NaN可以使用Number.isNaN()和Object.is(num,NaN)进行判断  
let n = 2 / 'hello';
if(Number.isNaN(n)){
    console.log('error:is a NaN');
}
console.log(Object.is(n,NaN));
```

#### 类型转换  
> 使用Number函数进行转换  
```javascript
console.log(Number('hello')); //NaN
console.log(Number(true));	//1
console.log(Number(false));	//0
console.log(Number('9'));	//9
console.log(Number([]));	//0
console.log(Number([5]));	//5
console.log(Number([5, 2]));	//NaN
console.log(Number({}));	//NaN
```

> parseInt()提取字符串去除开始空白后的数字转为整数  
>
> - parseFloat()转换为浮点数，忽略开始的空白  
```javascript
console.log(parseInt('  99hello'));	//99
console.log(parseInt('18.55'));	//18
console.log(parseFloat('  99hello'));	//99
console.log(parseFloat('18.55'));	//18.55
```

#### 舍入操作
```javascript
console.log(3.14256.toFixed(2));//3.14
```

### Math
> Math对象提供了许多方法用来进行数学计算  
#### 取极限值
> 使用min(),max()可以取得最小值和最大值  
```javascript
console.log(Math.min(11,3,55));
console.log(Math.max(11,3,55));
// 使用apply()来从数组中取值,这样可以直接接收数组参数 
console.log(Math.max.apply(Math,[11,22,44,11]));
```

#### 舍入处理
> - Math.ceil()向上取最接近的整数   
> - Math.floor()向下取最接近的整数  
> - Math.round()四舍五入处理
```javascript
console.log(Math.ceil(3.14));//4
console.log(Math.floor(3.14));//3
console.log(Math.round(3.14));//3
```

#### random
> Math.random()用于返回 0 <= num < 1的随机数  

> 获取一个随机数n 0 <= n < 5  
```javascript
console.log(Math.floor(Math.random()*5));
```

> 获取一个随机整数n 0 <= n <= 5  
```javascript
console.log(Math.floor(Math.random()*(5+1)));
```

> 获取一个随机整数2<= n <5  
```javascript
const n = Math.floor(Math.random()*(5-2))+2;
console.log(n);
```

> 获取一个随机整数2<= n <=5  
```javascript
const n = Math.floor(Math.random()*(5-2+1))+2;
console.log(n);
```

> 随机点名示例 
```javascript
let stus = ['小明', '张三', '王五', '爱情'];
let pos = Math.floor(Math.random() * stus.length);
console.log(stus[pos]);
//随机取第二到第三的学生，即1~2的随机值  
let pos1 = Math.floor(Math.random()*2)+1;
console.log(stus[pos1]);
```

### Date
> 在应用中处理日期时间是很常用的功能，很多地方会用到  
#### 声明日期
- 获取当前日期时间  
```javascript
let now = new Date();
console.log(now);
console.log(typeof now);//object
//使用函数获取当前日期时间
console.log(Date());
console.log(typeof Date());//string
//获取当前时间戳
let t = Date.now();
console.log(t);
//计算脚本执行时间
const start = Date.now();
for (let i = 0; i < 2000000; i++) {}
const end = Date.now();
console.log(end - start);
//根据指定的日期和时间定义日期对象
let now = new Date('2028-02-22 03:25:02');
console.log(now);

now = new Date(2028, 4, 5, 1, 22, 16);
console.log(now);
//使用展开运算符
let info = [2020, 2, 20, 10, 15, 32];
let date = new Date(...info);
console.dir(date);
```

#### 类型转换
```javascript
//将日期转换为数值类型就是转为时间戳，单位是毫秒
let hd = new Date("2020-2-22 10:33:12");
console.log(hd * 1);
console.log(Number(hd));
console.log(hd.valueOf())
console.log(date.getTime());
//有时需要将时间戳格式转为标准日期
const param = [1990, 2, 22, 13, 22, 19];
const date = new Date(...param);
const timestamp = date.getTime();
console.log(timestamp);
console.log(new Date(timestamp));
```

#### 对象方法
```javascript
//格式化输出日期
let t = new Date();
console.log(
  `${time.getFullYear()}-${time.getMonth()}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
);
```
> 封装一个函数使用
```javascript
function dateFormate(date,format = "YYYY-MM-DD HH:mm:ss"){
    const config = {
        YYYY:date.getFullYear(),
        MM:date.getMoth()+1,
        DD:date.getDate(),
        HH:date.getHours(),
        mm:date.getMinutes(),
        ss:date.getSeconds()
    };
    for(const key in config){
        format = format.replace(key,config[key]);
    }
    return format;
}
```

#### moment.js
> Moment.js是一个轻量级的javascript的时间库,方便使用，提高开发效率  

```javascript

<script src="https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js"></script>  

console.log(moment().format("YYYY-MM-DD HH:mm:ss"));

```