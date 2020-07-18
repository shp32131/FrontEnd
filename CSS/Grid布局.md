#  CSS网格布局
## 概述 
> Grid网格布局是最强大的CSS布局方案(浏览器内置)    

Grid布局与Flex布局有一定的相似性，都可以指定容器内部多个项目的位置。但是两者存在重大区别。
Flex布局是轴线布局，只能指定容器内项目针对轴线的位置，可以看作是一维布局。
Grid布局则是将容器划分成行与列，产生单元格，然后指定item所在的单元格，可以看作是二维布局，比Flex布局强大。

## 相关概念

- 容器和项目  
父元素 container  子元素 item  

- 行和列 
row and  column 

- 单元格  

- 网格线  
水平网格线与垂直网格线

## 容器container属性  
> Grid布局的属性分为两类，一类定义在容器上面称为容器属性。另一类定义在项目上面称为项目属性。   

- display: grid; 指定container为Grid布局   
默认情况下，容器都是块线元素。但也可以定义为行内块级元素。display: inline-grid;   
设置容器为网格布局以后，容器的子元素(item)的float,display: inline-block,display: table-cell,vertical-align,column-*等属性会失效。

- grid-template-rows行高,grid-template-columns列宽  
```CSS
.container{
    display: grid;
    grid-template-rows: 100px,100px,100px;
    grid-template-columns: 100px,100px,100px;
}
```