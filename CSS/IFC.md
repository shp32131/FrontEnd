
- 内联格式上下文 IFC的line box（线框）高度由其包含行内元素中最高的实际高度计算而来
- 不受到竖直方向的padding/margin影响,IFC中的line box一般左右都贴紧整个IFC，但是会因为float元素而扰乱,
  float元素会位于IFC与与line box之间，使得line box宽度缩短。 
- 同一个IFC下的多个line box高度会不同,IFC中不可能有块级元素的，当插入块级元素时（如p中插入div）会产生两个匿名块与div分隔开， 
  即产生两个IFC，每个IFC对外表现为块级元素，与div垂直排列。  
- 水平居中：当一个块要在环境中水平居中时，设置其为inline-block则会在外层产生IFC，通过text-align则可以使其水平居中。
- 垂直居中：创建一个IFC，用其中一个元素撑开父元素的高度，然后设置其vertical-align:middle，其他行内元素则可以在此父元素下垂直居中。