<template>
  <!-- 可无限复用的弹窗表格组件 -->
  <el-dialog
    class="dialog"
    :title="title"
    :visible.sync="dialogVisible"
    :width="width"
    :center="center"
    :before-close="handleClose"
    destroy-on-close
  >
    <!-- destroy-on-close 关闭时销毁 Dialog 中的元素-->
    <el-form
      :model="ruleForm"
      :disabled="disabled"
      status-icon
      :rules="rules"
      ref="ruleForm" :key='type_index'
      :label-width="labelwidth"
      :label-suffix="label_suffix"
      class="demo-ruleForm"
      :label-position="labelPosition"
    >
      <slot></slot>
      <!-- <el-form-item>
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="resetForm">提交</el-button>
      </el-form-item> -->
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true //必须参数
    }, //##表单提示信息:title="title"
    ruleForm: {
      type: Object,
      // required: true //必须参数
    }, //表单数据
    rules: {
      type: Object,
      default() {
        return {};
      }
    }, //表格正则
    labelwidth: {
      type: String,
      default: "100px"
    }, //label的宽度
    labelPosition: {
      type: String,
      default: "right" //left top  right
    }, //设置label对齐方式
    disabled: {
      type: Boolean,
      default: false
    }, //##是否禁用该表单内的所有组件
    center: {
      type: Boolean,
      default: false
    }, //是否对头部和底部采用居中布局
    width: {
      type: String,
      default: "30%"
    }, //弹窗宽度
    label_suffix: {
      type: String,
      default: ""
    }, //表单域标签的后缀
    replacement:{
      type:Array,
      default:null
    },//指定需要重置的值
  },
  data() {
    return {
      dialogVisible: false, //弹窗控件
      type_index:1
    }; //数据
  },
  methods: {
    //##提交表单
    resetForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          //通过正则
          // console.log(this.ruleForm,'提交表单')
          this.$emit("setList", JSON.parse(JSON.stringify(this.ruleForm))); // 避免重置表单组件时影响到提交的数据，深拷贝
          this.handleClose(); //关闭弹窗重置表单
        } else {
          //未通过正则
          console.log("error submit!!");
          return false;
        }
      });
    },
    //##打开弹窗,有值为编辑
    setBezel(row) {
      this.type_index++
      console.log(row, row ? "打开编辑弹窗" : "打开新建弹窗");
      if (row) this.ruleForm = JSON.parse(JSON.stringify(row)); //给表单赋值 ，深拷贝
      this.dialogVisible = true; //打开弹窗
    },
    //##关闭弹窗，带重置功能
    handleClose(done) {
      // done();//原弹窗关闭方法，不使用
      // console.log('关闭弹窗')
      if(this.replacement){
         this.replacement.filter(item=>{
            this.ruleForm[item.key]=item.val||null
         })
      }//指定需要重置的值
      this.$refs.ruleForm.resetFields(); //重置表单
      this.dialogVisible = false; //关闭弹窗
    },
  } //方法
};

/*
scss基础使用
##
scss申明变量用
$border-color:#aaa; //声明变量
$border_color:#ccc;
border:$border-width solid $border-color; //使用变量

##
scss引入其他css和scss文件
import './App.scss';

##
scss嵌套属性
li {
    border:1px solid #aaa;
    border-left:0;
    border-right:0;
}

##
scss默认变量，引入另一个同名变量会覆盖当前文件的变量，所以如果不想更改可以使用默认变量
$border-color:#ccc !default; //声明变量

##
@mixin指令声明一个函数
@mixin get-border-radius($border-radius:5px,$color:red){
    -moz-border-radius: $border-radius;
    -webkit-border-radius: $border-radius;
    border-radius: $border-radius;
    color:$color;
}
使用函数的关键字为@include
container {
    border:1px solid #aaa;
    @include get-border-radius;         //不传参则为默认值5px
    @include get-border-radius(10px,blue);   //传参
}
多个参数时，传参指定参数的名字，可以不用考虑传入的顺序
.container {
    border:1px solid #aaa;
    @include get-border-radius;         //不传参则为默认值5px
    @include get-border-radius($color:blue,$border-radius:10px);   //传参
}

##
scss定义被继承的样式 %关键字，定义被继承的样式没有调用不会执行，
%border-style {
  border:1px solid #aaa;
  border-radius: 5px;
}
通过关键字@extend即可完成继承
.container {
	@extend %border-style;
}
继承2
a {
  display: block;
}
.disabled {
  color: gray;
  @extend a;
}

##
scss子代选择器 &=父元素
.box{
  >li{
    &:hover{}
  }
  &:after{}

}
*/ 
</script>
<style lang="scss" >
//修复弹窗组件的bug，可根据项目需求修改
.el-dialog__body {
  padding: 0 20px 20px 20px;
  // border-top: 1px dashed #ccc;
  // border-top: 1px solid #ccc;//子代选择器
  > form {
    border-top: 1px dashed #ccc;
    padding-top: 20px;
  }
}
</style>
