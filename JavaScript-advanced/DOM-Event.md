# JavaScript DOM 事件

## 什么是事件？
- 事件就是一件事情或者一个行为(对于元素来说，元素的很多事情是天生自带的)，操作这个元素，就触发相应的事件  
- 事件是`DOM`元素天生自带的行为属性，操作元素，就会触发相应元素的行为

## 元素天生自带的事件
- 鼠标事件  
  + `click` : 点击，pc端是点击，移动端代表是单击(300ms延迟，这个时间内再有点击就变成双击事件) 
  + `dblclick`: 双击
  + `mouseover`: 鼠标经过
  + `mouseout`: 鼠标移出
  + `mouseenter`: 鼠标进入
  + `mouseleave`: 鼠标移动
  + `mousedown`: 鼠标按下(鼠标左右键都会触发，`click`是按下抬起才触发)
  + `mouseup`: 鼠标抬起(比`click`先触发，是`down`和`up`先触发，才会触发click)
  + `mousewheel`: 鼠标滚轮

- 键盘事件
  + `keydown`: 键盘按下
  + `keyup`: 键盘抬起
  + `keypress`: 和`keydown`类似，但keydown返回的是键盘码，而keypress是返回ASCII码字符
  + `input`: pc端口有实体物理键盘，可以监听keydown和keyup,手机端使用input事件代替

- 表单元素事件
  + `focus`: 获取焦点
  + `blur`: 失去焦点
  + `change`: 内容改变

- 其他事件
  + `load`: 加载完成 `window.onload` 
  + `unload`: 页面关闭
  + `beforeunload`: 页面关闭之前
  + `scroll`: 滚动条滚动事件
  + `size`: 大小改变 `window.onresize = function(){}`

- 移动端手指事件
  + [touch 单手指操作]
    - `touchstart`: 手指按下
    - `touchmove`: 手指移动
    - `touchend`: 手指离开
    - `touchcancel`: 手指操作取消
  + [gesture 多手指操作]
    - `gesturestart`: 手指按下
    - `gesturechange`: 手指改变
    - `gestureend`: 手指离开

- video / audio
  + `canplay`: 可以播放
  + `canplaythrough`: 资源加载完成

## 绑定事件
- 给元素天生自带的事件行为绑定方法，当事件触发，就会执行相应方法  
```HTML
<!-- 第一种方法 -->
<button onclick="alert('hello JavaScript');"> click me</button>
<button onclick="eventHandler();"> click me</button>

<!-- 第二,第三种方法 -->
<div id="btnOne"></div>

<script>
function eventHandler(e) {
    window.confirm("hello JavaScript");
}

//第二种方式,HTML与JS分离,整洁...
//如果有几个事件函数，只会触发最后一个，后面的会覆盖前面的
document.querySelector('#btn').onclick = eventHandler;
//可以直接写 
btn.onclick = eventHandler;

//第三种方式,最好的一种方式
document.querySelector('#btn').addEventListener('click',eventHandler,false);

</script>

```
## 事件对象
- 元素事件发生时，浏览器会自动传入相应的事件对象  
- 在IE8以下浏览中，不会自动传入事件对象，用`window.event`来获取
```JavaScript
box.onclick = me => {
  me = me || window.event；
  let target = me.target || me.srcElement;
  me.preventDefault ? me.preventDefault : me.returnValue = false;
}
```
- 常用事件对象
  + `Event`
  + `MouseEvent`
  + `KeyboardEvent`
- 事件对象包含了很多属性和方法  
  + `MouseEvent`
    - `e.target` 事件源,事件发生的元素
    - `e.clientX` / `e.clientY` 当前鼠标坐标点
    - `e.pageX` / `e.pageY` 当前鼠标触发点离Body左上角的距离
    - `e.preventDefault()` 阻止默认行为
    - `e.stopPropagation()` 阻止事件冒泡
    - `e.type` 当前事件类型
    - `e.path` 事件捕获或冒泡的路径,HTML的层级结构,事件捕获时是由最外层window->document->html->body...，事件冒泡时相反
  + `KeyboardEvent`
    - `ke.code` 当前按键 'KeyA'
    - `ke.key` 按键码 'a'
    - `ke.which` / ke.keyCode(IE) 当前按键的键盘码 
    - `ke.type` 当前事件类型
```HTML
<!--  -->
<div id="box"> <img src="" id="img"/> </div>
<input id="input">

<script>
  window.onload = e => {
    console.log(e);//Object Event
  }
  // div 元素没 onload事件,img 元素有,div元素是渲染  img元素是加载
  img.onload = e => {
    console.log(e);
  }
  box.onclick = me => {
    console.log(me);// Object MouseEvent
  }
  input.onkeydown = ke => {
    console.log(ke);//Object KeyboardEvent
  }
</script>
```
### 事件默认行为与阻止
- `<a href=""></a>` 
  + 1.跳转页面 
  + 2.锚点定位 `<a href="#box"></a>`,首先在当前页面URL地址栏设置一个HASH值，浏览器检测到HASH值，默认定位到当前页面中id和HASH相同的位置
- `<input>`
  + 输入内容可以呈现到文本框中
  + 输入内容的时候会把之前的一些信息呈现出来
- `<submit type="submit" value="提交">` 在From 表单中，设置`action` 点出`submit`自动刷新页面
  ```HTML
  <a href="javascript:void;" id="link"> </a>

  <script>
    // 通过JavaScript阻止 a 标签默认行为
    link.onclick = me => {
      me = me || window.event;
      // 1.直接return false 也可以阻止默认行为
      return false; 
      // 2.调用MouseEvent 的方法
      me.preventDefault ? me.preventDefault : me.returnValue = false;
    }
  </script>
  ```

## 事件传播机制
- 事件的传播机制的几个阶段:
  - `Event.prototype` 事件传播机制
    + `0`: `NONE`
    + `1`: `CAPTURING_PHASE`
    + `2`: `AT_TARGET`
    + `3`: `BUBBLING_PHASE`

  - 1.捕获阶段: 由`HTML`结构最外层(`html`)开始向内层查找具体的事件源元素,构建出事件冒泡传播的路径  
    + 不同浏览器最外层元素定义是不一样的
    + `chrome: window->document->html->body->...`
    + `IE8`以上: `window->html->body->...`
    + `IE`低版本: `html->body->...`

  - 2.事件源: 把事件源相关操作行为触发，执行事件绑定的方法

  - 3.冒泡阶段: 按照捕获阶段构建的路径，由内向外触发各级元素的事件方法
    + 冒泡传播：触发当前元素的某一个事件行为，不仅当前元素事件触发而且其父级元素的相关事件也会依次触发   