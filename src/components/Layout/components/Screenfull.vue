<template>
  <ExpandOutlined v-if="!state.isFullscreen" class="full-screen" @click="screen" />
  <CompressOutlined v-else class="full-screen" @click="screen" />
</template>

<script setup>
import { toRefs, reactive, computed, onMounted } from 'vue'
import screenfull from 'screenfull'
import {reminder}from '@/utils/index.js'

const state = reactive({
  isFullscreen: false,
})

function screen() {
  // 如果不允许进入全屏，发出不允许提示
  if (!screenfull.isEnabled) {
    reminder('您的浏览器不能全屏',{type:'warning'})
    state.isFullscreen = false
    return false
  } 
  screenfull.toggle()
  state.isFullscreen =screenfull.isFullscreen
}
</script>

<style>
</style>