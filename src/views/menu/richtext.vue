<template>
  <div class="components-container">
   
    <div>
      <tinymce v-model="content" :height="300" />
    </div>
     <el-button @click='req' type="primary">打印富文本的值</el-button>
    <div class="editor-content" v-html="content" />
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
export default {
  components: { Tinymce },
  data() {
    return {
      content:
      `<h1 style="text-align: center;">欢迎来到TinyMCE演示!</h1><p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="//www.tinymce.com/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" /><ul>
        <li>Our <a href="//www.tinymce.com/docs/">documentation</a> 是学习如何配置TinyMCE的重要资源。</li><li>有什么具体问题吗?访问<a href="https://community.tinymce.com/forum/">社区论坛</a>。</li><li>我们还提供企业级支持，作为<a href="https://tinymce.com/pricing"的一部分</a>.</li>
      </ul>`
    }
  },
  methods:{
    req(){
      console.log(this.content)
    }
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>

