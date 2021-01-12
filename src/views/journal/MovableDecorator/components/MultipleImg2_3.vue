<template>
  <!-- 多图(2-3) -->
  <div class="MultipleImg2_3" :style="`width:${styles.width||'100%'};height:${styles.height||'200px'}`">
    <div class="tab-a">
      <div class="box-a">
        <img class="images" :src="imglist[0].imgurl" alt="">
      </div>
      <div class="box-b">
        <img class="images" :src="imglist[1].imgurl" alt="">
      </div>
    </div>
    <div class="tab-b">
      <div >
        <img class="images" :src="imglist[2].imgurl" alt="">
      </div>
      <div >
        <img class="images" :src="imglist[3].imgurl" alt="">
      </div>
      <div >
        <img class="images" :src="imglist[4].imgurl" alt="">
      </div>
    </div >
  </div>
</template>

<script>
  export default {
    name: 'MultipleImg2_3',
    data() {
      return {
         imglist:[
      {
        imgurl:"https://img.alicdn.com/tps/i4/TB1y4tuOxz1gK0jSZSgSuuvwpXa.jpg_500x1000q75s0.jpg_.webp"
      },
      {
        imgurl:'https://img.alicdn.com/tps/i4/TB1Q2Mnd2zO3e4jSZFxwu1P_FXa.png_500x1000q75.jpg_.webp'
      },
        {
        imgurl:'https://gw.alicdn.com/tfs/TB1xVR9oFP7gK0jSZFjXXc5aXXa-468-602.jpg'
      },
        {
        imgurl:'https://gw.alicdn.com/tfs/TB1UE5RaCWD3KVjSZSgXXcCxVXa-720-400.jpg'
      },
        {
        imgurl:'https://img.alicdn.com/bao/uploaded/i3/2781891994/O1CN01usHqqQ1QbILCMqrJm_!!2781891994.jpg'
      }
    ]
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
  .MultipleImg2_3 {
  display: flex;
  flex-wrap:wrap ;
  align-content: space-between;
    >div {
      height: 48.5%;
      width: 100%;
      
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
    }

    .tab-a {
      >div{
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
    .tab-b{
      >div{
        width: 32%; box-sizing: border-box;
      }
    }
  }
  .images{
    width: 100%;
    height: 100%;
  }
</style>