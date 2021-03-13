# 基础组件
### layout布局 
```HTML
<el-row :gutter="20">
  <el-col :span="8"></el-col>
  <el-col :span="8"></el-col>
  <el-col :span="8"></el-col>
<el-row>
```
- `<el-row>`与`<el-col>`可相互嵌套
- `el-row`属性
 + `gutter` 栅格之间的间隔大小,number类型,默认值为0,不占栅格格数
 + `type` 可选`flex`,无默认值
 + `justify` `flex`布局下的水平排列方式,`start/end/center/space-around/space-between`,默认值`start`
 + `align` `flex`布局下的垂直排列方式,`top/middle/bottom`,默认值`top`
 + `tag` 自定义元素标签,默认值`div`
- `el-col`属性
 + `span` 栅格占据的列数,number,默认值24 
 + `offset` 栅格左侧的间隔格数,number,默认值0
 + `push` 栅格向右移动格数,number,默认值0
 + `pull` 栅格向左移动格数,number,默认值0
 + `tag`  自定义元素标签
 + `xs,sm,md,lg,xl` 响应式栅格数或栅格属性对象
### container布局容器
### color色彩
### icon图标
### button按钮
# Form
# Data
### table表格
```HTML
<el-table> </el-table>
```
- 基础表格
- 斑马纹表格
- 带边框表格
- 带状态表格
- 固定表头
- 固定列
- 流体高度 `max-height`
- 多级表头
- 单选
- 多选
- 排序
- 筛选
- 自定义列模板
- 展开行
- 树形数据与懒加载
- 自定义表头
- 表尾合计行
- 合并行与列
- 自定义索引
- table attributes
 + data

### tag标签
### progress进度条
### tree树形控件
### pagination分页
### badge标记
### avatar头像
# Notice
# Navigation
# Others