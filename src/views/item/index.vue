<template>
  <div>item
  <HelloWorld msg='HelloWorld'></HelloWorld>
  <test></test>
  </div>
</template>

<script>
import  HelloWorld from "./HelloWorld.vue";
import test from './test.vue'
export default {
  components: {
    HelloWorld,test
  }
}
</script>



<style>

</style>