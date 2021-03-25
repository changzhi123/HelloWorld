<template>
  <div>user

    <!-- <h2>{{state.count}}</h2> -->
    <button>按钮</button>
  </div>
</template>

<script setup>

// const state = reactive({ count: 123 });
// formatDate(new Date().getTime(),'YYYY-MM-DD HH:mm')
// reminder('错误',{type:'error',duration:2,onClose:()=>{
//   console.log(123456)
// }})
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

<style>

</style>