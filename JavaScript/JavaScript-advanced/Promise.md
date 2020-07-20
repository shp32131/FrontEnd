# promise <sup>es6</sup>

## 相关知识准备   

### 函数对象与实例对象       
> 函数对象：将函数作为对象使用时，是一个函数对象     
> 实例对象：new 函数(此时称为构造函数)产生的对象，是一个实例对象    
```JavaScript

```
### 什么是回调函数   
> 
#### 同步回调与异步回调  
> javascript中哪些是同步回调,哪些是异步回调   

### JavaScript的error处理
> 错误的类型    
- Error: 所有错误的父类型   
> - ReferenceError: 引用的变量不存在   
> - TypeError: 数据类型不正确的错误   
> - RangeError: 数据值不在其允许的范围内   
> - SyntaxError: 语法错误  
> 
> 错误处理两种方式     
> - 主动抛出错误：throw error  
> - 捕获错误: try ... catch   
```javascript
    // throw 前面不能有return
    throw new Error("错误提示")
```
>
> 错误对象  
> - message属性: 错误相关信息   
> - stack属性: 函数调用栈记录信息  

## Promise  
> 封装异步操作   
> 解决嵌套回调的地狱问题    

##  WHAT Promise 是什么    
> 1.抽象表达    
> - Promise 是JS中进行异步编程的新的解决方案    (旧的是用纯回调嵌套)    
> 
> 2.具体表达   
> - 从语法上来说    Promise 是一个构造函数   
> - 从功能上来说:   Promise对象用来封装一个异步操作并可以获取其结果    
#### promise 的状态改变   
> 三个状态： pending , resolved , rejected   
> 状态改变方式只有两种 ： 
> - pending --> resolved  
> - pending --> rejected  
> 说明:只有这2种方式改变状态，且一个promise对象只能改变一次，无论结果为成功或失败，都会有一个结果数据    
> 成功的结果数据称为 value ,失败的结果数据称为 reason   
#### promise 的基本流程  
> 基本流程：   
>
> 基本使用   
```javascript
let p = new Promise((resolve,reject) => {//此处这个是同步回调函数，也叫执行器函数Excutor，其是Promise构造函数的参数 
    //执行异步操作任务  
    setTimeout(() => {
        //能用const就用const,不能就用 let 
        const time = Date.now()
        if(time % 2 == 0){
            resolve('当前时间为偶数，是成功的数据，time= '+time);
        }else{
            reject('当前时间为奇数，是失败的数据,time= '+time);
        }
    },1000);
});
p.then(
    value => {//接收得到成功的value数据 onResolved ,当resolve时调用这个回调
        console.log('成功的回调',value);
    },
    reason => {// onRejected,当reject时调用这个回调  
        console.log('失败的回调',reason);
    }
)

```
## WHY 为什么要用 Promise      
> 1.指定回调函数的方式更加灵活 :   
> - promise: 启动异步任务 --> 返回promise对象 --> 给promise对象绑定回调函数(甚至可以在异步之前)     
> - 嵌套回调：使用嵌套回调函数必须在启动异步任务之前指定回调函数     
> 2.支持链式调用,可以解决回调地狱问题    
> 什么是回调地狱？回调函数嵌套，外部回调是内部回调的条件   
> 回调地狱缺点，不便于异常处理，不方便代码阅读维护       
> promise可以异常传透           
> async\/await 回调函数终极解决方案      

## HOW 怎么使用 Promise    
> 1.Promise 构造函数：Promise(excutor){}    
> - excutor函数：执行器(resolve,reject) => {}    
> - resolve 函数： 内部定义成功时我们调用的函数 value => {}   
> - reject 函数： 内部定义失败时我们调用的函数 reason => {}     
> 说明： excutor会在Promise内部立即同步回调，异步操作在执行器中执行     
> 
> 2.0 Promise 实例对象的方法  <sub> 备注：参数是on***开头的都是回调函数的意思 </sub>     
> 2.1 Promise.prototype.then 方法：(onResolved,onRejected) => {}     
> - onResolved函数：成功的回调函数  (value) => {}    
> - onRejected函数：失败的回调函数   (reason) => {}    
> 说明：指定用于得到成功value的成功回调和用于得到失败的reason回调，返回一个新的promise     
>
> 2.2 Promise.prototype.catch 方法：(onRejected) => {}     
> - onRejected函数：失败的回调函数 (reason) => {}    
> 说明：then的语法糖, 相当于 then(undefined,onRejected)     
>   
```javascript
new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve('成功的数据');
        // reject('失败的数据');
    })
}).then(
    value => {
        console.log('onResolved',value);
    }
    // reason => {
    //     console.log('onRejected',reason);
    // }
).catch(
    reason => {
        console.log('catch onRejected',reason);
    } 
);

```
> 3.0 Promise 对象内置原型方法 Promise.\_\_proto\_\_     
>
> 3.1 Promise.resolve() 方法：(value)  =>{}   
> - value成功的数据或promise对象    
> 说明：语法糖，返回一个成功或失败的promise对象     
>
> 3.2 Promise.reject()  方法：(reason) => {}    
> - reason:失败的原因   
> 说明：语法糖,返回一个失败的promise对象    
>
```javascript
//产生一个成功值为1和2的两个promise 
//方式一：实例promise对象  
const p1 = new Promise((resolve,reject) => {
    resolve(1);
})
//方式二：使用Promise的方法，语法糖形式  
const p2 = Promise.resolve(2);
//产生一个失败值为3的promise 
const p3 = Promise.reject(3);
p1.then(value => {console.log(value)})
p2.then(value => {console.log(value)})
p3.catch(reason => {console.log(reason)})

```
> 3.3 Promise.all() 方法：(promise) => {}    
> - promise：包含n个promise的数组     
> 说明：返回一个新promise，只有数组中所有promise对象成功才成功，只要有一个失败就直接失败      
>
> 3.4 Promise.race() 方法：(promise) => {}    
> - promise：包含n个promise的数组     
> 说明：返回一个新promise，第一个完成的promise的结果状态就是最终的结果状态     
>
> 3.5 Promise.any() 方法：(promise) => {}    
> - promise：包含n个promise的数组     
> 说明：返回一个新promise，只要promise数组中有一个成功，就成功       
>
```javascript
const p1 = new Promise((resolve,reject) => {
    resolve(1);
});
const p2 = Promise.resolve(2);
const p3 = Promise.reject(3);

const pAll = Promise.all([p1,p2,p3]);
pAll.then(
    values => {
        console.log(values);
    }
).cath(
    reason => {
        console.log('onRejected',reason);
    }
)
// output: onRejected 3

// Promise.race 返回第一个执行完成的 promise 状态可能是 resolved或rejected 
const pRace = Promise.race([p1,p2,p3]);
pRace.then(
    value => {
        console.log('onResolved',value);
    }
).catch(
    reason => {
        console.log('onRejected',reason);
    }
)
// onResolved 1

```
### 关键的一些问题   
> 1.promise改变状态的方式  
> - 调用 resolve 函数, promise 从 pending 状态到 resolved 状态    
> - 调用 reject  函数, promise 从 pending 状态到 rejected 状态    
> - throw 抛出异常,promise 从 pending 状态到 rejected 状态      
```javascript 
const p = new Promise((resolve,reject) => {
    //resolve(1);//promise 从pending状态到 resolved 状态
    //reject(1);//promise 从pending状态到 rejected 状态
    throw new Error('出错了');//抛出异常，promise从pending状态到rejected状态，reason 为 招聘的 error   
    //throw 3//可以抛出其他的值，不一定是 Error对象  
}).then(
    value => { 
        console.log('succeed',value)
    }
).catch(
    reason => {
        console.log('failure',reason);//reason = 出错了 
    }
)
```
> 2.一个promise指定多个成功或失败的回调函数，都会调用吗?      
>
> - 当promise改为对应状态时，都会调用    
```javascript
new Promise((resolve,reject) => {
    resolve(1);
}).then(//会调用
    value => {
        console.log('onResolved',value);
    }
).then(//也会调用
    value => {
        console.log('the second onResolved');
    }
)
```
> 3.改变promise状态和指定回调函数谁先谁后？    
> - 都有可能，正常情况下是先指定回调函数，然后再改变状态，但也可能先改变状态再指定回调     
>
> 3.1如何先改变状态再回调？    
> - 在执行器中直接调用 resolve() 或 reject()     
> - 延迟更长时间后才调用 then(onResolved) 或 catch(onRejected)    
>
> 3.2什么时候才能得到数据？         
> - 如果先指定的回调函数，那当状态改变时，回调函数就会调用，得到数据     
> - 如果先改变的状态，那当指定回调时，回调函数就会调用，得到数据       
```javascript
//一般都是先指定回调函数，再改状态  
new Promise((resolve,reject) => {
    setTimeout(
        resolve(1);//2.后改变状态(同时指定数据),异步执行回调函数   
        // reject();
    ,0)
}).then(//1.先指定回调函数，保存当前指定的回调函数 
    value => {
        console.log(value);
    },
    reason => {}
)
//先改状态,也可以 setTimeout(p.then(),2000) 延迟then方法
new Promise((resolve,reject) => {
    resolve(1);//先改变状态,同时指定数据
    // reject();
}).then(//后指定回调函数，异步执行回调函数 
    value => { console.log(value) },
    reason => {}
)
```
> 4. promise.then()返回的新promise的结果状态是由什么决定的？      
> - 简单表达: 由then()指定的的回调函数执行的结果决定     
>
> 详细表达：   
> 和then()所执行的是成功回调(onResolved)还是失败回调(onRejected)没有关系，和then()中回调函数执行的结果有关        
> - 如果then()中是 return 一个非promise的任意值，那么then( )返回的新 promise 状态由 pending => resolved,结果 value 为返回的这个任意值      
> - 如果then()中有 throw 抛出异常，那么then( )返回的新 promise 状态由 pending => rejected,结果 reason 为抛出的异常值      
> - 如果then()中是 return 一个重新创建的 promise ，那么then()返回的新 promise 的状态和结果就是这个新创建的 promise 的状态和结果       
```javascript
const p = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve(1);
        // reject(2);
    },1000);
});
p.then(//then是同步执行的，里面的回调函数是异步执行的  
    value => { console.log('onResolved',value); }
);
p.then(// 非链式调用，这个then的promise和前面的then都是p,所以这两个then的结果是一样的
//如果想不一样，可以先接收上一个then返回的promise let p1 = p.then(...) 
    value => { 
        console.log('onResolved',value);
        // 1.return 2;//返回的新promise是onResolved状态，value = 2,，默认返回 undefined

        throw new Error('reason') || throw 5;//2.返回的新promise对象状态为onRejected,value=reason 或 5

        // return Promise.resolve(3);//3.0返回新promise对象状态为onResolved，value = 3

        // return Promise.reject(4);//3.1返回新promise对象状态onRejected,value = 4
    }
).then(//这是链式调用，此处then的promise对象状态是上一个then返回的promise状态
//value是上一then返回的任意值或抛出的异常对象或返回新promise的value值  
    value => {
        console.log('onResolved third then',value);
    },
    reason => {
        console.log('onRejected third then',reason);
    }
)
```
> 5.promise如何串联多个操作任务?     
> - promise的then()返回一个新的promise,可以形成then() 的链式调用     
> - 通过then的链式调用串联多个同步或异步任务      
```javascript
new Promise((resolve,reject) => {
    setTimeout(() => {
        console.log('执行异步任务1');
        resolve(1);
        // reject(1);
    },1000);
}).then(
    value => {
        console.log('异步任务1的结果',value);
        console.log('执行同步任务1');
        return 2;
    }
).then(
    value => {
        console.log('同步任务1的结果',value);
        // 启动异步任务2
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                console.log('执行异步任务2');
                resolve(3);
            },1000)
        });
    }
).then(
    value => {
        console.log('异步任务2的结果',value);
    }
)
```
> 5.Promise 异常传透?      
> - 当使用promise的then链式调用时，可以在最后指定失败的回调       
> - 前面的任务操作出了异常，都会传到最后失败的回调中处理        
>
> - 一级一级往下传递异常(默认)       
```javascript
new Promise((resolve,reject) => {
    setTimeout(() => {
        // resolve(1);
        reject(1);
    })
}).then(
    value => {
        console.log('onResolved',value);
        return 2;
    },
    reason => {
        throw reason;
    }
).then(
    value => {
        console.log('onResolved',value);
        return 3;
    },
    reason => {
        return reason;
    }
).catch(
    reason => {
        console.log('onRejected',reason);
        return Promise.reject(reason);
    }
).then(
    value => {
        console.log('onResolved',value);
    },
    reason => {
        console.log('onRejected',reason);
    }
)
```
> 6.中断promise链？     
> - 当使用promise的then链式调用时，在中间中断，不再调用后面的回调函数      
> - 办法有一个：在回调函数中返回一个 pending状态的 promise对象       
```javascript
new Promise((resolve,reject) => {
    resolve(1);
}).then(
    value => {
        console.log('onResolved',value);
        return 2;
    },
    reason => {
        console.log('onRejected',reason);
        return reason;
    }
).then(
    value => {
        console.log('onResolved',value);
        return new Promise((resolve,reject) => { });//返回一个pending状态的promise，从此处中断调用链
    },
    reason => {
        console.log('onRejected',reason)
    }
).then(
    value => value;
).catch(
    reason => {
        console.log('onCatched',reason);
    }
)
```
## 自定义Promise    
### 定义整体结构    
### Promise构造函数实现    
### promise.then(),promise.catch()   
### Promise.resolve(),Promise.reject()
### Promise.all,Promise.race()
### Promise.resolveDelay(),Promise.rejectDelay()
### ES5 function 完整版 
### ES6 class 完整版
```javascript
/*
es5 使用匿名函数自调用(立即执行函数)定义模块
*/
(function (windows){
/*
定义Promise函数对象
excutor 为执行器函数参数，同步执行
*/
function Promise(excutor) {

    //相关属性

    this.status = 'pending';//给promise对象指定status属性，初始值为pending
    this.data = undefined;//给promise对象指定一个用于存储结果数据的属性
    this.callbacks = [];//每个元素的结构:{onResolved(){},onRejected(){}}  

    //相关方法

    //将状态改为resolved
    function resolve(value){
        //状态只能改一次
        if(this.status != 'pending'){
            return;
        }
        //将状态变成resolved
        this.status = 'resolved';
        //保存value数据
        this.data = value;
        //如果有待执行callback函数，立即异步执行回调函数onResolved
        if(this.callbacks.length > 0){
            setTimeout(() => {
                this.callbacks.forEach(callbackObject => {
                    callbackObject.onResolved(value);
                })
            })
        }
    }
    //将状态改为rejected
    function reject(reason){
        //状态只能改一次
        if(this.status != 'pending'){
            return;
        }
        //将状态变成rejected
        this.status = 'rejected';
        //保存value数据
        this.data = reason;
        //如果有待执行callback函数，立即异步执行回调函数onRejected
        if(this.callbacks.length > 0){
            setTimeout(() => {
                this.callbacks.forEach(callbackObject => {
                    callbackObject.onRejected(reason);
                })
            })
        }
    }

    //立即执行excutor,调用时，一旦捕获到异常就将状态改为rejected
    try{
        excutor(resolve,reject);
    }catch(error){//如果执行器抛出异常，那promise将变成rejected状态
        reject(error);
    }
}

/*
Promise原型对象的then()
指定成功和失败的回调函数
返回一个新的promise对象
*/
Promise.prototype.then = function(onResolved,onRejected){
    this.callbacks.push(
        {
            onResolved,
            onRejected
        }
    )
}
/*
Promise原型对象的catch()
指定失败的回调函数
返回一个新promise对象
*/
Promise.prototype.catch = function(onRejected){

}

/*
Promise对象的resolve方法
返回指定结果一个成功的promise
*/
Promise.resolve = function (value){

}
/*
Promise对象的reject方法
返回指定结果一个失败的promise
*/
Promise.reject = function (reason){

}
/*
Promise对象的all方法
返回一个promise,只有当所有promise成功时才成功
*/
Promise.all = function (promises){

}
/*
Promise对象的reject方法
返回一个promise，其结果由第一个完成的promise决定
*/
Promise.race = function (promises){

}

//向外暴露Promise函数
window.Promise = Promise;

})(windows)

```

## async与await   

## JS异步之宏队列与微队列   

## promise相关面试题   