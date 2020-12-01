
> 可以触发BFC的元素有float、position、overflow、display：table-cell/ inline-block/table-caption ；
- BFC有什么作用呢？比如说实现多栏布局’
- 块格式化上下文对浮动定位与清除浮动都很重要。
- 浮动定位和清除浮动时只会应用于同一个BFC内的元素。
- 浮动不会影响其它BFC中元素的布局，而清除浮动只能清除同一BFC中在它前面的元素的浮动。
- 外边距折叠（Margin collapsing）也只会发生在属于同一BFC的块级元素之间。
-行内块级margin不会折叠，因为行内块级也会创建BFC；可以理解为创建新的BFC避免两个相邻 <div> 之间的 外边距合并 
## BFC(块级格式化上下文)
BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。
反之也如此。包括浮动，和外边距合并等等，因此，有了这个特性，我们布局的时候就不会出现意外情况了。

display 属性为 block, list-item, table 的元素，会产生BFC.

> 给这些元素添加如下属性就可以触发BFC。   

-float属性不为none

-position为absolute或fixed

-display为inline-block, table-cell, table-caption, flex, inline-flex

-overflow不为visible。

BFC布局规则特性：

1.在BFC中，盒子从顶端开始垂直地一个接一个地排列.

2.盒子垂直方向的距离由margin决定。属于同一个BFC的两个相邻盒子的margin会发生重叠

3.在BFC中，每一个盒子的左外边缘（margin-left）会触碰到容器的左边缘(border-left)（对于从右到左的格式来说，则触碰到右边缘）。

BFC的区域不会与浮动盒子产生交集，而是紧贴浮动边缘。
计算BFC的高度时，自然也会检测浮动或者定位的盒子高度。
它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。

BFC的主要用途
BFC能用来做什么？

(1) 清除元素内部浮动

只要把父元素设为BFC就可以清理子元素的浮动了，最常见的用法就是在父元素上设置overflow: hidden样式，对于IE6加上zoom:1就可以了。

(2) 解决外边距合并问题

外边距合并的问题。

主要用到

盒子垂直方向的距离由margin决定。属于同一个BFC的两个相邻盒子的margin会发生重叠
属于同一个BFC的两个相邻盒子的margin会发生重叠，那么我们创建不属于同一个BFC，就不会发生margin重叠了。

(3) 制作右侧自适应的盒子问题

主要用到

普通流体元素BFC后，为了和浮动元素不产生任何交集，顺着浮动边缘形成自己的封闭上下文</pre>

普通流体元素BFC后，为了和浮动元素不产生任何交集，顺着浮动边缘形成自己的封闭上下文

BFC 总结
BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。包括浮动，和外边距合并等等，因此，有了这个特性，我们布局的时候就不会出现意外情况了。

优雅降级和渐进增强
什么是渐进增强（progressive enhancement）、优雅降级（graceful degradation）呢？

渐进增强 progressive enhancement：

针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。

优雅降级 graceful degradation：

一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。
区别：渐进增强是向上兼容，优雅降级是向下兼容。