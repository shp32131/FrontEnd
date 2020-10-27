# flex 布局
- `flex`布局是一种更灵活的盒子布局方式,由一个父容器元素和它的子项目元素组成
- 优点:更容易实现水平等间距，垂直居中布局
- 父容器声明为`flex`布局`display: flex`时，子元素的`float,clear,vertical-align`这些属性都会失效

## 父容器
- 在父容器添加 `display： flex`属性

- `flex-direction` 主轴方向,默认为`row`行主轴方向排列子项目
  + 可选属性值：`row row-reverse column column-reverse`

-	`flex-wrap` 如何换行,默认为`nowrap`子项目不换行
  + 可选属性值：`nowrap wrap wrap-reverse`

-	`flex-flow`是`flex-direction`和`flex-wrap`的合并简写

- `justify-content`子项目在主轴上的放置方式,默认为`flex-start` 子项目主轴上(水平方向)向左看齐
  + `flex-start` 
	+ `flex-end` 子项目在主轴水平方向以尾部开始放置
	+ `center` 子项目在主轴水平方向上居中
	+ `space-between` 子项目分居在主轴水平方向的首尾端
	+ `space-around` 子项目在主轴水平方向上等间隔放置

-	`align-items` 项目在交叉轴上的对齐方式,默认为`flex-start` 子项目交叉轴(垂直方向)以顶部对齐
  + `flex-start` 子项目在交叉轴(垂直方向)以顶部对齐
	+ `flex-end`   子项目在交叉轴方向以底部对齐
	+ `center`     子项目在交叉轴方向居中，垂直居中
  + `baseline`   垂直方向以第一个子项目的文字底部对齐
  + `stretch`    默认值，如果项目没有设置高度或为auto，将占满整个容器高度

- `align-content` 多根轴线的对齐方式(子项目换行后)
  + `flex-start`
	+ `flex-end`
	+ `center`
	+ `space-between` 两端对齐，子项目间等间隔
	+ `space-around` 每个子项目两侧的间隔相等
	+ `stretch` 默认值，轴线占满整个交叉轴

--------------------------------------------------------
### flex子项目上的属性
- 以下6个属性设置在flex项目上

- `order`项目的排列顺序，默认值为0，数值越小排列越靠前
		
-	`flex-grow`项目放大比例,默认值为0,即如果存在剩余空间，也不放大
  + 1，如果所有项目都为1则会等分剩余空间，有一个为2则为两倍空间

-	`flex-shrink` 项目缩小比例 默认为1，即空间不足时，该项目缩小

- `flex-basis` 默认值 auto 即项目本来大小

-	`flex` flex-grow  flex-shrink  flex-basis 的合并简写

-	`align-self` 单个项目的对齐方式，默认值为`auto`，即继承父容器的`align-items`属性值，其他值和align-items一样 可与align-items不一样