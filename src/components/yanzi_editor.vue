<template>
  <div id="yzEditor">

    <div class="tools" v-if="options.isTools">
      <span :class="{'activeBtn':btnIndex==1}" @click="showView(1)" class="iconfont">&#xe714;</span>
      <span :class="{'activeBtn':btnIndex==2}" @click="showView(2)" class="iconfont">&#xe604;</span>
      <span :class="{'activeBtn':btnIndex==3}" @click="showView(3)" class="iconfont">&#xe602;</span>
      <span @click="reset" class="iconfont">&#xe60a;</span>
      <!-- 触发按钮 -->
      <span @click="upload" class="iconfont">&#xe83c;</span>
      <!-- 隐藏文件域 -->
      <input type="file" style="display:none;" ref="filElem" @change="changeFile">
      <span @click="donwload" class="iconfont">&#xe60e;</span>

      <a id="logo" style="float:right;" href="http://code.xzlovecyy.com/" target="_blank">燕子编辑器-v1.0</a>
    </div>

    <div id="myBody">
      <!-- 编辑器 -->
      <textarea ref="yanziEditor" style="width:100%;height:100%;"></textarea>

      <!-- 预览区域 -->
      <iframe id="yanzi-view" allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; midi" allowfullscreen="true" allowpaymentrequest="true" contenteditable="false" frameborder="0"></iframe>

    </div>
  </div>
</template>
   
  <script></script>
  <script>
// 引入全局实例
import _CodeMirror from "codemirror";

// 引入主题后还需要在 options 中指定主题才会生效
import "codemirror/theme/monokai.css";
import "codeMirror/lib/codemirror.css";
import "codeMirror/addon/fold/foldgutter.css";

import "codeMirror/addon/comment/comment.js";
import "codeMirror/addon/fold/foldcode.js";

// 支持代码折叠
import "codeMirror/addon/fold/foldgutter.js";
import "codeMirror/addon/fold/brace-fold.js";
import "codeMirror/addon/fold/xml-fold.js";
import "codeMirror/addon/fold/indent-fold.js";
import "codeMirror/addon/fold/markdown-fold.js";
import "codeMirror/addon/fold/comment-fold.js";

//编辑器语言
import "codeMirror/mode/htmlmixed/htmlmixed.js";
import "codeMirror/mode/css/css.js";
import "codeMirror/mode/javascript/javascript.js";
import "codemirror/mode/clike/clike.js";
import "codemirror/mode/markdown/markdown.js";
import "codemirror/mode/python/python.js";
import "codemirror/mode/r/r.js";
import "codemirror/mode/shell/shell.js";

//代码提示
import "codeMirror/addon/hint/show-hint.css"; // 代码提示样式
import "codeMirror/addon/hint/show-hint.js"; // 开启提示
// css 提示
import "codeMirror/addon/hint/css-hint.js"; // css 提示
// js 提示
import "codeMirror/addon/hint/javascript-hint.js"; //js 提示
// html 提示
//   import "codeMirror/addon/hint/html-hint.js";// html提示

// 括号和标签匹配
import "codeMirror/addon/edit/matchbrackets.js";
import "codeMirror/addon/edit/closebrackets.js";
import "codeMirror/addon/edit/matchtags.js";
import "codeMirror/addon/edit/trailingspace.js";
import "codeMirror/addon/edit/closetag.js";
import "codeMirror/addon/edit/continuelist.js";
import "codeMirror/addon/comment/comment.js";

// 搜索和替换
import "codeMirror/addon/dialog/dialog.css";
import "codeMirror/addon/dialog/dialog.js";
import "codeMirror/addon/search/searchcursor.js";
import "codeMirror/addon/search/search.js";
// import "codeMirror/addon/search/annotatescrollbar.js";
import "codeMirror/addon/search/matchesonscrollbar.js";
import "codeMirror/addon/search/jump-to-line.js";

//选中行高亮
import "codeMirror/addon/selection/active-line.js";

import "codemirror/mode/vue/vue.js";

// 尝试获取全局实例
const CodeMirror = window.CodeMirror || _CodeMirror;
// console.log("CodeMirror",CodeMirror)

import emmet from "@emmetio/codemirror-plugin";

emmet(CodeMirror);

export default {
  name: "yanzi-editor",
  props: ["value", "options"],
  data() {
    return {
      // 配置
      editorConfig: {
        theme: "monokai", //编辑器主题
        showCursorWhenSelecting: true, // 文本选中时显示光标
        indentUnit: 2, //缩进单位，值为空格数，默认为2 。
        autoMatchParens: true,
        indentWithTabs: true, //在缩进时，是否需要把 n*tab宽度个空格替换成n个tab字符，默认为false
        styleActiveLine: true, // 光标行变色
        smartIndent: true, // 智能缩进
        electricChars: true,
        pasteLinesPerSelection: true,
        matchBrackets: true, //括号匹配
        mode: "text/html", //  html语法
        autoCloseTags: true, // 标签自动闭合，并换行
        lineNumbers: true, //显示行号
        lineWrapping: true, //代码折叠
        autoCloseBrackets: true,
        readOnly: this.options.readOnly,
        hintOptions: {
          completeSingle: true
        },
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        spellcheck: true, //指定是否在输入上启用拼写检查。
        autocorrect: true, //指定是否在输入上启用自动更正。
        autoMatchParens: true
      },
      btnIndex: 1, // 编辑器模式，1=双栏 | 2=单栏代码 | 3=单栏预览
      myEditor: {}, //编辑器对象
      // editContent: this.value,
      from: null,
      cursor: null,
      defalutValue:
        "<!DOCTYPE html>\n" +
        '<html lang="en">\n' +
        "<head>\n" +
        '	<meta charset="UTF-8">\n' +
        '	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">\n' +
        "	<title>test</title>\n" +
        "  <style>\n" +
        "	h1{\n" +
        "	  color: red;\n" +
        "	}\n" +
        "  </style>\n" +
        "</head>\n" +
        "<body>\n" +
        "  	<h1>Hello World</h1>\n" +
        "</body>\n" +
        "</html>\n"
    };
  },
  watch: {
    searchStr(newVal) {
      this.cursor = null;
    },
    value(newVal) {
      this.myEditor.setValue(newVal);
      this.runCodePreview();
    },
    // 监听编辑器是否 “只读”
    readOnly(newVal, oldVal) {
      this.setOptions("readOnly", newVal);
    }
  },
  computed: {
    readOnly() {
      return this.options.readOnly;
    }
  },
  methods: {
    init() {
      let that = this;

      let extraKeys = {
        Esc: "emmetResetAbbreviation",
        Enter: "emmetInsertLineBreak",
        Tab: "emmetExpandAbbreviation",
        "Alt-Enter": "autocomplete",
        "Ctrl-S": function() {
          that.saveContent();
        },
        "Ctrl-/": function() {
          that.commentSelection();
        }
      };
      // this.setOptions("extraKeys", extraKeys);
      this.editorConfig.extraKeys = extraKeys;

      this.myEditor = CodeMirror.fromTextArea(
        this.$refs.yanziEditor,
        this.editorConfig
      );

      //设置编辑器尺寸
      this.setEditorSize();
      // 实时监听窗口变化
      this.watchWindowSize();
      // 监听编辑器变化
      this.watchChange();

      if (this.value) {
        this.myEditor.setValue(this.value);
      } else {
        this.myEditor.setValue(this.defalutValue);
      }

      // 初始话完毕
      this.$emit("initSuccess", this.myEditor);
    },
    // 获取编辑器的内容
    getValue() {
      return this.myEditor.getValue();
    },
    // 设置编辑器尺寸
    setEditorSize(width) {
      if (width == undefined || width < 0) {
        document.getElementById("myBody").style.height =
          this.options.height - (this.options.isTools ? 40 : 0) + "px";
        document.getElementById("myBody").style.width =
          this.options.width + "px";
        document.getElementById("yanzi-view").style.height =
          this.options.height - (this.options.isTools ? 40 : 0) + "px";
        this.myEditor.setSize(
          this.options.width / 2 + "px",
          this.options.height - (this.options.isTools ? 40 : 0) + "px"
        );
      } else {
        document.getElementById("yanzi-view").style.height =
          this.options.height - (this.options.isTools ? 40 : 0) + "px";
        document.getElementById("myBody").style.height =
          this.options.height - (this.options.isTools ? 40 : 0) + "px";
        this.myEditor.setSize(
          width,
          this.options.height - (this.options.isTools ? 40 : 0) + "px"
        );
      }
    },
    // 监听浏览器窗口变化
    watchWindowSize() {
      let that = this;
      //当浏览器大小变化时
      window.addEventListener("resize", function() {
        that.setEditorSize();
      });
    },

    // 注释代码
    commentSelection(isComment) {
      var that = this;
      var range = that.getSelectedRange();
      range.obj.toggleComment(range.from, range.to);
    },
    // 获得光标选中行，以及对象
    getSelectedRange: function() {
      let that = this;
      return {
        from: that.myEditor.getCursor(true),
        to: that.myEditor.getCursor(false),
        obj: that.myEditor
      };
    },
    // --w监听编辑器变化
    watchChange() {
      let that = this;

      // 监听实时编辑
      this.myEditor.on("inputRead", (instance, changeObj) => {
        this.runCodePreview();

        if (/^[a-zA-Z]/.test(changeObj.text[0])) {
          var html = that.myEditor.getValue() + "";
          that.myEditor.showHint();
        }

        if (changeObj.origin == "+input") {
          let content = that.myEditor.getValue();
          that.from = {
            line: changeObj.from.line,
            ch: changeObj.from.ch + 1
          };
        }
      });

      // // 监听内容变化，非用户输入，而是通过 editor的 setValue导致的内容变化
      this.myEditor.on("change", (instance, changeObj) => {
        let content = that.myEditor.getValue();
        that.runCodePreview();
        if (changeObj.origin == "setValue") {
        }
        if (changeObj.origin == "+delete") {
          that.from = {
            line: changeObj.from.line,
            ch: changeObj.from.ch
          };
          that.editContent = content;
        }

        this.$emit("change", that.myEditor.getValue());
      });

      this.myEditor.on("mousedown", (instance, changeObj) => {
        let cursor = that.myEditor.getCursor();
        this.$emit("focus", cursor);
      });

      this.myEditor.on("blur", (instance, changeObj) => {
        let cursor = that.myEditor.getCursor();
        that.$emit("blur", cursor);
      });
    },

    // 格式化
    format() {
      let from = this.myEditor.getCursor(this.from); // 获得当前光标位置
      this.myEditor.execCommand("selectAll"); // 全选内容
      this.myEditor.execCommand("indentAuto"); // 格式化
      this.myEditor.setCursor(from); // 让光标重新到之前的位置
    },

    // 查找下一个
    findNext() {
      let cm = this.myEditor;
      if (!this.cursor) {
        this.cursor = this.myEditor.getSearchCursor(
          this.searchStr,
          { line: 0, ch: 0 },
          {}
        );
      }
      let isNext = this.cursor.findNext();
      if (!isNext) {
        return false;
      }
      let pos = { from: this.cursor.from(), to: this.cursor.to() };
      cm.setSelection(this.cursor.from(), this.cursor.to());
      cm.scrollIntoView(pos, 20);
      cm.execCommand("clearSearch");

      let annotateScrollbar = cm.annotateScrollbar("CodeMirror-search-match");
      annotateScrollbar.update(pos);
    },
    // 向后查找
    findPrevious() {
      let cm = this.myEditor;
      if (!this.cursor) {
        this.cursor = this.myEditor.getSearchCursor(
          this.searchStr,
          { line: 0, ch: 0 },
          {}
        );
      }
      let isNext = this.cursor.findPrevious();
      if (!isNext) {
        return false;
      }
      cm.setSelection(this.cursor.from(), this.cursor.to());
      cm.scrollIntoView({ from: this.cursor.from(), to: this.cursor.to() }, 20);
    },
    // 实时预览
    runCodePreview() {
      var o = document.getElementById("yanzi-view");

      // 以下为动态修改 iframe 内容
      // html 为要修改的内容

      // 以下为动态修改 iframe 内容
      // html 为要修改的内容
      var ed = document.all ? o.contentWindow.document : o.contentDocument;
      ed.open();
      ed.write(this.myEditor.getValue());
      ed.close();
      // ed.contentEditable = true;
      // ed.designMode = 'on';
    },
    // 单栏显示 预览
    showView(index) {
      this.btnIndex = index;
      switch (index) {
        case 1:
          var myBody = document.getElementById("myBody");
          var width = myBody.style.width;
          var view = document.getElementById("yanzi-view");
          view.style.display = "block";

          var newWidth = parseFloat(width.substring(0, width.length - 1)) / 2;
          view.style.width = newWidth + "px";
          this.setEditorSize(newWidth + "px");
          break;
        case 2:
          var myBody = document.getElementById("myBody");
          var width = myBody.style.width;
          var view = document.getElementById("yanzi-view");
          view.style.display = "none";
          this.setEditorSize(width);
          break;
        case 3:
          var myBody = document.getElementById("myBody");
          var width = myBody.style.width;
          var view = document.getElementById("yanzi-view");
          view.style.display = "block";
          view.style.width = width;

          this.setEditorSize(0);
          break;
      }
    },

    upload() {
      this.$refs.filElem.dispatchEvent(new MouseEvent("click"));
    },
    // 读取文件
    changeFile() {
      var that = this;
      const inputFile = this.$refs.filElem.files[0];
      if (inputFile) {
        // 开始读取 LRC 文件的内容
        var reader = new FileReader();
        // 读取纯文本文件,且编码格式为 utf-8
        reader.readAsText(inputFile, "UTF-8");
        reader.onload = function(e) {
          let content = e.target.result;
          that.myEditor.setValue(content);
        };
        that.$refs.filElem.files[0] = "";
      } else {
        alert("文件为空");
      }
    },
    // 下载
    donwload() {
      this.jsForDownload(this.myEditor.getValue());
    },
    // js 下载内容
    jsForDownload(content) {
      //创建元素
      var ele = document.createElement("a");
      //设置下载文件名，可以 .html   .txt   。。。 等等……
      var name = new Date().getTime() + ".html";
      ele.download = name;
      //隐藏元素
      ele.style.display = "none";
      //字符内容转变成blob地址
      var blob = new Blob([content]);
      //如果是链接，这里也可以直接设置链接地址
      ele.href = URL.createObjectURL(blob);
      document.body.appendChild(ele);
      //模拟点击
      ele.click();
      //移除元素
      document.body.removeChild(ele);
    },
    // *********************************************【Event】*************************************************
    // 按住 ctrl + S
    saveContent() {
      this.$emit("save", this.myEditor.getValue());
    },

    // *********************************************【Methods】*************************************************
    // 重置内容
    reset() {
      this.myEditor.setValue(this.defalutValue);
    },
    // 清空内容
    clear() {
      this.myEditor.setValue("");
    },
    // 新设置一个配置的值
    setOptions(k, v) {
      this.myEditor.setOption(k, v);
    },
    // 撤销一次操作\ ctrl + Z
    undo() {
      this.myEditor.undo();
    },
    // ctrl + shift + Z
    // 恢复,重做一次操作
    redo() {
      this.myEditor.redo();
    },
    // 上一页
    goPageUp() {
      this.myEditor.execCommand("goPageUp");
    },
    // 下一页
    goPageDown() {
      this.myEditor.execCommand("goPageDown");
    },
    // 到文档开头
    goDocStart() {
      this.myEditor.execCommand("goDocStart");
    },
    // 到文档末尾
    goDocEnd() {
      this.myEditor.execCommand("goDocEnd");
    }
  },
  mounted() {
    this.init();
  }
};
</script>
  
  <style>
* {
  margin: 0;
  padding: 0;
}
.cm-s-monokai.CodeMirror {
  display: inline-block;
  width: 50%;
  height: 100%;
}
.tools {
  height: 40px;
  width: 40px;
}
#myBody {
  display: flex;
}
.tools {
  width: 100%;
  background: #3d3d3e;
  user-select: none;
}
#logo {
  color: #bbb;
  font-size: 12px;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  margin-right: 10px;
}
#logo:hover {
  color: #fff;
}
.tools .iconfont {
  display: inline-block;
  color: #bbb;
  cursor: pointer;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.tools .iconfont:hover {
  color: #fff;
}
.activeBtn {
  background: #ccc;
  color: #333 !important;
}
#yanzi-view {
  display: inline-block;
  width: 50%;
  height: calc(100% - 40px);
  background: #eee;
  user-select: none;
  z-index: 2;
  transition: all 0.3s;
  left: 0;
  top: 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}
.CodeMirror-line::selection {
  color: #fff !important;
  background: #088 !important;
}
.cm-s-monokai {
  background: rgb(30, 30, 30) !important;
}
.CodeMirror-scroll {
  padding: 15px 0;
  height: calc(100% - 30px);
  overflow-x: hidden !important;
}
.cm-keyword,
.emmet-open-tag,
.emmet-close-tag,
.cm-tag {
  color: rgb(86, 156, 214) !important;
}
/* js变量名 */

/* 普通标签、尖括号 */
.cm-bracket {
  color: rgb(128, 128, 103) !important;
}
/* 注释 */
.cm-comment {
  color: rgb(106, 153, 85) !important;
}

/* 属性值 , 样式值*/
.cm-atom,
.cm-string {
  color: rgb(206, 145, 120) !important;
}
.cm-qualifier {
  color: rgb(215, 186, 125) !important;
}
.cm-property,
.cm-number {
  color: rgb(220, 220, 157) !important;
}
.cm-tab {
  color: rgb(201, 212, 212) !important;
}
/* 属性名、js变量名 */
.cm-property,
.cm-def,
.cm-attribute,
.cm-variable {
  color: rgb(156, 220, 254) !important;
}

.cm-type {
  color: rgb(169, 183, 198) !important;
}
.cm-def {
  color: rgb(255, 198, 109) !important;
}
.CodeMirror-linenumber {
  color: rgb(133, 133, 133) !important;
}
/* 默认隐藏，鼠标悬停显示滚动条 */

.CodeMirror-vscrollbar::-webkit-scrollbar {
  width: 10px !important;
  height: 10px !important;
  background-color: rgb(51, 51, 51) !important;
  border-radius: 10px !important;
}
.CodeMirror-vscrollbar::-webkit-scrollbar-thumb {
  background-color: rgb(51, 51, 51) !important;
  border-radius: 10px !important;
  height: 10px !important;
}
.CodeMirror:hover .CodeMirror-vscrollbar::-webkit-scrollbar-thumb {
  background-color: #999 !important;
}
.CodeMirror {
  transition: all 0.3s;
}
</style>
  