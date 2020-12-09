<template>
	<div class="upload-container">
		<el-upload class="image-uploader" :data="dataObj" :headers="myHeaders"   :show-file-list="false" :action="url() " :on-success="handleImageScucess">
			<el-button size="small" type="primary"  v-show="!imageUrl">点击上传</el-button>
		</el-upload>
		<div class="image-preview image-app-preview" v-show="isShow">
			<div class="image-preview-wrapper" v-show="1">
				<img :src="imageUrl">
				<div class="image-preview-action">
					<i @click="rmImage" class="el-icon-delete"></i>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { delImg } from '@/api/user'
import { getToken } from '@/utils/auth'
export default {
  name: 'singleImageUpload',
  props: {
	value: String,
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
      myHeaders: {'access_token' : getToken()},
      isShow:true,
      tempUrl: '',
      dataObj: { token: '', key: '' }
    }
  },
  methods: {
    rmImage() {//删除图片
       delImg({'img':this.value}).then(response => {
		  this.postForm = response.data
		  console.log(response,'res')
       }).catch(err => {
          this.fetchSuccess = false
          console.log(err,process.env.BASE_API)
       })
       this.emitInput('')
    },
   emitInput (val) {
      this.$emit('input', val)
	},
	
    handleImageScucess(file) { // 文件上传成功的狗子
	
      if (file.code == 40004) {
        this.$message.error(file.msg);
        return
	  }
      this.emitInput(file.data)
	  this.isShow = true;
	
    },
    url(){//上传地址
		// return process.env.BASE_API+'/admin/upload/upload'
		return 'http://zakj-web-test.zhiantech.com:10084/web/v1/product/upload/v1'
		// return process.env.UPLOAD_API+'/product/upload/v1'
    },
    beforeUpload() {
      const _self = this
      return new Promise((resolve, reject) => {
        getToken().then(response => {
          const key = response.data.qiniu_key
          const token = response.data.qiniu_token
          _self._data.dataObj.token = token
          _self._data.dataObj.key = key
          this.tempUrl = response.data.qiniu_url
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    }
  }
}
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
		height: 120px;
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
			background-color: rgba(0, 0, 0, .5);
			transition: opacity .3s;
			cursor: pointer;
			text-align: center;
			line-height: 120px;
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
		height: 120px;
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
