<template>
  <div class="menu">
      <h1>弹窗+表单组件</h1>
      <!--  -->
       <el-button type="primary" @click="dakai">编辑打开弹窗</el-button>
        <el-button type="primary" @click="dakaic">新增打开弹窗，带重置</el-button>
        <!--  -->
      <wicket ref="ress" title="提示" @setList='res'  ></wicket>
      <!--  -->
   <p>姓名：{{this.ruleForm.name}}</p>
   <p>地址：{{this.ruleForm.address}}</p>
   <p>类型：{{this.ruleForm.type}}</p>
  </div>
</template>

<script>
export default {
 components:{
   wicket:()=>import('@/components/Elements/wicket'),
 },
 data(){
   return{
     ruleForm: { name: "d", address: "0", type: "d",phone:'15000000000' },
   }
 },
 mounted(){},
 methods:{
  
   res(e){
     console.log('父组件接受',e)
     this.ruleForm=e
   },
   dakai(){//编辑打开弹窗
     this.$refs.ress.setBezel(this.ruleForm)
   },
    dakaic(){//新增打开弹窗，代重置表单功能
     this.$refs.ress.setBezel()
   }
 }
};
</script>
<style lang="scss" scoped>
.menu {
  width: 100%;
}
</style>