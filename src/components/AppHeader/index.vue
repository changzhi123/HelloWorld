<template>
  <!-- AppHeader 头部组件-->
  <div class="AppHeader">
    <div class="headerContent">
      <headerPrefix />
      <headeRsubject />
      <headerSuffix />
    </div>
  </div>
</template>

<script>
import headerPrefix from './headerPrefix.vue'
import headeRsubject from './headeRsubject.vue'
import headerSuffix from './headerSuffix.vue'
import {
  toRefs,
  reactive,
  onMounted,
} from "vue";
export default {
  components:{
    headerPrefix,headerSuffix,headeRsubject
  },
  setup(props, ctx) {
    const state = reactive({});
    onMounted(() => {});
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less" scoped>
.AppHeader {
  width: 100%;
  height: 64px;
  position: fixed;
  top: 0;
  background: #fff;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,.08);
  .headerContent {
    height: 100%;
    margin: 0 auto;
    width: 1200px;
    display:flex;
    justify-content: space-between;
    >div{
      height: 100%;
    }
    >div:nth-child(2){
      flex: 1;
    }
    >div:nth-child(2n-1){
      min-width: 15%;
    }
  }
}

</style>