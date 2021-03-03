<template>
  <!-- 优惠券 -->
  <div
    class="Coupon"
    :style="style"
  >
    <template v-for="(item, index) in objList.list">
      <div :key="index" v-if="index==0">
        <img @click="skipOpen(item.tourl)"
          v-if="item.imgurl"
          class="imglist"
          :src="item.imgurl"
          alt=""
        />
        <div v-else class="foot">
          <Icon type="md-barcode" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "Coupon",
  data() {
    return {
      // img:''//"https://gjusp.alicdn.com/img/img1550568121854-2927159970.jpg@1000y-0ic_50Q.jpg_.webp"
    };
  },
  computed: {
    style() {
       let imgurl=`url('${this.objList.backgroundImg}') 100% 100% no-repeat`
     return{
       maxWidth:this.objList.width||'100%',
       height: this.objList.height || "200px",
       background:this.objList.backgroundImg?imgurl:this.objList.backgroundColor,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
     }
    
    },
  },
  props: {
    objList: {
      type: Object,
      default: () => ({}),
    },
    isWindowsOpen:{
      type:Boolean,
      defaule:true
    }
  },
  methods: {
     skipOpen(tourl){
       if(this.isWindowsOpen&&tourl)window.open(tourl)
     }
  },
};
</script>
<style lang="scss" scoped>
.Coupon {
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  >div{
    width: 100%;height: 100%; display: flex;
  justify-content: center;
  align-items: center;
  }
  .imglist {
    width: 100%;
    height: 100%;
    cursor:pointer;
  }
  .foot {
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    background: #f2f2f2;
    font-size: 50px;
    color: rgba(97, 165, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>