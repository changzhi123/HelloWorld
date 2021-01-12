<template>
  <!-- 分类管区 -->
  <div class="CategoryGoods" :style="`width:${styles.width||'100%'};height:${styles.height||'200px'};`">
    <div class="tab">
      <i class="View_colorMark_rhgAb"></i>
      <span class="View_title_2mual">{{imglist.slogan}}</span>
      <span class="View_subTitle_27eKa">{{imglist.text}}</span>
    </div>
    <div class="main">
      <div class="main-a">
        <img class="images" :src="imglist.imgurl" alt="">
        <div class="View_bannerText_2SLqV">
          <span class="View_bannerTitle_1gQsW">广告位</span>
          <span class="View_bannerSubTitle_2K3Zh">广告位副标题</span>
          </div>
          <div class="icon-trxxt">
            <!-- <i class="el-icon-arrow-right"></i> -->
            <img class="images" src="https://img.alicdn.com/tfs/TB1IQBtXaagSKJjy0FbXXa.mVXa-68-68.png" alt="">
          </div>
      </div>
      <div class="main-b">
        <div v-for="(item,index) in imglist.data" :key="index" class="tab-img">
          <div class="img-div">
            <img class="images" :src="item.imgurl" alt="">
          </div>
          <div class="View_goodsTitle_1oYUy"> 商品标题，可以结合具体业务活动商品数据 </div>
          <div class="View_goodsPrice_1uqZX"> ￥69.8 </div>
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
        imglist: {
          imgurl: 'https://img.alicdn.com/tps/i4/TB1MesKcWmWQ1JjSZPhwu0CJFXa.png',
          slogan: '打造爱巢',
          text: 'HOME',
          data: [{
              imgurl: 'https://gw.alicdn.com/bao/uploaded/i3/3243519086/O1CN016gQ0Ia2GzR82IAhdR_!!0-item_pic.jpg'
            },
            {
              imgurl: 'https://gw.alicdn.com/bao/uploaded/i3/3243519086/O1CN016gQ0Ia2GzR82IAhdR_!!0-item_pic.jpg'
            },
            {
              imgurl: 'https://gw.alicdn.com/bao/uploaded/i3/3243519086/O1CN016gQ0Ia2GzR82IAhdR_!!0-item_pic.jpg'
            },
            {
              imgurl: 'https://gw.alicdn.com/bao/uploaded/i3/3243519086/O1CN016gQ0Ia2GzR82IAhdR_!!0-item_pic.jpg'
            },
            {
              imgurl: 'https://gw.alicdn.com/bao/uploaded/i3/3243519086/O1CN016gQ0Ia2GzR82IAhdR_!!0-item_pic.jpg'
            },
            {
              imgurl: 'https://gw.alicdn.com/bao/uploaded/i3/3243519086/O1CN016gQ0Ia2GzR82IAhdR_!!0-item_pic.jpg'
            },
            {
              imgurl: 'https://gw.alicdn.com/bao/uploaded/i3/3243519086/O1CN016gQ0Ia2GzR82IAhdR_!!0-item_pic.jpg'
            },
            {
              imgurl: 'https://gw.alicdn.com/bao/uploaded/i3/3243519086/O1CN016gQ0Ia2GzR82IAhdR_!!0-item_pic.jpg'
            }
          ]
        }
      }
    },
    props: {
      styles: {
        type: Object,
        value: {}
      }
    },
    methods: {}
  }
</script>
<style lang="scss" scoped>
  .images {
    width: 100%;
    height: 100%;
  }

  .CategoryGoods {
    background: #f5f5f5;

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
          height: 49%;
          // border: springgreen solid 1px;
          padding: 20px;
          background: #fff;
        }

        .tab-img:nth-child(-n+4) {
          margin-bottom: 1.5%;
        }

        .img-div {
          width: 100%;
          height: 129px;
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