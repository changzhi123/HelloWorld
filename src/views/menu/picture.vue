<template>
  <div>
    <!--  -->
    <h1>头像上传</h1>
    <imageupload v-model="img"></imageupload>
    <el-button @click="res">默认按钮</el-button>
    <!--  -->
    <h1>照片墙上传</h1>
    <imageuploads v-model="imgs"></imageuploads>
    <el-button @click="res">默认按钮</el-button>
    <h1>照片墙上传2</h1>
    <singleImage v-model="data"/>
  </div>
</template>
<script>
import singleImage from '@/components/Elements/singleImage'
export default {
     components: { imageupload:()=>import('@/components/Elements/imageupload'),
     imageuploads:()=>import('@/components/Elements/imageuploads'),singleImage
   },
   data(){
     return{
       img:'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
       imgs: [{name:'123',url:'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'}],
       data:''
     }
   },
   methods:{
     res(){
       console.log(this.img,this.imgs)     }
   }
}
</script>