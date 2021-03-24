## 原型与继承 Prototype and extend  
- 重要概念:
- `javascript`是基于原型编程语言 
- `ES6`引入的`class`关键字，只是语法糖，本质实现还是原型与原型链接
- 几乎所有`JavaScript`对象都是位于原型链最顶端的`Object`的实例  
- 每个`JavaScript`对象都有它的原型:
- 1.对象的原型是它的私有属性`__proto__`(非官方标准表示，但浏览器都实现了这个属性) 
- 2.在`ECMAScript`标准中用符号`[[Prototype]]`(等同于`__proto__`)指向对象的原型 
- `[[Prototype]]` 可以通过`Object.getPrototypeOf()`, `Object.setPrototypeOf()`来访问 
```javascript
function Fn(name,age){
    this.name = name,
    this.age = age,
    this.say = function(){
        console.log("hello");
    }
}
Fn.prototype.sleep = function(){
    console.log("sleep method");
}
Fn.prototype.gender = "man";
let f1 = new Fn();
let f2 = new Fn();

console.log(f1.say == f2.say);//false
console.log(f1.sleep == f2.sleep);// true
console.log(f1.gender == f2.gender);// true

Object.prototype.hide = function(){
    console.log("hide method in object prototype");
}

f1.__proto__.hide();//hide method in object prototype
console.log(Object.prototype == Function.__proto__);//false
```
### 原型基础   
- 原型：原型是系统为每个对象维护的一个属性 `__proto__` 
  + `__proto__`本身也是一个对象 
  + 对象的原型`__proto__`指向它的构造函数的`prototype`属性 
  + 构造函数的`prototype.constructor`是构造函数自身的一个引用 
  + 使用原型对象为多个对象共享属性或方法  
  + 使用原型可以解决，通过构建函数创建对象时复制多个函数造成的内存占用问题   
  + **构造函数的属性`prototype`包含`constructor`属性，指向构造函数本身**
- 原型链：
  + JS引擎在操作对象的属性时,首先在该对象本身查找这个属性 
  + 如果没有找到，就从对象的属性原型对象`__proto__`(等同于对象的构造函数的`prototype`属性)上查找 
  + 如果还是没有找到,就到`__proto__`对象的`__proto__`查找  
  + 依次类推，如果直到最后`Object.prototype`时，还没找到就返回`undefined` 
  + 以上这个查找对象属性的链路就叫原型链  
- 对象分为构造函数和实例对象
  + 构造函数，可以实例化一个对象实例，比如`Function,Array,String...`
    + 函数也是一个对象，可以是一个普通对象，也可以是一个构造函数，看使用环境  
    + 函数对象也可以使用`toString,toValues,isPrototypeOf`等对象方法
  + 实例对象，是一个普通对象，是由构造函数显示的或隐式的`new`出来的，比如`let obj = {name:'shp'},let fn = new Function()` 
    + 普通对象有`__proto__`属性，而没有`prototype`属性，不能`new`
    + 构造器 `constructor` 存在于构造函数的`prototype`原型中，是构造函数的一个引用 
    + `Function.prototype.constructor == Function`   
    + `function(){}.__proto__ == Function.prototype`   
- 原型操作:
  + 获取对象的原型 `Object.getPrototypeOf()`
  + 设置对象的原型 `Object.setPrototypeOf()`
  + 判断对象的原型 `Object.isPrototypeOf()`
  + 对象属性查找 
    - 查找对象自身属性 `obj.hasOwnProperty()` 
    - 查找对象属性包括原型上的 `in`
```javascript
let arr = ["a"];
arr.concat("b");//使用原型上的方法

let x = {};
let y = {}
console.log(Object.getPrototypeOf(x) === Object.gePrototypeOf(x));//true  

```
- 可以使用`let obj = Object.create(null)`创建一个没有原型的对象  
```javascript
let  u = {name: "john"};
console.log(u.hasProperty("name"));//true  

let obj = Object.create(null,{
    name: {
        value: "alex",
        // enumerable: false,//默认值是false
    }
});
//obj原型为null，所以没有hasProperty这个方法
console.log(obj.hasProperty("name"));//Error  
//Object.keys()是Object静态方法，不是原型方法
obj.age = 20;
console.log(Object.keys(obj));//["age"]
```

#### 原型对象 
- 原型相关方法:  
  + `Object.getPrototypeOf()`
  + `Object.setPrototypeOf()`
  + `Object.isPrototypeOf()`
```javascript
//获取原型 
function User(){}
let u = new User();
Object.getPrototypeOf(u);

```
- 函数对象
  + `__proto__`原型用于函数对象本身使用
  + `prototype`用于实例化对象使用       
  + 类似的还有`Array,String`...
```javascript 
function Fun(){}
Fun.__proto__.say = function(){
    console.log("inner of __proto__ prototype");
};
Fun.say();//inner of __proto__ prototype

Fun.prototype.show = function(){
    console.log("show in prototype");
};

Fun.show();//TypeError:Fun.show is not a function 

let fn = new Fun();

fn.show();//show in prototype

fn.say();//TypeError:Fun.show is not a function

console.log(fn.__proto__ == Fun.prototype);//true

```
- 构造器 `constructor` 存在于构造函数的`prototype`原型中，是构造函数的一个引用
  + `constructor`是实例函数对象的原型链上的一个属性，指向构造函数本身         
```javascript
function User(name){
    this.name = name
}
let u = new User("john");
let obj = new u.constructor;
console.log(u instanceof u.constructor);//true
console.log(u.constructor == User );//true
console.log(obj.constructor == u.constructor);//true

//User.constructor == Function
console.log(User.constructor == Function);//true
```

#### 原型链 
- 实例对象与它的构造函数的原型之间的连接，叫原型链。  
- 通过引用类型的原型。继承另一个引用类型的属性和方法  
  + `Object.getPrototypeOf(),Object.setPrototypeOf()`   
```javascript 
let obj1 = {
    name: "john"
};
let obj2 = {
    vocation: "student"
};
let obj3 = {
    species: "human"
}

Object.setPrototypeOf(obj1,obj2);
Object.setPrototypeOf(obj2,obj3);

console.log(obj1.species);
console.dir(Object.getPrototypeOf(obj1) == obj2);

```
#### 原型检测  
- 原型检测 `instanceof` 
  + 检测构造函数的`prototype`属性是否出现在某个实例对象的原型链上   
```javascript
function A(){}
function B(){}
function C(){}

//a继承b,b继承于c
let c = new C();
B.prototype = c;
let b = new B();
A.prototype = b;
let a = new A();

console.log(a instanceof A);//true
console.log(a instanceof B);//true
console.log(a instanceof C);//true
console.log(b instanceof C);//true
console.log(c instanceof C);//true
```
- 使用`isPrototypeOf()`检测一个对象是否是另一个对象的原型链中  
```javascript
let a = {};
let b = {};
let c = {};

Object.setPrototypeOf(a,b);// a继承于b 
Object.setPrototypeOf(b,c);// b继承于c 

b.isPrototypeOf(a);//true
c.isPrototypeOf(a);//true
c.isPrototypeOf(b);//true

```
#### 属性遍历 
- `obj.hasOwnProperty()`只检测当前对象自有的属性   
- 使用 `in` 检测当前对象和原型链上的属性       
```javascript 
let a = {name: "john"};
let b = {age: 20};
Object.setPrototypeOf(a,b);

console.log("name" in a);//true
console.log("age" in a);//true
console.log(a.hasOwnProperty("name"));//true
console.log(a.hasOwnProperty("age"));//false
```
- `for / in `遍历时同时会遍历原型上的属性   
- 如果只想遍历当前对象自有属性可以用`obj.hasOwnProperty()`检测过虑  
```javascript
let  user = {name: "john"};
let  u = Object.create(user,{
    age: {
        value: 20,
        enumerable: true
    }
});
for(const k in u){
    if(u.hasOwnProperty(k)){
        console.log(k);//age
    }
    console.log(k);// age  name
}
```
#### 借用原型  
- 一个对象`obj`使用 `fn.call(obj,argument)` 或 `fn.apply(obj,[arguments])` 可以借用其他原型的`fn`方法
- 一个对象的方法`fn`可以指定其他对象当作它的 `this`对象 
```javascript 
//借用对象的原型方法  
let obj = {
    data: [1,2,3,4,]
};
//添加原型方法  
Object.setPrototypeOf(obj,{
    max: function(){
        return this.data.sort((a,b) => (b-a))[0];
    }
});

console.log(obj.max());//4

let john = {
    lessons: {js: 100,php:80,node:79},
    get data(){
        return Object.values(this.lessons);
    }
};
// 不传递参数
console.log(Object.getPrototypeOf(obj).max.apply(john));//100

// 改成传递参数形式    
console.log(Object.getPrototypeOf(obj).max.apply(john,[Object.values(john.lessons)]));//100

console.log(Object.getPrototypeOf(obj).max.call(john,Object.values(john.lessons)));//100

//利用Math.max简化版 
let obj = {
    data: [1,2,3,4]
};
let john = {
    lessons: {js:100,php:80,node:79}
};

console.log(Math.max.apply(null,obj.data));//4
console.log(Math.max.apply(null,Object.values(john.lessons)));//100
```
- `document.querySelectorAll()`获取的是一个`Object NodeLists `，不能直接用数组原型方法，可以借用数组方法      
```html
<body>
    <button message="first" class="color"></button>
    <button message="second"></button>
</body>
<script>
    let btns = querySelectorAll("button");
    btns = Array.prototype.filter.call(btns,item=>{
        return item.hasAttribute("class");
    })
</script>
```
#### this 
> this不受原型继承影响，this指向调用属性时使用的对象   

### 原型总结 
#### 对象原型  
- 对象的原型对象是 `__proto__` 
  + 除了 `Object` 根对象有 `prototype` 原型对象，普通对象只有 `__proto__` 原型对象   
  + 默认对象的原型对象 `__proto__ == Object.prototype ` 
  + 原型操作函数 `Object.getPrototypeOf(),Object.setPrototypeOf(obj,proto)`   
  + 检索本身和原型链上的属性用 `in` ,检索本身属性用`obj.hasOwnProperty(property)`   
```javascript
let john = {
    lessons: {js: 90,css: 80,html: 92}
};
console.log(john.__proto__ == Object.prototype);//true
```
- Object.create(proto,property)  
```javascript
let a = {};
Object.create(a,b);
console.log(b);
```
#### 函数原型  
- 函数是对象也是构造函数，根函数是 `Function` ,是 `Object` 一个特殊对象     
  + fn是一个普通函数，则有 `fn.__proto__ == Function.prototype == Object.__proto__`    
  + 函数是对象，有原型对象 `__proto__`   
  + 函数当对象使用时,用的是原型对象 `__proto__`  比如 `fn.apply == fn.__proto__.apply`   
  + `Object.getPrototypeOf(fn) == fn.__proto__ `     
```javascript
function fn (){}
fn.__proto__.say = function(){
    return "hello";
}
console.log(fn.say());
```

- 函数是构造函数，有原型对象 `prototype`  
  + 函数当构造函数使用时，用的原型对象是 `prototype`    
  + 即 `new` 出来的实例函数的 `__proto__` 继承构造函数的 `prototype`    
  + `prototype` 中包含 `constructor` 和 `prototype` 对象本身的原型 `__proto__` 
  + `constructor` 是指向构造函数本身的一个引用,即`Fn.prototype.constructor == Fn`  
```javascript 
function fn(){}
let f = new fn();
console.log(f.__proto__ == fn.prototype);//true
```
- 原型中保存的引用类型会造成对象共享属性，所以一般只会在原型中定义方法,节省内存空间     
- 与函数类似的 String,Boolean...
```javascript
function Fn(name,age){
    this.name = name,
    this.age = age,
    this.say = function(){
        console.log("hello");
    }
}
Fn.prototype.sleep = function(){
    console.log("sleep method");
}
Fn.prototype.gender = "man";
let f1 = new Fn();
let f2 = new Fn();

console.log(f1.say == f2.say);//false

console.log(f1.sleep == f2.sleep);//true
console.log(f1.gender == f2.gender);//true

Object.prototype.hide = function(){
    console.log("Object prototype hide method");
}

f1.hide();//Object prototype hide method 
// 下面输出 true ,相当于obj = f1.__proto__ == Fn.prototype,obj.__proto__  == Object.prototype
console.log(f1.__proto__.__proto__ == Object.prototype);

```
### 原型总结
- `prototype` 
  + 函数即可以是普通函数，也可以是构造函数，看使用方式  
  + 构造函数能够实例化对象,如 `Object(),Array(),Boolean()...`
  + 构造函数有 `prototype`属性，`new`对象时赋予给对象的原型 
  + `Fn.prototype == Object.getPrototypeOf(fn) == fn.__proto__` 
  + `prototype`与`__proto__`结构是一样的`{constructor:f(),__proto__:Object}`  
  + 原型中保存引用类型会造成对象共享属性，一般只在原型中定义方法  
  + `Object.prototype`添加方法会影响所有对象或函数 
```javascript 
function User(name){
    this.name =  name;
}
let u1 = new User("u1");
let u2 = new u1.constructor("u2"); // == new User("u2")

```

- `Object.create` 
  + `Fn.prototype`是构造函数Fn本身的一个引用 
  + 如果直接`Fn1.prototype = Fn2.prototype`，那修改`Fn1.prototype`也会影响到`Fn2,Fn2.prototype`  
  + 使用`Fn1.prototype = Object.create(Fn2,{properties})`来为对象Fn1设置原型为Fn2  
  + 可以在设置时使用第二个参数设置新对象的属性  
```javascript 
let user = {}
let student = Object.create(user,{name:{ value: 'shp'},enumerable: true});
```

- `__proto__`
  + 对象的`__proto__`记录了对象的原型，可以由此访问原型的属性或方法  
  + `__proto__`不是对象的属性 
    - `__proto__`是一个非标准定义  
    - `Object.hasOwnProperty('__proto__') == false`  
    - 可以理解为其构造函数的`prototype`的`getter / setter`实现 
```javascript 
let obj = {};
obj.__proto__ = "shp";
//这样修改不了，因为__proto__内部由getter / setter 控制值，只允许为对象或null
console.log(obj.__proto__);//{constructor:...,__proto__:Object}

let obj2 = Object.create(null);
obj2.__proto__ = "shp";
//这样就能修改，因为这是一个极简对象，没有原型对象，不会影响__proto__的赋值 
console.log(obj2.__proto__);//"shp"

```
- 使用建议:
  + `prototype`是构造函数的原型属性  
  + `Object.create()`创建对象时指定原型 
  + `__proto__`是非标准的写法 
  + 建议用`Object.getPrototypeOf(),Object.setPrototypeOf(),Object.isPrototypeOf()`操作原型 

- `constructor`构造函数 
  + 构造函数的原型中包含属性`constructor`指向构造函数本身 
  + 直接设置构造函数的原型时将造成`constructor`缺失 
  + 正确做法应该保证原型中的`constructor`指向构造函数 
```javascript 
function User(name){
    this.name = name;
}
User.prototype = {
    constructor: User,//不加这个，将会导致constructor丢失 
    show: function(){
        console.log(this.name);
    }
}
```
- 使用优化:  
  + 使用构造函数会产生函数复制造成内存占用,及相同函数不能共享问题 
  + 如果使用原型的话，就不会产生函数复制，多个对象共享相同功能的函数方法 
  + `Object.assign(target,sources)`,合并多个`source`对象后返回得到`target`对象  
``` javascript 
function User(name, age) {
  this.name = name;
  this.age = age;
}
Object.assign(User.prototype, {
  getName() {
      return this.name;
  },
  getAge() {
      return this.age;
  }
});
let lisi = new User('李四', 12);
let xiaoming = new User('小明', 32);
console.log(lisi.getName()); //李四
console.log(lisi.__proto__)
```
- 体验继承 
```javascript 
"use strict";
function User() {}
User.prototype.getName = function() {
  return this.name;
};

function Stu(name) {
  this.name = name;
}
Stu.prototype = new User();
const lisi = new Stu("李四");

console.log(lisi.__proto__);
console.log(lisi.getName());
```

### 继承与多态 
```javascript 
function User() {}
User.prototype.getUserName = function() {};

function Admin() {}
Admin.prototype = Object.create(User.prototype);
Admin.prototype.role = function() {};

function Member() {}
Member.prototype = Object.create(User.prototype);
Member.prototype.email = function() {};
console.log(new Admin());
console.log(new Member());

// 不能使用以下方式操作，因为以下会改变User的原型方法，这不是继承，这是直接改变原型
function User() {}
User.prototype.getUserName = function() {};
function Admin() {}
Admin.prototype = User.prototype;
Admin.prototype.role = function() {};

```
- 构造函数与继承  
- 构造函数`Admin`继承构造函数 `User` 
  + 继承操作 `Admin.prototype = Object.create(User.prototype)`
  + 记得继承之后，要使构造函数的`Admin.prototype.constructor = Admin`
```javascript 
function User() {}
function Admin() {}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.role = function() {};

let xj = new Admin();
console.log(xj.constructor); //constructor丢失，返回User构造函数

Admin.prototype.constructor = Admin;//使constructor指向本身 

let hd = new Admin();
console.log(hd.constructor); //正确返回Admin构造函数

//现在可以通过对象获取构造函数来创建新对象了
console.log(new hd.constructor());
```
- 使用`Object.defineProperty()`定义禁止遍历`constructor`属性 
```javascript
function User() {}
function Admin(name) {
  this.name = name;
}

Admin.prototype = Object.create(User.prototype);

Object.defineProperty(Admin.prototype, "constructor", {
  value: Admin,
  enumerable: false //禁止遍历
});

let hd = new Admin("后盾人");
for (const key in hd) {
  console.log(key);
}

```
- 完全重写构造函数原型，只对后面应用对象有效  
```javascript
function User() {}
const lisi = new User();
User.prototype = {
  show() {
    return "prototype show";
  }
};
const wangwu = new User();
console.log(wangwu.show());

console.log(lisi.show()); // lisi.show is not a function

```
- 方法重写 
```javascript 
//子类重写父类方法
function Person() {}
Person.prototype.getName = function() {
  console.log("parent method");
};

function User(name) {}
User.prototype = Object.create(Person.prototype);
User.prototype.constructor = User;

User.prototype.getName = function() {
  //调用父级同名方法
  Person.prototype.getName.call(this);
  console.log("child method");
};
let hd = new User();
hd.getName();

```
- 多态
  + 根据多种不同的形态产生不同的结果 
```javascript 
function User() {}
User.prototype.show = function() {
  console.log(this.description());
};

function Admin() {}
Admin.prototype = Object.create(User.prototype);
Admin.prototype.description = function() {
  return "管理员在此";
};

function Member() {}
Member.prototype = Object.create(User.prototype);
Member.prototype.description = function() {
  return "我是会员";
};

function Enterprise() {}
Enterprise.prototype = Object.create(User.prototype);
Enterprise.prototype.description = function() {
  return "企业帐户";
};

for (const obj of [new Admin(), new Member(), new Enterprise()]) {
  obj.show();
}

```
### 深挖继承 
- 继承是为了代码复用，javascript继承的本质是将原型指向另一个对象 
- 构造函数 
```javascript 
/*
我们希望调用父类构造函数完成对象的属性初始化，但像下面这样使用是不会成功的  
因为此时 this 指向了window，无法为当前对象声明属性
*/

function User(name) {
  this.name = name;
  console.log(this);// Window
}
User.prototype.getUserName = function() {
  return this.name;
};

function Admin(name) {
  User(name);
}
Admin.prototype = Object.create(User.prototype);
Admin.prototype.role = function() {};

let xj = new Admin("向军大叔");
console.log(xj.getUserName()); //undefined

/*
解决上面的问题是使用 call/apply 为每个生成的对象设置属性
*/
function User(name) {
  this.name = name;
  console.log(this); // Admin
}
User.prototype.getUserName = function() {
  return this.name;
};

function Admin(name) {
  User.call(this, name);
}
Admin.prototype = Object.create(User.prototype);

let xj = new Admin("向军大叔");
console.log(xj.getUserName()); //向军大叔

```
- 原型工厂 
  + 将继承的过程封装，使用继承业务简单化 
```javascript 
function extend(sub, sup) {
  sub.prototype = Object.create(sup.prototype);
  sub.prototype.constructor = sub;
}

function Access() {}
function User() {}
function Admin() {}
function Member() {}

extend(User, Access); //User继承Access
extend(Admin, User); //Admin继承User
extend(Member, Access); //Member继承Access

Access.prototype.rules = function() {};
User.prototype.getName = function() {};

console.log(new Admin()); // 继承关系: Admin>User>Access>Object
console.log(new Member()); //继承关系：Member>Access>Object

```
- 对象工厂 
  + 在原型继承基础上，将对象的生成使用函数完成，并在函数内部为对象添加属性或方法  
```javascript 
function User(name, age) {
  this.name = name;
  this.age = age;
}
User.prototype.show = function() {
  console.log(this.name, this.age);
};

function Admin(name, age) {
  let instance = Object.create(User.prototype);
  User.call(instance, name, age);
  instance.role=function(){
    console.log('admin.role');
  }
  return instance;
}
let hd = Admin("后盾人", 19);
hd.show();

function member(name, age) {
  let instance = Object.create(User.prototype);
  User.call(instance, name, age);
  return instance;
}
let lisi = member("李四", 28);
lisi.show();

```
- `Mixin`模式(混合模式) 
- JS本身不能实现多继承，如果要使用多个类的方法，可以使用`mixin`混合模式来完成 
  + `mixin` 混合类是一个包含许多供其它类使用的方法的类 
  + `mixin` 混合类不用来继承作为其它类的父类 
```javascript 
/*
下面是示例中 Admin需要使用 Request.prototype 与 Credit 的功能，因为JS 是单继承，我们不得不将无关的类连接在一下，显然下面的代码实现并不佳
*/
function extend(sub, sup) {
  sub.prototype = Object.create(sup.prototype);
  sub.prototype.constructor = sub;
}
function Credit() {}
function Request() {}
function User(name, age) {
  this.name = name;
  this.age = age;
}
extend(Request, Credit);
extend(User, Request);
Credit.prototype.total = function() {
  console.log("统计积分");
};
Request.prototype.ajax = function() {
  console.log("请求后台");
};
User.prototype.show = function() {
  console.log(this.name, this.age);
};
function Admin(...args) {
  User.apply(this, args);
}
extend(Admin, User);
let hd = new Admin("向军", 19);
hd.show();
hd.total(); //统计积分
hd.ajax(); //请求后台

```
- 下面分拆功能使用`Mixin`实现多继承，代码结构更清晰，只让Admin继承User原型 
```javascript
function extend(sub, sup) {
  sub.prototype = Object.create(sup.prototype);
  sub.prototype.constructor = sub;
}
function User(name, age) {
  this.name = name;
  this.age = age;
}
User.prototype.show = function() {
  console.log(this.name, this.age);
};
const Credit = {
  total() {
    console.log("统计积分");
  }
};
const Request = {
  ajax() {
    console.log("请求后台");
  }
};

function Admin(...args) {
  User.apply(this, args);
}
extend(Admin, User);
Object.assign(Admin.prototype, Request, Credit);
let hd = new Admin("向军", 19);
hd.show();
hd.total(); //统计积分
hd.ajax(); //请求后台

```
-  mixin 也可以继承其他类，比如下面的 Create 类获取积分要请求后台，就需要继承 Request 来完成  
- super 是在 mixin 类的原型中查找，而不是在 User 原型中
```javascript
function extend(sub, sup) {
  sub.prototype = Object.create(sup.prototype);
  sub.prototype.constructor = sub;
}
function User(name, age) {
  this.name = name;
  this.age = age;
}
User.prototype.show = function() {
  console.log(this.name, this.age);
};
const Request = {
  ajax() {
    return "请求后台";
  }
};
const Credit = {
  __proto__: Request,
  total() {
    console.log(super.ajax() + ",统计积分");
  }
};

function Admin(...args) {
  User.apply(this, args);
}
extend(Admin, User);
Object.assign(Admin.prototype, Request, Credit);
let hd = new Admin("向军", 19);
hd.show();
hd.total(); //统计积分
hd.ajax(); //请求后台

```
### 实例操作 
- 使用`call / apply`制作选项卡 
```HTML
<style>
  * {
    padding: 0;
    margin: 0;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }

  main {
    width: 400px;
    flex-direction: column;
    position: relative;
    margin-right: 20px;
  }

  main nav {
    display: flex;
    height: 50px;
    align-items: center;
  }

  main nav a {
    background: #95a5a6;
    margin-right: px;
    padding: 10px 20px;
    border: solid 1px #333;
    color: #fff;
    text-decoration: none;
  }

  main nav a:first-of-type {
    background: #e67e22;
  }

  section {
    height: 200px;
    width: 100%;
    background: #f1c40f;
    position: absolute;
    font-size: 5em;
    display: none;
  }

  .hd-tab section:first-of-type {
    display: block;
  }

  section:nth-child(even) {
    background: #27ae60;
  }
</style>

<body>
  <main class="tab1">
    <nav>
      <a href="javascript:;">后盾人</a>
      <a href="javascript:;">hdcms</a>
    </nav>
    <section>1</section>
    <section>2</section>
  </main>
  <main class="tab2">
    <nav>
      <a href="javascript:;">后盾人</a>
      <a href="javascript:;">hdcms</a>
    </nav>
    <section>1</section>
    <section>2</section>
  </main>
</body>

<script>
	//继承工厂
  function extend(sub, sup) {
    sub.prototype = Object.create(sup.prototype);
    sub.prototype.constructor = sub;
  }
  
  //动作类
  function Animation() {}
  Animation.prototype.show = function() {
    this.style.display = "block";
  };
  //隐藏所有元素
  Animation.prototype.hide = function() {
    this.style.display = "none";
  };
  //必变元素集合背景
  Animation.prototype.background = function(color) {
    this.style.background = color;
  };
	
	//选项卡类
  function Tab(tab) {
    this.tab = tab;
    this.links = null;
    this.sections = null;
  }
  extend(Tab, Animation);
  Tab.prototype.run = function() {
    this.links = this.tab.querySelectorAll("a");
    this.sections = this.tab.querySelectorAll("section");
    this.bindEvent();
    this.action(0);
  };
  //绑定事件
  Tab.prototype.bindEvent = function() {
    this.links.forEach((el, i) => {
      el.addEventListener("click", () => {
        this.reset();
        this.action(i);
      });
    });
  };
  //点击后触发动作
  Tab.prototype.action = function(i) {
    this.background.call(this.links[i], "#e67e22");
    this.show.call(this.sections[i]);
  };
  //重置link与section
  Tab.prototype.reset = function() {
    this.links.forEach((el, i) => {
      this.background.call(el, "#95a5a6");
      this.hide.call(this.sections[i]);
    });
  };
  
  new Tab(document.querySelector(".tab1")).run();
  new Tab(document.querySelector(".tab2")).run();
</script>

```