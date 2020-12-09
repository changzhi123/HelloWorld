<template>
  <!-- 基于element ui  弹窗组件+form表单组件-->
  <el-dialog
    class="dialog"
    :title="title"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <el-form :model="ruleForm" :disabled='disabled' status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="name">
        <el-input v-model.lazy="ruleForm.name" autocomplete="off" placeholder="请输入" clearable></el-input>
        <!-- v-model.lazy="ruleForm.name"  当输入框失去焦点后触发change事件更新 -->
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model.trim="ruleForm.address" autocomplete="off" placeholder="请确认" clearable></el-input>
        <!-- v-model.trim 自动过滤输入内容最开始  和 最后的 空格，中间的会保留一个空格，多的会被过滤掉 -->
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-input v-model.number="ruleForm.type" autocomplete="off" placeholder="请输入" clearable></el-input>
        <!--  v-model.number="ruleForm.type"  可以设置只能输入数字 -->
      </el-form-item>
       <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm.phone" :maxlength='11' autocomplete="off" placeholder="请输入" clearable></el-input>
      </el-form-item>
       <div class="item_buttom">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary"  @click="resetForm">提交</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>

import{MobileRegular,EmailRegular,PasswordRegular}from '@/utils/method'
export default {
  components:{},
  props: {
    title: {
      type: String,
     required: true, //必须参数
    }, //##表单提示信息:title="title"
    disabled:{
       type:Boolean,
       default:false,
     },//##是否禁用该表单内的所有组件
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入手机号码"));
      } else {
        // if (!/^1[3456789]\d{9}$/.test(value)) {
           if (!MobileRegular(value)) {//手机号正则
            // if(!EmailRegular(value)){//邮箱正则
          callback(new Error("请输入正确的手机号码"));
        }
        callback();
      }
    };
    return {
      dialogVisible: false, //弹窗控件
      ruleForm: { date: "", name: "", address: "", type: 1, id: null,phone:'' }, //弹窗的参数，赋值容错
      rules: {
        name: [{ required: true, message: "请输入", trigger: "change" }],
        address: [{ required: true, message: "请确认", trigger: "change" }],
        type: [{ required: true, message: "请输入", trigger: "change" }],
        phone:[{ required: true, validator: validatePass, trigger: "change" }]
      }, //正则验证
    };
  },
  methods: {
    //##提交表单
    resetForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {//通过正则
          this.$emit("setList", JSON.parse(JSON.stringify(this.ruleForm)))// 避免重置表单组件时影响到提交的数据，深拷贝
          this.handleClose()//关闭弹窗重置表单
        } else {
          //未通过正则
          console.log("error submit!!");
          return false;
        }
      });
    },
    //##打开弹窗
    setBezel(row) {
      console.log(row,row?'打开编辑弹窗':'打开新建弹窗')
      if(row)this.ruleForm = JSON.parse(JSON.stringify(row)); //给表单赋值 ，深拷贝
      this.dialogVisible = true; //打开弹窗
    },
    //##关闭弹窗，带重置功能
    handleClose(done) {
      // done();//原弹窗关闭方法，不使用
      this.$refs.ruleForm.resetFields(); //重置表单
      this.dialogVisible = false; //关闭弹窗
    },
  }
};
</script>
<style lang="scss" scoped>
.dialog {
  width: 100%;
}
.item_buttom {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    button {
      width: 45%;
  }
}
</style>