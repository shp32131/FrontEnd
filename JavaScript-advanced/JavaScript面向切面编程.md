> 面向切面编程 AOP aspect oriented programming 主要是实现的目的是针对业务处理过程中的切面进行提取，所面对的是处理过程中的某个步骤或阶段，以获得逻辑过程中各部分之间低耦合性的隔离效果
```JavaScript

function test(a="10"){
    alert(2);
}
Function.prototype.before = function(fn){
    let self = this;
    fn();
    // 在执行test之前 还是不能直接拿到 test 的参数  a = undefined
    self.apply(this,arguments);
}
Function.prototype.after = fn => {
    //code
}
test.before(function(){
    alert(1);
});

```