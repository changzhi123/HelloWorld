<template>
  <!-- 优惠券 -->
  <div class="Coupon" :style="`width:${styles.width||'100%'};height:${styles.height||'200px'}`">
     <img v-if="objList.imgurl" class="imglist" :src="objList.imgurl" alt="">
     <div v-else class="foot">
       <Icon type="md-barcode" />
     </div>
  </div>
</template>

<script>
export default {
  name: "Coupon",
  data() {
    return {
      img:''//"https://gjusp.alicdn.com/img/img1550568121854-2927159970.jpg@1000y-0ic_50Q.jpg_.webp"
    };
  },
  props: {
      styles: {
      type: Object,
      value: {},
    },
    objList:{
      type:Object,
      value:{}
    }
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.Coupon {
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  .imglist{
    width: 100%;
    height: 100%;
  }
  .foot{
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    background: #f2f2f2;
    font-size: 50px;    color: rgba(97,165,255,.7);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>