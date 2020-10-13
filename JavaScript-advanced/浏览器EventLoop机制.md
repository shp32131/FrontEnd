## Event Loop 是什么？
- `Event Loop`是一个执行模型，在不同的地方有不同的实现
  + `browser`和`Node.js`基于不同的技术实现了各自的`Event Loop`机制   
  + `browser`的`Event Loop`是在`HTML5`的规范中明确定义    
  + `Node.js`的`Event Loop`是基于`libuv`实现的，在`Node.js`官方文档和`libuv`的官方文档有说明    
  + `libuv`直接实现`Event Loop`  
  + `HTML5`规范中只是定义了`browser`中`Event Loop`的模型,具体由各个`browser`实现       

## 宏队列和微队列  
- 宏队列: 宏任务`MacroTasks`也叫`tasks`,这些异步任务的回调会依次进入`MacroTaskQueue`等待后续调用     
  + `setTimeout`       
  + `setInterval`     
  + `I / O`流    
  + `requestAnimationFrame` (`browser only`)    
  + `UI rendering` (`browser only`)    
  + `setImmediate` (`Node.js only`)    

- 微队列: 微任务`MicroTasks`也叫`jobs`这些异步任务的回调会依次进入`MicroTaskQueue`等待后续调用    
  + `Promise`     
  + `Object.observe`      
  + `MutationObserve`     
  + `process.nexTick` (`Node.js only`)   

- 运行时三个概念:
  + 代码栈 `Stack`
  + 宏任务队列 `MacroTaskQueue`   
  + 微任务队列 `MicroTaskQueue`

## Event Loop 
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

## 永不阻塞  
- 基于事件循环机制，不会发生阻塞   

