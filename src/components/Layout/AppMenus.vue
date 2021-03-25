<template>
  <a-menu
    theme="dark"
    mode="inline"
    v-model:selectedKeys="state.selectedKeys"
    v-model:openKeys="state.openKeys"
    @select="selectGoto"
  >
    <!-- 二级菜单 -->
    <template v-for="item in state.menusList" :key="item.name">
      <template v-if="item.children">
        <a-sub-menu :key="item.path">
          <template #title>
            <span>
              <itemIcon :icon="item.meta.icon" />
              <span>{{ item.meta.title }}</span>
            </span>
          </template>
          <a-menu-item :key="v.path" v-for="v in item.children">
            <itemIcon :icon="v.meta.icon" />
            <span> {{ v.meta.title }}</span>
          </a-menu-item>
        </a-sub-menu>
      </template>
     <!-- 一级菜单 -->
      <template v-else>
        <a-menu-item :key="item.path">
          <itemIcon :icon="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
      </template>
    </template>
  </a-menu>
</template>

<script setup>
import itemIcon from "./components/itemIcon.vue";
import { reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
const store = useStore();
const router = useRouter();
const route = useRoute();
const state = reactive({
  selectedKeys: [], //设置默认选中菜单
  menusList: computed(() => {
    const arr = [];
    store.getters.addRoutes.filter((item) => {
      if (item.children) arr.push(...fliterRouter(item.children));
    });
    return arr;
  }),
  openKeys: [], //设置默认展开子菜单
});
onMounted(() => {
  selected();
});
function selected() {//设置默认展开菜单和默认选择菜单
  const path = route.path,
    matched = route.matched;
  state.selectedKeys = [path];
  matched.filter((item, index) => {
    if (item.path == path) state.openKeys = [matched[index - 1].path];
  });
}
function fliterRouter(data) {
  const arr = [];
  data.filter((item) => {
    if (!item.display) return;
    const obj = item;
    if (item.children) obj.children = [...fliterRouter(item.children)];
    arr.push(obj);
  });
  return arr;
}
function selectGoto(e) {
  //菜单切换
  router.push(e.key);
  // console.log(e, 'e')
}
</script>

<style>
</style>