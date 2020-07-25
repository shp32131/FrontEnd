# axios

## 什么是axios?   
- `axios`是一个基于`Promise`的`HTTP`库，是用`Promise`对`ajax`的封装,可以用于浏览器和`Node.js`中 
- 特性:  
  + 1.从浏览中创建`XMLHttpRequests`请求 
  + 2.从`Node.js`创建`http`请求  
  + 3.支持`Promise API`  
  + 4.拦截请求和响应  
  + 5.转换请求数据和响应数据  
  + 6.取消请求
  + 7.自动转换`JSON`数据
  + 8.客户端支持防御`XSRF`

### axios
- `cnpm i axios` 
  + `<script src="https://unpkg.com/axios/dist/axios.min.js"></script>`  
```JavaScript
// 执行get请求 
// 为给定 ID 的 user 创建请求
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
// 上面的请求也可以这样做
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// 执行post请求 
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  //执行多个并发请求 
  function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}
axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  }));

// 配置请求 axios(config)  axios(url[, config])
// 发送 POST 请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
// 获取远端图片 
axios({
  method:'get',
  url:'http://bit.ly/2mTM3nY',
  responseType:'stream'
})
  .then(function(response) {
  response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
});
```
## 实例方法

## 并发
## 创建实例
## 请求配置
## 响应结构
## 拦截器
## 错误处理
