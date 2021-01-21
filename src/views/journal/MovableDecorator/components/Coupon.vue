<template>
  <!-- 优惠券 -->
  <div
    class="Coupon"
    :style="`width:${objList.width || '100%'};height:${
      objList.height || '200px'
    }`"
  >
    <template v-for="(item, index) in objList.data">
      <div :key="index" v-if="index==0">
        <img
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
  props: {
    objList: {
      type: Object,
      default: () => ({}),
    },
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
  .imglist {
    width: 100%;
    height: 100%;
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