<template>
  <div class="rootBody">
    <router-view/>
  </div>
</template>

<script setup>
// import {
//   // ref,
//   toRefs,
//   reactive,
//   // computed,
//   onMounted,
//   // onUpdated,
//   // onUnmounted,
//   // onRenderTracked,
//   // onRenderTriggered,
//   // defineComponent
// } from 'vue'
// import { useStore } from 'vuex'
// import { useRouter, useRoute } from 'vue-router'
// import { projectName } from '@/utils/keyName.js'
// import { getCurrentInstance,toRaw } from 'vue'
// export default {
//   name: 'App',
//   components: {
//     AppHeader,
//   },
//   setup(props, res) {
//       const { ctx } = getCurrentInstance()
//     const router = useRouter()
//     const route = useRoute()
//     const store = useStore()
//     const state = reactive({})
//     console.log(router,route,'路由信息',ctx.$router.currentRoute.value,route.path,)
//     onMounted(() => {
//       const modules = import.meta.glob('./assets/images/*.jpg')
//       const modulesaa = import.meta.globEager('./assets/images/*.jpg')
//       console.log(modules, 'modules',modulesaa)
      
//       Object.keys(modules).filter((key) => {
//         console.log(modules[key]) // 获取到属性对应的值，做一些处理
//       })
//     })
//     return {
//       ...toRefs(state),
//       // count: computed(() => store.state.count),
//       // increment: () => store.commit('increment'),
//       // asyncIncrement: () => store.dispatch('asyncIncrement')
//     }
//   },
// }
</script>
<style lang="less" scoped>

</style>