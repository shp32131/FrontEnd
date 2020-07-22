## HTML Web 存储 
### cookie 和 session 
> `cookie`
- 浏览器用于保存用户信息的机制  
  + 用户ID,购物车商品....
  + 访问一个网站时,会携带用户的`cookie`信息...
  + `cookie`存储的数量和字符数不能超过 4KB == 4096 byte
  + `cookie`存储在用户本地,能在浏览器里查看到...`document.cookie`

> `session`  
- `session` 会话 
  + 会话是指访问网站的的一个周期,打开网站->关闭浏览器  
  + `http`协议是无状态的...
  + `session`内容保存在服务器,由`cookie`保存发送`session.id`  
  + 安全性高,但会增加服务器存储压力  

### HTML5新增客户端存储数据 
- `HTML5`新增加两个Web存储机制,`localStorage`和`sessionStorage`  
  + 本地存储,不同的网站存储在不同的区域,一个网站只能访问其自身的区域的数据  
  + 如果存储对象,先`JSON.stringify()`,再存储  
  + 取出对象后,先`JSON.parse()`，再用 

- `localStorage` 没有时间限制的数据存储  
```JavaScript 
// 页面打开次数
if (localStorage.count){
  localStorage.count=Number(localStorage.count) +1;
}else{
  localStorage.count=1;
}
document.write("Visits "+ localStorage.count + " time(s).");

```

- `sessionStorage` 针对一个`session`会话周期来存取数据
  + 用户关闭浏览器窗口时,会话结束,数据会删除   
```JavaScript 
sessionStorage.name = "john";
console.log(sessionStorage.name);
```
