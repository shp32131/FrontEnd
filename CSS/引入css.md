- 1. 行内样式
```HTML

<p style="color:red;font-size:20px;">hello CSS </p>

```
- 2. 内部样式
```HTML
<style type="text/css">
    div{
        background-color: gray;
        font-size: 15px;
    }
    #title{
        color: red;
    }
</style>
```
- 3.外部样式
  + `link` 外部链接式,属于XHTML，优先加载CSS文件到页面，推荐使用
  + `@import` 导入式,属于CSS2.1,先加载HTML结构，再加载CSS文件
```HTML
<!-- link -->
<link rel="stylesheet" type="text/css" href="./css/demo.css"/>

<!-- @import -->
<style type="text/css">
    @import url("./css/demo.css");
</style>
```