## MutationObserver
- `MutationObserver`接口提供了监视对`DOM`树做更改的的能力。   
- 旧的`MutationEvents`的替代品，是`DOM3`规范的一部分   

### MutationObserver(callback)构造函数 
- 创建并返回一个新的`MutationObserver`，在指定的`DOM`发生变化时被调用   

### MutationObserver方法
- `observer()`
- `disconnect()`
- `takeRecords()`
```JavaScript
// 选择需要观察变动的节点
var targetNode = document.getElementById('some-id');

// 观察器的配置（需要观察什么变动）
var config = { attributes: true, childList: true, subtree: true };

// 当观察到变动时执行的回调函数
var callback = function(mutations) {
    for(var mutation of mutations) {
        if (mutation.type == 'childList') {
            console.log('A child node has been added or removed.');
        }
        else if (mutation.type == 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
};

// 创建一个观察器实例并传入回调函数
var observer = new MutationObserver(callback);

// 以上述配置开始观察目标节点
observer.observe(targetNode, config);

// 之后，可停止观察
observer.disconnect();

```