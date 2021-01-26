<template>
  <!-- 推荐商品 -->
  <div
    class="RecommendedGoodsList"
    :style="`width:${objList.width || '100%'};height:${
      objList.height || '200px'
    }`"
  >
    <div class="text">
      <span>推荐商品</span>
    </div>
    <div class="main">
      <template v-for="(item, index) in objList.data">
        <div :key="index" class="box-mian">
          <div class="imgtab">
            <img class="imglist" @click="skipOpen(item.tourl)" v-if="item.imgurl" :src="item.imgurl" alt="">
            <div class="isimg" v-else>
               <Icon type="ios-basket" />
            </div>
          </div>
          <div class="text" v-if="item.text"> {{item.text}} </div>
          <div class="totext" v-else></div>
          <div class="foot" v-if="item.price"> ￥{{item.price}}</div>
          <div v-else class="tofoot"></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendedGoodsList",
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
.totext{
  width: 100%;
  height: 40px;
  background: #f2f2f2;
}
.tofoot{
    width: 100%;
  height: 18px;
  background: #f2f2f2;
}
.isimg{
  width: 100%;
  height: 100%;
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(97,165,255,.7);
  background: #f2f2f2;
}
.imglist{
  width: 100%;
  height: 100%;cursor:pointer;
}
.RecommendedGoodsList {
  // height: 100px;
  // width: 100%;
  background: #fff;
  > div {
    width: 100%;
    

    box-sizing: border-box;
  }
  .text {
    height: 25px;
    position: relative;
    > span {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 16px;
      // padding: 8px 15px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.8);
      color: #fff;
      z-index: 3;
    }
  }
  .main {
    height: calc(100% - 25px);
    display: flex;
    justify-content: space-between;
    > div {
      height: 100%;
      width: calc(20% - 12px);
      // border: 1px solid springgreen;
      padding: 0 10px;
      display: flex;
      flex-wrap:wrap;
      text-align: center;
      justify-content: center;
      align-content: space-around;
    }
    .box-mian{
      background: #fff;
     .imgtab{
       width: 100%;
       height: 130px;
     }
     .text{
       width: 100%;
           height: 40px;
    font-size: 14px;
    color: #333;
    line-height: 20px;
    overflow: hidden;
     }
     .foot{
       height: 18px;font-size: 18px;
    color: #ff0036;
    line-height: 18px;
     }
    }
  }
}
</style>