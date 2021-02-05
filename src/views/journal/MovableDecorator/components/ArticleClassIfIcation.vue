<template>
  <div
    class="ArticleClassIfIcation"
    :style="`max-width:${objList.width || '100%'};
  min-height:${objList.height || '100px'}`"
  >
    <div class="img-list" v-for="(item, index) in objList.data" :key="index">
      <img
        class="imgurl"
        @click="skipOpen(item.tourl)"
        :src="item.imgurl"
        v-if="item.imgurl"
        alt=""
      />
      <div class="imgurl" v-else><Icon type="ios-image-outline" /></div>
      <h3 class="imgh3" v-if=" item.name">{{ item.name }}</h3>
      <div class="imgh3" style="padding: 3px 10px;" v-else><div></div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleClassIfIcation",
  data() {
    return {};
  },
  props: {
    objList: {
      type: Object,
      default: () => ({}),
    },
    isWindowsOpen: {
      type: Boolean,
      defaule: true,
    },
  },
  methods: {
    skipOpen(tourl) {
      if (this.isWindowsOpen && tourl) window.open(tourl);
    },
  },
};
</script>

<style lang="scss" scoped>
.ArticleClassIfIcation {
  width: 100%;
  // border:  solid 1px #ccc;
  display: flex;
  background: #fff;
  justify-content: space-around;
  .img-list {
    width: 20%;
    height: 100%;
    // border:  solid 1px #ccc;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    align-content: center;
    .imgurl {
      width: 50px;
      margin: auto;
      height: 50px;
      border-radius: 50%;
      font-size: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(97, 165, 255, 0.7);
    }
    .imgh3 {
      font-size: 16px;
      // font-weight:600;
      color: #000;
      width: 100%;
      height: 25%;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      box-sizing: border-box;
      >div{
          width: 100%;
          height: 100%;
          background:rgba(97, 165, 255, 0.7) ;
          
      }
    }
  }
}

</style>