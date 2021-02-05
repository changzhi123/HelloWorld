<template>
  <!-- 多图(2-3) -->
  <div
    class="MultipleImg2_3"
    :style="`max-width:${objList.width || '100%'};height:${
      objList.height || '200px'
    }`"
  >
    <div class="tab-a">
      <template v-for="(item, index) in objList.data">
        <div class="box-a" :key="index" v-if="index == 0">
          <img class="images"  @click="skipOpen(item.tourl)" :src="item.imgurl" alt="" v-if="item.imgurl" />
          <div v-else class="View_imgItem_3Lvk6" style="padding: 15px 0 0 0;" >
           <div><Icon type="md-image" /></div>
          </div>
        </div>
        <div class="box-b" :key="index" v-if="index == 1">
          <img class="images" @click="skipOpen(item.tourl)" :src="item.imgurl" v-if="item.imgurl" alt="" />

          <div v-else class="View_imgItem_3Lvk6" style="padding: 15px 0 0 0;">
            <div><Icon type="md-image" /></div>
          </div>
        </div>
      </template>
     
    </div>
    <div class="tab-b">
      <template v-for="(item, index) in objList.data">
        <div :key="index" v-if="index != 0 && index != 1">
          <img class="images" @click="skipOpen(item.tourl)" :src="item.imgurl" v-if="item.imgurl" alt="" />
          <div v-else class="View_imgItem_3Lvk6" style="padding: 0px 0 15px 0;">
           <div><Icon type="md-image" /></div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultipleImg2_3",
  data() {
    return {
     
    };
  },
  props: {
    isWindowsOpen:{
      type:Boolean,
      defaule:true
    },
    objList:{
        type: Object,
      default:()=>({}),
    }
  },
  methods: {
    skipOpen(tourl){
       if(this.isWindowsOpen&&tourl)window.open(tourl)
     },
  },
};
</script>
<style lang="scss" scoped>
.View_imgItem_3Lvk6 {
  width: 100%;
  height: 100%;
  
  
  font-size: 50px;
  color: rgba(97, 165, 255, 0.7);
  box-sizing: border-box;
  >div{ width: 100%;
  box-sizing: border-box;
  height: 100%;
display: flex;
  justify-content: center;
  align-items: center;
  background: #f2f2f2;
  }
}
.MultipleImg2_3 {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  align-content: space-between;
  > div {
    height: 48.5%;
    width: 100%;

    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }

  .tab-a {
    > div {
      height: 100%;
      box-sizing: border-box;
    }
    .box-a {
      width: 66%;
    }
    .box-b {
      width: 32%;
    }
  }
  .tab-b {
    > div {
      width: 32%;
      box-sizing: border-box;
    }
  }
}
.images {
  width: 100%;
  height: 100%;cursor:pointer;
}
</style>