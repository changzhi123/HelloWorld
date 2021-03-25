<template>
  <component v-if="icon" :is="icon"/>
  <span>{{title}}</span>
</template>

<script setup>
import { defineProps, reactive } from 'vue'
defineProps({
  icon: {
    type: String,
    default: '',
  },
  title:{
    type: String,
    default: '',
  },
})
const state = reactive({})
</script>

<style lang="less" scoped>

</style>