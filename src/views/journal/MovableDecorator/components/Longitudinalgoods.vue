<template>
  <div class="Longitudinalgoods" :style="style">
    <div class="commodity" v-for="(item, index) in objList.data" :key="index">
      <img v-if="item.imgurl" class="imgurl" :src="item.imgurl" alt="" @click="skipOpen(item.tourl)" />
      <div v-else class="imgurl"><Icon type="ios-basket" /></div>
      <div class="text">{{ item.text }}</div>
      <div class="price">
        <h3>￥{{ item.price || '0.0 '}}</h3>
        <h5>￥{{ item.price || '0.0' }}</h5>
      </div>
      <div class="fotter">
        <h5>已售{{ item.soldOut || 0 }}件</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    style() {
      let imgurl = `url('${this.objList.backgroundImg}') no-repeat 100% 100%`;
      return {
        maxWidth: this.objList.width || "100%",
        minHeight: this.objList.height || "200px",
        background: this.objList.backgroundImg
          ? imgurl
          : this.objList.backgroundColor,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      };
    },
  },
  props: {
    objList: {
      type: Object,
      default: () => ({}),
    },
    isWindowsOpen: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
    //   arr: [
    //     {
    //       imgurl:
    //         "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1603365312,3218205429&fm=26&gp=0.jpg",
    //       text:
    //         "商品标题，可以结合具体业务活动商品数据商品标题，可以结合具体业务活动商品数据",
    //       price: "69.8 ",
    //       soldOut: "128",
    //       tourl: "",
    //     },
        
    //   ],
    };
  },
  mounted() {},
  methods: {
        skipOpen(tourl){
       if(this.isWindowsOpen&&tourl)window.open(tourl)
     },
  },
};
</script>

<style lang="scss" scoped>
.Longitudinalgoods {
  box-sizing: border-box;
  //   border: solid 1px #ccc;
  display: flex;
  flex-wrap: wrap;
  .commodity {
    width: 50%;
    min-height: 150px;
    // border: solid 1px #58bc58;
    box-sizing: border-box;
    padding: 10px 15px;
    // background: #f5f5f5;
    text-align: center;
    .imgurl {
      margin: auto;
      width: 120px;
      height: 100px;
      margin-bottom: 10px;
      font-size: 50px;
      background: #e2e2e2;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #1890ff;
    }
    .text {
      font-size: 12px;
      text-align: left;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-bottom: 10px;
    }
    .price {
      width: 100%;
      text-align: left;
      > h3 {
        display: inline-block;
        color: red;
        font-weight: bold;
      }
      > h5 {
        display: inline-block;
        margin-left: 5px;
        text-decoration: line-through;
      }
    }
    .fotter {
      width: 100%;
      > h5 {
        text-align: right;
      }
    }
  }
}
</style>