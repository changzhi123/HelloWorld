<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="直接使用剪贴板" name="directly">
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
        <el-button type="primary" icon="el-icon-document" @click="handleCopy(inputData,$event)">
          copy
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="使用剪贴板的v-指令" name="v-directive">
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
        <el-button v-clipboard:copy="inputData" v-clipboard:success="clipboardSuccess" type="primary" icon="el-icon-document">
          copy
        </el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import clip from '@/utils/clipboard' // 直接使用剪贴板
import clipboard from '@/directive/clipboard/index.js' // 使用剪贴板的v-指令
import{reminder}from '@/utils/method'
export default {
  directives: {
    clipboard
  },
  data() {
    return {
      activeName: 'directly',
      inputData: 'https://github.com/PanJiaChen/vue-element-admin'
    }
  },
  methods: {
    handleCopy(text, event) {
      clip(text, event)
    },
    clipboardSuccess() {
        reminder('Copy 成功')
     
    }
  }
}
</script>

