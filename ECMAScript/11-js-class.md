# class<sup>es6</sup>
## 认识JavaScript类 
- 在ES6中`class (类)`作为对象的模板被引入,通过 `class` 关键字定义类  
- `JavaScript`是基于原型的语言,`class`是一个语法糖,让对象原型的写法更加清晰、更像面向对象编程的语法  
- `class` 的本质是 `function`,底层实现依然是原型继承 
- 类的声明定义:
- 1.类定义不会被提升，必须在访问前对类进行定义，否则会报错 
- 2.类中方法不需要 `function` 关键字 
- 3.类方法间不能加分号,也不需要加逗号  
```JavaScript
// 1.类声明 推荐这种方式声明一个类 
class Example {
    constructor(a,b) {
        this.a = a;
        this.b = a;
    }
    get(){
        console.log(this.a);
    }
}
// 2.匿名类
let Example2 = class {
    constructor(a) {
        this.a = a;
    }
}
// 3.命名类
let Example3 = class Example {
    constructor(a) {
        this.a = a;
    }
}

```
- `constructor`类中的构造函数 
  + 类中构造函数`constructor`初始化参数 
  + `constructor`会在`new`时自动执行 
  + `constructor`不是必须定义的，如果不定义,系统会自动设置一个`constructor`
  + 子构造器中调用完`super`后才可以使用`this` 
  + `constructor`内和外的属性是一样的,都是为每个实例独立创建(除了静态属性)  
  + `constructor`内和外的方法是不一样的,内的方法是为实例复制的,外的方法是加在原型上共享的 
```JavaScript
class User{
    constructor(name){
        this.name = name;
        // 构造函数方法 
        this.show = function(){
            console.log(this.name);
        }
    }
    // 原型方法 相当于 User.prototype.getName = function 
    getName(){
        return this.name;
    }
}
let u1 = new User('a');
let u2 = new User('b');
console.log(u1.show == u2.show); // false
console.log(u1.getName == u2.getName); // true

// 继承中 要先在子类中调用父类构造器方法
class Student extend User {
    constructor(...args){
        super(...args);
        this.age = 20;
    }
}
```
- 类的原理分析:
- 1.`JavaScript`中类的本质就是函数 
- 2.`constructor`用于定义函数代码 
- 3.`constructor`外面的方法是在添加函数原型`prototype`上的方法  
```JavaScript
// 类的本质就是函数 
class User{
    constructor(name){
        this.name = name;
        this.say = function(){
          console.log('hello');
        }
    }
    show(){
        console.log(this.name);
    }
}
// 上面的类与下面的函数是一样的功能 
function User(name = 'a'){
    this.name = name;
    // let u1 = new User(),let u2 = new User() u1.say != u2.say
    this.say = function(){
      console.log('hello');
    }
}
User.prototype.show = function(){
    console.log(this.name);
}
```
- 类的属性定义
- 在`class`中定义的属性都是为每个`new`出的实例独立创建 
- `class`中定义的方法有`constructor`内和外的区别 
```JavaScript
class User {
  site = "后盾人";
  constructor(name) {
    this.name = name;
  }
  show() {
    console.log(this.site + ":" + this.name);
  }
}
let hd = new User("向军");
hd.show();

```
- 类与函数的差异 
  + 类中定义的方法是不可枚举的 
  + 类默认使用严格模式执行  

### 静态访问 
- `class`中通过`static`声明的属性或方法，叫静态属性或静态方法 
- 静态属性 
  + 静态属性是类自身的属性,而不是生成的对象的属性  
  + 本质为函数中不加`this`时定义的属性,实例对象是不能直接访问的 
- 静态方法
  + 能通过类访问不能用对象访问的方法就是静态方法,比如`Math.random()` 
  + 不需要对象属性参与的方法就可以定义为静态方法 
  + 本质也是函数中不加`this`时定义的方法 
```JavaScript
// 静态属性或方法的本质 
class User{
    static name = "shp"
    static getName(){
        console.log("john");
    }
}
// 等价于
function User(){ }
User.name = "shp";
User.getName = function(){
    console.log("john");
}
// 或等价于
function User(){
    name = "shp";
    getName = function(){
        console.log("john");
    }
}
```
### 访问器
- 使用访问器可以对对象的属性进行访问控制,类中可以使用访问器管理私有属性 
- 访问器可以管控属性,防止随意修改 
- 访问器就是在函数名前加`get / set`修饰,对象操作属性时不需要加函数的`()`,直接使用函数名 
```JavaScript
class User{
    constructor(){
        this.data = {};
    }
    set name(name){
        this.data.name = name;
        console.log('aaaa');
    }
    get name(){
        return this.data.name;
    }
}
let u = new User();
u.name = "shp";
console.log(u.name);
```
### 访问权限控制 
- 设置对象的私有属性有许多种方式,包括模块封装  
- `public` 在类的内部和外部都能访问 
- `protected` 不允许外部直接操作,可先继承后在类内部访问 
  + `_`命名保护,将属性定义以`_`开头,告诉使用者这是一个受保护属性,不要在外部使用 
  + `Symbol`机制保护 
  + `WeakMap`机制保护 
```JavaScript
// 命名保护
class Article {
  _host = "https://houdunren.com";

  set host(url) {
    if (!/^https:\/\//i.test(url)) {
      throw new Error("网址错误");
    }
    this._host = url;
  }
  
  lists() {
    return `${this._host}/article`;
  }
}
let article = new Article();
console.log(article.lists()); //https://houdunren.com/article
// 还是可以访问，但不建议这样做
article.host = "https://hdcms.com";
console.log(article.lists()); //https://hdcms.com/article

// Symbol机制 
const protecteds = Symbol();
class Common {
  constructor() {
    this[protecteds] = {};
    this[protecteds].host = "https://houdunren.com";
  }
  set host(url) {
    if (!/^https?:/i.test(url)) {
      throw new Error("非常网址");
    }
    this[protecteds].host = url;
  }
  get host() {
    return this[protecteds].host;
  }
}
class User extends Common {
  constructor(name) {
    super();
    this[protecteds].name = name;
  }
  get name() {
    return this[protecteds].name;
  }
}
let hd = new User("后盾人");
hd.host = "https://www.hdcms.com";
// console.log(hd[Symbol()]);
console.log(hd.name);

// WeakMap机制 
const _host = new WeakMap();
class Common {
  constructor() {
    _host.set(this, "https://houdunren.com");
  }
  set host(url) {
    if (!/^https:\/\//i.test(url)) {
      throw new Error("网址错误");
    }
    _host.set(this, url);
  }
}
class Article extends Common {
  constructor() {
    super();
  }
  lists() {
    return `${_host.get(this)}/article`;
  }
}
let article = new Article();
console.log(article.lists()); //https://houdunren.com/article
article.host = "https://hdcms.com";
console.log(article.lists()); //https://hdcms.com/article

```
- `private` 只有当前类可以访问 
  + 在当前属性前加`#`声明其为私有属性 
  + 只能在声明的类中使用 
- 属性保护, 可以使用访问器控制 
```JavaScript
const protecteds = Symbol("protected");
class User {
  constructor(name) {
    this[protecteds] = { name };
  }
  get name() {
    return this[protecteds].name;
  }
  set name(value) {
    if (value.trim() == "") throw new Error("invalid params");
    this[protecteds].name = value;
  }
}
let hd = new User("向军大叔");
hd.name = "后盾人";
console.log(hd.name);
console.log(Object.keys(hd));

```
### 详解继承 
- 属性继承
```JavaScript
// 属性继承原型 
// 所以在子类中构造函数一定要先执行 super()
function User(name) {
  this.name = name;
}
function Admin(name) {
  User.call(this, name); 
}
let hd = new Admin("shp");
console.log(hd);//Admin {name:'shp'}
```
- 方法继承 
  + 原生的继承主要是操作原型链,使用`class`要方便一些 
  + 必须在子类构造器中调用`super()`执行父类构造器函数 
  + `super.method()`可以在子类中调用父类方法 
- `super`用来查询当前对象的原型 
  + 只能在类或对象中使用,不能在函数中使用  
- 静态继承,静态的方法和属性也是可以继承的,因为本质还是原型链查找方式  
- 对象检测: `instanceof` - `isPrototypeOf`
- 继承内置类
```JavaScript
// 使用原型扩展内置类 
function Arr(...args) {
  args.forEach(item => this.push(item));
  this.first = function() {
    return this[0];
  };
  this.max = function() {
    return this.data.sort((a, b) => b - a)[0];
  };
}
let a = [1, 23];
Arr.prototype = Object.create(Array.prototype);
let arr = new Arr("后盾人", 2, 3);
console.log(arr.first());

// 使用类扩展内置类 
class NewArr extends Array {
  constructor(...args) {
    super(...args);
  }
  first() {
    return this[0];
  }
  add(value) {
    this.push(value);
  }
  remove(value) {
    let pos = this.findIndex(curValue => {
      return curValue == value;
    });
    this.splice(pos, 1);
  }
}
let hd = new NewArr(5, 3, 2, 1);
console.log(hd.length); //4
console.log(hd.first()); //5

hd.add("houdunren");
console.log(hd.join(",")); //5,3,2,1,houdunren

hd.remove("3");
console.log(hd.join(",")); //5,2,1,houdunren

```
- `mixin`
```JavaScript
const Tool = {
  max(key) {
    return this.data.sort((a, b) => b[key] - a[key])[0];
  }
};

class Lesson {
  constructor(lessons) {
    this.lessons = lessons;
  }
  get data() {
    return this.lessons;
  }
}

Object.assign(Lesson.prototype, Tool);
const data = [
  { name: "js", price: 100 },
  { name: "mysql", price: 212 },
  { name: "vue.js", price: 98 }
];
let hd = new Lesson(data);
console.log(hd.max("price"));

```
- 实例操作
```HTML
<style>
  * {
    padding: 0;
    margin: 0;
    box-sizing: content-box;
  }
  body {
    padding: 30px;
  }
  .slide {
    width: 300px;
    display: flex;
    flex-direction: column;
    /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3); */
  }
  .slide dt {
    height: 30px;
    background: #34495e;
    color: white;
    display: flex;
    align-items: center;
    padding-left: 10px;
    cursor: pointer;
  }
  .slide dt:first-of-type {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .slide dd {
    height: 100px;
    background: #f1c40f;
    overflow: hidden;
  }
  .slide dd div {
    padding: 10px;
  }
  .slide dd:last-of-type {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
</style>
<body>
  <div class="slide s1">
    <dt>后盾人</dt>
    <dd>
      <div>houdunren.com</div>
    </dd>
    <dt>后盾人</dt>
    <dd>
      <div>hdcms.com</div>
    </dd>
    <dt>后盾人</dt>
    <dd>
      <div>hdcms.com</div>
    </dd>
  </div>
</body>

<script>
  class Animation {
    constructor(el) {
      this.el = el;
      this.timeout = 5;
      this.isShow = true;
      this.defaultHeight = this.height;
    }
    hide(callback) {
      this.isShow = false;
      let id = setInterval(() => {
        if (this.height <= 0) {
          clearInterval(id);
          callback && callback();
          return;
        }
        this.height = this.height - 1;
      }, this.timeout);
    }
    show(callback) {
      this.isShow = false;
      let id = setInterval(() => {
        if (this.height >= this.defaultHeight) {
          clearInterval(id);
          callback && callback();
          return;
        }
        this.height = this.height + 1;
      }, this.timeout);
    }
    get height() {
      return window.getComputedStyle(this.el).height.slice(0, -2) * 1;
    }
    set height(height) {
      this.el.style.height = height + "px";
    }
  }
  class Slide {
    constructor(el) {
      this.el = document.querySelector(el);
      this.links = this.el.querySelectorAll("dt");
      this.panels = [...this.el.querySelectorAll("dd")].map(
        item => new Panel(item)
      );
      this.bind();
    }
    bind() {
      this.links.forEach((item, i) => {
        item.addEventListener("click", () => {
          this.action(i);
        });
      });
    }
    action(i) {
      Panel.hideAll(Panel.filter(this.panels, i), () => {
        this.panels[i].show();
      });
    }
  }
  class Panel extends Animation {
    static num = 0;
    static hideAll(items, callback) {
      if (Panel.num > 0) return;
      items.forEach(item => {
        Panel.num++;
        item.hide(() => {
          Panel.num--;
        });
      });
      callback && callback();
    }
    static filter(items, i) {
      return items.filter((item, index) => index != i);
    }
  }
  let hd = new Slide(".s1");
</script>

```
