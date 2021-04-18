## Object 对象
### 基础知识 
- 对象是包括属性与方法的复杂引用数据类型，`js`中大部分类型都是对象  
- `String, Number, Math, Date, RegExp, ...`
- 对象的属性名只能是字符串，如果是数值或其他类型，最终都会调用`toString()`转为字符串  
- 对象中属性名相同时，相同的属性名只保留一个，后面的属性值会覆盖前面的     
```javascript
//同名的属性后面的会覆盖前面的  
let obj = { 1:"john", "1":"alex" };
console.log(obj);//{"1":"alex"}
```
#### OOP 
- 面向对象编程，包括几四个核心概念 :  
- 1.封装，对象是属性和方法的集合 
- 2.继承，通过代码复用减少冗余  
- 3.多态，不同形态的对象产生不同的结果
- 4.抽象，复杂逻辑功能隐藏在对象内部，开放给外部调用的方法 
```javascript
//面向对象编程 
let user = {
    name: 'john',
    grade: [
        {lesson: 'javascript',score:89},
        {lesson: 'mysql',score:70}
    ],
    average(){
        const total = this.grade.reduce((result,cur)=>(result+=cur.score),0);
        return this.name + ":" + total/this.grade.length + '分';
    }
}
console.log(user.average());//john:79.5分
```
#### 基本声明 
- 使用字面量形式声明对象是最简单的方式,创建一个对象的几种方法 :   
- 1.`let obj = new Object()`
- 2.字面量形式 `let obj = { name:"john" }`
- 3.`Object.create(proto=null,[,propertiesObject])`,可以创建一个没有原型的对象     
```javascript 
let obj = {
    name: 'mark',
    get: function(){
        return this.name;
    }
};
console.log(obj.get());
//属性与方法简写 
let name = 'alex';
let user = {
    name,
    get(){
        return this.name;
    }
}
console.log(obj.get());
```

- 用字面量形式声明对象时，在系统内部也是使用构造函数 `new Object()`创建的   
```javascript
let user = {};
let people = new Object();
```

#### 操作属性 
- 使用`.`点语法获取对象属性   
```javascript 
let user = { name:'john'};
console.log(user.john);
```
- 使用`[]`获取对象属性，用于属性名表达式或变量定义的场景   
```javascript 
console.log(user['name']);
let a = 'name';
console.log(user[a]);
```
- 如果属性名不是合法变量名就必须使用`[]`形式获取(包括`Symbol`值) 
- 对象的属性可以动态的添加或删除 
```javascript
let sy1 = Symbol('name');
let obj = {
    [sy1]: 'john', 
};
console.log(obj.sy1);//undefined 
console.log(obj[sy1]);//john
obj['my-age'] = 19;
console.log(obj['my-age']);//19
//动态添加删除对象属性 
obj.a = 100;
delete obj.a;//删除对象a属性
```

#### 对象方法 
- 定义在对象中的函数称之为方法  
```javascript 
let obj = {
    say(){
        console.log('hello');
    },
    eat: function(str = 'apple'){
        console.log('eat  '+str);
    }
};
obj.say();//hello
obj.eat();//eat apple
```

#### 引用特性 
- 对象,函数,数组都是引用类型，复制只会复制引用地址  
- 对象作为函数参数使用时不会产生完全复制，内外共用一个对象   
- 对象的比较是对内存地址的比较，所以使用`==`和`===`效果是一样的  
```javascript 
let student = {name:'john'};
let user = student;
user.name = 'alex';
console.log(student.name,user.name);//alex, alex 
//对象作为函数参数时 
let alex = {age:19};
function fn(obj){
    obj.age = 30;
}
fn(alex);
console.log(alex.age);//30
// 比较对象使用==与===一样
let obj1 = {};
let obj2 = obj1;
let obj3 = {};
console.log(obj1 == obj2);//true
console.log(obj1 === obj2);//true
console.log(obj1 == obj3);//false
```

#### this 
- `this`指当前对象的引用  
- 不同对象的`this`只指向当前对象  
- 始终建议在对象内部使用`this`而不要使用对象名  
```javascript 
//不使用this容易引发TypeError：cannot read property...
let john = {
    age: 20,
    say(){
        console.log('my age is: '+john.age);
        // console.log('my age is: '+this.age);
    }
}
let alex = john;
john = null;
alex.say();//TypeError:cannot read property age
//使用 this.age后 就可正常执行 
```

#### 展开语法 
- 使用`...`可以展开对象的结构，可以实现对象的合并  
```javascript 
let john = { age:20, gender:'boy' };
let user = {...john, height:170 };
console.log(user);//{age:20,gender:'boy',height:170}
//函数参数的合并 
function upload(params){
    let config = {
        type: '*.jpeg,*.png',
        size: 10000,
    };
    params = {...config,...params};
    return params;
}
```

### 对象转换 
- 对象直接参与计算时，解析器根据计算的场景在`String, number, default`之间转换  
- 当声明需要字符串类型时，调用顺序为`toString() > valueOf()`
- 当场景需要数值类型时，顺序`valueOf() > toString()`
- 不确定时使用`default`  
#### 基础知识  
```javascript 
let n = new Number(1);
console.log(n + 2);//number 3
console.log(n + '10');//string 110
//不确定的场景时默认使用default,大部分default使用number转换
console.log(n == '1');//true
```
#### Symbol.toPrimitive <sup>es6</sup> 
- 内部自定义`Symbol.toPrimitive`方法用来处理所有的转换场景  
```javascript 
let obj = {
    num: 1,
    [Symbol.toPrimitive]:function (){
        return this.num;
    }
};
console.log(obj + 2);//3
```
#### valueOf(),toString() 
- 可以自定义`valueOf()`与`toString()`方法用来对象转换，转换并不限制返回类型  
```javascript 
let obj = {
    name: 'john',
    num: 1,
    valueOf(){
        return this.num;
    },
    toString(){
        return this.name;
    }
};
console.log(obj + 3);//4
console.log(`${obj}`);//john
```

### 解构赋值 <sup>es6</sup>
- 解构是一种更简洁的赋值特性，可以理解为分解一个数据结构   
- 建议使用`var,let,const`进行声明  
#### 基本使用
```javascript 
//解构用法 
let info = {name:'john',url:'web.com'};
let {name:userName,url:userUrl} = info;
console.log(userName,userUrl);//john,web.com

//当属性名与变量名相同时可以省略属性定义 
let info = {name:'john',url:'web.com'};
let {name,url} = info;//=> {name:name,url:url} = info
console.log(name,url);//john,web.com
```

- 函数返回值直接解构到变量   
```javascript 
function fn(){
    return {
        name: 'john',
        url: 'web.com'
    };
}
let {name,url} = fn();
console.log(name,url);//john,web.com
//函数传参 
"use strict"
function demo({name,age}){
    console.log(name,age);
}
demo({name:'john',age:30});//john,30
```
#### 严格模式  
- 非严格模式可以不使用声明指令，严格模式下必须使用声明，建议使用`let`   
```javascript 
({ name, url } = { name:'john',url:'web.com' });
console.log(name,url);//john,web.com
//严格模式必须使用let等赋值声明 
"use strict";
let {name,url} = { name:'john', url:'web.com' };
console.log(name,url);
```
#### 简洁定义 
- 当属性名与赋值的变量名相同中时可以使用简洁定义 
```javascript 
//let {name:name,url:url} = {name:'john',url:'web.com'}
let {name,url} = {name:'john','web.com'};
```

- 只赋值部分变量  
```javascript 
let [,url] = ['john','web.com'];
console.log(url);//web.com 

let {name} = {name:'john',url:'web.com'};
console.log(name);//john
```

- 可以直接使用变量赋值给对象属性 
```javascript 
let name = 'john',url = 'web.com';
let obj = {name:name,url:url};
console.log(obj);//{name:'john',url:'web.com'}

//如果对象属性和值变量同名可以简写 
let obj2 = {name,url};
console.log(obj2);//{name:'john',url:'web.com'}
```
### 嵌套解构 
- 可以操作多层复杂数据结构   
```javascript 
const obj = {
    name: 'john',
    url: {
        title: 'url',
        content: 'web.com'
    }
};
const {name,url:{title},url:{content}} = obj;
console.log(name,title,content);//john ,url web.com
```

### 默认值 
- 为变量设置默认值  
```javascript 
let [name,site = 'web'] = ['john'];
console.log(name,site);//john,web

let {name,url,gender = 'boy'} = {name:'john',url:'web.com'};
console.log(name,url,gender);//john,web.com,boy
```

- 使用默认值对参数进行预设  

```javascript
function createElement(options){
    let {
        width = '200px',
        height = '100px',
        background = 'blue'
    } = options;
}
createElement({height:'150px',background:'red'});
```

### 函数参数
```javascript 
// 数组参数的使用 
function test([a,b]){
    console.log(a,b);
}
test(['js','mysql']);
// 对象参数使用 
function fn({name,url,gender='boy'}){
    console.log(name,url,gender);
}
fn({name:'john',url:'web.com'});
// 对象解构传参 
function user(name,{gender,age}){
    console.log(name,gender,age);
}
user('john',{gender:'boy',age:20})
```
### 属性管理 
#### 添加属性 
```javascript 
let obj = {name:'mark'};
obj.age = 18;
console.log(obj);
```
#### 删除属性 
- 使用`delete`可以删除属性
```javascript 
let obj = { name:'alex',age:18 }
delete obj.age
console.log(obj)
```
#### 检测属性 
- `obj.hasOwnProperty()`检测对象自身是否包含指定的属性，不检测原型链上的继承的属性   
- 使用 `in` 可以在原型链上检测属性
```javascript 
let obj = {name:'john'};
console.log(obj.hasOwnProperty('name'));//true

// 在数组上检测属性 
let arr = ['john'];
console.log(arr.hasOwnProperty('length'));//true
console.log(arr.hasOwnProperty('concat'));//false
console.log('concat' in arr);//true

// 在对象上检测属性 
let url = {web:'web.com'};
Object.setPrototypeOf(obj,url);//将url设置成obj原型属性
console.log(obj.hasOwnProperty('web'));//false
console.log('web' in obj);//true
```
#### assign 
- 使用`Object.assign()`静态方法从一个或多个对象复制属性  
```javascript 
"use strict";
let obj = {a:1,b:2};
obj = Object.assign(obj,{c:3},{d:4});
console.log(obj);//{a:1,b:2,c:3,d:4}
```
#### 计算属性 
- 对象属性可以通过表达式计算定义，在动态设置属性和执行属性方法时很好用  
```javascript 
let id = 0;
const user = {
    [`id-${id++}`]: id,
    [`id-${id++}`]: id,
    [`id-${id++}`]: id
};
console.log(user);//{'id-1':2,'id-2':3,'id-3':4}

//使用计算属性为文章定义键名 
let lessons = [
    {title:'响应式布局',category:'css'},
    {title:'flex弹性布局',category:'css'},
    {title:'mysql多表查询',category:'mysql'}
];
let lessonObj = lessons.reduce((total,cur,index)=>{
    total[`${cur['category']}-${index}`] = cur;
    return total;
},{});
console.log(lessonObj);//{'css-0':{title:'响应式布局',category:'css'}...}
console.log(lessonObj['css-0']);//{title:'响应式布局',category:'css'}
```
#### 传值操作 
- 对象是引用类型，赋值是传址操作  
```javascript 
let user = { name: 'john' };
let boy = { student: user };
boy.student.name = 'alex';
console.log(user.name);//alex
```
### 遍历对象 
- 使用系统API获取对象的属性与属性值   
- `Object.keys(),Object.values(),Object.entries()`
```javascript 
const user = {
    name:'mark',
    age: 25
};
console.log(Object.keys(user));//['name','age']
console.log(Object.values(user));//['mark','25']
console.log(Object.entries(user));//[['name','mark'],['age','25']]
```
#### for...in
- 遍历对象属性,操作的是属性名
```javascript 
const user = {
    name:'john',
    age: 18
};
for(const key in user){
    console.log(key);//name,age
}
```
#### for...of <sup>es6</sup>
- `for...of`不能直接操作对象,可以操作迭代数组对象   
- 要调用`Object.keys(),Object.values(),Object.entries()`得到对象的迭代数组对象   
```javascript 
const user = {
    name:'john',
    age: 18
};
//获取对象属性  
for(const key of Object.keys(user)){
    console.log(key);//name,age
}
//获取对象属性值  
for(const item of Object.values(user)){
    console.log(item);//john,18
}
//获取属性和属性值  
for(const [k,v] of Object.entries(user)){
    console.log(k,v);//name john,age 18
}

//添加元素DOM练习 
let lessons = [
    {name:'js',click:119},
    {name:'node',click:49}
];
let ul = document.createElement('ul');
for(const item of lessons){
    let li = document.createElement('li');
    li.innerHTML = `课程：${item.name},点击数:${item.click}`;
    ul.appendChild(li);
}
document.body.appendChild(ul);
```
### 对象拷贝 
- 对象赋值时复制的是内存地址，所以一个对象的改变会直接影响另外一个对象  
```javascript 
let user = {name:'john'};
let student = user;
student.name = 'alex';
console.log(user.name);//alex
```
#### 浅拷贝 
- 使用`for...in`执行对象的浅拷贝   
- 浅拷贝不会将深层的数据复制  
```javascript 
let user = {name:'john',age:20};
let student = {};
for(const item in user){
    student[item] = user[item];
}
student.name = 'alex';
console.log(user);//{name:'john',age:20}
console.log(student);//{name:'alex',age:20}
```
- `Object.assign()`函数可实现简单的浅拷贝，它是将两个对象的属性叠加   
- 后面的对象属性会覆盖前面对象的同名属性  
```javascript 
let user = {name:'john'};
let student = {};
Object.assign(student,user);
//let stu = Object.assign({},user) 也是一样的
student.name = 'alex';
console.log(user,student);//{name:'john'},{name:'alex'}
```
- 使用展开语法也可以实现浅拷贝  
```javascript 
let user = {name:'john'};
let stu = {...user};
stu.name = 'alex';
console.log(user,stu);//{name:'john'},{name:'alex'};
```
#### 深拷贝
- 深拷贝是完全的复制一个对象，两个对象是完全独立的对象  
```javascript 
function deepCopy(obj){
    //如果obj不是数组也不是对象，将会返回一个{}
    let result = (obj instanceof Array ? [] : {});
    for(let [key,value] of Object.entries(obj)){
        result[key] = (typeof value == 'object' ? deepCopy(value) : value);
    }
    return result;
}
let student = {
    name: 'john',
    lessons: {js:88,html:90},
    skills: ['html','css','javascript']
};
let user = deepCopy(student);
user.name = 'alex';
console.log(user);
```
### 构建函数 
- 对象可以通过内置或自定义的构造函数创建  
#### 工厂函数 
- 在函数中返回对象的函数称为工厂函数  
- 减少重复创建相同类型对象的代码  
- 修改工厂函数的方法影响所有同类对象  
```javascript 
//工厂函数可以简化代码  
function student(name){
    return {
        name,
        show(){
            console.log(this.name);
        }
    };
}
let stu1 = student('john');
let stu2 = student('alex');
stu1.show();//john
stu2.show();//alex
```
#### 构造函数 
- 与工厂函数相似构造函数也可以创建对象，它的`this`上下文为新对象实例  
- 构造函数名每个单词首字母大写(`Pascal`命名规范) 
- `this`指当前创建的对象 
- 不需要返回`this`，由系统自动完成 
- 需要使用`new`关键词生成对象  
```javascript 
function Student(name){
    this.name = name;
    this.show = function (){
        console.log(`hello ${this.name}`);
    }
    //return this;系统会自己返回
}
let s1 = new Student('john');
s1.show();
```
- 如果构造函数返回对象，那么`new`出来的实例将是此对象  
```javascript
function ArrayObject(...values){
    const arr = new Array();
    Array.prototype.push.apply(arr,values);
    arr.string = function(sym = '-'){
        return this.join(sym);
    };
}
const arr = new Student(1,2,3);
console.log(arr);//[1,2,3,string:function]
console.log(arr.string);//1-2-3
```
#### 严格模式
- 在严格模式下，`this`的值为`undefined`,这是为了防止无意修改`window`对象  
```javascript 
"use strict";
function User(){
    this.show = function(){
        console.log(this);
    };
}
let u = new User();
u.show();//User {show:function}

let fn = u.show;
fn();//undefined
```
#### 内置构造 
- `js`中大部分数据类型都是通过构造函数创建的   
- 字面量创建的对象，内部也调用了`Object()`构造函数   
```javascript 
let num = new Number(11);
console.log(num.valueOf());//11

let str = new String('love');
console.log(str.valueOf());//love

let bool = new Boolean(true);
console.log(bool.valueOf());//true

let date = new Date();
console.log(date.valueOf()*1);//158697437268

let reg = new RegExp('\\d+');
console.log(reg.test(99));//true

//字面量创建的对象，内部也是调用Object构造函数 
let user = {
    name:'john'
};
console.log(user.constructor);//f Object() {[native code]}
//使用构造函数创建对象 
let student = new Object();
student.name = 'alex';
student.age = 18;
console.log(student);
```
#### 对象函数 
- `js`中函数也是对象
```javascript 
function fn(str){}
console.log(fn.toString());//function fn(){}
console.log(fn.length)://0
```
> 函数是由系统内置的Function构造函数创建的  
```javascript
function fn(){}
console.log(fn.constructor);//[Function:Function]

//使用系统内置的构造函数创建函数 
const User = new Function('name',`
    this.name = arg;
    this.show = function(){
        return this.name
    };
`);
let user = new User('alex');
console.log(user.show());//alex
```
### 抽象特性  
- 将复杂功能隐藏在内部，对外开放简单的接口方法  
#### 问题分析 
- 将对象属性简单封装到构造函数内部，外部可以访问修改对象的属性    
```javascript 
function User(name,age){
    this.name = name;
    this.age = age;
    this.info = function(){
        return this.age < 50 ? '年轻人' : '中年人';
    };
}
let u = new User('alex',30);
console.log(u.name,u.age);//这些属性外部还是可以访问的
console.log(u.info);
```
#### 抽象封装  
- 通常是不能让外部访问到属性和方法的，这样才能保护对象内部的逻辑和数据的安全 
```javascript 
//通过闭包特性对对象进行封装，使得外部不能访问对象内部的属性和方法  
function User(name,age){
    let data = {name,age};// {name:name,age:age}
    let info = function(){
        return data.age > 18 ? '成年人' : '未成年人';
    };
    this.result = function(){
        return `${data.name}是${info()}`;
    };
}
let u = new User('alex',16);
//外部只能调用 u.result()获取数据 
console.log(u.result());//alex是未成年人
```
### 属性特征 
- `javascript` 可以设置对象属性的特性    
#### 查看特征 
- 使用`Object.getOwnPropertyDescriptor(obj,property)`查看对象属性的描述  
- 使用`Object.getOwnPropertyDescriptors(obj)`查看对象所有属性的描述 
```javascript 
"use strict";
let user = {
    name: 'age',
    age: 18
};
let desc = Object.getOwnPropertyDescriptor(user,'name');
console.log(JSON.stringify(desc,null,4));
/* {
    "value": "john",
    "writable": true,
    "enumerable": true,
    "configurable": true
}*/
let descs =Object.getOwnPropertyDescriptors(user);
console.log(JSON.stringify(descs,null,4));
```
- 对象属性包括下面四种特性 

|特性|说明|默认值|
|:-:|:-:|:-:|
|value|属性的默认值|undefined|
|writable|对象属性是否可修改|true|
|enumerable|对象是否可通过for\/in或Object.keys()读取|true|
|configurable|对象属性能否delete,能否修改访问器属性，能否修改属性特性|true|

#### 设置特征
- 使用`Object.defineProperty(obj,property,descriptor)`方法单个设置属性特性有三个参数    
```javascript 
"use strict";
let user = {
    name:'mark',
    age: 18
};
Object.defineProperty(user,'name',{
    value: 'john',
    writable: false,
    enumerable: false,
    configurable: false
});

//修改属性,非严格模式下不报错，但修改不起作用  
user.name = 'alex';
console.log(user.name);//TypeError

//删除属性,非严格模式不报错，但不起作用
delete user.name;
console.log(user.name);//TypeError 

//遍历
let keys = Object.keys(user);
console.log(keys);//['age'],遍历跳过属性name

//修改属性特性 
Object.defineProperty(user,'name',{
    writable: true,
    configurable: true
});//TypeError:cannot redefine property:name

```
- 使用`Object.defineProperty(obj,property,descriptor)`注意事项      
```JavaScript
var o = {}; // 创建一个新对象

// 在对象中添加一个属性与数据描述符的示例
Object.defineProperty(o, "a", {
  value : 37,
  writable : true,
  enumerable : true,
  configurable : true
});

// 对象 o 拥有了属性 a，值为 37

// 在对象中添加一个设置了存取描述符属性的示例
var bValue = 38;
Object.defineProperty(o, "b", {
  // 使用了方法名称缩写（ES2015 特性）
  // 下面两个缩写等价于：
  // get : function() { return bValue; },
  // set : function(newValue) { bValue = newValue; },
  get() { return bValue; },
  set(newValue) { bValue = newValue; },
  enumerable : true,
  configurable : true
});

o.b; // 38
// 对象 o 拥有了属性 b，值为 38
// 现在，除非重新定义 o.b，o.b 的值总是与 bValue 相同

// 数据描述符和存取描述符不能混合使用
Object.defineProperty(o, "conflict", {
  value: 0x9f91102,
  get() { return 0xdeadbeef; } 
});
// 抛出错误 TypeError: value appears only in data descriptors, get appears only in accessor descriptors
```
- 使用`Object.defineProperties()`方法设置多个属性特性有两个参数      
```javascript
"use strict";
let user = {
    name: 'john';
    age：18
};
Object.defineProperties(user,{
    name: {writable:false,enumerable:true},
    age: {value:18,configurable:false}
});
```
#### 禁止添加  
- `Object.preventExtensions(obj)`禁止向对象添加属性   
- `Object.isExtensible(obj)` 判断能否向对象添加属性  
```javascript 
"use strict";
let user = {};
Object.preventExtensions(user);
user.age = 18;//TypeError:Cannot add property

let bool = Object.isExtensible(user);
console.log(bool);//false
```
#### 封闭对象 
- `Object.seal(obj)`封闭一个对象  
- 阻止添加新属性,并将现有所有属性标记为 `configurable: false`
- `Object.isSealed(obj)`判断对象是否封闭  
```javascript 
"use strict";
const user = {
    name:'john',
    age: 18
};
Object.seal(user);
let descs = Object.getOwnPropertyDescriptors(user);
console.log(JSON.stringify(descs,null,4));

console.log(Object.isSealed(user));//true
delete user.name;//Error
```
#### 冻结对象 
- `Object.freeze()`冻结对象不允许添加，删除，修改属性  
- 对象冻结后`writable,configurable`都标记为 `false`
- `Object.isFrozen(obj)`判断对象是否冻结  
```javascript 
"use strict";
const user = {
    name: 'john',
    age: 20
};
Object.freeze(user);

user.name = 'alex';//Error
Object.isFroze(user);//true
```
### 属性访问器 
- 对象中可以使用专门的函数来管理属性，这是`js`提供的存取器特性   
- `getter()`用于获得属性值，`setter()`用来设置属性值  
- 用于避免错误的赋值
- 需要动态监测值的变化 
- 属性只能在属性访问器和普通属性任选其一，不能同时存在 

#### getter setter
- 使用属性访问器后，正常的赋值将无效  
-- 属性访问器的函数名可以与属性名不同    
```javascript 
//对用户的年龄数据使用属性访问器监控控制  
"use strict";
const user = {
    //把属性隐藏起来 
    data: {name: 'john',age: null},
    set age(value){
        if(typeof value != 'number' || value >= 100 || value <= 0){
            console.log("年龄不正确！");
            return "年龄不正确！";
        }
        this.data.age = value;
    },
    get age(){
        return `年龄是:${this.data.age}`;
    },
    set name(value){

    },
    get name(){

    }
};
user.age = 100;//年龄不正确！
user.age = 30;
console.log(user.age);//年龄是:30
```

- 只提供`getter`的只读属性   
```javascript
let lessons = {
    lists: [
        {name:'js',price: 100},
        {name:'mysql',price: 222}
    ],
    get totalPrice(){
        return this.lists.reduce((total,cur)=>total+cur.price,0);
    }
};
console.log(lessons.totalPrice());//322
lessons.totalPrice = 100;//无效，没有set totalPrice
console.log(lessons.totalPrice());//322
```
- 批量设置属性 
```javascript
const Web = {
    data:{
        name: 'myweb',
        url: 'www.myweb.com'
    },
    get site(){
        return `${this.data.name}:${this.data.url}`;
    },
    set site(v){
        [this.data.name,this.data.url] = value.split(',');
    }
};
web.site = 'web,this,myweb.com';
console.log(web.site);
```
- 设置`token`储存示例  
```javascript
let Request = {
    get token(){
        let con = localStorage.getItem('token');
        if(!con){
            alert('请登录后获取token');
        }
        return con;
    },
    set token(con){
        localStorage.setItem('token',con);
    }
};
//Request.token = 'love';
console.log(Request.token);
```
- 定义内部私有属性  

```javascript
"use strict";
const user = {
    get name(){
        return this._name;
    },
    set name(v){
        if(v.length > 10 || v.length < 3){
            throw new Error('长度要在3-10之间');
        }
        this._name = v;
    }
};
user.name = 'john';
console.log(user.name);
```
#### 访问器描述符 
- 使用`Object.defineProperties()`可以模拟定义对象私有属性，使用对象特性  
```javascript 
function User(name,age){
    let data = {name,age};
    Object.defineProperties(this,{
        name: {
            get(){
                return data.name;
            },
            set(v){
                if(v.trim()=='') throw new Error('无效用户名');
                data.name = v;
            }
        },
        age: {
            get(){
                return data.age;
            },
            set(v){
                if(v.trim() == '') throw new Error('年龄错误');
                data.age = v;
            }
        }
    });
}
let u = new User('john',18);
console.log(u.name);
u.name = 'alex';
console.log(u.name);
```
- 用`class`定义  
```javascript
"use strict";
const DATA = Symbol();
class User{
    constructor(name,age){
        this.[DATA] = {name,age};
    }
    get name(){
        return this.[DATA].name;
    }
    set name(v){
        if(v.trim()=='') throw new Error('值无效');
        this.[DATA].name = v;
    }
    get age(){
        return this.[DATA].age;
    }
    set age(v){
        if(typeof v != 'number' || v > 100 || v < 0){
            throw new Error('值无效');
        }
        this.[DATA].age = v;
    }
}
let u = new User('john',18);
console.log(u.name);
```
### 代理 proxy <sup>es6</sup>
- 代理(拦截器)是对整个对象的访问控制  
- 两个参数，`new Proxy(target,handler)`
- `setter,getter`是对单个对象属性的控制  
- 代理读写时代码更简洁 
- 对象的多个属性控制统一交给代理完成 
- 严格模式下`set`必须返回`boolean`值 
#### 代理对象   
- 代理对象操作使用`get,set`方法
```javascript 
"use strict";
const user = {name:'john'};
const proxy = new Proxy(user,{
    //obj原始对象，property属性
    get(obj,property){
        return obj[property];
    },
    set(obj,property,value){
        obj[property] = value;
        return true;
    }
});
proxy.age = 10;
console.log(user);
```
#### 代理函数  
- 如果代理以函数方式执行，会执行代理中定义的`apply`方法  
- 代理函数使用`handler`对象的`apply(func,obj,args)`方法
- 参数说明：函数，上下文对象，参数 
```javascript 
//使用apply计算函数执行时间 
function factorial(num){
    return num == 1 ? 1 : num*factorial(num-1);
}
let proxy = new Proxy(factorial,{
    //func == factorial
    apply(func,obj,args){
        console.time('run');
        func.apply(obj,args);
        console.timeEnd('run')
    }
});
//apply的二参是数组，func接收数组第一个元素后面的丢弃
proxy.apply({},[20,1,2,3]);
```
#### 代理数组 
```javascript
const lessons = [
    {title:'媒体查询响应式布局',category:'css'},
    {title:'flex弹性布局',category:'css'},
    {title:'mysql多表查询操作',category:'mysql'}
];
const handler = {
    get(target,key){
        const len = 4;
        let title = target[key].title;
        if(title.length > len){
            title = title.substr(0,len) + '.'.repeat(3);
        }
        return title;
    }
};
let proxy = new Proxy(lessons,handler);
console.log(proxy[0]);//媒体查询... 
```
#### 双向绑定 
- 用代理实现`vue`框架的数据双向绑定特性  
```html 
<html>
    <head>
        <title>proxy数据双向绑定</title>
    </head>
    <body>
        <input type="text" v-model="title"/> <br>
        <input type="text" v-model="title"/> <br>
        <div v-bind="title"></div>
    </body>
    <script>
        function View(){
            //设置代理拦截 
            let proxy = new Proxy({},{
                get(obj,property){},
                set(obj,property,value){
                    let els = document.querySelectorAll(`[v-model="${property}"],[v-bind="${property}"]`);
                    els.forEach(el=>{
                        el.value = value;
                        el.innerHTML = value;
                    })
                }
            });
            //初始化绑定元素事件,[selector]css属性选择器
            this.run = function(){
                const els = document.querySelectorAll('[v-model]');
                els.forEach(item=>{
                    item.addEventListener('keyup',function(){
                        proxy[this.getAttribute('v-model')] = this.value;
                    })
                })
            }
        }
        new View().run();
    </script>
</html>
```
#### 表单验证 
```javascript 

```

### 反射 Reflect <sup>es6</sup>
- `es6`中将`Object`的一些明显语言内部的方法移植到了`Reflect`对象上   
- `Object`对象的指令操作变成`Reflect`对象的方法操作     
- `Reflect`对象对某些方法的返回结果进行了修改，使其更合理     

#### 静态方法 

- `Reflect.get(target,name,receiver)`, 查找并返回`target`对象的`name`属性    
- 当`target`对象中有`name`属性的`getter`方法时，`getter`方法的`this`会绑定到`receiver`对象

```javascript
let User = {
    name: "john",
    get getName(){
        return this.name;
    }
};

console.log(Reflect.get(User,'name'));//john 

let res = Reflect.get(User,"getName",{
    name: "alex"
});

console.log(res);//alex

```
- `Reflect.set(target,name,value,receiver)`设置对象`target`中`name`属性的值为`value`  
- `value`为空时，会清除`name`属性   
- 当`target`对象中存在`name`属性的`setter`方法时，会将`setter`方法中的`this`绑定到 `receiver` 对象上，设置的是`receiver`对象的属性值   
```javascript
let User = {
    name: "john",
    get getName(){
        return this.name;
    },
    set setName(name){
        this.name = name;
    }
};

if(Reflect.set(User,'name',"alex")){
    console.log(User.name);//alex
}

let receiver = { name: "mark" };

if(Reflect.set(User,"name","alex",receiver)){
    console.log(receiver.name);//alex
}

```
- `Reflect.has(obj,name)`是语句`name in obj` 的函数化  
```javascript
let u = {name: 'john'};
if(Reflect.has(u,"john")){
    console.log("yes");
}
```
- `Reflect.deleteProperty(obj,property)`删除对象的一个属性，删除一个空属性也会返回`true`  
```javascript
let u = {name: "john",age: 20};
Reflect.deleteProperty(u,"age");
console.log(u.age);//undefined
```
- `Reflect.constructor(obj,args)` 等同于 `new obj(args)`
```javascript
function fn(){}
let f = Reflect.constructor(fn);
```
- `Reflect.getPrototypeOf(obj)`获取对象`obj`的`__proto__` 原型 当`obj`不是对象时 会报错  
```javascript
function Fn(){}
let f = new Fn();
console.log(Fn.prototype == Reflect.getPrototypeOf(f));//true
```
- `Reflect.setPrototypeOf(obj,prototype)`设置对象`obj`的原型为`prototype`   
```javascript
let obj = {};
Reflect.setPrototypeOf(obj,Array.prototype);
```
- `Reflect.apply(func,thisArg,args)`
```javascript
function fn(){
    console.log(this.name);
}
let u = {name: 'john',[]};
Reflect.apply(fn,u);//john
```
- `Reflect.defineProperty(target,property,attributes)`和`Reflect.getOwnPropertyDescriptor(target,propertyKey)`
```javascript
let u = {};
Reflect.defineProperty(u,'name',{value: 'john'});//默认 {writable: false,enumerable: false,configurable:false}
console.log(Reflect.getOwnPropertyDescriptor(u,'name'));//{value: 'john',writable: false,enumerable: false,configurable:false}
```
- `Reflect.isExtensible(target)`和`Reflect.preventExtensions(target)`
```javascript
let u = {};
Reflect.preventExtensions(u);
u.name = "john";
console.log(u.name);//undefined
console.log(Reflect.isExtensible(u));//false
```
- `Reflect.ownKeys(target)`返回`target`对象的所有属性名，不管属性是否可枚举，包括 `Symbols`属性名   
```javascript
let sym = Symbol(1);
let u  = {
    name: "dan",
    age: 20,
    sym: 'love'
};
Reflect.defineProperty(u,'gender',{
    value: "girl",
    enumerable: false
});
console.log(Object.keys(u));//["name","age","sym"]
console.log(Reflect.ownKeys(u));//["name","age","sym","gender"]
```

### Proxy 与 Reflect 组合使用  
- `Reflect` 对象的方法与 `Proxy` 对象的方法是一一对应的，可以很好的组合使用   
```javascript
let user = {
    name: "john",
    age: 20
};
let handler = {
    get(target,key){
        return Reflect.get(target,key);
    },
    set(target,key,value){
        return Reflect.set(target,key,value);
    }
}
let proxy = new Proxy(user,handler);
user.name = "alex";
user.age = 30;
console.log(user);//{name:"alex",age:30}
```
- 实现观察者模式   
```javascript
//定义Set集合 
const queuedObservers = new Set();

//将观察者函数 都放入 Set 集合中  
const observe = function(fn){
    return queuedObservers.add(fn);
}

// observable 返回原始对象代理，拦截赋值操作  
const observable = function(obj){
    return new Proxy(obj,{
        set(target,key,value,receiver){
            // 获取 对象赋值操作
            const result = Reflect.set(target,key,value,receiver);
            queuedObservers.forEach(observe => observe());
            return result;
        }
    });
}
```

### JSON 
- `json`是一种轻量级的数据交换格式，易于阅读与编写  
- `json: JavaScript Object Notation` 
- `json`标准中要求使用双引号包裹属性名称，减少传输发生的错误 
- `json`属于文本,文本是各种语言的合法格式   
- `json`用双引号，不用单引号  
- `json`和`javascrip`t对象差不多，但有区别 
```javascript 
let user = {
    name: "john",
    skills: ["js","mysql"] 
};
console.log(JSON.stringify(user));//{"name":"john","skills":["js","mysql"]}
```
- 基本结构  
```javascript
let json = {"name":"john","skills":["js","mysql"]};
```
- 数组结构  
```javascript
let lessons = [
  {
    "title": '媒体查询响应式布局',
    "category": 'css',
    "click": 199
  },
  {
    "title": 'FLEX 弹性盒模型',
    "category": 'css',
    "click": 12
  },
  {
    "title": 'MYSQL多表查询随意操作',
    "category": 'mysql',
    "click": 89
  }
];
```
#### 序列化 
- `JSON.stringify(value[,replacer[,space]])`生成对应`json`文本    
- `value`必须参数，要转换的对象或数组 
- `replacer`可选参数 
- 如果`replacer`为函数，则`JSON.stringify`将调用该函数，并传入每个成员的键和值，使用返回值而不是原始值 
- 如果此函数返回`undefined`，则排除成员。根对象的键是一个空字符串：""；
- 如果 `replacer` 是一个数组，则仅转换该数组中具有键值的成员。成员的转换顺序与键在数组中的顺序一样  
- `space`可选参数，文本添加缩进、空格和换行符 
- 如果 `space` 是一个数字，则返回值文本在每个级别缩进指定数目的空格，
- 如果 `space` 大于 `10`，则文本缩进 `10` 个空格。`space` 也可以使用非数字，如`\t`

#### 反序列化
- `JSON.parse(text[,reviver])`
- `text`必须参数，一个有效的`JSON`字符串 
- `reviver`可选参数，一个转换结果的函数，为对象每个成员调用些函数  