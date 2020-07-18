## 动画
@keyframes	                规定动画
animation	                所有动画属性的简写属性，除了 animation-play-state 属性
animation-name	            规定 @keyframes 动画的名称
animation-duration	        规定动画完成一个周期所花费的秒或毫秒
animation-timing-function	规定动画的速度曲线
animation-delay	            规定动画何时开始
animation-iteration-count	规定动画被播放的次数
animation-direction	        规定动画是否在下一周期逆向地播放
animation-play-state	    规定动画是否正在运行或暂停
animation-fill-mode	        规定对象动画时间之外的状态

## 过渡属性 transition
transition	                简写属性，用于在一个属性中设置四个过渡属性
transition-property	        规定应用过渡的 CSS 属性的名称
transition-duration	        定义过渡效果花费的时间
transition-timing-function	规定过渡效果的时间曲线
transition-delay	        规定过渡效果何时开始

## 2D/3D转换
transform	                向元素应用 2D 或 3D 转换
transform-origin	        允许你改变被转换元素的位置
transform-style	            规定被嵌套元素如何在 3D 空间中显示
perspective	                规定 3D 元素的透视效果
perspective-origin	        规定 3D 元素的底部位置
backface-visibility	        定义元素在不面对屏幕时是否可见

## 文本
- color	                设置文本的颜色
- direction	            规定文本的方向 
- letter-spacing	    设置字符间距
- word-spacing	        设置单词间距
- line-height	        设置行高
- text-align	        规定文本的水平对齐方式
- text-decoration	    规定添加到文本的装饰效果
- text-indent	        规定文本块首行的缩进
- text-overflow	        规定当文本溢出包含元素时发生的事情
- text-shadow	        规定添加到文本的阴影效果
- text-transform	    控制文本的大小写
- unicode-bidi	        设置文本方向
- white-space	        规定如何处理元素中的空白
- hanging-punctuation	规定标点字符是否位于线框之外
- punctuation-trim	    规定是否对标点字符进行修剪
- text-align-last	    设置如何对齐最后一行或紧挨着强制换行符之前的行
- text-emphasis	        向元素的文本应用重点标记以及重点标记的前景色
- text-justify	        规定当 text-align 设置为 "justify" 时所使用的对齐方法
- text-outline	        规定文本的轮廓
- text-shadow	        向文本添加阴影
- text-wrap	            规定文本的换行规则
- word-break	        规定非中日韩文本的换行规则
- word-wrap	            允许对长的不可分割的单词进行分割并换行到下一行

## 字体
- font	                在一个声明中设置所有字体属性
- font-size	            规定文本的字体尺寸
- font-weight	            规定字体的粗细
- font-style	            规定文本的字体样式
- font-family	            规定文本的字体系列
- font-size-adjust	    为元素规定 aspect 值
- font-stretch	        收缩或拉伸当前的字体系列
- font-variant	        规定是否以小型大写字母的字体显示文本

## 背景
background	            在一个声明中设置所有的背景属性。	1
background-attachment	设置背景图像是否固定或者随着页面的其余部分滚动。	1
background-color	    设置元素的背景颜色。	1
background-image	    设置元素的背景图像。	1
background-position	    设置背景图像的开始位置。	1
background-repeat	    设置是否及如何重复背景图像。	1
background-clip	        规定背景的绘制区域。	3
background-origin	    规定背景图片的定位区域。	3
background-size	        规定背景图片的尺寸。

## 定位
bottom	                设置定位元素下外边距边界与其包含块下边界之间的偏移。	2
clear	                规定元素的哪一侧不允许其他浮动元素。	1
clip	                剪裁绝对定位元素。	2
cursor	                规定要显示的光标的类型（形状）。	2
display	                规定元素应该生成的框的类型。	1
float	                规定框是否应该浮动。	1
left	                设置定位元素左外边距边界与其包含块左边界之间的偏移。	2
overflow	            规定当内容溢出元素框时发生的事情。	2
position	            规定元素的定位类型。	2
right	                设置定位元素右外边距边界与其包含块右边界之间的偏移。	2
top	                    设置定位元素的上外边距边界与其包含块上边界之间的偏移。	2
vertical-align	        设置元素的垂直对齐方式。	1
visibility	            规定元素是否可见。	2
z-index	                设置元素的堆叠顺序。

## 列表
list-style	            在一个声明中设置所有的列表属性。	1
list-style-image	    将图象设置为列表项标记。	1
list-style-position	    设置列表项标记的放置位置。	1
list-style-type	        设置列表项标记的类型。	1
marker-offset	 


## 超链接
target	简写属性，设置target-name、target-new以及target-position属性。	3
target-name	规定在何处打开链接（链接的目标）。	3
target-new	规定目标链接在新窗口还是在已有窗口的新标签页中打开。	3
target-position	规定在何处放置新的目标链接。

## 边框 border
border	在一个声明中设置所有的边框属性。	1
border-bottom	在一个声明中设置所有的下边框属性。	1
border-bottom-color	设置下边框的颜色。	2
border-bottom-style	设置下边框的样式。	2
border-bottom-width	设置下边框的宽度。	1
border-color	设置四条边框的颜色。	1
border-left	在一个声明中设置所有的左边框属性。	1
border-left-color	设置左边框的颜色。	2
border-left-style	设置左边框的样式。	2
border-left-width	设置左边框的宽度。	1
border-right	在一个声明中设置所有的右边框属性。	1
border-right-color	设置右边框的颜色。	2
border-right-style	设置右边框的样式。	2
border-right-width	设置右边框的宽度。	1
border-style	设置四条边框的样式。	1
border-top	在一个声明中设置所有的上边框属性。	1
border-top-color	设置上边框的颜色。	2
border-top-style	设置上边框的样式。	2
border-top-width	设置上边框的宽度。	1
border-width	设置四条边框的宽度。	1
outline	在一个声明中设置所有的轮廓属性。	2
outline-color	设置轮廓的颜色。	2
outline-style	设置轮廓的样式。	2
outline-width	设置轮廓的宽度。	2
border-bottom-left-radius	定义边框左下角的形状。	3
border-bottom-right-radius	定义边框右下角的形状。	3
border-image	简写属性，设置所有 border-image-* 属性。	3
border-image-outset	规定边框图像区域超出边框的量。	3
border-image-repeat	图像边框是否应平铺(repeated)、铺满(rounded)或拉伸(stretched)。	3
border-image-slice	规定图像边框的向内偏移。	3
border-image-source	规定用作边框的图片。	3
border-image-width	规定图片边框的宽度。	3
border-radius	简写属性，设置所有四个 border-*-radius 属性。	3
border-top-left-radius	定义边框左上角的形状。	3
border-top-right-radius	定义边框右下角的形状。	3
box-decoration-break		3
box-shadow	向方框添加一个或多个阴影。	3

## 盒 margin
margin	在一个声明中设置所有外边距属性。	1
margin-bottom	设置元素的下外边距。	1
margin-left	设置元素的左外边距。	1
margin-right	设置元素的右外边距。	1
margin-top	设置元素的上外边距。

## 盒 padding
padding	在一个声明中设置所有内边距属性。	1
padding-bottom	设置元素的下内边距。	1
padding-left	设置元素的左内边距。	1
padding-right	设置元素的右内边距。	1
padding-top	设置元素的上内边距。

## 表格属性 table
border-collapse	规定是否合并表格边框。	2
border-spacing	规定相邻单元格边框之间的距离。	2
caption-side	规定表格标题的位置。	2
empty-cells	规定是否显示表格中的空单元格上的边框和背景。	2
table-layout	设置用于表格的布局算法。


## 颜色
## 内容分页媒体
## 可伸缩框
## 生成内容
## 网格
## 外边距
## Marquee
## 多列
## 内边距
## 分页媒体
## 定位
## 打印
## 过渡
## 用户界面