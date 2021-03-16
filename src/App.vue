<template>
  <div class="rootBody">
    <!-- <AppHeader></AppHeader>
    <div class="AppMain">
      <router-view></router-view>
    </div> -->
    <!-- <Layout/> -->
    <router-view/>
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader/index.vue'
import Layout from '@/components/Layout/index.vue';
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
.rootBody {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background: #f5f5f5;
  .AppMain {
    width: 100%;
    padding-top: 50px;
    height: 100vh;
    box-sizing: border-box;
    > div {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }
  }
}
</style>