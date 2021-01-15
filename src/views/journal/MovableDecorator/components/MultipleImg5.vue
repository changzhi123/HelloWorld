<template>
<!-- 多图(5) -->
  <div class="MultipleImg5" :style="`width:${styles.width||'100%'};height:${styles.height||'200px'};`">
   <div v-for="(item,index) in arrList" :key="index">
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
   
  }
},
props:{
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