<template>
<!-- 多图(5) -->
  <div class="MultipleImg5" :style="style">
   <div v-for="(item,index) in objList.data" :key="index">
     <img :src="item.imgurl" @click="skipOpen(item.tourl)" alt="" v-if="item.imgurl">
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
computed: {
    style() {
      return {
        maxWidth: this.objList.width || "100%",
        height: this.objList.height || "200px",
      };
    },
  },
props:{
 
    objList:{
        type: Object,
      default:()=>({}),
    },
     isWindowsOpen:{
      type:Boolean,
      defaule:true
    }
},
methods:{
 skipOpen(tourl){
       if(this.isWindowsOpen&&tourl)window.open(tourl)
     },
}
}
</script>
<style lang="scss" scoped>
.MultipleImg5{
  // height: 100px;
  width: 100%;
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
      height: 100%;cursor:pointer;
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