## Array  

## 数组类型
> 数组是`Array`对象的实例，可以像对象一样调用方法     
### 声明数组
```javascript
let arr = new Array(1,'hello','world');
console.log(arr);
//推荐使用字面量方式声明一个数组 
let  array = ['hello','world'];
```

> 多维数组定义   
```javascript
const array = [[1,2,3],[4,5,6]];
```

> 数组是引用类型可以使用`const`声明并修改它的值  
```javascript
const arr = ['a','b'];
arr.push('c');
console.log(arr);
```

> 使用原型的`length`属性可以获取数组的长度    
- `Array.of` 使用Array.of 与 new Array不同是设置一个参数时不会创建空元素数组  
```javascript
let hd = Array.of(3);
console.log(hd); //[3]

hd = Array.of(1, 2, 3);
console.log(hd); //[1, 2, 3]
```

> 类型检测，`Array.isArray()`检测变量是否为数组类型  
```javascript
Array.isArray([1,2]);//true
```

### 类型转换
- 可以将数组转换为字符串也可以将其他类型转换为数组  
- 大部分数据类型都可以使用.toString()函数转换为字符串 
```javascript
console.log([1,2,3].toString());//1,2,3
//也可以使用String()转换为字符串  
let str = String([1,2,3]);
//也可以使用join()方法连接成字符串 
let str2 = [1,2,3].join('-');
console.log(str2);//1-2-3
```
#### Array.isArray(),Array.of()
```javascript
//Array.isArray()检测一个变量是否是一个数组  
//Array.of()创建一个数组   
```

#### Array.from(arrayLike[,mapFn,thisArg])
> 使用Array.from(obj,mapFn,thisArg)可将类数组转换为数组   
> 
> - 类数组指包含length属性或可迭代的对象   
> - 第一个参数为要转换的数据  
> - 第二个参数为类似于map函数的回调方法,thisArg是其要绑定的this对象   
> - 返回一个新数组，不改变原数组   

```javascript
let str = "你好啊";
console.log(Array.from(str));//['你','好','啊']
//为对象设置length属性后也可以转换为数组,但要属性(下标)为数值或数值字符串  
let user = {
    0:'hello',
    '1':20,
    length:2
};
console.log(Array.from(user));//['hello',20]

//DOM元素转换为数组后使用数组函数，第二个参数类似于map 函数的方法，可对数组元素执行函数处理
<body>
    <button message="后盾人">button</button>
    <button message="hello">button</button>
</body>

<script>

    let btns = document.querySelectorAll('button');
    console.log(btns); //包含length属性
    Array.from(btns, (item) => {
        item.style.background = 'red';
    });

</script>
```

### Spread/Rest 展开语法 <sup>es6</sup>

- 使用展开语法将NodeList转换为数组操作  
```html
<style>
    .hide {
      display: none;
    }
</style>

<body>
  <div>hello</div>
  <div>world</div>
</body>

<script>
  let divs = document.querySelectorAll("div");
  [...divs].map(function(div) {
    div.addEventListener("click", function() {
      this.classList.toggle("hide");
    });
  });
</script>
```
> 数组合并，使用展开语法合并数组相比concat方法要更简单，使用...可将数组展开为多个值  
```javascript
let a = [1,2,3];
let b = ['a','hello',...a];
console.log(b);//['a','hello',1,2,3]
```

> 使用展开语法可以替代arguments来接收任意数量的参数  
```javascript
function test(...args)
{
    console.log(args);
}
//也可以用于接收部分参数  
function test2(num,...args){
    console.log(num,args);
}
```

> 节点转换  
```html
<!-- 可以将DOM节点转为数组，下面例子不可以使用 filter 因为是节点列表 -->
<body>
    <button message="后盾人">button</button>
    <button message="hello">button</button>
</body>

<script>
    let btns = document.querySelectorAll('button');
    //btns是一个集合，不是一个数组，可以用forEach,不能用map,filter...
    btns.filter((item) => {
        console.log(item); //TypeError: btns.filter is not a function
    })
</script>
```
> Spread\/Rest语法，将集合set转换成数组   
```html
<!-- 使用展开语法后就可以使用数据方法 -->
<body>
  <div>hello</div>
  <div>world</div>
</body>

<script>
  let divs = document.querySelectorAll("div");
  [...divs].map(function(div) {
    div.addEventListener("click", function() {
      this.classList.toggle("hide");
    });
  });
</script>
```
> 使用call借用数组原型方法 
```html
<!-- 学习后面章节后也可以使用原型处理 -->
<body>
    <button message="后盾人">button</button>
    <button message="hello">button</button>
</body>

<script>
    let btns = document.querySelectorAll('button');
    Array.prototype.map.call(btns, (item) => {
        item.style.background = 'red';
    });
</script>
```
### 解构赋值 <sup>es6</sup>
> 解构赋值就是Spread\/Rest特性，放，收特性  
- 解构是一种更简洁的赋值特性，省去中间变量，可以理解为分解一个数据的结构  
- 建议使用var/let/const声明  
- 基本使用  
```javascript
//数组使用
let [name, url] = ['后盾人', 'myweb.com'];
console.log(name);

// 解构赋值数组
function hd() {
    return ['world', 'hello'];
}
let [a, b] = hd();
console.log(a); //world

// 剩余解构指用一个变量来接收剩余参数
let [a, ...b] = ['后盾人', 'world', 'hello'];
console.log(b);

// 如果变量已经初始化过，就要使用() 定义赋值表达式，严格模式会报错所以不建议使用。
let web = "后盾人";
[web, url] = ["myweb.com", "wwww.myweb.com"];
console.log(web);

// 字符串解构
"use strict";
const [...a] = "myweb.com";
console.log(a); //Array(13)
```

> 非严格模式可以不使用声明指令，严格模式下必须使用声明，建议使用let等声明  
```javascript
"use strict";
[web,url] = ['web.com','myweb.com'];
console.log(web);//error
```

> 简洁定义
```javascript
//只赋值部分变量
let [,url] = ['hello','myweb.com'];
console.log(url);//myweb.com
//使用展开语法获取多个值 
let [name,..arr] = ['john','web','www.myweb.com'];
console.log(name,arr);
//默认值 
let [name,site='myweb.com'] = ['john'];
//函数参数 
function test([a,b]){
    console.log(a,b);
}
```
### 管理元素
- 基本使用
```javascript
//使用从0开始的索引来操作数组元素
let arr = [1,'hello','web.com'];
arr[1] = 'hello world';
console.log(arr);//[1,'hello world','web.com']
//向数组追加元素
arr[arr.length] = 'myweb.com';
```
#### 扩展语法  
```javascript
let arr = ['john','alex'];
let arr2 = ['mark'];
arr2.push(...arr);
console.log(arr2);//['mark','john','alex']
```

#### array.push()往数组后面添加元素
> 将元素压入数组，直接改变数组，返回值为新数组的元素个数  
```javascript
let arr = ['john','alex'];
let arr2 = ['mark'];
arr2.push(arr[0]);
console.log(arr2);//['mark','john']
//根据范围创建新数组 
function newArray(begin,end){
    let arr = [];
    for(let i=0;i <= end;i++){
        arr.push(i);
    }
    return arr;
}
```

#### array.unshift()往数组前面添加元素
> 从数组前面添加元素，直接改变数组，返回新数组的元素的个数  
```javascript
let arr = ['john','alex'];
console.log(arr.unshift('mark'));//3
console.log(arr);//['john','alex','mark']
```

#### array.pop()从数组后面弹出一个元素
> 从数组末尾弹出一个元素，直接改变数组，返回被弹出的元素  
```javascript
let arr = ['john','alex'];
console.log(arr.pop());//alex 
```

#### array.shift()从数组前面弹出一个元素
> 从数组前面取出一个元素，直接改变数组，返回被取出的元素   
> 
> 改变原数组   
```javascript
let arr = ['john','alex'];
console.log(arr.shift());//john
console.log(arr);//alex
```

#### array.fill()往数组里填充元素
> 填充数组元素 
```javascript
console.log(Array(2).fill('john'));//['john','john']
//往数组指定位置填充元素，从起始位置到终止位置，不包括终止位置
let arr = ['john','alex','mark'];
arr.fill('lily',1,2);
console.log(arr)//['john','lily','mark']
```

#### array.slice()截取数组(不改变原数组)
> 使用slice([begin[,end]])方法从数组中截取部分元素组合成新数组   
> 
> 不传一参默认从0开始,不传二参时默认截取到数组的最后元素 
```javascript
let nums = [0,1,2,3,4];
console.log(nums.slice(1,3));//[1,2]
//不设置参数时默认截取原数组所有元素
console.log(nums.slice());//[0,1,2,3,4]
```

#### array.splice()往数组中添加，删除，替换元素(改变原数组)
> - splice(start[,deleteCount,[,replace...]])往数组中添加，删除，替换元素，改变原数组，以数组形式返回被删除的元素   
> - 删除数组元素时第一个参数为从哪开始删   
> - 第二个参数为删除的个数,当删除个数为0时，在开始位置添加三参内容      
> - 指定第三个参数来设置在删除位置要添加的元素   
```javascript
//删除指定个数元素
let arr = [0,1,2,3,4,5];
console.log(arr.splice(1,2));//[1,2]
console.log(arr);//[0,3,4,5]

//在删除的位置添加新元素  
let arr2 = [0,1,2,3,4,5];
console.log(arr2.splice(1,3,'john','alex'));//[1,2,3]
console.log(arr2);//[0,'john','alex',4,5]

//向末尾添加元素
let arr3 = [0,1,2];
console.log(arr3.splice(arr3.length,0,'john','alex'));
console.log(arr3);//[0,1,2,'john','alex']

//数组元素位置调整函数
function move(array, before, to) {
  if (before < 0 || to >= array.length) {
    console.error("指定位置错误");
    return;
  }
  const newArray = [...array];
  const elem = newArray.splice(before, 1);
  newArray.splice(to, 0, ...elem);
  return newArray;
}
const array = [1, 2, 3, 4];
console.table(move(array, 0, 3));
```

#### 清空数组
> 将数组值修改为[]可以清空数组，如果有多个引用时数组在内存中存在被其他变量引用 
```javascript
let user = [{name:'john'},{name:'alex'}];
let student = user;
user = [];
console.log(user,student);
//将数组length赋值为0也可以清空数组
let user = [{name:'john'},{name:'alex'}];
user.length = 0;
console.log(user);
//使用splice方法删除所有元素
let user = [{name:'john'},{name:'alex'}];
user.splice(0,user.length);
//使用pop(),shift()删除所有元素
let user = [{name:'john'},{name:'alex'}];
while(user.pop){ }
```

### 合并拆分
#### join()连接成字符串
```javascript
let user = ['john','alex','mark'];
console.log(user.join('-'));//'john-alex-mark'
```

#### split()将字符串分割成数组
- 类似join()反函数
```javascript
let str = 'john-alex-mark';
console.log(str.split('-'));//['john','alex','mark']
```

#### concat()合并连接多个数组
- concat()用于连接两个或多个数组
- 元素是值类型时执行复制操作
- 元素是引用类型时还是指向同一对象
```javascript
let arr = ['john','alex'];
let user = ['lily'];
let student = ['hello'];
console.log(arr.concat(user,student));//['john','alex','lily','hello']
//也可以使用展开语法进行连接
console.log([...arr,...usr,...student]);
```

#### copyWithin()数组内部复制操作  
- 从数组中复制一部分到数组中的另外位置  
- array.copyWithin(target,start,end)
- target 复制到指定目标索引位置  
- start 元素复制的起始位置  
- end 元素复制的终止位置，默认为array.length,负数表示倒数
```javascript
const arr = [1,2,3,4,5];
console.log(arr.copyWithin(2,0,2));//[1,2,1,2,5]
```

### 查找元素
- 数组包含多种查找的函数，需要把这些函数掌握清楚
- 根据不同的场景选择合适的查找函数
#### indexOf()
- 从前向后查找元素出现的位置
```javascript
let arr = [0,1,2,3,4,5];
console.log(arr.indexOf(2));// 2
//indexOf()执行的是类似于 === 的严格类型约束
let arr = [0,1,2,'3',4,5];
console.log(arr.indexOf(3));//-1
//indexOf()第二个参数用于指定开始查找的位置
let arr = [0,1,2,3,4,5,3];
console.log(arr.indexOf(3,3));//3
console.log(arr.indexOf(3,4));//6
```
#### lastIndexOf()
- 从后向前查找元素出现的位置
- 第二参数指定开始查找的位置
```javascript
let arr = [0,1,2,3,4,5];
console.log(arr.lastIndexOf(3));//3
console.log(arr.lastIndexOf(3,2));//-1
console.log(arr.lastIndexOf(3,4));//3
```

#### includes()返回布尔值
> 使用includes查找字符串返回值是布尔值，方便判断   
```javascript
let arr = [3,7,9,5];
console.log(arr.includes(5));//true
console.log(arr.includes(1));//false
```
- 自己实现一个includes()方法  
```javascript
function includes(array,item){
    for(const value of array){
        if(item === value) return true;
    }
    return false;
}
```

#### find()返回查找到的值
- array.find(function(currentValue,index,arr){ },thisValue)
- thisValue可选参数，传递函数的this值  
- find()方法返回通过测试(函数内判断)的数组的第一个元素的值  
- find()找到第一个通过测试的元素，结束函数调用执行,并返回通过的元素
- 如果没有找到返回undefined  
- 空数组，函数不执行
- 不改变原数组的值  
```javascript
let user = ['john','alex','lily'];
let result = user.find(function(item){
    return item == 'alex';
});
console.log(result);
//使用includes()等不能查找引用类型，因为它们的内存地址不是相等的,不能满足 ===  
const user = [{name:'john'},{name:'alex'}];
const result = user.includes({name:'john'});
console.log(result);//false
//find()可以方便的查找引用类型
const user = [{name:'john'},{name:'alex'}];
const result = user.find(function(name){
    return name.name ==  'john';
})
console.log(result);//false
```

#### findIndex()
- array.findIndex(function(currentValue,index,arr){ },thisValue)  
- findIndex与find的区别是返回的是索引值，而不是元素值   
- 查找不到返回-1
```javascript
let arr = [4,5,3,6,9];
let pos = arr.findIndex(function(value){return value === 6});
console.log(pos);//3
```

#### find原理
```javascript
//自定义函数
function find(array,callback){
    for(const value of array){
        if(callback(value)===true) return value;
    }
    return undefined;
}
let arr = [1,2,3,4,5];
let result = find(arr,function(value){return value==3;});
console.log(result);
//原型方法实现
function Array.prototype.findValue = function(callback){
    for(const value of this){
      if(callback(value)==true) return value;
    }
    return undefined;
}
```

### 数组排序
#### reverse()反转数组顺序
```javascript
let arr = [1,2,3,4];
console.log(arr.reverse());//[4,3,2,1]
```
#### sort()数组排序
- sort()每次使用两个值进行比较 Array.sort((a,b)=>(a-b))
- 返回负数a排在b前面，返回正数b在a前面,从小到大排序
- 返回0时，不动   
```javascript
let arr = [1,5,2,0,9,7];
console.log(arr.sort());//默认从小到大排序
//从大到小排序 
console.log(arr.sort(function(v1,v2){
    return v2-v1;
}));
//按课程点击次数由高到低排序
let lessons = [
{tittle:'媒体查询响应式布局',click:78},
{tittle:'flex弹性布局',click:69},
{tittle:'mysql多表查询操作',click:99}
];
let sortLessons = lessons.sort((v1,v2)=>v2.click-v1.click);
console.log(sortLessons);
```

#### 排序原理
```javascript
let arr = [1, 5, 3, 9, 7];
function sort(array, callback) {
  for (const n in array) {
    for (const m in array) {
      if (callback(array[n], array[m]) < 0) {
        let temp = array[n];
        array[n] = array[m];
        array[m] = temp;
      }
    }
  }
  return array;
}
arr = sort(arr, function(a, b) {
  return a - b;
});
console.table(arr);
```

### 循环遍历
#### for
- 根据数组长度，结合for循环来遍历数组  
```javascript
let lessons = [
	{title: '媒体查询响应式布局',category: 'css'},
  {title: 'FLEX 弹性盒模型',category: 'css'},
	{title: 'MYSQL多表查询随意操作',category: 'mysql'}
];

for (let i = 0; i < lessons.length; i++) {
  lessons[i] = `后盾人: ${lessons[i].title}`;
}
console.log(lessons);
```

#### forEach  
> forEach()使函数作用在每个数组元素上，但是没有返回值  
```javascript
//截取标签的五个字符
let lessons = [
	{title: '媒体查询响应式布局',category: 'css'},
  {title: 'FLEX 弹性盒模型',category: 'css'},
	{title: 'MYSQL多表查询随意操作',category: 'mysql'}
];

lessons.forEach((item, index, array) => {
    item.title = item.title.substr(0, 5);
});
console.log(lessons);
```

#### for/in
> 遍历时的key值为数组的索引  
```javascript
let lessons = [
{title: '媒体查询响应式布局',category: 'css'},
{title: 'FLEX 弹性盒模型',category: 'css'},
{title: 'MYSQL多表查询随意操作',category: 'mysql'}
];
for(const key in lessons){
    console.log(`标题:${lessons[key].tittle}`);
}
```

#### for/of <sup>es6</sup>
> 与for/in不同的是for/of每次循环取的是其中的值而不是索引  
```javascript
let lessons = [
{title: '媒体查询响应式布局',category: 'css'},
{title: 'FLEX 弹性盒模型',category: 'css'},
{title: 'MYSQL多表查询随意操作',category: 'mysql'}
];
for(const item of lessons){
    console.log(`标题:${item.title}`);
}
```

> 使用数组的迭代对象遍历获取索引与值  
```javascript
const user = ['john','alex','mark'];
const iterator = user.entries();
console.log(iterator.next());//value:{0:0,1:'john'};
console.log(iterator.next());//value:{0:1,1:'alex'};
console.log(iterator.next());//value:{0:2,1:'mark'};
//这样就可以使用解构特性与for/of遍历并获取索引与值了
for(const [key,value] of user.entries()){
    console.log(key,value);
}
//取数组中的最大值
let array = [22,943,1350,133,5555];
function arrayMax(array){
    let max=0;
    for(item of array){
        max = max > item ? max:item;
    }
    return max;
}
console.log(arrayMax(array));
```

### 迭代器方法
> 数组中可以使用多种迭代器方法
#### keys
> 通过迭代对象获取索引  
```javascript
const user = ['john','alex'];
const keys = user.keys();
console.log(keys.next());//{value:0,done:false}
console.log(keys.next());//{value:1,done:false}
console.log(keys.next());//{value:undefined,done:true}
```
#### values
> 通过迭代对象获取值  
```javascript
const user = ['john','alex'];
const values = user.values();
console.log(values.next());//{value:0,done:false}
console.log(values.next());//{value:1,done:false}
console.log(values.next());//{value:undefined,done:true}
```
#### entries
> 返回数组所有键值对  
```javascript
const user = ['john','alex'];
for(const [key,value] of user.entries()){
    console.log(key,value);
}
```

### 扩展方法
#### every
> every()用于递归的检测元素，所有元素操作都要返回true，最后结果才为true  
```javascript
const user = [{name:'john',age:30},{name:'alex',age:28}];
let result = user.every(function(user){
    return user.age>18;
});
console.log(result);//true
//简写
let result = user.every(user=>user.age>18);
```

#### some
> some()函数可以递归的检测数组元素，如果有一个返回true,整个结果就为true  
>
> - 第一个参数为元素，第二个为索引，第三个参数为原数组  
```javascript
let words = ['fuck','dick'];
let str = 'you should not to say some words like fuck and dick';
let state = words.some(function(item,index,array){
    console.log(item,index,array);
    return str.includes(item);
})
console.log(state);
if(state) console.log('你说脏话了');
```

#### filter
> 使用filter可以过虑数据中元素  
```javascript
//获取在css栏中的课程  
let lessons = [
    {tittle:'媒体查询响应式布局',category:'css'},
    {tittle:'flex弹性布局',category:'css'},
    {tittle:'mysql多表查询',category:'mysql'}
];
let csslessons = lessons.filter(function(item,index,array){
    if(item.category.toLowerCase()=='css'){
        return true;
    }
});
console.log(csslessons);
//过虑掉数组一些元素  
function except(array,excepts){
    const newArray = [];
    for(const elem of array){
        if(!excepts.includes(elem)){
            newArray.push(elem);
        }
    }
    return newArray;
}
const array = [1,2,3,4,5];
console.log(except(array,[3,5]));//[1,2,4]
```

#### map
> 使用map(function(value,index,arr){})映射可以在数组的所有元素上应用函数，用于映射出新值  
```javascript
//获取数组所有标题组合的新数组  
let lessons = [
    {tittle:'媒体查询响应式布局',category:'css'},
    {tittle:'flex弹性布局',category:'css'},
    {tittle:'mysql多表查询',category:'mysql'}
];
let result = lessons.map(item => item.tittle);
console.log(result);//['媒体查询响应式布局','flex弹性布局','mysql多表查询']
//为所有课程的标题加上一个'免费课程'前缀
let lessons = [
    {tittle:'媒体查询响应式布局',category:'css'},
    {tittle:'flex弹性布局',category:'css'},
    {tittle:'mysql多表查询',category:'mysql'}
];
let result = lessons.map(function(item,index,array){
    item.tittle = `免费课程 ${item.tittle}`;
    return item;
});
console.log(result);
```

#### reduce <sup>es6</sup>
> 使用reduce()和reduceRight()函数可以迭代数组的所有元素  
- array.reduce(function(total,currentValue,index,array){},initialValue)  
- 传入第二个参数initialValue时,初始total = initialValue  
- 不传入第二个参数initialValue时,初始total = array[0]
```javascript
//统计数组中相同元素的个数 
function countArrayElem(arr,elem){
    let result = arr.reduce(function(total,cur){
        if(cur == elem ) total++;
        return total;
    },0);
    return result; 
}
let arr = [1,2,1,4,5,6];
let result = countArrayElem(arr,1);
console.log(result);
//累加
let arr = [1,2,3];
let sum = arr.reduce((total,cur)=>total+cur);
console.log(sum);//6
//取数组中的最大的值  
let arr = [1,22,33,11,55,26,99,90];
let max = arr.reduce((total,cur)=>(total = total>cur?total:cur),arr[0]);
console.log(max);
//取购物车中 价格最高的商品  
let cart = [
    {name:'iphone',price:12000},
    {name:'thinkpad',price:9000},
    {name:'xiaomi',price:3999}
];
let maxPrice = cart.reduce(function(total,cur){
    return total.price > cur.price ? total:cur;
});
//购物车总价  
let sumCart = cart.reduce((total,cur)=>total+=cur.price,0);
console.log(maxPrice.name,sumCart);
```

> 应用reduce()实现数组去重  
```javascript
let arr = [1,2,1,4,5,6,6,10];
let result = [];
result = arr.reduce(function(total,cur,index,array){
    if(!total.includes(cur)){
        total.push(cur);
    }
    return total;
},[]);
console.log(result);
```
> 使用reduce实现字符动画案例  
```html
<style>
    body {
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #2c3e50;
    }
  
    * {
      padding: 0;
      margin: 0;
    }
    div {
      color: #9b59b6;
      font-size: 5em;
      font-weight: bold;
      text-transform: uppercase;
      cursor: pointer;
    }
    div > span {
      position: relative;
      display: inline-block;
    }
    .changeColor {
      animation-name: changeColor;
      animation-duration: 1s;
      animation-direction: alternate;
      animation-iteration-count: 2;
      animation-timing-function: linear;
    }
    @keyframes changeColor {
      50% {
        color: #f1c40f;
        transform: scale(1.5);
      }
      to {
        color: #9b59b6;
        transform: scale(0.5);
      }
    }
  </style>
  
  <body>
    <div>hello world</div>
    <!-- <div>aaaaa</div> -->
  </body>
  
  <script>
    let div = document.querySelector("div");
    // let divs = document.getElementsByTagName("div");
    [...div.textContent].reduce((pre, cur, index) => {
      pre == index && (div.innerHTML = "");
      let span = document.createElement("span");
      span.textContent = cur;
      div.appendChild(span);
      span.addEventListener("mouseover", function() {
        this.classList.add("changeColor");
      });
      span.addEventListener("animationend", function() {
        this.classList.remove("changeColor");
      });
    }, 0);
  </script>
```

### 数组扁平化  
> 嵌套数组转换成一维数组就叫数组扁平化  
> Infinity是一个全局属性，表示正无穷大的数值      
```javascript
console.log(Infinity);// Infinity
```
>  flat(depth)  默认深度为 1  自动清除空元素  depth = Infinity 时表示无穷大的数值    
```javascript
console.log([1,[2,3]].flat());//[1,2,3]

//指定转换的嵌套层数 
console.log([1,[2,[3,4]]].flat(1));//[1,2,[3,4]]
console.log([1,[2,[3,4]]].flat(2));//[1,2,3,4]
```
>  flatMap(callback(currentValue,index,array,thisArg))
>
>  - 先用回调函数处理每个元素，再对数组执行 flat 函数       
```javascript
console.log([1,2,3].flatMap(n => [n*2]));//[2,4,6]
```
### 数组缓冲区 <sup>es6</sup>  
> 数组缓冲区是内存中的一段地址  
> 定型数组的基础  
> 实际字节数在创建时确定，之后只可改元素值，不可改数组长度  
```javascript
let buffer = new ArrayBuffer(10);
console.log(buffer.byteLength); // 10
//分割已有数组缓冲区
let buffer = new ArrayBuffer(10);
let buffer1 = buffer.slice(1, 3);
console.log(buffer1.byteLength); // 2
```
#### 视图  
> 视图是用来操作内存的接口  
> 支持8种数值型数据类型   
```javascript
// 默认 DataView 可操作数组缓冲区全部内容
let buffer = new ArrayBuffer(10);
    dataView = new DataView(buffer); 
dataView.setInt8(0,1);
console.log(dataView.getInt8(0)); // 1
 
// 通过设定偏移量(参数2)与长度(参数3)指定 DataView 可操作的字节范围
let buffer1 = new ArrayBuffer(10);
    dataView1 = new DataView(buffer1, 0, 3);
dataView1.setInt8(5,1); // RangeError
```
#### 定型数组   
> 数组缓冲区的特定类型的视图  
```javascript
//创建
let buffer = new ArrayBuffer(10);
view = new Int8Array(buffer);
console.log(view.byteLength);//10
```
> 通过构造函数   
```javascript
let view = new Int32Array(10);
console.log(view.byteLength); // 40
console.log(view.length);     // 10
 
// 不传参则默认长度为0
// 在这种情况下数组缓冲区分配不到空间，创建的定型数组不能用来保存数据
let view1 = new Int32Array();
console.log(view1.byteLength); // 0
console.log(view1.length);     // 0
 
// 可接受参数包括定型数组、可迭代对象、数组、类数组对象
let arr = Array.from({
  0: '1',
  1: '2',
  2: 3,
  length: 3
});
let view2 = new Int16Array([1, 2]),
    view3 = new Int32Array(view2),
    view4 = new Int16Array(new Set([1, 2, 3])),
    view5 = new Int16Array([1, 2, 3]),
    view6 = new Int16Array(arr);
console.log(view2 .buffer === view3.buffer); // false
console.log(view4.byteLength); // 6
console.log(view5.byteLength); // 6
console.log(view6.byteLength); // 6
```
> `length`属性不可写，可使用`entries,keys,values`迭代器遍历   
```javascript
let view = new Int16Array([1,2]);
for(let [k,v] of view.entries()){
  console.log(k,v);
}
```
> 定型数组不是普通数组，不继承自Array   
> set(),subarray()  
```javascript
// set 方法
// 参数1：一个定型数组或普通数组
// 参数2：可选，偏移量，开始插入数据的位置，默认为0
let view= new Int16Array(4);
view.set([1, 2]);
view.set([3, 4], 2);
console.log(view); // [1, 2, 3, 4]
 
// subarray 方法
// 参数1：可选，开始位置
// 参数2：可选，结束位置(不包含结束位置)
let view= new Int16Array([1, 2, 3, 4]), 
    subview1 = view.subarray(), 
    subview2 = view.subarray(1), 
    subview3 = view.subarray(1, 3);
console.log(subview1); // [1, 2, 3, 4]
console.log(subview2); // [2, 3, 4]
console.log(subview3); // [2, 3]
```
