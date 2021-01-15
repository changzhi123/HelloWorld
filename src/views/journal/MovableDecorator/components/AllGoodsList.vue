<template>
  <!-- 全部商品 -->
  <div
    class="AllGoodsList"
    :style="`width:${styles.width || '100%'};min-height:${
      styles.height || '500px'
    };`"
  >
  <div class="heida">
    <span>全部商品</span>
  </div>
    <div
      v-for="(item, index) in arrList"
      :key="index"
      class="boximg"
      :style="`height:calc(${styles.height || '500px'} / 2);`"
    >
      <div class="imglist">
        <img :src="item.imgurl" v-if="item.imgurl" alt="" />
        <div class="imgopen" v-else>
          <Icon type="ios-basket" /></div>
      </div>
      <div class="tab" v-if="item.text">{{ item.text }}</div>
      <div class="totab tab" v-else></div>
      <div class="foo" v-if="item.price">￥{{ item.price }}</div>
      <div class="tofoo foo" v-else></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AllGoodsList",
  data() {
    return {
      
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
  methods: {},
};
</script>

<style lang="scss" scoped>
.imgopen{
  width: 100%;
  height: 100%;
  font-size: 50px;  color: rgba(97,165,255,.7);
  box-sizing: border-box;
  
    display: flex;
    justify-content: center;
    align-items: center;
  background: #f2f2f2;
    height: 100%;
}
.totab{
  height: 40px;
  width: 100%;
  background: #f2f2f2;
}
.tofoo{
  height: 18px ;
  width: 100%;
  background: #f2f2f2;
}
.heida{
  height: 25px;
  width: 100%;
  // border: springgreen 1px solid;
  position: relative;
  >span{
        position: absolute;
    top: 0;
    right: 0;
    font-size: 16px;
    border-radius: 4px;
    background: rgba(0,0,0,.8);
    color: #fff;
    z-index: 3;
  }
}
.AllGoodsList {
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0px 0 0 0;
  .boximg {
    width: 18.5%;
    padding: 2% 10px 0px 10px;
    // border: chartreuse 1px solid;
    box-sizing: border-box;
    text-align: center;
    background: #fff;
    margin-bottom: 15px;
    .imglist {
      width: 100%;
      height: 130px;
      > img {
        width: 100%;
        height: 100%;
      }
    }

    .tab {
      width: 100%;
      height: 40px;
      font-size: 14px;
      color: #333;
      line-height: 20px;
      overflow: hidden;
      margin: 15px auto;
    }
    .foo {
      font-size: 18px;
      color: #ff0036;
      line-height: 18px;
      margin: 10px auto;
      text-align: center;
    }
  }
}
</style>