<template>
  <div id="app">
    <div id="content">
        <h1>
            <a id="_0">
            </a>
            燕子在线编辑器
          </h1>
          <blockquote>
            <p>
              作为一个前端开发工程师，时不时需要写个demo来测试一下，或者写了个demo测试完了，需要保存。
              <br />
              这个时候应该用什么编辑器呢？
              <br />
              notepad++? 没有智能提示
              <br />
              Webstorm？ 打开要太久了
              <br />
              Vscode能秒开? 没有实时预览
              <br />
              HbuildX有实时预览? 不能在线保存
            </p>
          </blockquote>
          
          <p>
            这个时候，使用一个 web在线编辑器，基本都可以解决了
          </p>
          <h3>
              <a id="_17">
              </a>
              试试效果
          </h3>
          <yanziEditor 
            @save="save" 
            :value.sync="value" 
            :options="options">
        </yanziEditor>
    
          <h3>
            <a id="_17">
            </a>
            使用方法
          </h3>
          <p>下载</p> 
          <pre><div class="hljs"><code class="lang-js">npm install yanzi-editor </code></div></pre> <p>使用</p> <pre><div class="hljs"><code class="lang-html"> <span class="hljs-tag">&lt;<span class="hljs-name">yz-editor <br></span> @<span class="hljs-attr">initSuccess</span>=<span class="hljs-string">"initSuccess"</span> <br><span class="hljs-attr">:searchStr</span>=<span class="hljs-string">"searchStr"</span><br> @<span class="hljs-attr">click</span>=<span class="hljs-string">"clickEditor"</span><br> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"this.tabList.length"</span> <br>@<span class="hljs-attr">save</span>=<span class="hljs-string">"save"</span> <br><span class="hljs-attr">v-model</span>=<span class="hljs-string">"content"</span><br><span class="hljs-attr">ref</span>=<span class="hljs-string">"myEditor"</span>&gt;</span> <span class="hljs-tag"><br>&lt;/<span class="hljs-name">yz-editor</span>&gt;</span> </code></div></pre> <h3><a id="_41"></a>属性</h3> <table> <thead> <tr> <th>属性名称</th> <th>说明</th> <th>类型</th> <th>必填</th> <th>默认值</th> </tr> </thead> <tbody> <tr> <td>value</td> <td>编辑器内容</td> <td>String</td> <td>true</td> <td>“”</td> </tr> <tr> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody> </table> <h3><a id="_51"></a>事件</h3> <table> <thead> <tr> <th>事件名称</th> <th>说明</th> <th>回调参数</th> </tr> </thead> <tbody> <tr> <td>change</td> <td>内容改变事件</td> <td>编辑器内容</td> </tr> <tr> <td>focus</td> <td>获得焦点</td> <td>当前光标位置</td> </tr> <tr> <td>blur</td> <td>失去焦点</td> <td>当前光标位置</td> </tr> </tbody> </table> <h3><a id="_61"></a>方法</h3> <table> <thead> <tr> <th>方法名称</th> <th>说明</th> <th>参数</th> </tr> </thead> <tbody> <tr> <td>save</td> <td>保存</td> <td>编辑器内容</td> </tr> <tr> <td></td> <td></td> <td></td> </tr> <tr> <td></td> <td></td> <td></td> </tr> </tbody> </table>
    </div>

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
        width:960,
        height:500,
        isTools:true
      },

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
    },

  },
  mounted(){
  }
}
</script>

<style>
  @import url("./assets/iconfont/iconfont.css");
html,body,#app{
  width: 100% !important;
  height: 100% !important;
  padding: 0 !important;
  background: #eee;
}
#content{
  width: 960px;
  margin: 0 auto;
  background: white;
  padding: 20px;
}
</style>
