<template>
<!-- login -->
  <div>
    login
    <a-button
      type="primary"
      @click="
        $store.dispatch('user/setLogin', {
          username: 'changzhi',
          password: '123456adc',
        })
      "
      >登陆</a-button
    >
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
  onRenderTriggered,
} from "vue";
export default {
  setup(){
      const state = reactive({
          
      })
      return{
          state,
      }
  }
};
</script>

<style>
</style>