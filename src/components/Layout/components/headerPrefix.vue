<template>
  <div class="headerPrefix">
     <a-breadcrumb>
    <a-breadcrumb-item>Home</a-breadcrumb-item>
    <a-breadcrumb-item><a href="">Application Center</a></a-breadcrumb-item>
    <a-breadcrumb-item><a href="">Application List</a></a-breadcrumb-item>
    <a-breadcrumb-item>An Application</a-breadcrumb-item>
  </a-breadcrumb>
  </div>
</template>

<script setup>
import { toRefs, reactive, computed ,onMounted} from 'vue'
import { useRoute } from 'vue-router'
const route=useRoute()
const state=reactive({})
onMounted(()=>{

console.log(route,'route.path')
})


</script>
<style lang="less" scoped>
.headerPrefix{
min-width: 100px;
height: 100%;
border: 1px solid #ccc;
display: flex;
align-items: center;
}
</style>