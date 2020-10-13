## BOM
> BOM => "Browser Object Model" 浏览器模型  
> 
> 主要内容包括浏览器相关的几大对象和方法   
-  window,navigator,screen,history,location,sessionStorage,localStorage  

## window对象
> - window对象指浏览器中打开的窗口  
### window对象属性 27  
- document,navigator,screen,history,location 对象的只读引用  
- name,length,frames,opener,parent,self,status,top,defaultStatus,closed  
- innerHeight,innerWidth,outerHeight,outerWidth   
- localStorage,sessionStorage   
- pageXOffset,pageYOffset,screenLeft,screenTop,screenX,screenY  
### window对象方法 25个
- setInterval,clearInterval,setTimeout,clearTimeout  
- alert,confirm,prompt  
- atob,btoa  
- resizeBy,resizeTo,moveBy,moveTo,scrollBy,scrollTo  
- open,print,stop,focus,closed  
- createPopup,getSelection,getComputedStyle,matchMedia   

## Navigator对象 
> 
### navigator属性  
- appCodeName,appName,appVersion,cookieEnabled,platform,userAgent 
### navigator方法
- javaEnabled(),taintEnabled()

## Screen对象
### screen属性 
- availHeight,availWidth,height,pixelDepth,width  


## History对象  
### history属性  
- length
### history方法
- back,forward,go  


## Location对象  
### location属性  
- hash,host,hostname,href,pathname,port,protocol,search
### location方法 
- assign,reload,replace  

## 存储对象
> sessionStorage 会话存储和 localStorage 本地存储两个对象实现对网页数据进行添加，删除，修改，查询操作   
> 
> - sessionStorage用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后会将数据删除  
> - localStorage用于保存整个网站的数据，保存的数据没有过期时间，直到手动删除  
### 对象属性 
- length,返回存储对象中包含多少条数据  
### 对象方法  
- key,getItem,setItem,remove,clear  
