<template>
  <!-- 组件基于element el-upload 头像上传  -->
  <!-- <imageupload></imageupload> -->
  <!-- 使用展示-->
  <div class="imageupload">
    <el-upload
      v-show="!imageUrls"
      class="avatar-uploader"
      :action="url()"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :headers="headers"
      :data="data"
      :on-error="onerrorimg"
      :before-upload="beforeAvatarUpload"
    >
      <div class="imageupload-box" v-if="percentagetypr">
        <el-progress type="circle" :percentage="percentage"></el-progress>
      </div>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <!--  -->
    <div class="reflect" v-show="imageUrls">
      <img class="reflect-img" :src="imageUrls" />
      <label class="reflect-label">
        <i class="el-icon-upload-success el-icon-check"></i>
      </label>
      <div class="reflect-del">
        <i class="el-icon-zoom-in" @click="scaling_img"></i>
        <i class="el-icon-delete reflect-icon" @click="del_img"></i>
      </div>
    </div>
    <!--  -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="imageUrls" alt />
    </el-dialog>
  </div>
</template>
<script>
import { getToken } from "@/utils/auth";
import { reminder } from "@/utils/method";
export default {
  props: {
    value: {
      type: String,
      default: ""
    } //接受父组件返回的图片，父组件v-model绑定的数据
  },
  data() {
    return {
      imageUrl: "", //接受父组件返回的图片，父组件v-model绑定的数据
      dialogVisible: false,
      headers: { access_token: getToken() }, //设置上传的请求头部
      data: { access_token: getToken() }, //上传时附带的额外参数
      percentage: 0, //上传图片的百分比
      percentagetypr: false, //是否显示百分比计数器
      timer: null
    };
  },
  computed: {
    imageUrls() {
      return this.value;
    }
  },
  methods: {
    emitInput(val) {
      //父组件v-model绑定即可拿到数据
      //将上传图片返回父组件
      this.$emit("input", val);
    },
    timertype() {
      this.percentage = 0; //重置百分比计数器
      this.percentagetypr = true; //打开百分比计数器
      this.timer = setInterval(() => {
        if (this.percentage >= 90) {
          //当大于等于90时清除定时器，
          window.clearInterval(this.timer);
        } else {
          this.percentage += 10;
        }
        // console.log("百分比计数器", this.percentage);
      }, 300);
    },
    url() {
      //图片上传地址
      return "https://jsonplaceholder.typicode.com/posts/";
    },
    onerrorimg(err, file, fileList) {
      //上传失败的钩子
      console.log(err, file, fileList, "上传失败的钩子");
      this.percentagetypr = false; // 并关闭百分比计数器
      window.clearInterval(this.timer);
      reminder("图片上传失败！", "error");
    },
    handleAvatarSuccess(res, file, fileList) {
      //上传成功后的钩子
      this.percentage = 100; //设置百分比计数器满值
      console.log(res, file, fileList, "上传成功后的钩子");
      this.imageUrl = URL.createObjectURL(file.raw); //上传成功后将图片复制给组件反显
      this.percentagetypr = false; // 并关闭百分比计数器
      this.emitInput(this.imageUrl); //将上传成功的图片数据返回
    },
    beforeAvatarUpload(file) {
      //上传前的钩子
      this.timertype();
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        const img = new Image();
        img.src = reader.result;
        img.onload = function() {
          console.log(img.width, img.height, img.src, "高");
        };
      };
      console.log(file, file.size, file.type, "上传前的钩子");
      // return false
    },
    scaling_img() {
      //放大图片
      this.dialogVisible = true;
    },
    del_img() {
      //删除图片
      this.imageUrl = "";
      this.emitInput(""); //将删除成功的图片数据返回
    }
  }
};
</script>
<style lang="scss" scoped>
.imageupload {
  width: 178px;
  height: 178px;
}
.avatar-uploader {
  border: 1px dashed #409eff;
  border-radius: 6px;
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  & .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
}
//计时器插件
.imageupload-box {
  width: 100%;
  height: 100%;
  width: 178px;
  height: 178px;
  display: flex;
  justify-content: center;
  align-items: center;
}
//反显
.reflect {
  border-radius: 6px;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  //反显的上传成功图表右上角蓝色区域
  & .reflect-label {
    position: absolute;
    right: -17px;
    top: -7px;
    width: 46px;
    height: 26px;
    background: #13ce66;
    text-align: center;
    transform: rotate(45deg);
    display: block;
    & i {
      color: #fff;
      font-size: 12px;
      margin-top: 12px;
      transform: rotate(-45deg);
    }
  }
  &:hover {
    .reflect-img {
      filter: blur(1px);
    }
  }
  & .reflect-img {
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }
  & .reflect-del {
    position: absolute;
    font-size: 36px;
    border-radius: 6px;
    top: 0;
    width: 100%;
    height: 100%;
    left: 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    & i {
      opacity: 0;
      transition: opacity 0.3s;
      color: #ccc;
      &:hover {
        color: #fff;
      }
    }
    &:hover {
      & i {
        opacity: 1;
      }
    }
  }
}
</style>