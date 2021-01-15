<template>
  <!--  轮播 (普通数组)-->
  <div
    class="CarouselImg"
    :style="`width:${styles.width || '100%'};height:${
      styles.height || '200px'
    };`"
  >
  <Carousel
      loop class="imgbode"
      :autoplay="setting.autoplay"
      :autoplay-speed="setting.autoplaySpeed"
      :dots="setting.dots"
      :radius-dot="setting.radiusDot"
      :trigger="setting.trigger"
      :arrow="setting.arrow"
    >
      <CarouselItem v-for="(item, index) in arrList" :key="index" :style="`height:${styles.height || '200px'}`">
        <img class="imags" v-if="item.imgurl" :src="item.imgurl" alt="" />
        <div v-else class="imgput"><Icon type="ios-image" /></div>
      </CarouselItem>
    </Carousel>
    <!-- <div class="open-list"></div> -->
 
  </div>
</template>

<script>
export default {
  name: "CarouselImg",
  components:{
  },
  data() {
    return {
      setting: {
        autoplay: false,
        autoplaySpeed: 3000,
        dots: "inside",
        radiusDot: false,
        trigger: "click",
        arrow: "hover",
      },
     
    };
  },
 
  props: {
  
 styles: {
      type: Object,
      default:()=>({}),
    },
    arrList:{
      type:Array,
      default:()=>([]),
    },
    objList:{
        type: Object,
      default:()=>({}),
    }
   
  },
  methods:{
   
  },
};
</script>

<style lang="scss" scoped>

.imgput{
   height: 100%;
  width: 100%;
  box-sizing: border-box;
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;    color: rgba(97,165,255,.7);
}
.CarouselImg {
  // height: 100px;
  // width: 100%;
  // background: chartreuse;
  position: relative;
  box-sizing: border-box;
  .imgbode {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }
}

.imags {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
</style>