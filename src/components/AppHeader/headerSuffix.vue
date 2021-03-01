<template>
  <!-- 后缀 -->
  <div class="headerSuffix">
    <!-- 没有登陆 -->
    <div v-if="!userInfo" class="noLoign">
      <router-link to="/login" class="a-text"> 注册</router-link>
      <router-link to="/login" class="a-text a-text-to">登陆</router-link>
    </div>
    <!-- 已登录 -->
    <div v-else class="yeLogin">
      <img class="yeLogin-imgs" :src="userInfo.avatar"  href="javascript:;"  alt="" />
      <a-dropdown >
        <a class="ant-dropdown-link" @click.prevent>
          {{ userInfo.nickname }}
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;" @click="logout">退出</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import { toRefs, reactive, computed } from "vue";
import { useStore } from "vuex";
import { DownOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
export default {
  components: {
    DownOutlined,
  },
  setup(props, ctx) {
    const router = useRouter();
    const store = useStore();
    const state = reactive({});
    //退出登陆
    function logout() {
      store.dispatch("user/logout").then(() => {
        router.push("/login");
      });
    }
    return {
      userInfo: computed(() => store.getters.userInfo),
      ...toRefs(state),
      logout,
    };
  },
};
</script>

<style lang="less" scoped>
.headerSuffix {
  > div {
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  .noLoign {
    line-height: 14px;
    .a-text {
      color: #333;
      padding: 0 5px;
      &:hover {
        color: #2d8cf0;
      }
    }
    .a-text-to {
      border-left: 2px solid #ccc;
    }
  }
  .yeLogin {
    color: #333;

    .yeLogin-imgs {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin: 0 10px;
    }
  }
}
</style>