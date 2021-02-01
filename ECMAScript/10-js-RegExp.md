## RegExp  
- 正则表达式用于匹配字符串中字符组合的模式 
- JS中正则表达式也是对象 
  + 正则表达式是在宿主环境下运行的，如`js/php/node.js` 
  + 与普通函数操作字符串相比较，正则表达式可以写出更简洁，功能强大的代码 
```JavaScript
let str = 'hello world21999349today is beautiful';

// 使用普通字符操作
let nums = [...str].filter(item => !Number.isNaN(parseInt(item)));
console.log(nums.join(''));//'21999349'

// 使用正则
console.log(str.match(/\d/g/).join(''));
```
### 创建正则 
- 创建正则的两种方式:
  + 1.`//` 字面量形式,里面不能直接使用变量 `/e/.test("hello")` 
  + 2.`RegExp()` 对象形式,里面可以有变量 `new RegExp(/e/)` 
```HTML
// 根据用户输入，高亮显示内容，并支持用户输入使用正则 
<body>
  <div id="content">JavaScript</div>
</body>
<script>
let content = prompt('输入内容');
const reg = new RegExp(content,'g');

let body = document.querySelector('#content').innerHTML.replace(reg,str => {
  return `<span>${str}</span>`;
});

document.body.innerHTML = body;
</script>
```
- 选择符 `|`,两侧有一个匹配到就可以了 
- 字符转义 `\`,特殊字符一定要用转义符 
- 字符边界 
  + `^` 匹配字符串的开始 `/^www/.test('www.baidu.com')`
  + `$` 匹配字符串的结束 `/\.com$/.test('www.baidu.com')`

### 模式修饰 
+ `i` 不区分大小写 
+ `g` 全局搜索所有内容 
+ `s` 视为单行,忽略换行符，配合`.`元子字符可以匹配所有字符 
+ `m` 视为多行 
+ `y` 从`regexp.lastIndex`开始匹配 
+ `u` 正确处理四个字符的`UTF-16`编码 
+ `lastIndex` `RegExp`对象`lastIndex`属性可以返回或者设置正则表达式开始匹配的位置 
  - 必须结合 `g`修饰符使用 
  - 对`exec`方法有用 
  - 匹配完成时，`lastIndex`会被重置为 0

### 元子字符 
+ 元字符是正则表达式中最小元素，只代表 单一的一个字符 
+ `[\d\D]+`或`[\s\S]+` 可以匹配任意字符 
+ `\d`  匹配任意一个数字 相当于 `[0-9]` 
+ `\D`  匹配除了数字以外的任意一个字符 相当于 `[^0-9]` 
+ `\w`  匹配任意一个英文字母,或数字，或下划线 相当于 `[a-zA-Z]` 
+ `\W`  匹配除了英文字母,数字，下划线的任意一个字符 相当于 `[^a-zA-Z]` 
+ `\s`  匹配任意一个空白,正则中空格按普通字符对待，如 `\t,\n` 相当于 `[\n\f\r\t\v]`
+ `\S`  匹配除了空白任意一个字符, 相当于 `[^\n\f\r\t\v]`
+ `.`   匹配除换行符以外的任意一个字符 
```JavaScript
let url = `
https://www.baidu.com
www.bilibili.com
`;
console.log(url.match(/.+/)[0]);//www.bilibili.com前换行符，/后面不加's'匹配不到,
```
 
### 原子表 
+ 在一组字符中匹配某个元字符，在正则表达式中通过元字符表来完成，就是放`[]`中 
  - `[]` 只匹配其中的一个原子 
  - `[]` 中`.`代表一个小数点，里面不用加转义符 
  - `[^]` 只匹配除了其中字符的任意一个原子 
  - `[0-9]`匹配0-9任何一个数字
  - `[a-z]`匹配小写a-z任何一个字母 
  - `[A-Z]`匹配小写A-Z任何一个字母 
```JavaScript
console.log(/ad/.test('www.baidu.com'));//false
console.log(/[ad]/.test('www.baidu.com'));//true,ad不会当成一个整体处理 

// 匹配一个日期 
let date = "2020-07-17";
console.log(data.match(/\d{4}[-/]\d{2}\1\d{2}/));// \1 表示匹配到的第一个原子表 [-\] 

// []里面顺序必须为升序
console.log(/[c-a]/.test("bilibili"));

//获取所有用户名
let users = `john:1322434,mark:1582553453`;
let results = users.match(/[^:\d,]+/g)

```
### 原子组 
+ 元字符用`()`包裹 
+ 如果一次要匹配多个元子，可以通过元子组来完成 
+ 原子组与原子表的区别：
  - 原子表是匹配其中任意一个原子 
  - 原子组是匹配一组原子
+ 没有加`g`模式修饰符时只匹配到第一个，匹配到的信息包含以下 
  - 0 匹配到的完整内容 
  - 1,2,... 匹配到的原子组 
  - index 原字符串中的位置 
  - input 原字符串 
  - groups 命名分组 
+ 在`match`中使用原子组匹配，会将每个组数据返回到结果中
  - 0 匹配到的完整内容 
  - 1/2... 为原子级内容 
  - index 匹配的开始位置 
  - input 原始数据 
  - groups 组别名  
```JavaScript

let hd = "houdunren.com";
console.log(hd.match(/houdun(ren)\.(com)/)); 
//["houdunren.com", "ren", "com", index: 0, input: "houdunren.com", groups: undefined]

```
+ 邮箱匹配 `reg = /^[\w-]+@([\w-]+\.)+(org|com|cc|cn)$/` 
+ 引用分组 
  - \number 在匹配时引用原子组，$number 指在替换时使用匹配的组数据 
```JavaScript
// 将h 标签替换为p 标签

let str = `
  <h1>regexp</h1>
  <span>正则表达式</span>
  <h2>learn</h2>
`;
let reg = /<(h[1-6])>([\s\S]*)<\/\1>/gi;
console.log(str.replace(reg,`<p>$2</p>`));

```
  - 分组别名:使用`?<>`形式定义，下面将标签替换为`p`标签   
```JavaScript
let hd = `
  <h1>houdunren</h1>
  <span>后盾人</span>
  <h2>hdcms</h2>
`;
let reg = /<(?<tag>h[1-6])>(?<con>[\s\S]*)<\/\1>/gi;
console.log(hd.replace(reg, `<p>$<con></p>`));

```
### 重复匹配 
- 如果要重复匹配一些内容时，我们要使用重复匹配修饰符 
  + `*` 重复匹配0次或更多次 
  + `+` 重复匹配1次或更多次 
  + `?` 重复匹配0次或1次  
  + `{n}` 重复n次 
  + `{n,}` 重复n次或更多次 
  + `{n,m}` 重复n到m次 
- 正则最小单位是元字符，正常使用中很少只匹配一个元字符的，基本上每条正则都要用到重复匹配修饰符  
```JavaScript
//验证座机号
let tel = '0734-4812268';
console.log(/0\d{3}-\d{7}/.exec(tel));
```
- 禁止贪婪 
  + 正则表达式在进行复生匹配时，默认是贪婪匹配模式，会尽量匹配更多内容 
  + 有时候不希望匹配更多内容，这时可以用`?`进行修饰来禁止贪婪匹配模式 
    - `*?` 重复匹配0次或更多次,但尽量少重复
    - `+?` 重复匹配1次或更多次,但尽量少重复 
    - `??` 重复匹配0次或1次,但尽量少重复  
    - `{n}?` 重复n次,但尽量少重复 
    - `{n,}?` 重复n次或更多次,但尽量少重复 
    - `{n,m}?` 重复n到m次,但尽量少重复
```JavaScript
let str = 'aaa';
console.log(str.match(/a+/));//aaa
console.log(str.match(/a+?/));//a
console.log(str.match(/a{2,}?/));//aa
console.log(str.match(/a{2,3}?/));//aa
```
### 全局匹配

-------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------
### 字符方法
> `String` 对象中可以使用正则表达式的方法 
- `str.search()`
  + 检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串 
  + 返回找到的子字符串的起始位置，如果没找到任何匹配的子串，就返回 -1 
```JavaScript
let str = 'you are so beautiful';
console.log(str.search(/au/i)); // 13
```

- `str.match(searchValue|regexp)`
  + 在字符串内检索指定的值，或找到一个或多个正则表达式的匹配 
  + 类似于`indexOf(),lastIndexOf()`，不过返回的是值，不是字符串的位置 
  + 返回匹配结果的数组,没有则为null,这个数组的内容依赖于`regexp`中是否有全局标志`g`  
    - 1.没有`g`，返回一个详细信息数组,第0个元素存放的是匹配文本，其余元素存放与正则匹配的内容,还有两个元素index和input  
    - 2.有`g`,全局检索后返回数组,存放的是所有匹配的子串,没有其他详细信息  
```JavaScript
let str = '1 plus 22 equals 3';
console.log(str.match(/\d/g));//[1,2,2,3]
console.log(str.match(/\d+/g));//[1,22,3]
```
- `str.matchAll(regexp)`
  + 返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器 
  + 如果所传参数不是一个正则表达式对象，则为隐式的`new RegExp(obj)`转为`RegExp` 
  + `regexp`必须是设置了全局模式`g`的形式,否则会抛出异常`TypeError` 
  + 可以更好的代替使用`regexp.exec()`情况  
```JavaScript
// 没有matchAll()之前 
const regexp = RegExp('foo[a-z]*','g');
const str = 'table football, foosball';

let match;
while ((match = regexp.exec(str)) !== null) {
  console.log(`Found ${match[0]} start=${match.index} end=${regexp.lastIndex}.`);
  // expected output: "Found football start=6 end=14."
  // expected output: "Found foosball start=16 end=24."
}

//=========================================================

// 使用matchAll()
const matches = str.matchAll(regexp);
for (const match of matches) {
  console.log(`Found ${match[0]} start=${match.index} end=${match.index + match[0].length}.`);
}
// expected output: "Found football start=6 end=14."
// expected output: "Found foosball start=16 end=24."

// matches iterator is exhausted after the for..of iteration
// Call matchAll again to create a new iterator
Array.from(str.matchAll(regexp), m => m[0]);
// Array [ "football", "foosball" ]
```
- `str.split()`
  + 使用字符串或正则表达式分割字符串 
```JavaScript
// 分割一个日期
let str = '2020-07-18';
console.log(str.split(/[-/]/));
```
- `str.replace(regexp|substr,newSubstr|function)` 
  + 不改变原字符串，返回一个部分或全部匹配由替代模式所取代的新的字符串  
  + `regexp(pattern)`对象或者其字面量，该正则所匹配的内容会被第二个参数的返回值替换掉 
  + `substr(pattern)`一个将被`newSubStr`替换的字符串，其被视为一整个字符串，而不是正则表达式,仅第一个匹配项会被替换 
  + `newSubStr`用于替换掉第一个参数在字符串中的匹配部分的字符串，该字符串可以内插一些特殊的变量名 
    - `$$` 插入一个$
    - `%&`插入匹配的子串 
    - `$\`` 插入当前匹配的子串左边的内容 
    - `$'` 插入当前匹配的子串右边的内容 
    - `$n`假如第一个参数是`RegExp`对象，插入第n个括号匹配的字符串，索引从1开始计数 
  + `function(match,p1...,offset,string,NamedCaptureGroup)`一个用来创建新子字符串的函数，该函数的返回值将替换掉第一个参数匹配到的结果 

```JavaScript
  function replacer(match, p1, p2, p3, offset, string) {
    // p1 is nondigits, p2 digits, and p3 non-alphanumerics
    return [p1, p2, p3].join(' - ');
  }
  let newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
  console.log(newString);  // abc - 12345 - #$*%

  // 交换字符串中的两个单词 
  let re = /(\w+)\s(\w+)/;
  let str = "John Smith";
  let newstr = str.replace(re, "$2, $1");

  console.log(newstr);// Smith, John
```
### 正则方法
> 正则对象`RegExp`有两个操作正则的方法 
- `regexp.test(str)`
```HTML
//检测邮箱是否合法 
<body>
  <input type="text" name="email" />
</body>

<script>
  let email = document.querySelector(`[name="email"]`);
  email.addEventListener("keyup", e => {
    console.log(/^\w+@\w+\.\w+$/.test(e.target.value));
  });
</script>

```
- `regexp.exec(str)` 
  + 不使用`g`修饰时和`match`方法相似，使用`g`修饰符后可以循环调用直到全部匹配完 
   - 使用`g`修饰符多次操作时使用同一个正则，即把正则定义为变量使用 
   - 使用`g`修饰符，匹配不到时返回`null`  
```JavaScript
<body>
  <div class="content">
    后盾人不断分享视频教程，后盾人网址是 houdunren.com
  </div>
</body>

<script>
  let content = document.querySelector(".content");
  let reg = /(?<tag>后盾)人/g;
  let num = 0;
  while ((result = reg.exec(content.innerHTML))) {
    num++;
  }
  console.log(`后盾人共出现${num}次`);
</script>

```

### 断言匹配
- 可以将断言理解为正则中的条件 
- `(?=exp)`断言写在括号中，但断言不是原子组，不会在匹配结果中保存 
#### (?=exp) 零宽先行断言 
- `(?=exp)`匹配后面为exp的内容 
```HTML
<script>
// 将价格后面添加上 .00
  let lessons = `
    js,200元,300次
    php,300.00元,100次
    node.js,180元,260次
  `;
  let reg = /(\d+)(.00)?(?=元)/gi;
  lessons = lessons.replace(reg, (v, ...args) => {
    args[1] = args[1] || ".00";
    return args.splice(0, 2).join("");
  });
  console.log(lessons);
</script>

```
#### (?<=exp) 零宽后行断言 
- `(?<=exp)` 匹配前面为exp的内容 
```JavaScript
// 匹配前后都是数字的内容
let hd = "houdunren789hdcms666";
let reg = /(?<=\d)[a-z]+(?=\d{3})/i;
console.log(hd.match(reg));

// 所有超链接替换为 www.baidu.com
<body>
  <a href="https://baidu.com">百度</a>
  <a href="https://yahoo.com">雅虎</a>
</body>
<script>
  const body = document.body;
  let reg = /(?<=<a.*href=(['"])).+?(?=\1)/gi;
  // console.log(body.innerHTML.match(reg));
  body.innerHTML = body.innerHTML.replace(reg, "https://www.baidu.com");
</script>

// 电话号后面四位模糊处理 
let users = `
  向军电话: 12345678901
  后盾人电话: 98745675603
`;

let reg = /(?<=\d{7})\d+\s*/g;
users = users.replace(reg, str => {
  return "*".repeat(4);
});
console.log(users); //向军电话: 1234567****后盾人电话: 9874567****

```
#### (?!exp) 零宽负向先行断言 
- 后面不能出现exp指定的内容 
```JavaScript
// 字母后面不能为两位数字 
let hd = "houdunren12";
let reg = /[a-z]+(?!\d{2})$/i;
console.table(reg.exec(hd));

// 用户名中不能出现 向军
<body>
  <main>
    <input type="text" name="username" />
  </main>
</body>
<script>
  const input = document.querySelector(`[name="username"]`);
  input.addEventListener("keyup", function() {
    const reg = /^(?!.*向军.*)[a-z]{5,6}$/i;
    console.log(this.value.match(reg));
  });
</script>

```
#### (?<!exp) 零宽负向后行断言 
- 前面不能出现exp指定的内容 
```JavaScript
// 获取前面不是数字的字符 
let hd = "hdcms99houdunren";
let reg = /(?<!\d+)[a-z]+/i;
console.log(reg.exec(hd)); //hdcms

// 把所有不是以 https://oss.houdunren.com 开始的静态资源替换为新网址
<body>
  <main>
    <a href="https://www.houdunren.com/1.jpg">1.jpg</a>
    <a href="https://oss.houdunren.com/2.jpg">2.jpg</a>
    <a href="https://cdn.houdunren.com/2.jpg">3.jpg</a>
    <a href="https://houdunren.com/2.jpg">3.jpg</a>
  </main>
</body>
<script>
  const main = document.querySelector("main");
  const reg = /https:\/\/(\w+)?(?<!oss)\..+?(?=\/)/gi;
  main.innerHTML = main.innerHTML.replace(reg, v => {
    console.log(v);
    return "https://oss.houdunren.com";
  });
</script>

```