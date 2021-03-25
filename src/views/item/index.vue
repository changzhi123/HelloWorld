<template>
  <div>item
  <HelloWorld msg='HelloWorld'></HelloWorld>
  <test @myclick='myclick' ref="tests"></test>
   <a-button type="primary" @click="onclick">调用子组件的方法</a-button>
  </div>
</template>

<script  setup>
import { defineProps, reactive,defineEmit, useContext ,ref} from "vue";
import  HelloWorld from "./HelloWorld.vue";
import test from './test.vue'
function myclick(){
  console.log('我被子组件触发了')
}
const tests=ref(null)
console.log(tests,'refs的使用')
function onclick(){
  tests.value.setMap()
}
</script>



<style>

</style>