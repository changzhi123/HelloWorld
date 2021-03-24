<template>
<a-config-provider :locale="state.locale"> 
   <router-view />
    </a-config-provider>
</template>

<script setup>
import {reactive} from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUS from 'ant-design-vue/es/locale/en_US';
const state = reactive({
  locale: zhCN,
})
import {reminder,formatDate}from '@/utils/index.js'
</script>

<style>
#app {}
</style>