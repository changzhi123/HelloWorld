<template>
  <div>text
    <div class="box">
      <!-- <a-input class="imptu" v-model:value="state.num1" @keyup="add()" placeholder="Basic usage" /><span>+</span>
      <a-input class="imptu" v-model:value="state.num2" @keyup="add()" placeholder="Basic usage" /><span>=</span> -->
      <a-input class="imptu" v-model="state.num1" placeholder="Basic usage" /><span>+</span>
      <a-input class="imptu" v-model="state.num2" placeholder="Basic usage" /><span>=</span>
      {{state.res}}
      <subassembly :msg="123" @set='set'></subassembly>
    </div>
  </div>
</template>

<script>
  import {
    ref,
    reactive,
    computed,
    onMounted,
    onUpdated,
    onUnmounted,
    onRenderTracked,
    onRenderTriggered
  } from 'vue'

  import subassembly from './subassembly.vue';
  export default {
    name: '',
    components: {
      subassembly
    },
    // setup() { //第一种方法
    //   const num1 = ref(0)
    //   const num2 = ref(0)
    //   const res = ref(0)

    //   function add() {
    //     res.value = parseInt(num1.value) + parseInt(num2.value)
    //   }
    //   return {
    //     num1,
    //     num2,
    //     res,
    //     add
    //   }
    // }
    setup() { //第二种
      const state = reactive({
        num1: 0,
        num2: 0,
        res: computed(() => parseInt(state.num1) + parseInt(state.num2))
      })
      const set = (val) => {
        console.log(val, 'val')
      }
      //生命周期
      onMounted(() => {
        console.log('onMounted挂载')
      })
      onUpdated(() => {
        console.log('onUpdated更新')
      })
      onUnmounted(() => {
        console.log('onUnmounted')
      })
      onRenderTracked((e)=>{
        console.log('onRenderTracked主要检查那个依赖性导致组件从新渲染',e)
      })
      onRenderTriggered((e)=>{
        console.log('onRenderTriggered',e)
      })
      return {
        set,
        state
      }
    }

  }
</script>

<style>
  .box {
    width: 100%;
    display: flex;
  }

  .imptu {
    width: 100px;
  }
</style>