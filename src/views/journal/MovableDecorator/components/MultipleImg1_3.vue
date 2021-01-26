<template>
  <!-- 多图(1-3) -->
  <div
    class="MultipleImg1_3"
    :style="`width:${objList.width || '100%'};height:${
      objList.height || '200px'
    };`"
  >
    <div>
      <img class="images" @click="skipOpen(objList.data[0].tourl)"  v-if="objList.data[0].imgurl" :src="objList.data[0].imgurl" alt="" />
      <div class="imgset" v-else>
            <Icon type="md-image" />
      </div>
    </div>
    <div class="imglist">
      <template v-for="(item, index) in objList.data">
        <div :key="index" v-if="index!=0">
          <img class="images" @click="skipOpen(item.tourl)" :src="item.imgurl" v-if="item.imgurl" alt="" />
          <div class="imgset" v-else>
            <Icon type="md-image" />
          </div>
        </div>
      </template>

    
    </div>
  </div>
</template>

<script>
export default {
  name: "MultipleImg1_3",
  data() {
    return {
    
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
  methods: {
     skipOpen(tourl){
       if(this.isWindowsOpen&&tourl)window.open(tourl)
     },
  },
};
</script>
<style lang="scss" scoped>
.images {
  width: 100%;
  height: 100%;cursor:pointer;
}
.imgset{
  width: 100%;
  height: 100%;
  background: #f2f2f2;
  font-size: 50px;
  display: flex; color: rgba(97, 165, 255, 0.7);
  justify-content: center;
  align-items: center;
}
.MultipleImg1_3 {
  // height: 100px;
  // width: 100%;
  background: #fff;
  // background: chartreuse;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  > div {
    height: 48.5%;
    width: 100%;
    // border: solid 1px springgreen;
  }
  .imglist {
    display: flex;
    justify-content: space-between;
    > div {
      width: 32%;
      height: 100%;
    }
  }
}
</style>