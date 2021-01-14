<template>
  <!-- 多图(2-3) -->
  <div
    class="MultipleImg2_3"
    :style="`width:${styles.width || '100%'};height:${
      styles.height || '200px'
    }`"
  >
    <div class="tab-a">
      <template v-for="(item, index) in arrList">
        <div class="box-a" :key="index" v-if="index == 0">
          <img class="images" :src="item.imgurl" alt="" v-if="item.imgurl" />
          <div v-else class="View_imgItem_3Lvk6">
            <Icon type="md-image" />
          </div>
        </div>
        <div class="box-b" :key="index" v-if="index == 1">
          <img class="images" :src="item.imgurl" v-if="item.imgurl" alt="" />

          <div v-else class="View_imgItem_3Lvk6">
            <Icon type="md-image" />
          </div>
        </div>
      </template>
     
    </div>
    <div class="tab-b">
      <template v-for="(item, index) in arrList">
        <div :key="index" v-if="index != 0 && index != 1">
          <img class="images" :src="item.imgurl" v-if="item.imgurl" alt="" />
          <div v-else class="View_imgItem_3Lvk6">
           <Icon type="md-image" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultipleImg2_3",
  data() {
    return {
     
    };
  },
  props: {
    styles: {
      type: Object,
      value: {},
    },
    arrList:{
      type:Array,
      value:[]
    }
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.View_imgItem_3Lvk6 {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f2f2f2;
  font-size: 50px;
  color: rgba(97, 165, 255, 0.7);
}
.MultipleImg2_3 {
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  align-content: space-between;
  > div {
    height: 48.5%;
    width: 100%;

    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }

  .tab-a {
    > div {
      height: 100%;
      box-sizing: border-box;
    }
    .box-a {
      width: 66%;
    }
    .box-b {
      width: 32%;
    }
  }
  .tab-b {
    > div {
      width: 32%;
      box-sizing: border-box;
    }
  }
}
.images {
  width: 100%;
  height: 100%;
}
</style>