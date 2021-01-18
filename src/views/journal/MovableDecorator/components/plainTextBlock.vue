<template>
<!-- 纯文本 -->
  <div class="plainTextBlock" :style="`width:${objList.width||'100%'};height:${objList.height||'200px'};`">
     <h2 :style="`line-height:${objList.height||'200px'};color:${objList.color||'#000'};
     font-size:${objList.size||'38px'};`">{{objList.text}}</h2>
  </div >
</template>

<script>
export default {
name:'plainTextBlock',
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
methods:{}
}
</script>
<style lang="scss" scoped>
.plainTextBlock{
  // height: 100px;
  // width: 100%;
  background: #fff;
  >h2{
    height: 100%;
    text-align: center;
    font-weight: 700;
  }
}

</style>