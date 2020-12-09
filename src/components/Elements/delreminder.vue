<template>
  <!-- 组件基于element ui Popconfirm 气泡确认框-->
  <!-- 如需要在按钮内展示内容，直接在元素内输入问题 -->
  <!--   <delreminder del_color='#028EFF'  del_icon="el-icon-delete" v-model="scope.row" @dellist="dellist"></delreminder> 使用展示-->
  <el-popconfirm
    :confirmButtonText="confirmButtonText"
    :cancelButtonType="cancelButtonType"
    :cancelButtonText="cancelButtonText"
    :confirmButtonType="confirmButtonType"
    :icon="icon"
    :hideIcon="hideIcon"
    :iconColor="iconColor"
    :title="title"
    @onConfirm="dellist" 
  >
    <el-button
      slot="reference"
      :type="del_type"
      :disabled="del_disabled"
      :style="`color:${del_color};`"
      :size="del_size"
      :icon="del_icon"
      :round="del_round"
      :circle="del_circle"
      :loading="del_loading" 
    >
      <slot></slot>
    </el-button>
  </el-popconfirm>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "确定删除该选项吗？"
    }, // 提示内容
    hideIcon: {
      type: Boolean,
      default: false
    }, //是否隐藏 提示Icon
    iconColor: {
      type: String,
      default: "rgb(255, 153, 0)"
    }, //	提示Icon 颜色
    icon: {
      type: String,
      default: "el-icon-question"
    }, // 提示Icon
    confirmButtonText: {
      type: String,
      default: "确定"
    }, //提示确认按钮文字
    cancelButtonText: {
      type: String,
      default: "取消"
    }, //提示取消按钮文字
    confirmButtonType: {
      type: String,
      default: "primary"
    }, //提示确认按钮类型 primary / success / warning / danger / info / text
    cancelButtonType: {
      type: String,
      default: "text"
    }, //提示取消按钮类型 primary / success / warning / danger / info / text
    del_size: {
      type: String,
      default: "mini"
    }, //medium / small / mini 删除按钮按钮尺寸，默认small
    del_icon: {
      type: String,
      default: "el-icon-delete"
    }, //删除按钮图标
    del_loading: {
      type: Boolean,
      default: false
    },//是否加载中状态
    del_color: {
      type: String,
      default: ""
    }, // 删除按钮颜色
    del_disabled: {
      type: Boolean,
      default: false
    }, // 是否禁用删除按钮
    del_type: {
      type: String,
      default: ""
    }, //删除按钮风格 primary / success / warning / danger / info / text
    del_round: {
      type: Boolean,
      default: false
    }, //是否圆角删除按钮
    del_circle: {
      type: Boolean,
      default: false
    }, //是否圆删除形按钮
    value: {
      type: [Object,Number],
      required: true, //是否必须参数
    }, //父组件传递过来的参数，确定删除时通过暴露dellist方法返回  参数为对象  v-model=""
  },
  methods: {
    //##删除
    dellist() {
      //  console.log('删除',this.value )
      this.$emit("dellist", this.value ); //暴露dellist给父组件内调用，并将row对象返回
    }
  }
};
</script>