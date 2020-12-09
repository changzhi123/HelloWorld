<template>
  <div class="upload-container">
    <el-upload
      class="image-uploader"
      :data="dataObj"
      :headers="myHeaders"
      :show-file-list="false"
      :action="url() "
      :before-upload="beforeAvatarUpload"
      :on-success="handleImageScucess"
    >
      <el-button size="small" type="primary" v-show="!imageUrl">点击上传</el-button>
    </el-upload>
    <div class="image-preview image-app-preview" v-show="isShow">
      <div class="image-preview-wrapper" v-show="1">
        <img :src="imageUrl" />
        <div class="image-preview-action">
          <i @click="rmImage" class="el-icon-delete"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { delImg } from "@/api/upload";
import { getToken } from "@/utils/auth";
import {reminder} from '@/utils/method'
export default {
  name: "singleImageUpload",
  props: {
    value: String
  },
  computed: {
    imageUrl() {
      if (this.value) {
        this.isShow = true;
        return this.value;
      } else {
        this.isShow = false;
      }
    }
  },
  data() {
    return {
      myHeaders: { access_token: getToken() },
      isShow: true,
      tempUrl: "",
      dataObj: { access_token: getToken(), key: "" },
    };
  },
  methods: {
    beforeAvatarUpload(file) {//上传文件之前的钩子
     const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt1M = file.size / 1024 / 1024 < 1;
      const _this = this;
      return new Promise(function(resolve, reject) {
        const reader = new FileReader();
        reader.onload = function(event) {
          const image = new Image();
          image.onload = function() {
            const width = 750;
            const height = 1384;
            const isSize = image.width == width || image.height == height;
            console.log(isSize, image.width, image.height);
           if (!isJPG) {
              reminder("上传图片格式只能是 JPG/PNG!",'error')
              // _this.$message.error("上传图片格式只能是 JPG/PNG!");
              reject();
            } else if (!isLt1M) {
              reminder("上传图片大小不能超过 1MB!",'error')
              // _this.$message.error("上传图片大小不能超过 1MB!");
              reject();
            } else if (!isSize) {
              reminder("上传的图片分辨率只能是 750*1384!",'error')
              // _this.$message.error("上传的图片分辨率只能是 750*1384!");
              reject();
            }
            resolve();
          };
          image.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
    },
    rmImage() {
      //删除图片
      // delImg({ img: this.value })
      //   .then(response => {
      //     this.postForm = response.data;
      //     console.log(response, "res");
      //   })
      //   .catch(err => {
      //     this.fetchSuccess = false;
      //     console.log(err, process.env.BASE_API);
      //   });
      this.emitInput("");
    },
    emitInput(val) {
      this.$emit("input", val);
    },

    handleImageScucess(res, file, fileList) {
      // 文件上传成功的狗子
      console.log(res, file, fileList, "文件上传成功的狗子");
      this.tempUrl = URL.createObjectURL(file.raw);
      this.emitInput(this.tempUrl)
      this.isShow = true;
    },
    url() {
      //上传地址
      return "https://jsonplaceholder.typicode.com/posts/";
    },
   
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.upload-container {
  width: 100%;
  position: relative;
  @include clearfix;
  .image-uploader {
    width: 5%;
  }

  .image-preview {
    width: 200px;
    height: 200px;
    position: relative;
    .image-preview-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .image-preview-action {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.3s;
      cursor: pointer;
      text-align: center;
      line-height: 120px;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-icon-delete {
        font-size: 36px;
      }
    }
    &:hover {
      .image-preview-action {
        opacity: 1;
      }
    }
  }
  .image-app-preview {
    width: 200px;
    height: 200px;
    position: relative;
    .app-fake-conver {
      height: 44px;
      position: absolute;
      width: 100%; // background: rgba(0, 0, 0, .1);
      text-align: center;
      line-height: 64px;
      color: #fff;
    }
  }
}
</style>
