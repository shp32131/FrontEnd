演进史
首先我们来说一下前端 icon 的发展史。

远古时代 在我刚开始实习时，大部分图标都是用 img 来实现的。渐渐发现一个页面的请求资源中图片 img 占了大部分，所以为了优化有了image sprite 就是所谓的雪碧图，就是将多个图片合成一个图片，然后利用 css 的 background-position 定位显示不同的 icon 图标。但这个也有一个很大的痛点，维护困难。每新增一个图标，都需要改动原始图片，还可能不小心出错影响到前面定位好的图片，而且一修改雪碧图，图片缓存就失效了，久而久之你不知道该怎么维护了。


font 库 后来渐渐地一个项目里几乎不会使用任何本地的图片了，而使用一些 font 库来实现页面图标。常见的如 Font Awesome ，使用起来也非常的方便，但它有一个致命的缺点就是找起来真的很不方便，每次找一个图标特别的费眼睛，还有就是它的定制性也非常的不友善，它的图标库一共有675个图标，说少也不少，但还是会常常出现找不到你所需要图标的情况。当然对于没有啥特别 ui 追求的初创公司来说还是能忍一忍的。但随着公司的壮大，来了越来越多对前端指手画脚的人，丧心病狂的设计师，他们会说不！这icon这么丑，这简直是在侮辱他们高级设计师的称号啊！不过好在这时候有了iconfont 。

iconfont 一个阿里爸爸做的开源图库，人家还有专门的 github issue(虽然我的一个 issue 半年多了也没回应/(ㄒoㄒ)/~~)，但人家的图标数量还是很惊人的，不仅有几百个公司的开源图标库，还有各式各样的小图标，还支持自定义创建图标库，所以不管你是一家创业公司还是对设计很有要求的公司，它都能很好的帮助你解决管理图标的痛点。你想要的基本都有~


iconfont 三种使用姿势
unicode
最开始我们使用了unicode的格式，它主要的特点是 优势

兼容性最好，支持ie6+
支持按字体的方式去动态调整图标大小，颜色等等
劣势

不支持多色图标
在不同的设备浏览器字体的渲染会略有差别，在不同的浏览器或系统中对文字的渲染不同，其显示的位置和大小可能会受到font-size、line-height、word-spacing等CSS属性的影响，而且这种影响调整起来较为困难
使用方法： 第一步：引入自定义字体 `font-face

 @font-face {
   font-family: "iconfont";
   src: url('iconfont.eot'); /* IE9*/
   src: url('iconfont.eot#iefix') format('embedded-opentype'), /* IE6-IE8 */
   url('iconfont.woff') format('woff'), /* chrome, firefox */
   url('iconfont.ttf') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
   url('iconfont.svg#iconfont') format('svg'); /* iOS 4.1- */
 }
复制代码
第二步：定义使用iconfont的样式

.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
复制代码
第三步：挑选相应图标并获取字体编码，应用于页面

<i class="iconfont">&#xe604;</i>
复制代码
效果图：


其实它的原理也很简单，就是通过 @font-face 引入自定义字体(其实就是一个字体库)，它里面规定了&#xe604 这个对应的形状就长这企鹅样。其实类似于 '花裤衩'，在不同字体设定下长得是不同的一样。


不过它的缺点也显而易见，unicode的书写不直观，语意不明确。光看&#xe604;这个unicode你完全不知道它代表的是什么意思。这时候就有了 font-class。

font-class
与unicode使用方式相比，具有如下特点：

兼容性良好，支持ie8+
相比于unicode语意明确，书写更直观。可以很容易分辨这个icon是什么。
使用方法： 第一步：拷贝项目下面生成的fontclass代码：

../font_8d5l8fzk5b87iudi.css
复制代码
第二步：挑选相应图标并获取类名，应用于页面：

<i class="iconfont icon-xxx"></i>
复制代码
效果图：

image.png
它的主要原理其实是和 unicode 一样的，它只是多做了一步，将原先&#xe604这种写法换成了.icon-QQ，它在每个 class 的 before 属性中写了unicode,省去了人为写的麻烦。如 .icon-QQ:before { content: "\e604"; }

相对于unicode 它的修改更加的方便与直观。但也有一个大坑，之前楼主一个项目中用到了两组font-class 由于没有做好命名空间，所有的class都是放在.iconfont 命名空间下的，一上线引发了各种雪崩问题，修改了半天，所以使用font-class一定要注意命名空间的问题。

symbol
随着万恶的某某浏览器逐渐淡出历史舞台，svg-icon 使用形式慢慢成为主流和推荐的方法。相关文章可以参考张鑫旭大大的文章未来必热：SVG Sprite技术介绍

支持多色图标了，不再受单色限制。
支持像字体那样通过font-size,color来调整样式。
支持 ie9+
可利用CSS实现动画。
减少HTTP请求。
矢量，缩放不失真
可以很精细的控制SVG图标的每一部分
使用方法： 第一步：拷贝项目下面生成的symbol代码：

引入  ./iconfont.js
复制代码
第二步：加入通用css代码（引入一次就行）：

<style type="text/css">
    .icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }
</style>
复制代码
第三步：挑选相应图标并获取类名，应用于页面：

<svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-xxx"></use>
</svg>
复制代码
使用svg-icon的好处是我再也不用发送woff|eot|ttf| 这些很多个字体库请求了，我所有的svg都可以内联在html内。


还有一个就是 svg 是一个真正的矢量，不管你再怎么的放缩它都不会失真模糊，而且svg可以控制的属性也更加的丰富，也能做出更加生动和复杂的图标。现在ui设计师平时都喜欢使用 sketch 来工作，只要轻松一键就能导出 svg 了，所以 svg 也更受设计师的青睐。Inline SVG vs Icon Fonts 这篇文章详细的比较了 svg 和 icon-font的优劣，大家可以去看看。PS：这里其实还用到了 SVG Sprite 技术。简单的理解就是类 svg 的似雪碧图，它在一个 svg 之中运用 symbol 标示了一个一个的 svg 图标，这样一个页面中我们遇到同样的 svg 就不用重复再画一个了，直接使用<use xlink:href="#icon-QQ" x="50" y="50" /> 就能使用了，具体的细节可以看这篇文章开头的文章 未来必热：SVG Sprite技术介绍，在之后的文章中也会手摸手叫你自己如何制作 SVG Sprite。
创建 icon-component 组件
我们有了图标，接下来就是如何在自己的项目中优雅的使用它了。 之后的代码都是基于 vue 的实例(ps: react 也很简单，原理都是类似的)

//components/Icon-svg
<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'icon-svg',
  props: {
    iconClass: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    }
  }
}
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>


复制代码
//引入svg组件
import IconSvg from '@/components/IconSvg'

//全局注册icon-svg
Vue.component('icon-svg', IconSvg)

//在代码中使用
<icon-svg icon-class="password" />
复制代码
就这样简单封装了一个 Icon-svg 组件 ，我们就可以简单优雅的在自己的vue项目之中使用图标了。

进一步改造
但作为一个有逼格的前端开发，怎能就此满足呢!目前还是有一个致命的缺点的，就是现在所有的 svg-sprite 都是通过 iconfont 的 iconfont.js 生成的。

首先它是一段用js来生成svg的代码，所有图标 icon 都很不直观。
如图所示
你完全不知道哪个图标名对应什么图标，一脸尼克扬问号??? 每次增删改图标只能整体js文件一起替换。
其次它也做不到按需加载，不能根据我们使用了那些 svg 动态的生成 svg-sprite。
自定义性差，通常导出的svg包含大量的无用信息，例如编辑器源信息、注释等。通常包含其它一些不会影响渲染结果或可以移除的内容。
添加不友善，如果我有一些自定义的svg图标，该如何和原有的 iconfont 整合到一起呢？目前只能将其也上传到 iconfont 和原有的图标放在一个项目库中，之后再重新下载，很繁琐。
使用 svg-sprite
接下来我们就要自己来制作 svg-sprite 了。这里要使用到 svg-sprite-loader 这个神器了， 它是一个 webpack loader ，可以将多个 svg 打包成 svg-sprite 。

我们来介绍如何在 vue-cli 的基础上进行改造，加入 svg-sprite-loader。

我们发现vue-cli默认情况下会使用 url-loader 对svg进行处理，会将它放在/img 目录下，所以这时候我们引入svg-sprite-loader 会引发一些冲突。

//默认`vue-cli` 对svg做的处理，正则匹配后缀名为.svg的文件，匹配成功之后使用 url-loader 进行处理。
 {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: utils.assetsPath('img/[name].[hash:7].[ext]')
    }
}
复制代码
解决方案有两种，最简单的就是你可以将 test 的 svg 去掉，这样就不会对svg做处理了，当然这样做是很不友善的。

你不能保证你所有的 svg 都是用来当做 icon的，有些真的可能只是用来当做图片资源的。
不能确保你使用的一些第三方类库会使用到 svg。
所以最安全合理的做法是使用 webpack 的 exclude 和 include ，让svg-sprite-loader只处理你指定文件夹下面的 svg，url-loaer只处理除此文件夹之外的所以 svg，这样就完美解决了之前冲突的问题。 代码如下


这样配置好了，只要引入svg之后填写类名就可以了

import '@/src/icons/qq.svg; //引入图标

<svg><use xlink:href="#qq" /></svg>  //使用图标

复制代码
单这样还是非常的不优雅，如果我项目中有一百个 icon，难不成我要手动一个个引入么！ 偷懒是程序员的第一生产力！！！

自动导入
首先我们创建一个专门放置图标 icon 的文件夹如：@/src/icons，将所有 icon 放在这个文件夹下。 之后我们就要使用到 webpack 的 require.context。很多人对于 require.context可能比较陌生，直白的解释就是

require.context("./test", false, /.test.js$/); 这行代码就会去 test 文件夹（不包含子目录）下面的找所有文件名以 .test.js 结尾的文件能被 require 的文件。 更直白的说就是 我们可以通过正则匹配引入相应的文件模块。

require.context有三个参数：

directory：说明需要检索的目录
useSubdirectories：是否检索子目录
regExp: 匹配文件的正则表达式
了解这些之后，我们就可以这样写来自动引入 @/src/icons 下面所有的图标了

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
复制代码
之后我们增删改图标直接直接文件夹下对应的图标就好了，什么都不用管，就会自动生成 svg symbol了。


更进一步优化自己的svg
首先我们来看一下 从 阿里iconfont 网站上导出的 svg 长什么样？


没错虽然 iconfont 网站导出的 svg 内容已经算蛮精简的了，但你会发现其实还是与很多无用的信息，造成了不必要的冗余。就连 iconfont 网站导出的 svg 都这样，更不用说那些更在意 ui漂不漂亮不懂技术的设计师了(可能)导出的svg了。好在 svg-sprite-loader也考虑到了这点，它目前只会获取 svg 中 path 的内容，而其它的信息一概不会获取。生成 svg 如下图：


但任何你在 path 中产生的冗余信息它就不会做处理了。如注释什么的


这时候我们就要使用另一个很好用的东西了-- svgo

SVG files, especially exported from various editors, usually contain a lot of redundant and useless information such as editor metadata, comments, hidden elements, default or non-optimal values and other stuff that can be safely removed or converted without affecting SVG rendering result.

它支持几十种优化项，非常的强大，8k+的star 也足以说明了问题。

详细的操作可以参照 官方文档 张鑫旭大大的文章（没错又是这位大大的文章，或许这就是大佬吧！）本文就不展开了。

写在最后
上面大概阐述了一下前端项目中 icon 使用的演进史。 总的来说还是那句话，适合的才是最好的。就拿之前争论的选择 vue react 还是 angular，个人觉得每个框架都有自己的特点和适用的业务场景，所以所有不结合业务场景的推荐和讨论都是瞎bb。。。如上文其实大概讲了五种前端icon的使用场景，第一种Font Awesome不用它并不是因为它不好，而是业务场景不适合，如果你团队没有专门的设计师或者对 icon 的自定义度不高完全可以使用它，Font Awesome github有五万多 star，足见社区对它的认可。还比如说，你们项目对低端浏览器有较高的适配要求，你还强行要用 svg 作为图标 icon，那你真的是存心和自己过不去了。所以所有方案都没有绝对的优与劣之分，适合自己业务场景，解决自己实际痛点，提高自己开发效率的方案就是好的方案。

占坑
本文所涉及的技术在 vue-element-admin 中可以找到完整的实例。 vue-element-admin也发布了新版本和配套的中文文档(文档真的写的我要吐血了)不管使不使用本项目都推荐一看，应该能对你写vue的项目有所帮助。欢迎使用和提出不足。 楼主个人免费圈子。

系列文章：

手摸手，带你用 vue 撸后台 系列一（基础篇）
手摸手，带你用 vue 撸后台 系列二(登录权限篇)
手摸手，带你用 vue 撸后台 系列三 (实战篇)
手摸手，带你用 vue 撸后台 系列四(vueAdmin 一个极简的后台基础模板)
手摸手，带你用 vue 撸后台 系列五(v4.0 新版本)
手摸手，带你封装一个 vue component
手摸手，带你优雅的使用 icon
手摸手，带你用合理的姿势使用 webpack4（上）
手摸手，带你用合理的姿势使用 webpack4（下）
文章分类
前端
文章标签

Vue.js

前端

SVG

Icon

花裤衩 lv-6
工具人 @ 字节跳动
发布了 13 篇专栏 · 获得点赞 14,192 · 获得阅读 3,086,847
关注
安装掘金浏览器插件
打开新标签页发现好内容，掘金、GitHub、Dribbble、ProductHunt 等站点内容轻松获取。快来安装掘金浏览器插件获取高质量内容吧！


李杨重名了100646的头像
李杨重名了100646
可以直接使用类名 不使用svg吗
4天前
用户3314636550931的头像
用户3314636550931
请问 vue.config.js 中无法使用@ 别名吗，其他地方可以
17天前
清玄的头像
清玄
前端开发工程师 @ Huohuoit
调了一会代码，才发现笔者的github源代码比演示地址的代码少了一些，我说怎么一直不对呢。大佬能更新下源代码不😂
2月前
ectotherm的头像
ectotherm lv-1
前端实习生
请问博主那个中文文档的链接打开后需要账号密码是怎么回事呢
6月前
用户3005462399848的头像
用户3005462399848
不知道是不是icon的原因 本项目引入treeselect样式会出错，treeselect的三角箭头无敌大，并且block
6月前
柳乘风的头像
柳乘风
全栈工程师 @ Alibaba
别忘了：npm install svg-sprite-loader --save-dev
然后重启
6月前
_前端小弟的头像
_前端小弟 lv-1
前端工程师
请教一下，如果是多色的svg怎么修改颜色呢？
8月前
九思而行的头像
九思而行
@努力学
请教下怎么做到svg和里面的use没有空隙的 自己引入的svg 都会带一点空隙
10月前
Hilda85401的头像
Hilda85401
特别想要了解的就是从iconfont上面下载svg默认都是选择颜色的，也去不掉，这样后面自己也不能更改颜色，这个问题如何解决啊？
10月前

Hilda85401
自己在每个svg里面更改颜色或者去掉fill也很麻烦啊
10月前

花裤衩 lv-6 (作者)
工具人 @ 字节跳动
回复 Hilda85401: 可以配svgo批量处理，但其实不建议，这样有些多色的图标也会被影响，当然你可以写个规则只处理单色的svg
10月前

Hilda85401
回复 花裤衩: 好的，谢谢
10月前
BobsLi的头像
BobsLi
utils.assetsPath，这个utils是什么？
10月前
张小凡酱的头像
张小凡酱
import '@/src/icons/qq.svg; //引入图标
 //使用图标
LZ在引用svg-spite-loader的rule中设置了symbolId。xlink:href="#qq" 中双引号内容应该改成对应的symbolId
11月前
qqdemo的头像
qqdemo
请问 如果下载来很多的图标 目录下的.svg要自己刺耳出来吗 阿里图标库里面下载的.svg格式是这样的😭

11月前

猫的三明治
前端摸鲸鱼工程师
你应该下错了
4月前
Mr.Hong的头像
Mr.Hong
ie11上使用svg也不兼容只能使用unicode和font-class两种方式么
11月前
wuuse的头像
wuuse
前端菜鸡
看不懂，请问哪里使用了iconfont.js呀
11月前

忘尘。 lv-2
打杂 @ 乐信
要先看那个 张鑫旭的文章 先了解到 我们需要一个源来存储以symbol格式存储的图标 接着 就可以通过在任意的地方通过 use 调用源里的symbol方能展示对应的图标 这个源就是 iconfont.js 😷刚看完且第一次了解svg的我强行解答
9月前

用户3314636550931
index.html 导入
18天前
lclancey的头像
lclancey lv-1
SVG还有一个好处, 它的文件是以纯文本而不是二进制形式储存的, 这一点位图很难做到, 其他格式的矢量图则没有这么做. 纯文本好处是能被git识别, 微调的情况下git变动也不大. 如果是位图这类纯二进制保存, 即使动一个像素点都会被git认为是一个全新的文件
12月前
howey59453的头像
howey59453 lv-1
前端工程师
大佬写的很详尽，有个问题：iconfont每次新增了个图标，就需要重新替换iconfont.js， 想问一下能否实现iconfont与项目图标同步呢？即iconfont新增图标后，不需要重新下载，而是项目中直接可以拿来用。
12月前

wuuse
前端菜鸡
请问一下，您是如何使用的。我看源码也没有用到iconfont.js 呀，好像也不需要，什么按需加载，svg-spire-loader，按阿里的推荐的方式直接导入写个公用组件就能拿来用的。你说这个想法，启个python服务器，把下载的接口拿到，参数，token，cookie这些模拟一下，用解压缩的库解压文件，然后弄个借口暴露给前端，发送iconfont.js这个文件，我的思路是这样的。但好像有点多此一举了
11月前

howey59453 lv-1
前端工程师
回复 wuuse: 自己设计的图标需要引入iconfont.js；我也是封装成组件使用的；弄个接口感觉没太有必要，不过你思路挺开阔的👍
11月前

Pluto在掘金104523
请问怎么使用的啊，我在iconfont复制了svg文件，但是就是不显示啊
11月前

GZ lv-1
iconfont提供在线链接，更新图标只需要更新下链接就行了。
10月前

用户3314636550931
可以弄一个定时任务，当修改图标库更新链接
18天前
郑陈皮的头像
郑陈皮
前端开发工程师
大佬，太强了
1年前
Mr_big_shot_的头像
Mr_big_shot_
iconfont 协议上来看，商用不能滥用吧。
1年前
h。100882的头像
h。100882
el-admin例子里面的很多图标都不会跟着高亮变颜色，从iconfont导入的图标经过svgo处理仍然还是原先导出来的颜色，有知道是怎么回事的吗
1年前
南山隐士的头像
南山隐士 lv-2
. @ .
如果你是从 iconfont下载的图标，记得使用如 Sketch 等工具规范一下图标的大小问题，不然可能会造成项目中的图标大小尺寸不统一的问题。 这个怎么弄, 有知道的吗, 网上找不到😔
1年前

Pluto在掘金104523
找到了吗
11月前
相关推荐
Mr火叶
1天前
Vue.js
11天打造基于vue3的可视化布局器

14

6
红尘炼心
2天前
Vue.js  前端框架
『前端工程』—— 封装Vue第三方组件的三板斧

178

20
HaiJun
9小时前
Vue.js
Vue | 路由守卫面试常考

6

1
Vue | 路由守卫面试常考
尼克陈
1天前
Vue.js  React.js
打通任督二脉的前端环境变量 — env

141

32
打通任督二脉的前端环境变量 — env
淘系前端团队
4天前
前端
仅使用CSS提高页面渲染速度

991

33
涂鸦大前端
2天前
前端
前端工程化之低代码体系

89

26
前端工程化之低代码体系
十年踪迹
2天前
前端
用65行代码实现JavaScript动画序列播放

76

3
VANTOP前端团队
1天前
前端
基于 Element 按钮权限实现方案

71

15
天明夜尽
5天前
Vue.js  JavaScript
推荐 7 个 Vue2、Vue3 源码解密分析的重磅开源项目 👍

626

16
推荐 7 个 Vue2、Vue3 源码解密分析的重磅开源项目 👍
我是十三
5天前
Vue.js  开源
Vue3教程：开发一个 Vue 3 + element-plus 的后台管理系统

467

109
Vue3教程：开发一个 Vue 3 + element-plus 的后台管理系统
关于作者

花裤衩 lv-6 
工具人 @ 字节跳动
获得点赞14,192
文章被阅读3,086,847
相关文章
手摸手，带你用vue撸后台 系列五(v4.0新版本)
 2105  194
手摸手，带你用合理的姿势使用webpack4（上）
 795  37
手摸手，带你用合理的姿势使用webpack4（下）
 417  34
石锤 github 买 star 行为
 100  242
Webpack 4 和单页应用入门
 289  13
目录
前言
演进史
iconfont 三种使用姿势
unicode
font-class
symbol
创建 icon-component 组件
进一步改造
使用 svg-sprite
自动导入
更进一步优化自己的svg
写在最后
占坑
