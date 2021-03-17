<template>
  <div class="AppHeader">
      <headeRsubject class="headeRsubject"/>
      <headerSuffix class="headerSuffix"/>
  </div>
</template>

<script setup>
import headeRsubject from './components/headeRsubject.vue';
import headerSuffix from './components/headerSuffix.vue'
</script>
<style lang="less" scoped>
.AppHeader{
    display: flex;
    .headeRsubject{
        flex: 1;
    }
    .headerSuffix{
        padding-right: 15px;
    }
}
</style>