<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!--<router-view :key="key" />-->
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  computed: {
    cachedViews() {
      console.log(this.$store.state.tagsView.cachedViews,'this.$store.state.tagsView.cachedViews')
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      console.log(this.$route.path,'this.$route.path')
     return this.$route.path
    }
  },
 
};
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  // background-color: #f0f2f5;
  & div {
    padding: 20px;
  }
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 90 = navbar + tags-view = 50 + 40 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// 修正了开放el-dialog中的css样式错误
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
