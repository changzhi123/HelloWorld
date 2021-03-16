<template>
  <div class="AppHeader">
      <headeRsubject class="headeRsubject"/>
      <headerSuffix class="headerSuffix"/>
  </div>
</template>

<script setup>
import headeRsubject from './headeRsubject.vue';
import headerSuffix from './headerSuffix.vue'
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