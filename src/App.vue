<template>
  <div id="app">
    <yanziEditor ref="yanzi-editor" @save="save" :value.sync="value" :options="options" @focus="focus" @blur="blur" @change="change" @initSuccess="initSuccess">
    </yanziEditor>
  </div>
</template>


<script>
import yanziEditor from "./components/yanzi_editor";

export default {
  name: "App",
  components: {
    yanziEditor
  },
  data() {
    return {
      value: "", // 编辑器内容
      // 编辑器配置参数
      options: {
        width: window.innerWidth, // 编辑器宽度
        height: window.innerHeight, // 编辑器高度
        isTools: true, // true | false
        readOnly: false // true | false | nocursor
      }
    };
  },

  methods: {
    save(value) {
      console.log("saveValue", value);
    },
    readonly() {
      this.options.readOnly = false;
      console.log(this.options.readOnly);
    },
    initSuccess(e) {
      console.log("init", e);
    },
    focus(e) {
      console.log("focus", e);
    },
    blur(e) {
      console.log("blur", e);
    },
    change(e) {
      console.log("change", e);
    }
  },
  mounted() {}
};
</script>

<style>
@import url("./assets/iconfont/iconfont.css");
html,
body,
#app {
  width: 100% !important;
  height: 100% !important;
  padding: 0 !important;
  background: #eee;
}
</style>
