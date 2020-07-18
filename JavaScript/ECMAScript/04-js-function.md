## Function 

> 每个JS函数都是一个Function对象   
> - (function(){}).constructor === Function;//true   
```javascript
function fn(){
    return "hello";
}
let f = new fn();
//f是fn的一个实例函数对象，fn是f的构造函数  
console.log(f.constructor === fn);//true

console.log((function(){}).constructor === Function);//true

```
> Function 构造函数可以动态创建函数对象  
> - 会有和 eval 类似的安全问题(将字符串解析成JS语句)  
> - Function创建的函数只能在全局作用域中执行(无法形成闭包)  
>
> Function创建的函数比函数声明和函数表达式创建的函数更为低效  
> - Function构造器生成的函数是在函数创建时解析的  
> - 函数声明和函数表达式是其他代码一起解析的  

```javascript

let sum = new Function("a","b","return a+b;");
//等效于 let sum = Function("a","b","return a+b;");

console.log(sum(1,2));//3
```

> Function构造器创建的函数不会创建当前环境的闭包，因此只能访问全局变量和本身的局部变量   

```javascript
var a = 10 ;
// Function创建的函数不会创建当前环境的闭包，总是被创建于全局环境  
(function createFunction(){
    var a = 20;
    let f = new Function("console.log(a);");
    return f;
})()();//10,

// 下面的函数会创建闭包  
+function fn(){
    var a = 30;
    return function(){
        console.log(a);
    };
}()();//30

```

### new 
> new 操作符   
> 
> let obj = new User() ,new做了什么?   
> - 创建一个新空对象 obj, let obj = {};   
> - 将这个空对象的内置原型 \_\_proto\_\_ 指向构造函数 User 的 prototype原型, Object.setPrototypeOf(obj,User)  
> - 将 User 中 this 相关的属性添加到空对象中并将相关参数赋值  
> - 将上面构成的新对象赋值给 obj 并将 this 指针指向 obj    

```javascript
function User(name,age){
    this.name = name,
    this.age = age,
    this.say = function(){
        console.log("hello");
    }
}
let u = new User("john",20);
```

> 全局的Function对象没有自己的属性和方法   
> - 因为其本身也是一个函数，所以会从Function.prototype上继承属性和方法  
> - new Function()产生的是一个函数对象，即是函数也是对象   
> - new 操作符只能new函数，不能new对象,new的结果是一个对象    
```javascript

new new Function("console.log('hello')");//不用调用，会直接执行输出 hello

let fn = new Function();
//fn是一个函数对象,即是函数也是对象  
let f = new fn();//会执行fn一次
//f是一个对象
console.log(typeof f);//object 
//只有函数才能new 
new f();//TypeError:f is not a function 

function func(){
    console.log(1);
}
let fun = new func();
console.log(fun);//object 

```

## 函数进阶
> 函数是将复用的代码封装起来的模块，js中函数有很多其他语言不具有的特性   
### 基础知识  
#### 声明定义
> js中函数也是对象构造函数Function类创建的实例  

```javascript
let fun = new Function("str","console.log(str)");
fun('hello world');//hello world
```

> 标准语法是使用函数声明来定义函数 

```javascript
function show(){
    console.log('hello');
}
show();
```

> 对象字面量的属性函数简写   
```javascript
let user = {
    name: '',
    getName:function(name){
        return this.name;
    },
    //简写形式
    setName(value){
        this.name = value;
    }
}
```

#### 匿名函数 anonymous  
> 匿名函数就是没有函数名的函数    
> - 有的函数一般只需要执行一次就可以了，所以不需要函数名来大量调用,可以使用匿名函数   
> - 函数也是对象，所以可以通过赋值让变量指向函数对象的指针地址  

```javascript
//使用函数表达式将匿名函数赋值给变量 
let fun = function(str){
   return str; 
};//要加分号，这是一个语句 
```

> 标准声明的函数优先级高于赋值声明的函数   
>
> - 解析器会先提取标准声明的函数到代码树的顶端，也叫函数提升  
```javascript
//标准声明的函数位置不受限制  
fun(3);//4
function fun(num){
    console.log(++num);
}
```

#### 立即执行函数
> 函数定义时就立即执行的函数 
```javascript
//两种常见形式 
(function(str){...})(str)
(function(num){...}(num))
```
> 函数创建便立即执行两个条件:
 - 函数体必须是函数表达式,不能是函数声明
 - 函数体后面要有小括号()   
> 作用在函数体上的运算符可以是(),！，+，-,=  
- 运算符的作用是将匿名函数或函数声明转换为函数表达
- 可以用来定义私有作用域防止污染全局作用域  
```javascript
"use strict";
(function(str){
    var name = 'john';
    return str+name;
})(str);
```

> 使用let,const 有块作用域，能产生私有作用域  
```javascript
{
    let name = 'john';
    const WEB = 'web.com';
}
//块作用域不能访问name,WEB
```

#### 函数提升 
> 标准声明的函数会在解析时提升到代码树顶端，高于var变量提升   
>
> - 变量赋值函数(变量定义函数)不会提升  
```javascript
func();//提升
let func = function(){
    console.log('不提升');
};
function func(){
    console.log('提升');
}
```

#### 形参与实参  
> 形参是在函数声明时设置的参数，实参是指在调用函数时传递的参数   
> - 形参数量多于实参时，没有传参的形参值为undefined或默认值  
> - 形参数量少于实参时，多于的实参直接丢弃不报错  

```javascript
//n1,n2为形参 
function sum(n1,n2){
   console.log(n1+n2);
}
//2,3为实参
sum(2,3);//5
sum(2);//NaN,函数形参n2值为undefined
sum(1,2,3);//3,多的实参丢弃  
```
#### 默认参数 
> 不传实参时的形参默认值  
> - 使用默认参数时，不可以有同名参数 
> - 只有在未传递实参或参数为undefined时，默认值才会启用，null是有效的实参传递   

```javascript
//老版本方式
function avg(total,year){
    let year = year || 1;//year默认值为1
}
//新版本
function avg(total,year=1){

}
//数组排序,默认参数要放在参数列表的最后面  
function sortArr(arr,type='asc'){
    return arr.sort((a,b)=>type=='asc'?a-b:b-a);
}
```
> 函数参数默认值存在TDZ暂时性死区，还未初始化赋值的参数无法作为其他参数的默认值  
```javascript
"use strict";
function fn(x,y=x){
    console.log(x,y);
}
function f(x=y){
    console.log(x);
}
fn(1);//1 1
f(1);// 1
f();//ReferenceError:y is not defined
```
#### 函数参数 
> 函数本身也可以用作参数传递 
```javascript
function filterFun(item){
    return item < 100;
}
let res = [1,2,3,44,55].filter(filterFun);
```
#### arguments 
> arguments是系统维护的包含函数接收的所有参数的集合    
```javascript
function sum(){
    return [...arguments].reduce((total,cur)=>total+cur,0);
}
sum(2,3,4,2,6);//17
```

> 建议用展开语法获取函数所有参数    
>
> - 这种用法叫不定参数,不确定个数的参数  

```javascript
function sum(...args){
    return args.reduce((total,cur)=>total+cur);
}
```
### 箭头函数 <sup>es6</sup>

> 箭头函数是函数声明的简明形式，在使用递归，构造函数，事件处理时不建议使用箭头函数   
>
> - 基本语法：参数 => 函数体 
> - 没有参数或有多个参数时参数要用()括起来，当只有一个参数时可以省掉()
> - 函数体有多行语句时，要用{}包裹起来
> - 函数体只有一行语句，且需要返回结果时，可以省掉{}和return 结果系统自动返回 
```javascript
//基本写法 
let f = v => v;
//等价于 
let f = function(v){
    return v;
}; 
f(1);//1
```
> 当箭头函数要返回对象时，为了区分代码块，要用()将对象包裹起来 
```javascript
let f = (id,name) => ({id:'id',name:'name'});
```

> 箭头函数没有this,super,arguments和new target与之绑定  
> - 箭头函数体中的this对象，是定义函数时的对象，而不是使用函数时的对象  
> - 箭头函数不可以作用构造函数，不能使用new命令   

```javascript
//箭头函数没有this对象，不绑定调用它的对象this 
let f = () => {
    //this为外层的window对象  
    console.log(this);//window对象
}
//箭头函数体中的this对象，是定义函数时的对象，而不是使用函数时的对象  
function fn(){
    setTimeout(()=>{
        //定义时this绑定的是fn中的this(window)对象 
        console.log(this.a);
    });
}
var a = 100;
//call可以给fn绑定this对象，fn的this对象为{a:10}
fn.call({a:10});//10
```

> 当我们需要维护一个this上下文的时候，可以使用箭头函数   

```javascript
var Person = {
    'age': 18,
    'sayHello': function () {
        //回调函数是哪个对象调用它，它的this就指向哪个对象 
        //下面回调函数的this其实是window 
        //只有对象才会改变this指向，函数不改变this指向  
      setTimeout(function () {
        console.log(this.age);
      });
    }
};
var age = 20;
Person.sayHello();  // 20
//使用箭头函数  
var Person1 = {
    'age': 18,
    'sayHello': function () {
        //回调函数为箭头函数，不绑定this对象 
        //箭头函数的this,是定义函数时的对象，不是使用函数时的对象  
        //下面箭头函数定义时的对象为Person1,使用函数时的对象为window,window.setTimeout
      setTimeout(()=>{
        console.log(this.age);
      });
    }
};
var age = 20;
Person1.sayHello();  // 18
```

> 不适合使用箭头函数的场景 
```javascript
//定义对象的方法，且方法中用到this 
var Person = {
    'age': 18,
    'sayHello': ()=>{
        console.log(this.age);
      }
};
var age = 20;
Person.sayHello();  // 20
// 此时 this 指向的是全局对象
 
var Person1 = {
    'age': 18,
    'sayHello': function () {
        console.log(this.age);
    }
};
var age = 20;
Person1.sayHello();   // 18
// 此时的 this 指向 Person1 对象

/*需要动态this的时候，不能用箭头函数  
button的监听回调函数是箭头函数
所以监听函数里面的this指向的是定义的时候外层的this对象，即Window
导致无法操作到被点击的按钮对象
*/
var button = document.getElementById('userClick');
button.addEventListener('click', () => {
     this.classList.toggle('on');
});
```

### 递归与回调  
#### 递归调用 
> 递归是指函数内部调用函数自身的方式  
> - 主要用于数量不确定的循环操作  
> - 要有退出时机否则会陷入死循环，内存溢出  
```javascript
// 阶乘计算  
function factorial(num=3){
    return num == 1 ? num : num*factorial(--num);
}
console.log(factorial(5));//120
//累加
function sum(num = 10){
    return num == 1 ?  num : (num+sum(--num));
}
//打印倒三角 
function star(row = 5){
    if(row == 0) return '';
    document.write("*".repeat(row)+"<br/>>");
    star(--row);
}
```

#### 回调函数

> 在某个时刻被其他函数调用的函数称为回调函数，比如处理键盘，鼠标事件的函数   
>
> - 回调函数会立即执行  
```html
<body>
    <button id='btn'> </button>
    <script>
        document.getElementById('btn').addEventListener('click',function(){
            console.log(this);
        })
        //使用函数递增计算  
        let res = ([1,2,3].map(item => item+10));
        console.log(res);//[11,12,13]
    </script>
</body>
```
> 回调函数作用域问题   
```javascript 
//anonymous立即执行函数调用 fn 时
var a = 10;
function fn(){
    //a 是全局作用域的 a
    console.log(a);
}
+ function(fun){
    var a = 20;
    // 这里fun是没有传参数的，所以形成闭包时，并没有保存变量 a 
    fun();
}(fn);//10
```
#### 同步回调函数与异步回调函数  
> 同步回调函数   
> 
> - 立即执行，完全执行完了才结束，不会放入回调队例中   
> - 包括数组遍历相关的回调函数，Promise的excutor函数     
```javascript
//同步回调函数   
let arr = [1,2,3];
arr.forEach((item) => console.log(item));
console.log('after forEach function');
// 输出顺序  1 2 3 after forEach function 
```

> 异步回调函数    
> 
> - 不会立即执行，会放入回调队列中，等js执行栈清空后，才有可能执行   
> setTimeout,requestAnimationFrame,ajax,网络请求...
```javascript
```

### 展开语法

> 展开语法或称拓展语法或点语法体现的是收\/放特性   
>
> - 做为值是放，做为变量时是收  

```javascript
//放开 
let arr = [1,2,3];
let [a,b,c] = [...arr];
console.log(a,b,c);//1 2 3

//收拢
[...arr] = [4,5,6];
console.log(arr);//[4,5,6]
```
> 可以使用 ...接收多个参数合并为数组  
>
> - 多个参数时，...参数要放到参数列表最后，还要在默认参数的后面  
```javascript
function sum(...args){
    let res = args.reduce((total,cur) => total+cur);
    return res;
}

function sumPrices(discount=0,...prices){
    let total = prices.reduce((total,cur)=>total+cur);
    return total;
}
```

### 标签函数  
> 使用函数来解析标签字符串  
>
> - 第一个参数是字符串值的数组，其余的参数为标签变量  

```javascript
function fn(str,...values){
    console.log(str);//[ 'john', '-', '' ]
    console.log(values);//[ 20, 'boy' ]
}
let age = 20,gender = 'boy';
fn `john${age}-${gender}`;
```
### this  
> 调用函数时this会隐式传递给函数,指函数调用时的关联对象  
>
> - 函数调用时的关联对象，就是函数的执行环境，也称之为函数的上下文  

```html 
<!-- 全局环境下，this是window对象的引用  -->
<script>
    console.log(this);//window
    //严格模式下，this为undefined 
    "use strict";
    console.log(this);//undefined
</script>
```
> 构造函数中的this指向实例对象 
```javascript
function User(){
    this.name = 'john';
    this.fn = function(){
        console.log(this.name);
    }
}
let u = new User();
var name = 'alex';
u.fn();//john
```

> 函数为对象的方法时，this指向该对象  
>
> - 函数为对象的方法，指的是对象可以直接用.调用函数如window.setTimeout()

```html
<script>
/*
* show方法属于对象方法，指向对象obj 
* fn函数不属于对象方法，指向全局环境window对象  
*/
let obj = {
  name: "john",
  show() {
    console.log(this.name); //john
    console.log(`obj method: ${this}`); //obj method: [object Object]
    
    function fn() {
      console.log(this.name); //alex
      console.log(`fn function: ${this}`); //[object Window]
    }
    fn();
  }
};
var name = 'alex';
//let name = 'alex'; //使用let声明结果一样
obj.show();

</script>
```

> 在方法中使用函数时有些函数可以改变this  
> - array().map(,this),forEach()  
> - apply,call,bind  

```javascript
let lessons = {
  site:'web.com',
  lists: ['css','js','html'],
  show(){
    return this.lists.map(function(title){
      return `${this.site} - ${title}`;
    },this);

  }
}
//map函数传第二个参数this时结果是
//[ 'web.com - css', 'web.com - js', 'web.com - html' 
console.log(lessons.show());
//不传第二个参数this时map函数绑定的是全局的this对象 
//[ 'undefined - css', 'undefined - js', 'undefined - html' ]
console.log(lessons.show());
```
> 箭头函数 
> - 箭头函数没有this，继承定义函数时的上下文，和外层的函数指向同一个this  
> - 如果想使用函数定义时的上下文的this，那就使用箭头函数  
> - 普通函数和方法的this是看执行时的上下文  
> - 箭头函数的this是看定义时的上下文    
> - 回调函数时谁调用它this指向谁  

```javascript
let name = 'john';
let obj = {
    name: 'alex',
    getName: function(){
        //这里要用立即函数，不然会直接将整个函数返回，里面的return不会执行 
        return (function(){
            //匿名函数执行环境为全局,this指向全局对象 window  
            return this.name;
        })();
    }
}
console.log(obj.getName());//john
```
> 箭头函数没有this，看定义时this是谁  
```javascript
var name = 'john';
let obj = {
    name: 'alex',
    getName: function(){
        //这里一定要用立即执行函数，不然直接返回整个箭头函数
        return (() => {return this.name;})();
    }
}
console.log(obj.getName());//alex
```
#### apply\/call\/bind 
> 改变this指针指向，也可以理解为对象借用方法  

```javascript
//声明构造函数时this默认是一个空对象，new之后把this指向new出来的实例对象 
function User(name){
    this.name = 'name';
}
let u = new User('john');
console.log(u.name);//john

//可以改变构造函数中的空对象，让this指向另一个对象 
let obj = {};
//obj对象借用构造函数User的函数方法  
User.call(obj,'mark');
console.log(obj.name);//mark
```
> 在js中函数是对象的方法  
>
> - 如果一个函数不是js对象的方法，那它就是全局对象的函数  

#### call 
> 通过call可以使用属于另一个对象的方法  
```javascript
let person = {
    fullName(){
        return `${this.firstName} ${this.lastName}`;
    }
};
let user = {
    firstName: 'Bill',
    lastName: 'Gates'
};
let res = person.fullName.call(user);
console.log(res);
```

#### call / apply 
> call与apply用于显示设置函数的上下文(this)  
> - 两个方法都是将对象绑定到this,不同的是参数的传递方式 
> - call是分别传参数，即一般的逗号分隔的参数列表  
> - apply是用数组传递参数  
> - call，apply都会立即执行，bind不会立即执行  

```javascript
function show(title){
    console.log(this);
    console.log(`${title + this.name}`);
}
let user = {
    name: 'john'
};
let student = {
    name: 'alex'
};
show.call(user,'用户');
show.apply(student,['学生']);
//求数组最大值  
let arr = [22,3,11,44,55,666];
console.log(Math.max(arr));//NaN
console.log(Math.max.apply(Math,arr));//666
console.log(Math.max(...arr));//NaN
//上面利用apply数组参数特性....
```

> 实现构造函数的属性继承  

```javascript
"use strict";
function Request(){
    this.get = function(params = {}){
        //组合请求参数
        let option = Object.keys(params).map(key => `${key}=${params[key];}`).join('&');
        return `获取数据 API:${this.url}?${option}`;
    }
}
//文章控制器 
function Article() {
    this.url = 'article/index';
    Request.apply(this,[]);
}
let art = new Article();
//获取数据 API:article/index?row=10&start=3
console.log(art.get({row:10,start:3}));
//课程控制器 
function Lesson(){
    this.url = 'lesson/index';
    Request.apply(this);
}
let lesson = new Lesson();
//获取数据 API:lesson/index?colum=2
console.log(lesson.get({row:8}));
```

#### bind 
> bind()是将函数绑定到某个对象   
>
> - a.bind(obj)可以理解为将a函数绑定到对象obj上即obj.a()  
> - bind绑定后不会立即执行 
> - bind是复制函数行为，会返回新函数  

```javascript
let a = function(){};
let b = a;
console.log(a === b);//true
let c = a.bind();
console.log(a == c);//false 
```

> bind参数传递有两个途径(函数柯里化)     
> - 绑定时  
> - 调用时   

```javascript
function fn(a,b){
    return this.name + a + b;
}
//使用bind绑定返回新函数时，可以传递参数 a = 'hello' 
let fun = fn.bind({name:'john'},' hello ');
//调用新函数时，也可以传递参数,b = 'world',多的参数忽略  
console.log(fun('world','otherArgs'));//john hello world 
```

> 在事件的回调函数上使用bind  
```html
<body>
    <button>hello</button>
</body>
<script>
    document.querySelector("button").addEventListener('click',function(e){
       console.log(e.target.innerHTML+this.url) 
    }.bind({url:'web.com'}));
</script>
```

> 随机背景色效果 
```html
<html>
    <head>
        <title>随机色效果</title>
    </head>
    <style>
        *{
            padding: 0;
            margin: 0;
        }
        body{
            width: 200px;
            height: 150px;
            font-size: medium; 
            padding: 20%;
            transition: 2s;
            display: flex;
            justify-content: content;
            align-items: center;
            background-color: #34495e;
            color: #34495e;
        }
    </style>
    <body>
        something is happened....
    </body>
    <script>
        function Color(elem){
            this.elem = elem;
            this.colors = ['#75b9ff','#ffeaa7','#fab1a0','#fd79a8'];
            //不用箭头函数 ，可以用回调函数bind(this)
            this.run = function(){
                setInterval(() => {
                   let pos = Math.floor(Math.random()*this.colors.length);
                   this.elem.style.background = this.colors[pos];
                }, 1000);
            }
        }
        let obj = new Color(document.body);
        obj.run();
    </script>
</html>
```
### Generator 函数 <sup>es6<sup>
> generator函数可以通过 yield 关键字，把函数的执行流挂起     
> - 可以改变函数执行流程，为异步编程提供解决方案   
> - 产生一个迭代对象  
#### Generator 函数组成  
> 两个部分 ：   
> - 在 function关键字后面，函数名前面有个 \*
> - 函数内部有 yield 表达式 用来返回结果的      
```javascript 
// * 用来标识一个函数为 Generator 函数   
function* func() {
    console.log('one');
    yield '1';
    console.log('two');
    return '2';
}
let f = func();//f 是一个可迭代对象
console.log(f.next());//one  {value:"1",done:false}
console.log(f.next());//one  {value:"2",done:true}
console.log(f.next());//one  {value:undefined,done:true}
```
> 执行机制   
> - 调用Generator和普通函数一样，但是Generator函数不会立即执行，而是返回一个指向内部状态的指针     
> - 调用遍历器对象Iterator的 next() 方法   
> - 每次调用指针从函数头部或者上一次停下来的地方开始执行   

##### next 方法  
> next 方法不传入参数的时候，yield 表达式的返回值是 undefined  
> 传入参数的时候，该参数会作为上一步 yield 的返回值(注意是上一步的yield返回值)    
```javascript
function* fn(){
    let a = yield 1;
    let b = yield 2;
    let c = yield 'love';
    console.log('a: '+ a);
    console.log('b: '+ b);
    console.log('c: '+ c);
}
let f = fn();
console.log(f.next(10));
console.log(f.next(20));
console.log(f.next(30));
console.log(f.next());//a: 20,b：30，c: undefined
```
#### yield 表达式  
> yield * 表达式表示 yield 返回一个遍历器对象，用于在 Generator 函数内部 调用另一个 Generator 函数   
```javascript
function* callee() {
    console.log('callee: ' + (yield));
}
function* caller() {
    while (true) {
        yield* callee();
    }
}
const callerObj = caller();
callerObj.next();
// {value: undefined, done: false}
callerObj.next("a");
// callee: a
// {value: undefined, done: false}
callerObj.next("b");
// callee: b
// {value: undefined, done: false}
 
// 等同于
function* caller() {
    while (true) {
        for (var value of callee) {
          yield value;
        }
    }
}
``` 
#### 使用场景  
> 为不具备Iterator 接口的对象 提供遍历方法  
```javascript
function* objEntries(obj){
    const keys = Reflect.ownKeys(obj);
    for(const key of keys){
        yield [key,obj[key]];
    }
}

const jane = { first: 'Jane', last: 'Doe' };
for (const [key,value] of objectEntries(jane)) {
    console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe


```
### 函数柯里化 currying   
> 把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数     
> 这个函数返回一个新函数,新函数接受余下的参数，并且返回结果     
```javascript 
function sum(a,b){
    return a+b;
}
//柯里化sum函数 
function curryingSum(a){
    return function(b){
        return a+b;
    };
}
console.log(curryingSum(1)(2));//3;
```
#### 柯里化作用  
```javascript 
// 正常调用 
reg.test(text)
// 函数封装  
function regCheck(reg,text){
    return reg.test(text);
}
// 柯里化封装函数   
function currying(reg){
    return function(text){
        return reg.test(text);
    }
}

let hasNumber = curryingRegCheck(/\d+/g);
let hasLetter = curryingRegCheck(/[a-z]+/g);

hasNumber('test1');//true
hasLetter('11111');//false

```
#### 延迟执行  
```javascript
//bind函数的参数 其实就是柯里化里  
let u = {
    name: 'john'
};
function say(age,gender){
    console.log(this.name + '-'.repeat(1)+age +'-'+ gender);
}
let fn = say.bind(u,20);
fn('boy');//john-20-boy  
```
> 柯里化案例  
```javascript
//实现个一个函数 add(1,2,3)(4)=10,add(1)(2)(3)=6,add(1)(2,3)(4)(5)(1,1)=17

function add(...args){
    return function _add(...newArgs){
        _add.toString = [...args,...newArgs].reduce((total,cur) => total+cur);
        if(newArgs.length){
            args = [...args,...newArgs];
            return _add;
        }else{
            return args.reduce((total,cur) => total+cur);
        }
    }
}

console.log(add(1,2)(3)(4,5)());//15

console.log(add(1,2)(3)(4,5));//[Function:_add] toString: 15   
```