<template>
  <!-- 多图(1-3) -->
  <div
    class="MultipleImg1_3"
    :style="`width:${styles.width || '100%'};height:${
      styles.height || '200px'
    };`"
  >
    <div>
      <img class="images"  v-if="imglist[0].imgurl" :src="imglist[0].imgurl" alt="" />
      <div class="imgset" v-else>
            <Icon type="md-image" />
      </div>
    </div>
    <div class="imglist">
      <template v-for="(item, index) in imglist">
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
      imglist: [
        {
          imgurl: "", // "https://img.alicdn.com/tps/i4/TB1y4tuOxz1gK0jSZSgSuuvwpXa.jpg_500x1000q75s0.jpg_.webp"
        },
        {
          imgurl:''
           // "https://img.alicdn.com/tps/i4/TB1Q2Mnd2zO3e4jSZFxwu1P_FXa.png_500x1000q75.jpg_.webp",
        },
        {
          imgurl:
            "https://gw.alicdn.com/tfs/TB1xVR9oFP7gK0jSZFjXXc5aXXa-468-602.jpg",
        },
        {
          imgurl:
            "https://gw.alicdn.com/tfs/TB1UE5RaCWD3KVjSZSgXXcCxVXa-720-400.jpg",
        },
      ],
    };
  },
  props: {
    styles: {
      type: Object,
      value: {},
    },
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