# css居中
## 行内元素
### 水平居中
```HTML
<div class="parent>
  <span class="child">inline-center</span>
</div>
```
- `.parent {text-align:center}`
- `.parent {width: fit-content + margin:auto}`
### 垂直居中
- `height:100px;line-height:100px` 单行文本有效

## 块级元素
```HTML
<div class="parent">
  <div class="child">block to center</div>
</div>
```
### 水平居中
- `.child {margin: 0 auto}`
- `.parent {display:flex;justify-content:center;}`
### 垂直居中
- 定位方式
```CSS
.parent {
  height:200px;
  position:relative;
}
/*方法1
* 需要知道child的宽和高
*/
.child {
  height:100px;
  width:100px;
  position:absolute;
  top:50%;
  left:50%;
  margin-top:-50px;
  margin-left:-50px;
}
/*方法2
* css自带calc函数
* 需要知道child的宽和高
*/
.child {
  height:100px;
  width:100px;
  position:absolute;
  top:calc(50%-50px);
  left:calc(50%-50px);
}
/*方法3 
* transform属性
* 不需要知道child的宽和高
*/
.child {
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
}
/*方法4 
* margin特性 
*/
.child {
  height:100px;
  width:100px;
  position:absolute;
  left:0;
  top:0;
  right:0;
  bottom:0;
  margin:auto;
}
```
- `padding`
- `display:flex;align-items:center;`
- 伪元素实现
```CSS
.parent {
  height:200px;
  text-align:center;
}
.child {
  width:100px;
  height:100px;
  display:inline-block;
  vertical-align:middle;
}
.parent::before {
  content:"";
  width:20px;
  height:200px;
  display:inline-block;
  vertical-align:middle;
}
```
- `calc`
```CSS
.parent {
  width:600px;
  height:600px;
}
.child {
  width:100px;
  height:100px;
  padding:calc((100%-100px)/2);
  background-clip:content-box;
}
```