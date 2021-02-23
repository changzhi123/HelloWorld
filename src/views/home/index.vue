<template>
  <!-- <div>
    <a-button type="primary" @click="$store.dispatch('user/delDatas')">清楚</a-button>
    hone
     <a-button type="primary" @click="()=>{console.log($router.getRoutes(),'router.getRoutes()',$store.state.user.userInfo)}">查看</a-button>
     <a-button type="primary" @click="$router.push('/text')">text</a-button>
     <a-button type="primary" @click="$router.push('/item')">item</a-button>
     <a-button type="primary" @click="$router.push('/toDoList')">toDoList</a-button>
  </div> -->
  <div class="home">home</div>
</template>

<script>
 import {
    //   ref,
    toRefs,
    reactive,
    onMounted,
  } from "vue";
export default {
  name: "home",
  setup() {
      const state = reactive({});
      onMounted(() => {
      });
      return {
        ...toRefs(state),
      };
    },
  
};
</script>

<style lang="less" scoped>
.home{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #f5f5f5;
}
</style>