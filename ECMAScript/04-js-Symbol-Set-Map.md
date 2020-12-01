# Symbol And Set And Map
## Symbol <sup>es6</sup>
- `Symbol`(符号,代号的意思)是一种新的基本数据类型，用于防止属性名冲突面产生的，比如向第三方添加属性时  
- `symbol`值通过`Symbol()`函数生成,生成的`symbol`是一个类似于字符串的原始类型的值 
- `symbol`的值是唯一的，独一无二的不会重复的   
- `new Symbol()`命令会报错，因为`Symbol`是原始类型的值而不是对象 
- `Symbol`值不能与其他的值进行运算,可转换为字符串，布尔值，不能转为数值 
- `Symbol()`参数问题:
  + 如果传入的参数为对象，会用`toString()`转为字符串 
  + `Symbol`参数只表示对当前`Symbol`值的描述，相同参数的`symbol`值也不相同   
### 基础知识
#### Symbol  
```javascript  
let symbol1 = Symbol();
let symbol2 = Symbol();
console.log(symbol1 == symbol2);//false
//Symbol不能添加属性
symbol1.name = 'symbol1';
console.log(symbol1.name);//undefined
```

> 描述参数  
```javascript
//使用description可以获取传入的描述参数  
//let  sy1 = Symbol('name');
console.log(sy1.description);//name
```
#### Symbol.for  
- `Symbol.for()`根据描述参数获取一个`Symbol`值，如果不存在就新建一个`Symbol`值 
- 区别:使用`Symbol.for()`会在系统中进行`Symbol`值登记而`Symbol()`不会 
```javascript
let sy1 = Symbol.for('john');
let sy2 = Symbol.for('john');
console.log(sy1 == sy2);//true
```
#### Symbol.keyFor  
- `Symbol.keyFor`根据使用`Symbol.for`登记的`Symbol`值返回描述参数  
  + 如果没有就返回`undefined`
```javascript
let sy1 = Symbol.for('alex');
console.log(Symbol.keyFor(sy1),Symbol.keyFor('mark'));//alex,undefined
```
#### 对象属性  
> `Symbol`声明和访问使用`[]` 
- 访问对象的`Symbol`属性不能使用`.`运算符，`.`是操作字符串的 
- 访问对象的`Symbol`属性用 `[symbol]` 
```javascript
let sy1 = Symbol('name');
let obj = {
    [sy1]: 'john'
};
console.log(obj[sy1]);//john
```
### 实例操作
> 缓存操作  
```javascript 
class Cache {
//nodejs中报syntaxError:unexpected token =
//es6中规定class内部只有static方法,没有static属性
    static data = {};
    static set(key,value){
        this.data[key] = value;
    }
    static get(key){
        return this.data[key];
    }
}
let user = {
    name: 'john',
    key:Symbol('name')
};
let cart = {
    name: 'cart',
    key:Symbol('name')
}
Cache.set(user.key,user);
Cache.set(cart.key,cart);
console.log(Cache.get(user.key),Cache.get(cart.key));
```

> 遍历属性  
- Symbol属性不能使用for/in,for/of遍历操作 
```javascript 
let sy1 = Symbol('name');
let user = {
    [sy1]: 'john',
    age: 18
};
for(const item in user){
    console.log(item,user[item]);//age,18
}
```

> 可以使用`Object.getOwnPropertySymbol`获取所有Symbol属性 
```javascript 
let sy1 = Symbol('name');
let user = {
    [sy1]:'john'
};
for(const item of Object.getOwnPropertySymbol(user)){
    console.log(item,user[item]);//symbol(name),john
}
```
> 使用`Reflect.ownKeys()`获取所有属性包括Symbol属性 
```javascript 
for(const item of Reflect.ownKeys(user)){
    console.log(item);
}
```

> 如果对象属性不想被遍历，可以使用Symbol属性进行隔离遍历   

## Set <sup>es6</sup>
- 用于存储任何类型的唯一值(不存在两个相同的值)
- set中只有值，没有键名  
- 严格类型检测 ===,1与'1'是两个不同的值    
- 遍历顺序是添加顺序，方便保存回调函数   
### 基本使用
> set是一个迭代器数据结构   
```javascript
//使用数组初始化Set 
let set = new Set(['a','b']);
console.log(set);//Set {'a','b'}
console.log(typeof set);//object

//set是一个迭代器数据结构   
let it = set.values();
console.log(it);//[Set Iterator]{'a','b'}
console.log(it.next());//{value:'a',done:false}

//Set是严格类型检测的，1与'1'不同的值 
set.add(1);
set.add('1');
console.log(set);//{'a','b',1,'1'}
```
###  基础操作

> - 添加元素数量 `Set.add(elm) ` 
> - 获取元素数量 `Set.size ` 
> - 检测元素是否存在 `Set.has(elm)`  
> - 删除元素 `Set.delete(elm),Set.clear()`,成功返回true
```js
let set = new Set();
//添加元素
set.add(1);
console.log(set);//{1}
//获取元素个数 
console.log(set.size);//1
//检测元素存在
console.log(set.has(1));//true
//删除元素
console.log(set.delete(1));//true
//清除所有元素 
set.add([1,2,3]);
set.clear();

```

### 数组转换  
> 可以用 `...` 语法或 `Array.from()`方法将Set类型转换为数组，然后使用数组丰富的函数  
```javascript
let set = new Set([1,2,3,4,5]);
console.log([...set]);//{1,2,3,4,5}
console.log(Array.from(set));//{1,2,3,4,5}

//保留set中大于2的元素 
let arr = [...set].filter(function(item){
    return item > 2;
});
let set = new Set(arr);
console.log(set);//{3，4，5}

//移除数组中重复的元素 
let arr = [1,1,2,3,4];
arr = [...new Set(arr)];
console.log(arr);//[1,2,3,4]
```

### 遍历数据  
- Set可以使用`keys(),values(),entries()`直接返回迭代对象  
  + 因为`Set`类型只有值，`keys(),values()`返回结果是一样的，都是值   
  + 可以使用`forEach`遍历Set元素，内部默认使用values方法创建迭代器  
  + 可以使用`for / of`遍历Set元素，默认也是使用values方法创建迭代器  
```javascript
const set = new Set(['john','alex','mark']);
console.log(set.keys());//[Set Iterator]{'john','alex','mark'}
console.log(set.values());//[Set Iterator]{'john','alex','mark'}
console.log(set.values());//[Set Iterator]{'john','alex','mark'}
//forEach中为了保持数组参数一致，Set的value与key是一样的  
new Set([2,3,4,5,2]).forEach(function(item,key,set){
    console.log(item,key,set);//item 与key 是相同的
})

for(const item of set)[
    console.log(item);
]
```

### 搜索实例  
> 历史搜索示例  
```html
<style>
    *{
        padding: 0;
        margin: 0;
    }
    input{
        width: 200px;
        border: solid 1px #8d8d8d;
        outline: none;
        padding: 10px;
        margin: auto;
        box-sizing: border-box;
    }
    ul{
        list-style: none;
        width: 200px;
        padding-top: 20px;
    }
    ul li{
        border: solid 1px #ddd;
        padding: 10px;
        margin-bottom: -1px;
    }
    ul li:nth-of-type(odd){
        background: #00b894;
    }
</style>
<body>
    <input type="text">
    <ul></ul>
</body>
<script>
    let obj = {
        words: new Set(),
        set keyword(word){
            this.words.add(word);
        },
        get keyword(){

        },
        show(){
            let ul = document.querySelector('ul');
            ul.innerHTML = '';
            this.words.forEach((item)=>{
                ul.innerHTML += (`<li> ${item} </li>`);
            })
        }
    };
    document.querySelector('input').addEventListener('blur',function(){
        console.log(this.value);
        obj.keyword = this.value;
        obj.show();
    })

</script>

```
### 交集，并集，差集  
- 交集，获取两个集合中共同的元素  
- 并集，将两个集合合并成一个新的集合  
- 差集，a-b,在集合a中但不在集合b中  
```javascript
let set1 = new Set(['john','mark']);
let set2 = new Set(['john','alex','mark']);
//交集
let interSet = new Set(
    [...set1].filter(item => set2.has(item))
);
console.log(interSet);//{'john','mark'}
//并集
let unionSet = new Set([...set1,...set2]);
console.log(unionSet);//{'john','mark','alex'}
//差集
let diffSet = new Set(
    [...set2].filter(item => !set1.has(item))
);
console.log(diffSet);//{'alex'}
```
### javascript垃圾回收机制 
- 常用两种垃圾回收算法(浏览器不同算法不同)： 引用计数法，标记-清除法   
- js中的内存管理是系统自动执行的，是不可见的   
- 创建基本类型，对象，函数...都需要开辟内存空间  
- JS引擎中有一个后台进程为垃圾回收器，监视所有对象，删除那些不可访问的对象  
#### 可达性 
>  可达性值就是以某种方式可访问或可用的值  
> 
> - 一个数据变成不可达的时候，就是垃圾了，一个对象被引用一次，引用记数器增加1，当被null就会减1，引用次数为0时，就变成垃圾了  
#### 内部算法 
- 基本的垃圾回收算法称为 '标记-清除',定期执行垃圾回收步骤  
  + 垃圾回收器获取根并标记  
  + 访问并标记所有来自根的标记  
  + 访问标记的对象并标记它们的引用  
  + 除标记的对象外，所有对象都当垃圾回收  

### WeakSet
- 当外部引用删除时，希望自动删除数据时使用`weakSet`   
  + `weakSet`是弱引用集合，也是存储唯一不重复的值的集合   
  + `weakSet`成员必须是对象类型的值(要是引用值)      
  + 垃圾回收机制不考虑`weakSet`的引用，即被`weakSet`引用时引用计数器不加1
  + 所以对象不被引用时，不管`weakSet`是否存在都会删除  
- weakSet的成员都是对象的弱引用，随时可能被垃圾回收系统回收 所以：  
  + 不可以进行`forEach()`遍历等操作  
  + `weakSet`结构没有`keys(),values(),entries()` 等方法和`size`属性  
#### 声明定义
- 初始化一个`weakSet`对象:
  + 1.参数必须是一个数组
  + 2.参数数组的元素成员必须是对象类型的值`[{name:'john'}]` 
  + 上面两点任一不满足否则就报`TypeError`错误   
```javascript
new Set("john");// {"john"}
new WeakSet("john");// TypeError:Invalid value use in weak set 
new WeakSet(["john","alex"]);// TypeError:Invalid value use in weak set 
new WeakSet({age:20});// TypeError:object is not iterable

// 正确初始化一个WeakSet
new WeakSet([{name:'john'},{age:18}]);
new WeakSet().add(["john"]);
```
#### 基本操作 
- `WeakSet`里的元素都是对象  
- 注意: `console.log( {} === {} );//false ` 
```javascript
// 下面这样添加元素没什么意义  
let set = new WeakSet();
set.add(["john"]);
// 因为["a"] != ["a"]
console.log(set.has(["john"]));//false

let arr = ["alex"];
set.add(arr);
console.log(set.has(arr));//true
```
- 基础操作  
  + `add,has,delete`
```javascript
let set = new WeakSet();
let arr = ["john"];
//添加元素
set.add(arr);
//检测元素 
set.has(arr);//true
//删除元素
set.delete(arr);
```
#### 实际意义  
- 为了不造成内存溢出，对象用完后要赋值`null`,使其引用计数为0，然后让垃圾回收系统自动回收这部分内存   
- 有`WeakSet`之后，将对象添加进`WeakSet`后
  + 不增加其引用计数，这样当这个对象用完之后，在其他地方删除了，也会直接从WeakSet中delete,便于系统回收内存    

#### 案例操作  
> TODo任务列表    
```html

```

## Map <sup>es6</sup>
- `Map`对象保存键值对，任何值(对象或原始值)都可以作为一个键或一个值  
- `Maps`与`Object`区别:  
  + 一个`Object`的键只能是字符串(都为转换成字符串)或`Symbol`值，一个`Map`的键可以是任何值   
  + `Map`中的键值是有序的(FIFO),而添加对象中键值则不是   
  + `Map`的键值对个数可以从`size`属性获取，`Object`要手动计算  
  + `Object`都有自己的原型，原型链上的键名可能和自己创建的键名产生冲突 
### 声明定义
- `Map()`构造函数接收一个数组作为参数，该数组的成员是一个表示键值对的数组  
  + 添加元素支持链式操作，`Map().set(key,value).set(key,value)`   
  + 获取元素，`Map().get(key)`  
  + 获取数量，`Map().size`   
  + 检索元素，`Map().has(key)`  
  + 删除元素，`Map().delete(key),Map().clear()`  
```javascript
//创建一个Map
let mp = new Map([['name','john'],['age',20]]);
console.log(mp);//{'name' => 'john','age' => 20}

//添加元素
console.log(mp.set('gender','boy'));//{'name'=>'john','age'=>20,'gender'=>'boy'}
//获取元素
console.log(mp.get('gender'));//boy
//获取数量 
console.log(mp.size);//3
//删除一个元素 
console.log(mp.delete('gender'));//true
//清空Map
console.log(mp.clear());//undefined

```
### 一些特殊的键  
- key 是 object的是，只有是同一个引用变量才能获取同一个值  
```javascript
//key是字符串 
let mp = new Map();
let str = "a string";
mp.set(str,'value for a string');
mp.get('a string');//value for a string  

//key是对象 
let obj = {};
mp.set(obj,'value for obj = {}');
mp.get(obj);//value for obj = {};
mp.get({});//undefined

//key是函数  
let fn = function(){};
mp.set(fn,'value for fn');
mp.get(fn);//value for fn  
mp.get(function(){});//undefined

//key是NaN
mp.set(NaN,'value for NaN');
mp.get(NaN);//value for NaN
let m = Number("hello");//NaN
mp.get(m);//value for NaN
```
### 遍历数据 
- Map自带迭代器，可以直接使用`keys(),values(),entries(),forEach,for / of`  
```javascript
let mp = new Map([['name','john'],['age',20]]);

//forEach
mp.forEach(function(value,key){
    console.log(`${key} => ${value}`);//name => john,age => 20
});
//for...of 
for(const [key,value] of mp){
    console.log(`${key} => ${value}`);//name => john,age => 20
}
//keys(),values(),entries()
console.log(mp.keys());//Map Iterator{'name','age'}
for(const key of mp.keys()){
    console.log(key);//name,age
}
console.log(mp.values());//Map Iterator{'john',20}
for(const value of mp.values()){
    console.log(value);//john 20
}
console.log(mp.entries());//Map Iterator{['name','john'],['age',20]}
for(const [key,value]) of mp.entries()){
    console.log(`${key} => ${value}`);//name => john,age => 20
}
```
### 数组转换 
- 可以使用 `...` 语法或 `Array.from()`将Map类型转换成数组，然后使用数组处理函数   
```javascript
let mp = new Map([['name','john'],['age',20]]);

console.log(...mp);//[[ 'name', 'john' ],[ 'age', 20 ]]
console.log(...mp.keys());//['name','age']
console.log(...mp.values());//['john',20]
console.log(...mp.entries());//[[ 'name', 'john' ],[ 'age', 20 ]]

//检索包含'john'的值，并组成新的Map
let arr = [...mp].filter(function(item){
    return item[1].toString().includes('john');
})
console.log(arr);//[ [ 'name', 'john' ] ]
let newMap = new Map(arr);
console.log(newMap);//Map {'name' => 'john'}

```
### 节点集合 
- Map的key可以为任何值，练习用DOM节点作为key来记录数据  
```html
<html>
    <head>
        <title>使用DOM节点作为Map的键记录数据</title>
    </head>
    <body>
        <!-- 点击div内容时弹出desc属性值的对话框 -->
        <div desc = "firstDiv">hello world</div>
        <div desc = "secondDiv">beautiful</div>
    </body>
    <script>
        const divMap = new Map();
        const divs = document.querySelectorAll('div');

        divs.forEach(div => {
            divMap.set(div,{content: div.getAttribute('desc')});
        });

        // divMap.forEach(function(v,k){
        //     k.addEventListener('click',function(){
        //         alert(divMap.get(this).content);
        //     })
        // });

        divMap.forEach((v,k) => {
            k.addEventListener('click',function(){
                alert(divMap.get(this).content);
            })
        });


    </script>
</html>
```
### 实例操作 
> 用户填写表单时，当不接受协议则无法提交表单，并根据自定义信息提示用户  
```html
<!DOCTYPE html>
<html>
    <head>
        <title>接受协议才可表单提交</title>
    </head>
    <body>
        <from action="">
            接受协议：
            <input type="checkbox" name="agreement" message="请接受协议"/>
            <input type="checkbox" name="student" message="只对学生开放"/>
            <input type="submit"  value="提交" onclick="validate()"/>
        </from>
    </body>
    <script>
        function validate(){
            console.log('aaaa');
            //创建map
            let mp = new Map();
            //保存键值对  
            let input = document.querySelectorAll("[message]");

            input.forEach(item => mp.set(item,{
                message: item.getAttribute("message"),
                status: item.checked
            }));
            console.log(...mp);

            return [...mp].every((item) => {
                item[1].status || alert(item[1].message);
                return  item[1].status;
            });
        }
    </script>
</html>
```

### WeakMap 
- 当键外部删除时，希望系统自动回收时，用WeakMap  
  + `WeakMap`对象是一组键，值对的集  
  + 键名必须是对象   
  + 键名是弱引用 ，值是正常引用  
  + 键名不增加引用计数器，键在其他地方不被引用时，就会被系统回收  
  + 不可以用forEach,keys,values,entries,size等方法和属性   
```javascript
//WeakMap作用 
let wmp = new WeakMap();
let obj = {};
wmp.set(obj,"john");
//键名的外部引用删除时，wmp会被垃圾系统回收    
obj = null;
//系统会随时删除wmp 
setTimeout(function(){
    console.log(wmp);
},1000);
```
#### 声明定义
> 键必须是一个对象类型的   
```javascript
//键必须是一个对象 
new WeakMap([['name','john']]);//TypeError:Invalid value ...map key
//正确声明
let wmp = new WeakMap([[{name:'john'},'student']]);

new WeakMap().set({},'value');
```
> 将DOM节点信息保存到WeakMap   
```html
<body>
    <div>hello world</div>
    <div>want sleep</div>
</body>
<script>
    let wmp = new WeakMap();
    document.querySelectorAll('div').forEach(item =>wmp.set(item,item.innerHTML));
    console.log(wmp);
</script>
```
#### 基本操作  
- 添加，删除，检索    
```javascript
let wmp = new WeakMap();
let arr = ['name'];

wmp.set(arr,"john");

wmp.delete(arr);

wmp.has(arr);//false
```
#### 选课案例

```html

```