<template>
  <!--  轮播 (普通数组)-->
  <div class="CarouselImg" :style="`width:${styles.width||'100%'};`">
    <el-carousel :height="styles.height||'200px'" :interval='3000'>
      <el-carousel-item v-for="(item,index) in imglist" :key="index">
        <img class="imags" :src="item.imgurl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    name: 'CarouselImg',
    data() {
      return {
        imglist:[
      {
        imgurl:"https://gjusp.alicdn.com/img/img1550568121854-2927159970.jpg@1000y-0ic_50Q.jpg_.webp"
      },
      {
        imgurl:'https://m.360buyimg.com/babel/jfs/t1/136164/18/4633/216335/5f1176b9E0d2e6f59/e41c72e01932fd73.jpg.webp'
      },
        {
        imgurl:'https://m.360buyimg.com/babel/jfs/t1/116779/33/13215/494116/5f19a54fE4e3bf7cc/8a2a7b0732385d19.jpg.webp'
      },
        {
        imgurl:'https://gw.alicdn.com/tfs/TB1DKP9zCtYBeNjSspkXXbU8VXa-1920-450.jpg_Q90.jpg'
      },
        {
        imgurl:'https://gw.alicdn.com/tfs/TB1DKP9zCtYBeNjSspkXXbU8VXa-1920-450.jpg_Q90.jpg'
      }
    ]
      }
    },
    props:{
      styles:{
        type:Object,
        value:{}
      }
    },
    methods:{}
  }
</script>

<style lang="scss" scoped>
  .CarouselImg {
    // height: 100px;
    // width: 100%;
    // background: chartreuse;
   
  }

.imags{
  height: 100%;width: 100%;
}
</style>