<template>
  <div>
    <a-button type="primary" @click="set">清楚</a-button>
    hone
  </div>
</template>

<script>
import {setCookies,getCookies,delCookies}from '/@/utils'
import kenName from '/@/utils/keyName'
export default {
  name: "home",
  data() {
    return {};
  },
  mounted() {
  },
  methods: {
    set(){
      delCookies(kenName.token,'')
       delCookies(kenName.userInfo,'')
    }
  },
};
</script>

<style>
</style>