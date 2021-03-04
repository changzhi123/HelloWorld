<template>
  <div class="html2canvas">

    <div ref="imageWrapper">
      <div class="success">
        <div class="img">
          <img class="img-icon" src="../../../assets/logo.png" />
          <p style="font-weight: 600; font-size: 18px">支付成功</p>
        </div>
      </div>
      <div class="success-detail">
        <el-row style="margin-top: 10px;">
          <el-col :span="5" class="col-left-suc">收款商家</el-col>
          <el-col :span="16" class="col-right">{{merchant}}</el-col>
        </el-row>
        <el-row style="margin-top: 10px;">
          <el-col :span="5" class="col-left-suc">费用名称</el-col>
          <el-col :span="16" class="col-right">{{contName}}</el-col>
        </el-row>
        <el-row style="margin-top: 10px;">
          <el-col :span="5" class="col-left-suc">缴费金额</el-col>
          <el-col :span="16" class="col-right">{{chargePrice}}元</el-col>
        </el-row>
      </div>
    </div>
    <div class="button">
      <Button type="primary" style="width: 70%;"  size="small" @click="toImage">生成截图</Button>
    </div>
    <Modal v-model="modal1" title="预览">
      <div class="divbox">
        <img :src="imgUrl" alt="">
      </div>
    </Modal>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'

export default {
  name: 'html2canvas',
  data() {
    return {
      merchant: '奥巴马',
      contName: '奥巴马交税 ',
      chargePrice: '100000000000000000',
      modal1: false,
      imgUrl: '',
    }
  },
  mounted() {},
  methods: {
    toImage() {
      html2canvas(this.$refs.imageWrapper).then((canvas) => {
        let dataURL = canvas.toDataURL('image/png')
        this.imgUrl = dataURL
        if (this.imgUrl !== '') {
          this.modal1 = true
        }
        console.log(dataURL, 'dataURL')
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.html2canvas {
}
.divbox{
width: 100%;
// height: 300px;
>img{
  width: 100%;
// height: 100%;
}
}

</style>