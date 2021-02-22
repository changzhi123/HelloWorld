<template>
  <router-view></router-view>
</template>

<script>
  import {
    //   ref,
    toRefs,
    reactive,
    //   computed,
    onMounted,
    //   onUpdated,
    //   onUnmounted,
    //   onRenderTracked,
    //   onRenderTriggered,
    // defineComponent
  } from "vue";
  import { useStore  } from 'vuex'
  export default {
    name: "App",
    components: {},
    setup() {
      const store=useStore()
      const state = reactive({});
      onMounted(() => {
        console.log(process.env, '当前环境',store.state.user)
      });
      return {
        ...toRefs(state),
        // count: computed(() => store.state.count),
        // increment: () => store.commit('increment'),
        // asyncIncrement: () => store.dispatch('asyncIncrement')
      };
    },

  };
</script>
<style scoped>

</style>