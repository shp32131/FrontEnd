## scope chain and closure 
## 作用域与闭包 
### 作用域 
> 全局作用域只有一个，每个函数又有都有函数作用域及上下文  
>
> - 编译器运行时会将变量定义在所在作用域  
> - 会用变量时会从当前作用域开始向上查找变量   
> - 作用域链就是从所在作用域开始一级一级向上找直到全局作用域window    

#### 使用规范
> 作用域链只身上查找，找到全局变量window终止,尽量不要在全局作用域定义变量  
> - 函数执行完后，其环境变量将从内存中删除   
> - 函数每次调用都会创建一个新作用域   
> - 子函数执行时父级环境将被保留  

```javascript
//for循环结束后再执行setTimeout,每次循环都会为setTimeout拷贝一份父级作用域的变量保存  
function fn(){
    for(let i = 0;i < 3;i++){
        setTimeout(() => {
            console.log(i);
        });
    }
}
fn();//0 1 2
//由于var 声明的i 没有块级作用域，所有子作用域内的变量i变成最后的i的值  
function func(){
    for(var i = 0;i < 3;i++){
        setTimeout(() => {
            console.log(i);
        });
    }
}
func();//3 3 3
```

#### let,const,var
> js代码执行的过程   
>
> - for循环中使用let/const会在每一次迭代中重新生成不同的变量 i 

```javascript
// 三个经典例子 对比 

// for 中 使用 let 时
let arr = [];
for(let i=0;i<10;i++){
    arr.push(()=>i);
}
console.log(arr[3]());// 3

//for中使用var时 
for(var i=0;i<10;i++){
    arr.push(()=>i);
}
console.log(arr[3]());// 10 

//使用立即执行函数形成闭包  
// 实现let/const在for循环中每次迭代产成不同的变量  
for(var i = 0;i < 10;i++){
    !function(n){
        arr.push(()=>n);
    }(i);
}
console.log(arr[3]());// 3 
```

### 闭包使用 
> 闭包就是指子函数可以访问外部父级作用域的变量  
> 
> - JS中所有函数都是闭包  
> - 闭包一般在子函数本身作用域以外执行，即延伸作用域   
#### 基本示例
```javascript
function fun(){
    let name = "john";
    return function(){
        return name;
}
let fn = fun();
console.log(fn());//john

//使用闭包返回数组区间元素  
let arr = [3,2,1,5,6,9,10];
function between(a,b){
    // 闭包机制保留 a,b变量  
    return function(item){
        return item >= a && item <= b; 
    };
}
console.log(arr.filter(between(3,7)));//[3,5,7]
​```
//回调函数中使用闭包  
//当点击按钮时，显示当前点击的是第几个按钮  
​```html

<body>
    <button message="button--1">button</button>
    <button message="button--2">button</button>
</body>
<script>
    let btns = document.querySelectorAll("button");
    for(let i = 0;i < btns.length;i++){
        btns[i].addEventListener("click",function(){
            console.log(`你点了第${i+1}个按钮`);
        })
    }
</script>

//移动动画  
//闭包排序  
```

#### 闭包问题  
> 闭包特性中，父级作用域会为函数保存数据，从而造成内存泄漏问题  
>
> - 手动 obj = null 解决 
```html
<body>
    <div desc="content for first div">first div content</div>
    <div desc="content for second div">second div content</div>
</body>
<script>
    let divs = document.querySelectorAll("div");
    //上级作用域，会为子函数执行，保存item数据，使item不会释放  
    divs.forEach(function(item){
        //先将item中有用的信息保存下来,因为后面item=null后，item将不可用  
        let desc = getAttribute("desc"); 
        item.addEventListener("click",function(){
            console.log(desc);
        });
        //解决办法，手动清除item = null  
        item = null;
    });
</script>
```