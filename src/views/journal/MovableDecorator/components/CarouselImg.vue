<template>
  <!--  轮播 (普通数组)-->
  <div
    class="CarouselImg"
    :style="`max-width:${objList.width||'100%'};`"
  >
  <Carousel
      loop class="imgbode"
      :autoplay="objList.data.length>1?setting.autoplay:false"
      :autoplay-speed="setting.autoplaySpeed"
      :dots="setting.dots"
      :radius-dot="setting.radiusDot"
      :trigger="setting.trigger"
      :arrow="setting.arrow"
    >
      <CarouselItem v-for="(item, index) in objList.data" :key="index" 
       :style="`height:${objList.height||'200px'}`">
        <img class="imags" @click="skipOpen(item.tourl)" v-if="item.imgurl"
         :src="item.imgurl" alt="" />
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
    objList:{
        type: Object,
      default:()=>({}),
    },
    isWindowsOpen:{
      type:Boolean,
      defaule:true
    }
   
  },
  methods:{
     skipOpen(tourl){
       if(this.isWindowsOpen&&tourl)window.open(tourl)
     }
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

.imags {
  height: 100%;
  width: 100%;
  box-sizing: border-box;cursor:pointer;
}
</style>