# 燕子在线编辑器

> 作为一个前端开发工程师，时不时需要写个demo来测试一下，或者写了个demo测试完了，需要保存。
> 这个时候应该用什么编辑器呢？
> notepad++?    没有智能提示
> Webstorm？  打开要太久了
> Vscode能秒开?     没有实时预览
> HbuildX有实时预览?    不能在线保存

这个时候，使用一个 web在线编辑器，基本都可以解决了



### 使用方法

下载

```yaml
npm i yanzi_editor
```


使用示例
```html
<template>
  <div id="app">
      
    <!-- 使用示例 -->
    <yanziEditor></yanziEditor>
      
  </div>
</template>

<script>
import "yanzi_editor/lib/yanzi_editor.css";// 引入基本样式
import yanziEditor from "yanzi_editor/lib/yanzi_editor.umd.min.js";// 引入核心文件

export default {
  name: "App",
  components: {
    yanziEditor//注册组件
  }
};
</script>
```

注意：
![image.png](https://xzlovecyy.com/files/noteimage/xiaozhou/1615123805642.png)



具体使用

```html
<yanziEditor 
    ref="yanzi-editor"  
    :options="options"
    :value.sync="value"
    @save="save"
    @focus="focus"
    @blur="blur"
    @change="change"
    @initSuccess="initSuccess"
></yanziEditor>
```



属性说明

```html
<yanziEditor 
    ref="yanzi-editor"  
    :options="options" -- 编辑器配置参数
    :value.sync="value" -- 编辑器内容，单向绑定（修改编辑器内容），如需获取编辑器最新内容，请使用 getValue() 方法获取，或者在 change事件中获得
    @save="save" -- 键盘事件—— ctrl + S 的回调
    @focus="focus" -- 编辑器获得焦点回调
    @blur="blur" -- 编辑器失去焦点的回调
    @change="change" -- 编辑器内容修改的监听回调
    @initSuccess="initSuccess" -- 编辑器初始化完成的回调
></yanziEditor>
```





### 属性

| 属性名称 | 说明       | 类型   | 必填 | 默认值 |
| -------- | ---------- | ------ | ---- | ------ |
| value    | 编辑器内容 | String | true | 初始   |
| options  | 编辑器配置 | Object | true | -      |



### 编辑器配置

| 配置名称 | 说明           | 类型           | 必填 | 默认值 | 可选值                  |
| -------- | -------------- | -------------- | ---- | ------ | ----------------------- |
| width    | 编辑器宽度     | String         | true | auto   |                         |
| height   | 编辑器高度     | String         | true | 226px  |                         |
| isTools  | 是否显示工具栏 | Boolean        |      | false  |                         |
| readOnly | 是否只读       | Boolean/String |      |        | true\|false\|"nocursor" |



### 事件

| 事件名称    | 说明             | 回调参数     |
| ----------- | ---------------- | ------------ |
| initSuccess | 编辑器初始化完成 | 编辑器对象   |
| change      | 内容改变事件     | 编辑器内容   |
| focus       | 获得焦点         | 当前光标位置 |
| blur        | 失去焦点         | 当前光标位置 |
| save        | 保存             | 编辑器内容   |



### 方法

| 方法名称   | 说明                               | 参数              |
| ---------- | ---------------------------------- | ----------------- |
| getValue   | 获取编辑器中的内容                 | -                 |
| goPageUp   | 上一页                             | -                 |
| goPageDown | 下一页                             | -                 |
| goDocStart | 到文档开头                         | -                 |
| goDocEnd   | 到文档末尾                         | -                 |
| format     | 格式化                             | -                 |
| reset      | 重置内容                           | -                 |
| clear      | 清空内容                           | -                 |
| setOptions | 设置一个配置参数                   | k=参数名,v=参数值 |
| undo       | 撤销一次操作\ ctrl + Z             | -                 |
| redo       | 恢复,重做一次操作 ctrl + shift + Z | -                 |