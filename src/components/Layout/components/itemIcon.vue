<template>
  <component :is="icon"/>
</template>

<script setup>
import { defineProps, reactive } from 'vue'
defineProps({
  icon: {
    type: String,
    default: '',
  },
})
const state = reactive({})
</script>

<style lang="less" scoped>

</style>