<template>
  <div class="rootBody">
    <AppHeader></AppHeader>
    <div class="AppMain">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader/index.vue";
import {
  // ref,
  toRefs,
  reactive,
  // computed,
  onMounted,
  // onUpdated,
  // onUnmounted,
  // onRenderTracked,
  // onRenderTriggered,
  // defineComponent
} from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import {projectName} from '@/utils/keyName.js'
export default {
  name: "App",
  components: {
    AppHeader,
  },
  setup(props,ctx) {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const state = reactive({});
    onMounted(() => {
      // console.log(  store.state.user,ctx,projectName,"当前环境",process.env);
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
<style lang="less" scoped>
.rootBody {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background: #f5f5f5;
  .AppMain {
    width: 100%;
    padding-top: 64px;
    height: 100vh;
    box-sizing: border-box;
    >div{
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }
  }
}
</style>