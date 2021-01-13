<template>
<!-- 多图(5) -->
  <div class="MultipleImg5" :style="`width:${styles.width||'100%'};height:${styles.height||'200px'};`">
   <div v-for="(item,index) in imglist" :key="index">
     <img :src="item.imgurl" alt="" v-if="item.imgurl">
     <div v-else class="Thereisno">
       <div class="box"><Icon type="md-image" /></div>
     </div>

   </div>
  </div >
</template>

<script>
export default {
name:'MultipleImg5',
data(){
  return{
    imglist:[
      {
        imgurl:"https://img.alicdn.com/tps/i4/TB1y4tuOxz1gK0jSZSgSuuvwpXa.jpg_500x1000q75s0.jpg_.webp"
      },
      {
        imgurl:''//'https://img.alicdn.com/tps/i4/TB1Q2Mnd2zO3e4jSZFxwu1P_FXa.png_500x1000q75.jpg_.webp'
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
props:{
 styles: {
        type: Object,
        value: {}
      }
},
methods:{

}
}
</script>
<style lang="scss" scoped>
.MultipleImg5{
  // height: 100px;
  // width: 100%;
  // background: forestgreen;
  background: #fff;
  display: flex;
  justify-content: space-between;
  >div{
    width: 18.5%;
    height: 100%;
    box-sizing: border-box;
    // padding: 0 1%;
    >img{
      width: 100%;
      height: 100%;
    }
    .Thereisno{
       width: 100%;
      height: 100%;
      padding: 15px 0;
      box-sizing: border-box;
      .box{
        
       width: 100%;
      height: 100%;
      background: #f2f2f2;
      display: flex;
      justify-content: center;
      align-items: center;
      >i{
      font-size: 50px;    color: rgba(97,165,255,.7);
      }
      }
    }
  }
}

</style>