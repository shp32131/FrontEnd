# promise <sup>es6</sup>

## 相关知识准备   

### 函数对象与实例对象       
- 函数对象：将函数作为对象使用时，是一个函数对象     
- 实例对象：new 函数(此时称为构造函数)产生的对象，是一个实例对象    

### 什么是回调函数   
- 一个函数的参数也是一个函数 

#### 同步回调与异步回调  
- javascript中哪些是同步回调,哪些是异步回调   

### JavaScript的error处理
> 错误的类型    
- Error: 所有错误的父类型   
  + ReferenceError: 引用的变量不存在   
  + TypeError: 数据类型不正确的错误   
  + RangeError: 数据值不在其允许的范围内   
  + SyntaxError: 语法错误  
 
- 错误处理两种方式     
  + 1.主动抛出错误：throw error  
  + 2.捕获错误: try ... catch   

```javascript
    // throw 前面不能有return
    throw new Error("错误提示")
```
- 错误对象  
  + `message`属性: 错误相关信息   
  + `stack`属性: 函数调用栈记录信息  

## Promise  
- 封装异步操作   
- 解决嵌套回调的地狱问题    

##  WHAT Promise 是什么    
- 1.抽象表达    
  + Promise 是JS中进行异步编程的新的解决方案    (旧的是用纯回调嵌套)    

- 2.具体表达   
  + 从语法上来说:`Promise` 是一个构造函数   
  + 从功能上来说:`Promise` 对象用来封装一个异步操作并可以获取其结果    

#### promise 的状态改变   
- `Promise`三个状态： 
  + pending
  + resolved 
  + rejected   

- `Promise`状态改变方式只有两种 ： 
  + 1. pending --> resolved  
  + 2. pending --> rejected  
  + 说明:只有这2种方式改变状态，且一个`promise`对象只能改变一次，无论结果为成功或失败，都会有一个结果数据  
  + `Promise`成功的结果数据称为 value ,失败的结果数据称为 reason   

#### promise 的基本流程  
- 基本流程：   

- 基本使用   
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
- 1. 指定回调函数的方式更加灵活 :   
  + `Promise`: 启动异步任务 --> 返回`promise`对象 --> 给`promise`对象绑定回调函数(甚至可以在异步之前)     
  + 嵌套回调：使用嵌套回调函数必须在启动异步任务之前指定回调函数     

- 2. 支持链式调用,可以解决回调地狱问题    
  + 什么是回调地狱？回调函数嵌套，外部回调是内部回调的条件   
  + 回调地狱缺点，不便于异常处理，不方便代码阅读维护       

- 3. `Promise`可以异常传透           

- 4. `async/await` 回调函数终极解决方案      

## HOW 怎么使用 Promise    
- 1. `Promise` 构造函数：`Promise(excutor){}`    
  + `excutor`执行器函数：执行器`(resolve,reject) => {}`    
  + `resolve` 成功函数： 内部定义成功时我们调用的函数 value => {}   
  + `reject` 失败函数： 内部定义失败时我们调用的函数 reason => {}     
  + 说明： `excutor`会在`Promise`内部立即同步回调，异步操作在执行器中执行     

- 2.1 `Promise` 实例对象的方法 <sub> 备注：参数是onXXX开头的都是回调函数的意思 </sub>     
  + `Promise.prototype.then` 方法体：`(onResolved,onRejected) => {}`     
  + `onResolved`函数：成功的回调函数  `(value) => {}`    
  + `onRejected`函数：失败的回调函数   `(reason) => {}`    
  + 说明：指定用于得到成功返回值value的成功回调和用于得到失败返回值reason回调，返回一个新的promise     

- 2.2 `Promise.prototype.catch` 方法：(onRejected) => {}     
  + `onRejected`函数：失败的回调函数 (reason) => {}    
  + 说明：then的语法糖, 相当于 then(undefined,onRejected)     
   
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
- 3.0 `Promise` 对象内置原型方法 `Promise.__proto__`     
- 3.1 `Promise.resolve()` 方法：(value)  =>{}   
  + `value`成功的数据或`promise`对象    
  + 说明：语法糖，返回一个成功或失败的promise对象     

- 3.2 `Promise.reject()`  方法：(reason) => {}    
  +  `reason`:失败的原因   
  + 说明：语法糖,返回一个失败的`promise`对象    

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

- 3.3 `Promise.all(promises)` 方法：(promise) => {}    
  + `promises`：包含n个promise的数组     
  + 说明：返回一个新`promise`，只有数组中所有promise对象成功才成功，只要有一个失败就直接失败      

- 3.4 `Promise.race()` 方法：(promise) => {}    
  + `promise`：包含n个promise的数组     
  + 说明：返回一个新`promise`，第一个完成的promise的结果状态就是最终的结果状态(可能成功也可能失败)     

- 3.5 `Promise.any()` 方法：(promise) => {}    
  + `promise`：包含n个promise的数组     
  + 说明：返回一个新`promise`，只要promise数组中有一个成功，就成功       

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
- 1.`promise`改变状态的方式  
  + 调用 `resolve` 函数, `promise` 从 `pending` 状态到 `resolved` 状态    
  + 调用 `reject`  函数, `promise` 从 `pending` 状态到 `rejected` 状态    
  + `throw` 抛出异常,`promise` 从 `pending` 状态到 `rejected` 状态      

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

- 2.一个`promise`指定多个成功或失败的回调函数，都会调用吗?      
  + 当`promise`改为对应状态时，都会调用    
  + 直到重新使`promise`状态变为`pending`状态时，可以中断`promise`调用链  

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

- 3.改变`promise`状态和指定回调函数谁先谁后？    
  + 都有可能，正常情况下是先指定回调函数，然后再改变状态，但也可能先改变状态再指定回调     

- 3.1如何先改变状态再回调？    
  + 在执行器中直接调用 resolve() 或 reject()     
  + 延迟更长时间后才调用 then(onResolved) 或 catch(onRejected)    

- 3.2什么时候才能得到数据？         
  + 如果先指定的回调函数，那当状态改变时，回调函数就会调用，得到数据     
  + 如果先改变的状态，那当指定回调时，回调函数就会调用，得到数据       

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

- 4. `promise.then(onResolved,onRejected)`返回的新`promise`的结果状态是由什么决定的？      
  + 简单表达: 由`then(onResolved,onRejected)`指定的的回调函数的执行结果决定   
  + 详细表达：和`then()`所执行的是成功回调`(onResolved)`还是失败回调`(onRejected)`没有关系,只和`then()`中回调函数执行的结果有关        
    - 如果`then()`中是`return`一个非`promise`的任意值，那么`then()`返回的新`promise`状态由`pending => resolved`,结果 `value` 为返回的这个任意值      
    - 如果`then()`中有`throw `抛出异常，那么`then()`返回的新`promise`状态由`pending => rejected`,结果`reason`为抛出的异常值    
    - 如果`then()`中是`return`一个重新创建的`promise`，那么`then()`返回的新 `promise` 的状态和结果就是这个新创建的 `promise` 的状态和结果       
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
- 5. `promise`如何串联多个操作任务?     
  + `promise`的`then()`返回一个新的`promise`,可以形成`then()`的链式调用     
  + 通过`then`的链式调用串联多个同步或异步任务      

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
- 6.中断`promise`链？     
  + 当使用`promise`的`then`链式调用时，在中间中断，不再调用后面的回调函数      
  + 办法有一个：在回调函数中返回一个 `pending`状态的 `promise`对象       

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

- 7. `Promise` 异常传透?      
  + 当使用`promise`的`then`链式调用时，可以在最后指定失败的回调       
  + 前面的任务操作出了异常，都会传到最后失败的回调中处理        
  + 一级一级往下传递异常(默认)       

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

==================================分割线============================================

## 自定义一个Promise    
### 定义整体结构    
```JavaScript
/*
  ES5 自定义Promise函数模块 
  匿名函数自调用
*/
(function(window){

// excutor:执行器函数(同步执行)
function Promise(excutor){}

/**** Promise原型方法  *****/
/*
** 方法名：then
** 功能: 指定上一个promise成功或失败的回调函数,返回一个新的promise对象 
** 说明: 返回的新promise的状态由回调函数的结果决定
*/
Promise.prototype.then = function(onResolved,onRejected){}
/*
** 方法名：catch
** 功能: 指定上一个promise失败状态的回调函数，返回一个新的promise对象
** 说明: 返回的新promise的状态由回调函数的结果决定
** 和then的区别是没有指定上一个promise成功状态的回调函数
*/
Promise.prototype.catch = function(onRejected){}

//------------------------------------------------------

/**** Promise函数对象方法 ****/
/*
** 方法名: resolve
** 功能: 快速创建一个成功的onResolved状态的promise
** 返回值: 返回一个指定value结果成功状态promise
*/
Promise.resolve = function(value){}
/*
** 方法名：reject
** 功能: 快速创建一个失败的状态的onRejected的promise
** 返回值: 返回一个指定结果reason失败状态的promise
*/
Promise.reject = function(reason){}
/*
** 方法名：all
** 功能: 接收一个promise数组，返回一个新的promise
** 说明: 只有当所有的promise都成功时，返回的promise才成功
** 只要有一个失败，那就返回一个失败的promise
*/
Promise.all = function(promises){}
/*
** 方法名：race
** 功能: 接收一个promise数组，返回一个新promise
** 说明: 返回的promise的状态,由第一个完成的promise的结果决定
*/
Promise.race = function(promises){}

// 向外暴露Promise函数
window.Promise = Promise;
})(window)
```

### Promise构造函数实现    
```JavaScript
(function(window){

// Promise构造函数
function Promise(excutor){
    const self = this;
    //定义Promise的相关属性
    self.status = 'pending';//给promise对象指定status属性,初始值为pending
    self.data = undefined;//给promise对象指定一个用于存储结果数据的属性
    self.callbacks = [];//每个元素的结构:{onResolved(){},onRejected(){}}
    function resolve(value){
        // 状态只能改一次
        if(self.status !== 'pending'){
            return;
        }
        // 将状态改为 resolved
        self.status = 'resolved';
        // 保存value数据
        self.data = value;
        // 如果有待执行的callback函数，则异步执行回调函数
        if(self.callbacks.length > 0){
            setTimeout(() => {
                self.callbacks.forEach(callbacksObj => {
                    callbacksObj.onResolved(value);
                })
            })
        }
    }
    function reject(reason){
        // 一个promise状态只能改一次
        if(self.status !== 'pending'){
            return; 
        }
        // 将promise状态改为rejected
        self.status = 'rejected';
        // 保存reason数据
        self.data = reason;
        // 如果有待执行的callback函数，则异步执行回调函数
        if(self.callbacks.length > 0){
            setTimeout(() => {
                self.callbacks.forEach(callbacksObj => {
                    callbacksObj.onRejected(reason);
                })
            })
        }
    }

    // 立即同步执行excutor函数,同时要捕获异常
    try{
        excutor(resolve,reject);
    }catch(error){
        // 如果执行器函数中抛出异常,状态变为rejected状态
        reject(error);
    }

}

window.Promise = Promise;
})(window)

```
### Promise.prototype.then(onResolved,onRejected),Promise.prototype.catch(onRejected)   
```JavaScript
/*
** then(onResolved,onRejected)
** 指定成功或失败的回调函数
** 返回一个新的promise对象
*/
Promise.prototype.then = function(onResolved,onRejected){
    // onResolved不是函数时，把value沿promise.then调用链传递下去
    onResolved = typeof onResolved === 'function' ? onResolved : value => value
    // onRejected不是函数时，指定默认失败的回调,实现promise异常传透
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason}
    const self = this;
    return Promise((resolve,reject) => {
        function handle(callback){
            try{
                const result = callback(self.data)
                if(result instanceof Promise){
                    // 2.回调函数返回是promise时,return的Promise的结果就是这个promise
                    result.then(resolve,reject)
                    // 3.等同于 result.then( value => resolve(value), reason => reject(reason))
                }else{
                    // 1.回调函数返回不是promise,return的Promise就会成功,value就是返回的值
                    resolve(result)
                }
            }catch(error){
                // 回调函数抛出异常时,return的Promise就会失败,reason就是error
                reject(error)
            }
        }
        if(self.status === 'pending'){
            // promise为pending状态时,保存回调函数
            self.callbacks.push({
                onResolved(value){
                    handle(onResolved)
                },
                onRejected(reason){
                    handle(onRejected)
                }
            });
        }else if(self.status === 'resolved' ){
            setTimeout(()=>{
                handle(onResolved) 
            })
        }else if(self.status === 'rejected'){
            setTimeout(() => {
                handle(onRejected)
            })
        }
    })
}

/*
** catch
** 指定失败的的回调函数
** 返回一个新的promise对象
*/
Promise.prototype.catch = function(onRejected){
    return this.then(undefined,onRejected)
}
```
### Promise.resolve(value),Promise.reject(reason)
```JavaScript
/*
** Promise.resolve
** 返回一个成功或失败的promise
*/
Promise.resolve = function(value){
    return new Promise((resolve,reject) => {
        if(value instanceof Promise){
            // value是promise对象时，value的结果就是返回的promise的结果
            value.then(resolve,reject)
        }else{
            // value不是promise时,返回一个成功的promise，数据是value
            resolve(value)
        }
    })
}
/*
** Promise.reject
** 返回一个失败的promise对象
*/
Promise.reject = function(reason){
    //返回一个失败的promise
    return new Promise((resolve,reject) => {
        reject(reason)
    })
}
```
### Promise.all,Promise.race()
```JavaScript
/*
** Promise.all(promises)
** 返回一个新的promise,只有所有的promise都成功，返回的新的promise状态才为成功
** 返回所有的promise的成功结果的值,值的顺序与promises中数组的顺序是一致的
*/
Promise.all = function(promises){
    const values = new Array(promises.length)
    let resolveCounts = 0
    return new Promise((resolve,reject) => {
        // 遍历promises数组
        promises.forEach((p,index) => {
            // p可能不是一个promise对象,所以用Promise.resolve(p)
            Promise.resolve(p).then(
                value => {
                    resolveCounts++
                    values[index] = value
                    if(resolveCounts === promises.length){
                        resolve(values)
                    }
                },
                reason => {
                    reject(reason)
                }
            )
        })
    })
} 

/*
** Promise.race(promises)
** 最先执行完的那个promise的结果作为返回的promise的结果
*/
Promise.race = function(promises){
    return new Promise((resolve,reject) => {
        promises.forEach((p,index) => {
            Promise.resolve(p).then(
                value => {
                    resolve(value)
                },
                reason => {
                    reject(reason)
                }
            )
        })
    })
}
```
### Promise.resolveDelay(),Promise.rejectDelay()
```JavaScript
/*
** Promise.resolveDelay
** 返回一个新的成功或失败的promise对象
*/
Promise.resolveDelay = function(value,time){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if(value instanceof Promise){
                value.then(resolve,reject)
            }else{
                resolve(value)
            }
        },time)
    })
}
/*
** Promise.rejectDelay
**
*/
Promise.rejectDelay = function(reason,time){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            reject(reason)
        },time)
    })
}
```

========================================================================

### ES5 function 完整版 
```JavaScript
(function(window){
    function Promise(excutor){
        // 保存 this 后续使用
        const self = this;
        // promise初始状态为 pending
        self.status = 'pending'; 
        self.data = undefined;
        self.callbacks = [];// {{onResolved(value){},onRejected(reason){}}}
        // resolve(value)
        function resolve(value){
            if(self.status !== 'pending'){
                return;
            }
            self.status = 'resolved';
            self.data = value;
            if(self.callbacks.length > 0){
                // 此处是模拟p.then(onResolved,undefined)
                // 误差: setTimeout()是宏任务,p.then()是微任务
                setTimeout(() => {
                    self.callbacks.forEach(callbackObj => {
                        callbackObj.onResolved(value);
                    })
                })
            }
        }
        // reject(reason)
        function reject(reason){
            if(self.status !== 'pending'){
                return
            }
            self.status = 'rejected';
            self.data = reason;
            if(self.callbacks.length > 0){
                // 此处是模拟p.then(undefined,onRejected)
                // 误差: setTimeout()是宏任务,p.then()是微任务
                setTimeout(() => {
                    self.callbacks.forEach(callbackObj => {
                        callbackObj.onRejected(reason);
                    })
                })
            }
        }
        // 同步调用执行器函数 excutor(resolve,reject),如果抛出异常则调用
        try{
            excutor(resolve,reject);
        }catch(error){
            reject(error);
        }
    }
    // 实现p.then()调用与调用链
    Promise.prototype.then = function(onResolved,onRejected){
        const onResolved = typeof onResolved === 'function' ? onResolved : value => value;
        const onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
        const self = this;
        /*
            p.then(onResolved,onRejected)的回调函数执行结果有三种情况
            1.结果是一个promise对象
            2.结果是一个非promise对象
            3.抛出异常
        */
        return new Promise((resolve,reject) => {
            function handle(callback){
                try{
                    const result = callback(self.data);
                }catch(error){
                    reject(error);
                }
                if(result instanceof Promise){
                    result.then(resolve,reject);
                }else{
                    resolve(result);
                }
            }
            if(self.status === 'pending'){
                self.callbacks.push(
                    {
                        onResolved(value){
                            handle(onResolved)
                        },
                        onRejected(reason){
                            handle(onRejected)
                        }
                    }
                )
            }else if(self.status === 'resolved'){
                setTimeout(() => {
                    handle(onResolved);
                })
            }else {
                setTimeout(() => {
                    handle(onRejected);
                })
            }
        })
    }
    // p.catch()
    Promise.prototype.catch = function(onRejected){
        return this.then(undefined,onRejected);
    }
    // Promise.resolve(value)
    Promise.resolve = function(value){
        return new Promise((resolve,reject) => {
            if(value instanceof Promise){
                value.then(resolve,reject)
            }else{
                resolve(value)
            }
        })
    }
    // Promise.reject(reason)
    Promise.reject = function(reason){
        return new Promise((resolve,reject)){
            reject(reason);
        }
    }
    // Promise.all(promises)
    Promise.all = function(promises){
        const values = new Array(promises.length);
        let counts = 0;
        return new Promise((resolve,reject) => {
            promises.forEach((p,index) => {
                Promise.resolve(p).then(
                    value => {
                        counts++;
                        values[index] = value;
                        if(counts === promises.length){
                            resolve(values);
                        }
                    },
                    reason => {
                        reject(reason);
                    }
                )
            })
        })
    }
    // Promise.race(promises)
    Promise.race = function(promises){
        return new Promise((resolve,reject) => {
            promises.forEach((p,index) => {
                Promise.resolve(p).then(
                    value => {
                        resolve(value);
                    },
                    reason => {
                        reject(reason);
                    }
                )
            })
        })
    }

    // 向外部暴露 Promise
    window.Promise = Promise;
})(window)
```
=========================================================================
### ES6 class 完整版
```JavaScript
class Promise{
    constructor(excutor){
        const self = this;
        self.status = 'pending';
        self.data = undefined;
        self.callbacks = [];
        function resolve(value){
            if(self.status !== 'pending') return;
        }
        function reject(reason){
            if(self.status !== 'pending') return;
        }
        try{
            excutor(resolve,reject)
        }catch(error){
            reject(error);
        }
    }
    then(onResolved,onRejected){

    }
    catch(onRejected){
        return this.then(undefined,onRejected);
    }
    static resolve(value){

    }
    static reject(reason){

    }
    static all(promises){

    }
    static race(promises){

    }
}
```

## async与await   
### async函数
- `async`函数的返回值为一个`promise`对象 
- `promise`对象的结果由`async`函数执行的返回值决定 
  + 返回值是一个非`promise`对象
  + 返回值是一个`promise`对象 
  + 函数抛出异常 
```JavaScript
async function fn(){
    return 1;// 有async时 相当于 return Promise.resolve(1)
}
let result = fn();
console.log(result);// result是一个promise对象,状态是resolved,value是1
```
### await表达式
- `await`右侧的表达式一般为`promise`对象,但也可以是其他的值  
  + 如果表达式是`promise`对象,`await`返回是这个`promise`成功的结果值 
  + 如果表达式的值不是`promise`，`await`返回的值就是这个值本身(立即产生这个值)
- `await`必须写在`async`函数中,但`async`函数中可以没有`await` 
- 如果`await`的`promise`失败了,就会抛出异常,需要通过`try...catch`来捕获处理异常 
```JavaScript
function fn1(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(1)
        },1000)
    })
}
//----------------------------------------------
async function fn2(){
    try{
        let value = await fn1()
        console.log('value',value);
    }catch(error){
        console.log(error);
    }
}

```
## JS异步之宏队列与微队列   
### Event Loop 是什么？
- `Event Loop`是一个执行模型，在不同的地方有不同的实现
  + `browser`和`Node.js`基于不同的技术实现了各自的`Event Loop`机制   
  + `browser`的`Event Loop`是在`HTML5`的规范中明确定义    
  + `Node.js`的`Event Loop`是基于`libuv`实现的，在`Node.js`官方文档和`libuv`的官方文档有说明    
  + `libuv`直接实现`Event Loop`  
  + `HTML5`规范中只是定义了`browser`中`Event Loop`的模型,具体由各个`browser`实现       

### 宏队列和微队列  
- 宏队列: 宏任务`MacroTasks`也叫`tasks`,这些异步任务的回调会依次进入`MacroTaskQueue`等待后续调用     
  + `setTimeout`       
  + `setInterval`     
  + `I / O`流    
  + `ajax回调`
  + `requestAnimationFrame` (浏览器独有)    
  + `UI rendering` (浏览器独有)
  + `setImmediate` (node.js独有)

- 微队列: 微任务`MicroTasks`也叫`jobs`这些异步任务的回调会依次进入`MicroTaskQueue`等待后续调用    
  + `Promise.then()`     
  + `Object.observe`      
  + `MutationObserve(callback)`     
  + `process.nexTick`(node.js独有) 

- 运行时三个概念:
  + 代码栈 `Stack`
  + 宏任务队列 `MacroTaskQueue`   
  + 微任务队列 `MicroTaskQueue`

### Event Loop 
- 浏览器的事件循环机制  `Event Loop`
  + 1.从上往下依次解析执行代码栈`Stack`中的所有同步代码     
    - 执行栈`Stack`中代码期间: 遇到异步任务时并不立即执行,将其添加到相应的任务队列中   
      + 将微任务`jobs`添加到微任务队列`MicroTaskQueue`中    
      + 将宏任务`tasks`添加到宏任务队列`MacroTaskQueue`中  

  + 2.所有同步代码执行完后,将此时微任务队列`MicroTaskQueue`中所有微任务依次添加到代码栈`Stack`中执行  
    - 这期间遇到异步任务时:
      + 将微任务`jobs`添加到微任务队列`MicroTaskQueue`中    
      + 将宏任务`tasks`添加到宏任务队列`MacroTaskQueue`中  
    - 由于添加一个微任务的时间总会小于执行一个微任务的时间  
    - 所以此阶段会清空当前微任务队列`MicroTaskQueue`中所有的微任务,包括在这个阶段新添加的微任务   

  + 3.清空微任务队列后,开始将宏任务队列中的第一个宏任务添加到代码栈中执行  
    - 这期间遇到异步任务时:
      + 将微任务`jobs`添加到微任务队列`MicroTaskQueue`中    
      + 将宏任务`tasks`添加到宏任务队列`MacroTaskQueue`中  
    - 在这个宏任务执行完之后,先清空此时微任务队列中的微任务(如果有的话)  
    - 然后开始添加宏任务队列中下一个宏任务到代码栈中以同样方式执行...  

  + 4.重复2步骤和3步骤，直到清空宏任务队列和微任务队列中的所有异步任务  

## promise相关面试题   
```JavaScript
// 面试题1
setTimeout(() => {
    console.log(1);
})
new Promise((resolve,reject) => {
    console.log(2);
    resolve();
}).then(() => {
    console.log(3);
}).then(value => {
    console.log(4);
})
console.log(5);
// 以上执行结果 2 5 3 4 1
// ====================================
// 面试题2
const first = () => (new Promise((resolve,reject) => {
    console.log(3);
    let p = new Promise((resolve,reject) => {
        console.log(7);
        setTimeout(() => {
            console.log(5);
            resolve(6);
        })
        resolve(1);
    })
    resolve(2);
    p.then(arg => {
        console.log(arg);
    })
}))
first().then(arg => {
    console.log(arg);
})
console.log(4);
// 执行结果 3  7  4  1  2   5
// ======================================
// 面试题3
setTimeout(() => {
    console.log(0);
})
new Promise((resolve,reject) => {
    console.log(1);
    resolve()
}).then(value => {
    console.log(2);
    new Promise((resolve,reject) => {
        console.log(3);
        resolve()
    }).then(() => {
        console.log(4);
    }).then(() => {
        console.log(5);
    })
}).then(() => {
    console.log(6);
})
new Promise((resolve,reject) => {
    console.log(7);
    resolve()
}).then(() => {
    console.log(8);
})
// 执行结果 1 7 2 3 8 4 6  5  0
```