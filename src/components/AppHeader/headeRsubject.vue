<template>
  <!-- 主体 -->
  <div class="headeRsubject">
    <div
      :class="{ RsubjectTag: true, highlight: isRouter == item.path }"
      v-for="(item, index) in navigation"
      :key="index"
    >
      <router-link
        :to="item.path"
        :style="`color:${isRouter == item.path ? '#2d8cf0' : '#000'};`"
      >
        {{ item.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { toRefs, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  setup(props, ctx) {
    const route = useRoute();
    const store = useStore();
    const state = reactive({
      List: [
        {
          name: "首页",
          path: "/",
        },
        {
          name: "应用中心",
          path: "/apply",
        },
        {
          name: "个人中心",
          path: "/user",
        },
        
      ],
      isUserInfo: computed(() => store.getters.userInfo), //没有登陆不展示导航拦
      isRouter: computed(() => route.path), //获取当前路由，高亮导航栏
      navigation: computed(() => {
        //赛选是否有权限展示
        const arr = [];
        state.List.filter((item) => {
          if (!state.isUserInfo) return;
          arr.push(item);
        });
        return arr//.reverse();
      }),
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less" scoped>
.headeRsubject {
  display: flex;
  justify-content:flex-end;
  padding: 0 10px;
  .RsubjectTag {
    min-width: 20px;
    height: 100%;
    padding: 0 15px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .item {
      color: #333;
    }
    &:hover .item {
      color: #2d8cf0;
    }
  }
}
.highlight {
  border-top: 3px solid #2d8cf0;
}
</style>