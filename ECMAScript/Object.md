## Object
- Object构造函数为给定值创建一个对象包装器，如果给定值是null或undefined，将会创建并返回一个空对象  
- 当以非构造函数形式(new Object())形式调用时，Object相当于new Object()     
### Object属性   
- Object.length    
  + 值为1      
- Object.prototype    
  + 可以为所有Object类型的对象添加属性     
### Object构造函数的方法    
> `Object.create(proto[,propertiesObject])`    
- `proto` 新创建对象的原型对象 
- `propertiesObject` 可选,对象属性和对象属性描述符的对象 
- 返回一个新对象,带着指定的原型对象和属性 

> **`Object.assign(target,...sources)`**
- `target` 目标对象    
- `sources` 源对象,这些源对象都会合并到`target`对象中 
- 返回`target`对象,如果`...sources`中有相同的键,后面源对象将覆盖前面的相同键的值    

> `Object.defineProperty(obj,props,descriptor)`   
- `obj` 要定义属性的对象 
- `prop` 要定义或修改的属性的名称或`Symbol` 
- `descriptor` 要定义或修改的属性描述符 
  + 1.数据描述符 `configurable,enumerable,value,writable`
  + 2.存储描述符 `configurable,enumerable,set,get`
  + `value,writable`和`set,get`不能同时存在一个描述符中 

> `Object.defineProperties(obj,props)`   
- `obj` 要定义或修改属性的对象 
- `props` 对象的属性和属性描述符的对象 
  + `configurable` 该属性的属性描述符是否可以改变且该属性是否可以从`obj`中删除,默认为`false`  
  + `enumerable` 属性是否可枚举,默认为`false` 
  + `writeable` 默认为`false` 
  + `value` 与属性关联的值,默认为`undefined`
  + `get` 属性的`getter`函数,默认为`undefined` 
  + `set` 属性的`setter`函数,默认为`undefined` 
```JavaScript
let obj = {};
Object.defineProperties(obj, {
  'property1': {
    value: true,
    writable: true
  },
  'property2': {
    value: 'Hello',
    writable: false
  }
  // etc. etc.
});
```

> `Object.keys()`     

> `Object.values()`   

> `Object.entries()`    

> `Object.getOwnPropertyDescriptor()`    

> `Object.getOwnPropertyDescriptors()`    

> `Object.getOwnPropertyNames()`   

> `Object.getOwnPropertySymbols()`   

> `Object.is()`   

> `Object.preventExtensions()`    

> `Object.isExtensible()`   

> `Object.freeze()`   

> `Object.isFrozen()`   

> `Object.seal()`   

> `Object.isSealed()`   

> `Object.setPrototypeOF()`    

> `Object.getPrototypeOf()`    

> `Object.prototype.hasOwnProperty()`   

> `Object.prototype.isPrototypeOf()`     

> `Object.prototype.propertyIsEnumerable()`   

> `Object.prototype.toLocalString()`   

> `Object.prototype.toSource()`   

> `Object.prototype.toString()`    

> `Object.prototype.valueOf()`    

> `Object.prototype.__defineGetter__()` 非标准   

> `Object.prototype.__defineSetter__()`    非标准   

> `Object.prototype.__lookupGetter__()`     非标准   

> `Object.prototype.__lookupSetter__()`     非标准   

