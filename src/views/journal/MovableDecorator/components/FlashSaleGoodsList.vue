<template>
  <!-- 秒杀商品 -->
  <div class="FlashSaleGoodsList" :style="`width:${styles.width||'100%'};height:${styles.height||'200px'};`">
    <div class="tab tab-img" :style="objstyle">
      <div class="seckill">秒杀商品</div>
      <div class="text">
        <p>活动开始时间：</p>
        <strong>2021-01-12T15:51:43.918Z</strong>
      </div>
    </div>
    <div class="main-text">
      <el-carousel :height="styles.height||'200px'" :interval='3000' trigger='click'>
        <el-carousel-item v-for="(item,index) in 2" :key="index">
          <div class="text-box">
            <div>
              <img class="imgs" :src="obj.img" alt="">
              <div class="View_goods"> 商品标题，可以结合具体业务活动商品数据 </div>
              <div class="View_goodsPrice_Eg2v8">
                <span class="View_priceMiaosha_3j8Fj"><i>¥</i><span>599.00</span></span>
                <span class="View_priceOrigin_1CCY2"><i>¥</i><span>849.00</span></span>
              </div>
            </div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="tab">
      <img class="imags" :src="obj.img" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FlashSaleGoodsList',
    data() {
      return {
        objstyle: {
          backgroundImage: 'url(https://misc.360buyimg.com/mtd/pc/index_2019/1.0.0/assets/img/4a15d8883775742e3efbb850ae14def7.png)'
        },
        obj: {
          img: 'https://img30.360buyimg.com/babel/s290x370_jfs/t1/133470/23/5172/252715/5f1a3b3cE2c82f4cf/4a92d18397680eee.jpg!cc_290x370.webp',
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
  .FlashSaleGoodsList {
    // height: 100px;
    // width: 100%;
    display: flex;

    >div {
      height: 100%;
      box-sizing: border-box;
    }
  }

  .tab-img {
    color: #fff;
    background-size: contain;
    background-position: 50%;
    position: relative;
    background-repeat: no-repeat;
    background-color: #e83632;

    .seckill {
      width: 100%;
      text-align: center;
      font-size: 30px;
      font-weight: 700;
      margin-top: 15%;
    }

    .text {
      position: absolute;
      text-align: center;
      bottom: 15px;
    }
  }

  .tab {
    width: 18%;

    .imags {
      width: 100%;
      height: 100%;
    }

  }

  .main-text {
    width: 64%;

    .text-box {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      height: 100%;

      >div {
        height: 100%;
        width: 25%;
        // border: solid 1px springgreen;
        box-sizing: border-box;
        padding: 15px 10px;
        text-align: center;

        .imgs {
          width: 100%;
          height: 100px;

        }

        .View_goods {
          font-size: 12px;
          max-width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          word-wrap: normal;
          word-break: normal;
          margin-top: 10px;
        }

        .View_goodsPrice_Eg2v8 {
          width: 100%;
          border: 1px solid #e1251b;
          margin-top: 10px;
          line-height: 24px;
          overflow: hidden;
          height: 24px;
          position: relative;

          .View_priceMiaosha_3j8Fj {
            width: 50%;
            height: 100%;
            text-align: center;
            color: #fff;
            font-size: 16px;
            font-weight: 700;
            line-height: 22px;
            background-color: #e1251b;
            float: left;
          }

          .View_priceOrigin_1CCY2 {
            height: 100%;
            width: 50%;
            float: right;
            background: #fff;
            text-align: center;
            color: #999;
            font-size: 12px;
            line-height: 22px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            text-decoration: line-through;
            vertical-align: top;
          }
        }
      }
    }
  }
</style>