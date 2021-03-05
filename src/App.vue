<template>
  <div id="app">
    <yanziEditor @save="save" :value.sync="value" :options="options"></yanziEditor>
    <!-- <button @click="up">修改</button> -->
  </div>
</template>

<script>
import yanziEditor from './components/yanzi_editor.vue'

export default {
  name: 'App',
  components: {
    yanziEditor
  },
  data(){
    return{
      value:"",
      options:{
        width:window.innerWidth,
        height:window.innerHeight,
        isTools:true
      }
    }
  },
  // watch:{
  //   'options':{
	// 		handler(newVal,oldVal){
	// 			console.log("老属性值:"+oldVal)
	// 			console.log("新属性值:"+newVal)
	// 		}
	// },
  // }
  methods:{
   
    up(){
      this.options.value = "aaa"
      // console.log(this.options.value)
    },
    save(value){
      console.log("saveValue",value)
    }
  }
}
</script>

<style>
  @import url("./assets/iconfont/iconfont.css");
html,body,#app{
  width: 100%;
  height: 100%;
}
</style>
