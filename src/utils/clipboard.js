import Vue from 'vue'
import Clipboard from 'clipboard'
import{reminder}from './method'

function clipboardSuccess() {
  reminder('Copy 成功')
  // Vue.prototype.$message({
  //   message: 'Copy 成功!',
  //   type: 'success',
  //   duration: 1500
  // })
}

function clipboardError() {
  reminder('Copy 失败')
  // Vue.prototype.$message({
  //   message: 'Copy 失败',
  //   type: 'error'
  // })
}

export default function handleClipboard(text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
