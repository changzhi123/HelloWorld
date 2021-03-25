<template>
  <div>
    <h1>{{ state.count }}</h1>
    <h3>{{state.text}}</h3>
    <h3>{{msg}}</h3>
    <h3>{{res}}</h3>
    <a-button type="primary" @click="onclick">调用父组件的方法</a-button>
  </div>
</template>

<script setup>
import { defineProps, reactive,defineEmit, useContext } from "vue";
import { useStore } from "vuex";
const store = useStore();
const props= defineProps({
  msg: {
    type:String,
    default:'中国'
  },
});
console.log(props,'props')

const ctx=useContext()
console.log(ctx,'ctx')

ctx.expose({
  setMap(){
    console.log('我是子组件暴露给父组件的方法')
  }
})


const emit= defineEmit(['myclick'])
function onclick(){
  // emit('myclick')
  ctx.emit('myclick')
}
const state = reactive({
  count: 0,
  text: "新写法",
  res:'res'
});
let {res}=state
res+='123'
console.log(state.count,'state.count',store.getters.userInfo)
</script>

<style>
</style>