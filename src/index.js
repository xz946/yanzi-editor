
import yanzi_editor from "./components/yanzi_editor.vue"

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component('yanzi_editor', yanzi_editor)
}

//这样就可以使用Vue.use进行全局安装了。
yanzi_editor.install = function (Vue) {
    Vue.component(yanzi_editor.name, yanzi_editor)
}

export default yanzi_editor;