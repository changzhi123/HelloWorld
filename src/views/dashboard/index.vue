<template>
  <div>index\
    <a-calendar style="width:500px;" v-model:value="state.value" @panelChange="onPanelChange" />
     <a-button type="primary" @click="screen">Primary</a-button>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
const state = reactive({
   value:null,fullscreen:false
})
function onPanelChange(e){
  console.log(e)
}
function screen(){
        // let element = document.documentElement;//设置后就是我们平时的整个页面全屏效果
        let element = document.getElementById('app');//设置后就是   id==con_lf_top_div 的容器全屏
          if (state.fullscreen) {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            } else if (document.webkitCancelFullScreen) {
              document.webkitCancelFullScreen();
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
            }
            console.log(1)
          } else {
            if (element.requestFullscreen) {
              element.requestFullscreen();
            } else if (element.webkitRequestFullScreen) {
              element.webkitRequestFullScreen();
            } else if (element.mozRequestFullScreen) {
              element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
              // IE11
              element.msRequestFullscreen();
            }
             console.log(2)
          }
          state.fullscreen = !state.fullscreen;
 
      }
</script>

<style lang="less" scoped>

</style>