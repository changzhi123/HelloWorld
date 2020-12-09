<template>
  <!-- 组件基于element Upload 上传 照片墙-->
  <!--  -->
  <!--<imageuploads></imageuploads> 使用展示-->
  <div>
    <el-upload
      :action="url()"
      list-type="picture-card"
      :headers="headers"
      :fileList="ImageUrls"
      :on-success="handleImageScucess"
      :data="data"
      :on-error="handleImageError"
      :on-preview="handlePictureCardPreview"
      :before-upload="beforeAvatarUpload"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>
<script>
import { getToken } from "@/utils/auth";
import{reminder} from '@/utils/method'
export default {
  props: {
    value: {
      type:Array,
      default:null
    }, //接受父组件返回的图片,没有name也可 ，父组件v-model绑定的数据
    //格式 [{name:'123',url:'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'}]
    
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      headers: { access_token: getToken() }, //设置上传的请求头部
      data: { access_token: getToken() }, //上传时附带的额外参数
      fileList: [], //将父元素传递过来的动态绑定
    };
  },
computed:{
  ImageUrls(){
    return this.value //避免直接在子组件修改父组件的数据
  },
},
  methods: {
    handleImageError(err, file, fileList) {
      //上传失败的钩子
      console.log('传失败的钩子',err, file, fileList)
      reminder('图片上传失败！','error')
    },
    emitInput(val) {//父组件v-model绑定即可拿到数据
      //将上传图片返回父组件
      this.$emit("input", val);
    },
    url() {
      //上传地址
      return "https://jsonplaceholder.typicode.com/posts/";
    },
    handleRemove(file, fileList) {
      //文件列表移除文件时的钩子
      console.log(file, fileList, "移除图片");
        this.fileList = fileList; //吧上传成功的列表更新
        this.emitInput(this.fileList); //将以删除后的图片列表返回
    },
    handlePictureCardPreview(file) {
      //点击文件列表中已上传的文件时的钩子,放大图片
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeAvatarUpload(file) {
      //上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。判断条件根据需求动态修改即可
      console.log( "上传文件之前的钩子",file);
    },
    handleImageScucess(response, file, fileList) {
      console.log(file, "文件上传成功时的钩子",  fileList);
      this.fileList = fileList; //吧上传成功的列表更新
      this.emitInput(this.fileList); //将以上传成功后的图片返回
    }
  }
};
</script>
<style lang="scss" scoped>
</style>