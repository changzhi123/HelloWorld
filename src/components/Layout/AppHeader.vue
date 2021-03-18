<template>
  <div class="AppHeader">
      <headerPrefix class="headerPrefix"/>
      <headerRsubject class="headeRsubject"/>
      <headerSuffix class="headerSuffix"/>
  </div>
</template>

<script setup>
import headerPrefix from './components/headerPrefix.vue'
import headerRsubject from './components/headerRsubject.vue';
import headerSuffix from './components/headerSuffix.vue'
</script>
<style lang="less" scoped>
.AppHeader{
    display: flex;
    .headerPrefix{
        
    }
    .headeRsubject{
        flex: 1;
    }
    .headerSuffix{
        padding-right: 15px;
    }
}
</style>