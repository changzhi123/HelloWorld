<template>
  <!-- 分类管区 -->
  <div class="CategoryGoods" :style="style">
    <div class="tab">
      <i class="View_colorMark_rhgAb"></i>
      <span class="View_title_2mual">{{objList.name}}</span>
      <span class="View_subTitle_27eKa">{{objList.text}}</span>
    </div>
    <div class="main">
      <div class="main-a">
        <img class="images"  v-if="objList.list[0].imgurl" :src="objList.list[0].imgurl" alt="">
        <div class="isimg" v-else>
          <div><Icon type="md-image" /></div>
        </div>
        <div class="View_bannerText_2SLqV">
          <span class="View_bannerTitle_1gQsW">{{objList.advertising}}</span>
          <span class="View_bannerSubTitle_2K3Zh">{{objList.toAdvertising}}</span>
          </div>
          <div class="icon-trxxt">
            <img class="images" @click="skipOpen(objList.list[0].tourl)" src="https://img.alicdn.com/tfs/TB1IQBtXaagSKJjy0FbXXa.mVXa-68-68.png" alt="">
          </div>
      </div>
      <div class="main-b">
        <div v-for="(item,index) in objList.data" :key="index" class="tab-img">
          <div class="img-div">
            <img class="images" @click="skipOpen(item.tourl)" v-if="item.imgurl" :src="item.imgurl" alt="">
             <Icon v-else type="ios-basket" class="skeleton-goods-img-icon" />
          </div>
          <div class="View_goodsTitle_1oYUy" v-if="item.text"> {{item.text}} </div>
          <div class="tomain" v-else></div>
          <div class="View_goodsPrice_1uqZX" v-if="item.price"> ￥{{item.price}}</div>
          <div class="tofoot" v-else></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CategoryGoods',
    data() {
      return {
        }
    },
     computed: {
    style() {
      return {
        maxWidth: this.objList.width || "100%",
        height: this.objList.height || "200px",
      };
    },
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
    }
  }
</script>
<style lang="scss" scoped>
.tofoot{
  
          margin: 10px auto;
          height: 18px;
          width: 100%;
          background: #f2f2f2;
}
.tomain{
  height: 40px;
  width: 100%;background: #f2f2f2;
  
          margin: 8px auto;
}
.isimg{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 15px 0 15px 0;
  background: #fff;
  >div{
    background: #f2f2f2;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    font-size: 50px;
    color: rgba(97,165,255,.7);
  }
}
  .images {
    width: 100%;
    height: 100%;cursor:pointer;
  }

  .CategoryGoods {
    background: #f5f5f5;
    width: 100%;

    >div {
      width: 100%;
      // border: solid 1px springgreen;
    }

    .tab {

      height: 40px;
      line-height: 40px;

      .View_colorMark_rhgAb {
        display: inline-block;
        background-color: #333;
        width: 5px;
        height: 18px;
        vertical-align: middle;
      }

      .View_title_2mual {
        margin-left: 10px;
        font-size: 18px;
        color: #000;
      }

      .View_subTitle_27eKa {
        font-size: 14px;
        color: #000;
        margin-left: 10px;
      }
    }

    .main {
      height: calc(100% - 40px);
      display: flex;
      // flex-wrap:wrap ;
      justify-content: space-between;

      >div {
        height: 100%;
        // border: solid 1px springgreen;
        box-sizing: border-box;
      }

      .main-a {
        width: 18.5%;
        position: relative;
  .icon-trxxt{
    position: absolute;
    width: 25px;
    height: 25px;
    // border-radius:50% ;
    box-sizing: border-box;
    // border: solid 1px #fff;
    // color: #fff;
    bottom: 3%;
    right: 10%;
 cursor:pointer;
  // text-align: center;
  }
        .View_bannerText_2SLqV {
          position: absolute;
          vertical-align: middle;
          bottom: 20%;
          width: 85%;
          height: 60px;
          line-height: 24px;
          font-size: 18px;
          text-align: center;
          color: #fff;
          display: flex;

          .View_bannerTitle_1gQsW {
            box-sizing: border-box;
            display: flex;
            align-items: center;
           height: 100%;
            overflow: hidden;
            background: rgba(0, 0, 0, .9);
           width: 40%;
           padding: 0 5px;
          }

          .View_bannerSubTitle_2K3Zh {
              height: 100%;padding: 0 5px;
               box-sizing: border-box;
            display: flex;
            align-items: center;
            width: 60%;
            background: rgba(0, 0, 0, .6);
          }
        }

      }

      .main-b {
        width: 79.5%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        box-sizing: border-box;

        .tab-img {
          box-sizing: border-box;
          // padding: 10%;
          width: 23.5%;
          height: 48.5%;
          // border: springgreen solid 1px;
          padding: 20px 0;
          background: #fff;
        }

        .tab-img:nth-child(-n+4) {
          margin-bottom: 1.5%;
        }

        .img-div {
          width: 100%;
          height: 129px;
          display: flex;    background: #f2f2f2;
          justify-content: center;
          align-items: center;
          .skeleton-goods-img-icon{
            
  color: rgba(97,165,255,.7);
    font-size: 50px;
}
        }

        .View_goodsTitle_1oYUy {
          width: 135px;
          height: 40px;
          font-size: 14px;
          color: #333;
          line-height: 20px;
          overflow: hidden;
          margin: 8px auto;

        }

        .View_goodsPrice_1uqZX {
          font-size: 18px;
          color: #ff0036;
          line-height: 18px;
          margin: 10px auto;
          text-align: center;
        }
      }
    }
  }
</style>