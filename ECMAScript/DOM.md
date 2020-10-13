# DOM 
## DOM简介 
> DOM是W3C定义访问HTML和XML文档的一个标准 
- DOM是document object model的缩写 
- 每个载入浏览器的HTML文档都会成为Document对象 
- Document对象可以从脚本中对HTML页面中的所有元素进行访问 
- Document对象是Window对象的一部分，可通过window.document属性进行访问 
## document对象  
> document.getElementById()
> document.getElementByTagName()
> document.getElementByClassName()
> document.querySelector()
> document.querySelectorAll() <sup>html5</sup>

## 元素对象  

## 属性对象  

## 事件对象   

## Console 对象   
> console 对象提供了访问浏览器调试模式的信息到控制台   
>
> - console.log(),console.info(),console.table(),console.warn()  
> - console.trace(),console.error(),console.assert(),console.count()  
> - console.time(),console.timeEnd(),console.group(),console.groupEnd()  
> - console.clear()
## CSSStyleDeclaration 对象  

## HTMLCollection 对象  
- getElementByTagName(),返回的是一个HTMLCollection对象  
- HTMLCollection对象有length属性   
- 不是数组！

## NodeList  
> NodeList对象是一个从document中获取的节点列表(集合),类似HTMLCollection(NodeList算是它的替代品),但有区别  
- 所有浏览器childNodes属性返回的都是NodeList对象   
- 大部分浏览器querySelectAll()返回的是NodeList对象   

> NodeList特点    
- NodeList对象有length属性，节点列表中元素的数量   
- NodeList中的属性节点只能通过索引来获取   
- 项目中都是用迭代遍历来获取每一个元素的  
- NodeList不是数组，不能使用数组的方法：valueOf(),pop(),push(),join()...