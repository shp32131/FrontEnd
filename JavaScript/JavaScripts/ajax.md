# Ajax
## Ajax是什么?
> Ajax 完整描述为 Asynchronous JavaScript + XML (异步JavaScript 和 XML)   

## Ajax 核心对象` XMLHttpRequest `
> 发送一个http请求过程:  
- 先创建一个` XMLHttpRequest ` 对象  
- 调用`.open()`方法打开一个URL  
- 调用`.send()`方法发送请求  

```JavaScript
// example 1
let oReq = new XMLHttpRequest();

//事件监听要在open之前才有用
oReq.addListener('load',() => {
  console.log(this.responseText);
});
oReq.open("GET","http://www.example.com/aa.txt",true);
oReq.send();

//example 2
let xhr= new XMLHttpRequest();

xhr.open('GET', "https://developer.mozilla.org/", true);
xhr.onreadystatechange = function () {
  if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    console.log(xhr.responseText)
  }
}
xhr.send();
```

- 通过`XMLHttpRequest`生成的请求有两种方式获取数据,异步或同步,由`.open()`方法的第三个参数指定,默认为`true`异步请求

### XMLHttpRequest属性

**status**
- `XMLHttpRequest.status`返回`XMLHttpRequest`响应中的数字状态码  
- status的值是一个无符号的短整型,status码是标准的HTTP status codes  
- 在请求完成前，`status`的值是0，如果XMLHttpRequest出错,浏览器返回的status也为0
- onreadystatechange  

只要 readyState 属性发生变化，就会调用相应的处理函数。这个回调函数会被用户线程所调用。
XMLHttpRequest.onreadystatechange 会在 XMLHttpRequest 的readyState 属性发生改变时触
发 readystatechange 事件的时候被调用。

当一个 XMLHttpRequest 请求被 abort() 方法取消时，其对应的 readystatechange 事件不会被触发...
```JavaScript
var xhr = new XMLHttpRequest();
console.log('UNSENT', xhr.status);

xhr.open('GET', '/server', true);
console.log('OPENED', xhr.status);

xhr.onprogress = function () {
  console.log('LOADING', xhr.status);
};

xhr.onload = function () {
  console.log('DONE', xhr.status);
};

xhr.send(null);

/**
 * 输出如下：
 * UNSENT（未发送） 0
 * OPENED（已打开） 0
 * LOADING（载入中） 200
 * DONE（完成） 200
 */
```

**readyState**

**response**
**responseText**
**responseType**
**responseURL**
**responseXML**
**statusText**
**timeout**
**upload**
**withCredentials**

### XMLHttpRequest方法
**open()**
XMLHttpRequest.open() 方法初始化一个请求。该方法要从JavaScript代码使用；从原生代码初始化一个请求，使用openRequest()替代
注意：为已激活的请求调用此方法（open()或openRequest()已被调用）相当于调用abort()

```JavaScript
xhrReq.open(method, url);
xhrReq.open(method, url, async);
xhrReq.open(method, url, async, user);
xhrReq.open(method, url, async, user, password);
```
- -,对于非HTTP(S)URL被忽略
- 要使用的HTTP方法，比如「GET」、「POST」、「PUT」、「DELETE」、等。对于非HTTP(S) URL被忽略。

**send()**

**abort()**

**getAllResponseHeader()**

**overrideMimeType()**

### XMLHttpRequest事件
**onreadystatechange**  
**abort**
**error**
**load**
**loadend**  
**loadstart**  
**progress**  

**timeout**
XMLHttpRequest.timeout 是一个无符号长整型数，代表着一个请求在被自动终止前所消耗的毫秒数。
默认值为 0，意味着没有超时。超时并不应该用在一个 document environment 中的同步 XMLHttpRequests  
请求中，否则将会抛出一个 InvalidAccessError 类型的错误。当超时发生， timeout 事件将会被触发


### 分析和操作服务器响应

### 监控请求过程  

### 提交表单或上传二进制文件

### 创建异步或同步请求
