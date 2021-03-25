<template>
  <div class="headerPrefix">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="item in state.routeArr" :key="item.name">
        <router-link :to="item.children&&item.children.length&&item.name!='Layout'?'':item.path">
          <a href="javascript:;" id="more">{{ item.meta.title }}</a>
        </router-link>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script setup>
import { toRefs, reactive, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const state = reactive({
  routeArr: computed(() => {
    const list = route.matched || [];
    return list;
  }),
});
onMounted(() => {
  // console.log(route.matched, "route.path");
});
</script>
<style lang="less" scoped>
.headerPrefix {
  min-width: 100px;
  height: 100%;
  // border: 1px solid #ccc;
  display: flex;
  align-items: center;
}
</style>