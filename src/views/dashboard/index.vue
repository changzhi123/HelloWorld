<template>
  <div>index\
    <a-calendar style="width:500px;" v-model:value="state.value" @panelChange="onPanelChange" />
  </div>
</template>

<script setup>
import {reactive} from 'vue'
const state = reactive({
   value:null
})
function onPanelChange(e){
  console.log(e)
}
</script>

<style>

</style>