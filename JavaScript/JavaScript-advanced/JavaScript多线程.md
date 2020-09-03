- `Concurrent.Thread.js`在HTML5 `WebWork` 之前都是用 `setTimeout/setInterval`模拟多线程
```JavaScript
import ts from 'Concurrent.Thread.js';

```
- HTML5 `WebWork`
```JavaScript
let work = new Worker('demo.js');
work.postMessage(100);
work.onmessage = data => {
    //
}
```