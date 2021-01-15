<template>
  <!-- 多图(1-3) -->
  <div
    class="MultipleImg1_3"
    :style="`width:${styles.width || '100%'};height:${
      styles.height || '200px'
    };`"
  >
    <div>
      <img class="images"  v-if="arrList[0].imgurl" :src="arrList[0].imgurl" alt="" />
      <div class="imgset" v-else>
            <Icon type="md-image" />
      </div>
    </div>
    <div class="imglist">
      <template v-for="(item, index) in arrList">
        <div :key="index" v-if="index!=0">
          <img class="images" :src="item.imgurl" v-if="item.imgurl" alt="" />
          <div class="imgset" v-else>
            <Icon type="md-image" />
          </div>
        </div>
      </template>

    
    </div>
  </div>
</template>

<script>
export default {
  name: "MultipleImg1_3",
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
.images {
  width: 100%;
  height: 100%;
}
.imgset{
  width: 100%;
  height: 100%;
  background: #f2f2f2;
  font-size: 50px;
  display: flex; color: rgba(97, 165, 255, 0.7);
  justify-content: center;
  align-items: center;
}
.MultipleImg1_3 {
  // height: 100px;
  // width: 100%;
  background: #fff;
  // background: chartreuse;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  > div {
    height: 48.5%;
    width: 100%;
    // border: solid 1px springgreen;
  }
  .imglist {
    display: flex;
    justify-content: space-between;
    > div {
      width: 32%;
      height: 100%;
    }
  }
}
</style>