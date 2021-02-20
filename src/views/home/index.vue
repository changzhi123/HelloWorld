<template>
  <div>
    <a-button type="primary" @click="set">Primary</a-button>
    hone
  </div>
</template>

<script>
import {setCookies,getCookies,delCookies}from '/@/utils'
export default {
  name: "home",
  data() {
    return {};
  },
  mounted() {
  },
  methods: {
    set(){
      setCookies('name','changzhi')
    }
  },
};
</script>

<style>
</style>