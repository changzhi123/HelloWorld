<template>
<!-- 纯文本 -->
  <div class="plainTextBlock" 
  :style="style">
     <h2 :style="style2">{{objList.text}}</h2>
  </div >
</template>

<script>
export default {
name:'plainTextBlock',
data(){
  return{
    
  }
},
computed: {
    style() {
      let imgurl=`url('${this.objList.backgroundImg}') 100% 100% no-repeat`
      return {
        maxWidth: this.objList.width || "100%",
        height: this.objList.height || "200px",
        background:this.objList.backgroundImg?imgurl:this.objList.backgroundColor,
         backgroundSize: "cover",
        backgroundAttachment: "fixed",
      };
    },
    style2() {
      return {
        maxWidth: this.objList.width || "100%",
        lineHeight: this.objList.height || "200px",
        color:this.objList.color||'#000',
        fontsize:this.objList.size||'38px'
      };
    },

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
  width: 100%;
  >h2{
    height: 100%;
    text-align: center;
    font-weight: 700;
  }
}

</style>