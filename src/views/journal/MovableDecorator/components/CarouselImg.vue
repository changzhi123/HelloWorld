<template>
  <!--  轮播 (普通数组)-->
  <div class="CarouselImg" :style="style" >
    <div :style="style2">
      <Carousel
        loop
        class="imgbode"
        :autoplay="objList.data.length > 1 ? setting.autoplay : false"
        :autoplay-speed="setting.autoplaySpeed"
        :dots="setting.dots"
        :radius-dot="setting.radiusDot"
        :trigger="setting.trigger"
        :arrow="setting.arrow"
      >
        <CarouselItem
          v-for="(item, index) in objList.data"
          :key="index"
          :style="height"
        >
          <img
            class="imags-carousel"
            @click="skipOpen(item.tourl)"
            v-if="item.imgurl"
            :src="item.imgurl"
            alt=""
          />
          <div v-else class="imgput"><Icon type="ios-image" /></div>
        </CarouselItem>
      </Carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: "CarouselImg",
  components: {},
  computed: {
    style() {
      let imgurl = `url('${this.objList.backgroundImg}') 100% 100% no-repeat`;
      return {
        maxWidth: this.objList.width || "100%",
        background: this.objList.backgroundImg
          ? imgurl
          : this.objList.backgroundColor,
        padding: this.objList.padding + "px",
         backgroundSize: "cover",
        backgroundAttachment: "fixed",
      };
    },
    style2() {
      return {
        borderRadius: this.objList.borderRadius + "px",
        overflow: "hidden",
        width: "100%",
      };
    },
    height() {
      return {
        height: this.objList.height || "200px",
      };
    },
  },
  data() {
    return {
      setting: {
        autoplay: true,
        autoplaySpeed: 3000,
        dots: "inside",
        radiusDot: false,
        trigger: "click",
        arrow: "hover",
      },
    };
  },
  props: {
    objList: {
      type: Object,
      default: () => ({}),
    },
    isWindowsOpen: {
      type: Boolean,
      default: true,
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
.imgput {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(97, 165, 255, 0.7);
}
.CarouselImg {
  // height: 100px;
  overflow: hidden;
  width: 100%;
  // background: chartreuse;
  position: relative;
  box-sizing: border-box;
  .imgbode {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }
}

.imags-carousel {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
}
</style>