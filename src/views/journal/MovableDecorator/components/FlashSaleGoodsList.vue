<template>
  <!-- 秒杀商品 -->
  <div
    class="FlashSaleGoodsList"
    :style="style"
  >
      <div 
      class="tab tab-img" 
      :style="`background-image:url(${objList.list[0].imgurl});`"
    >
      <div class="seckill">{{ objList.name }}</div>
      <div class="text">
        <p>活动开始时间：</p>
        <strong>{{ objList.itme }}</strong>
      </div>
    </div>
    <div class="main-text">
      <Carousel
        loop
        :autoplay="setting.autoplay"
        :autoplay-speed="setting.autoplaySpeed"
        :dots="setting.dots"
        :radius-dot="setting.radiusDot"
        :trigger="setting.trigger"
        :arrow="setting.arrow"
      >
        <CarouselItem  v-for="(item, index) in arrLength" :key="index">
          <div class="text-box">
            <div v-for="(v, idx) in objList.data" :key="idx"  v-if="type(index,idx)">
                <img class="imgs"  @click="skipOpen(v.tourl)"  v-if="v.imgurl" :src="v.imgurl" alt="" />
              <div class="imgs" v-else>
                <!-- <i class="el-icon-goods skeleton-goods-img-icon"></i> -->
                <Icon type="ios-basket" class="skeleton-goods-img-icon" />
              </div>
              <div class="View_goods" v-if="v.text">{{ v.text }}</div>
              <div class="View_goods" v-else style="background: #f2f2f2"></div>
              <div class="View_goodsPrice_Eg2v8" v-if="v.price">
                <span class="View_priceMiaosha_3j8Fj"
                  ><i>¥</i><span>{{ v.price }}</span></span
                >
                <span class="View_priceOrigin_1CCY2"
                  ><i>¥</i><span>{{ v.toprice }}</span></span
                >
              </div>
              <div
                v-else
                class="View_goodsPrice_Eg2v8"
                style="background: #f2f2f2; border: none"
              ></div>
            
            </div>
          </div>
        </CarouselItem>
      </Carousel>
    </div>
    <div class="tab">
      <img class="imags" @click="skipOpen(objList.list[1].tourl)" :src="objList.list[1].imgurl" v-if="objList.list[1].imgurl" alt="" />
      <div class="isimags imags" v-else>
        <div>
          <!-- <i class="el-icon-picture "></i> -->
          <Icon type="md-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FlashSaleGoodsList",
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
  computed:{ 
    style() {
      return {
        maxWidth: this.objList.width || "100%",
        height: this.objList.height || "200px",
      };
    },
     arrLength(){
      return this.objList.data.length>4?2:1
     }
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
    type(index,idx){
      let isIndex=(index+1)*4+1,
      isType=false,
      isIdx=index*4,
      numidx=idx+1
      if(numidx<isIndex){
        if(index==0){
          isType=true
        }else{
           if(numidx>isIdx){
             isType=true 
           }  
        }
      }
      // console.log(index,idx,'key',isIndex,isType,isIdx)
      return isType
    }
  },
};
</script>

<style lang="scss" scoped>
.FlashSaleGoodsList {
  // height: 100px;
  width: 100%; 
  
  display: flex;
  background: #fff;

  > div {
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
  background-color: #e83632;cursor:pointer;

  .seckill {
    width: 100%;
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    margin-top: 15%;
  }

  .text {
    width: 100%;
    position: absolute;
    text-align: center;
    bottom: 15px;
    font-size: 16px;
  }
}

.tab {
  width: 18%;

  .imags {
    width: 100%;
    height: 100%;cursor:pointer;
  }
  .isimags {
    box-sizing: border-box;
    padding: 15px  0 15px 0;
    > div {
      color: rgba(97, 165, 255, 0.7);
      font-size: 50px;
      background: #f2f2f2;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.main-text {
  width: 64%;
  > div {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .text-box {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    height: 100%;

    > div {
      height: 100%;
      width: 25%;
      // border: solid 1px springgreen;
      box-sizing: border-box;
      padding: 15px 10px;
      text-align: center;

      .imgs {
        width: 100%;cursor:pointer;
        height: 100px;
        background: #f2f2f2;
        display: flex;
        justify-content: center;
        align-items: center;
        .skeleton-goods-img-icon {
          color: rgba(97, 165, 255, 0.7);
          font-size: 50px;
        }
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
        height: 18px;
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