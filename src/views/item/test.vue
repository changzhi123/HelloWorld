<template>
  <div>
    <h1>{{ state.count }}</h1>
    <h3>{{state.text}}</h3>
    <h3>{{msg}}</h3>
    <h3>{{res}}</h3>
  </div>
</template>

<script setup>
import { defineProps, reactive } from "vue";
import { useStore } from "vuex";
const store = useStore();
defineProps({
  msg: {
    type:String,
    default:'中国'
  },
});
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