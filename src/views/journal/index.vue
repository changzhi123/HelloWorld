<template>
  <div id="journal">
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <!-- 菜单管理模板 -->
  <div class="box">
      <el-menu
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="rgb(191, 203, 217)"
      :default-active="active"
      :default-openeds="openeds"
      active-text-color="#1989fa"
      @open="handleOpen"
      @close="handleClose"
      @select="handleselect"
      :collapse="isCollapse"
    >
      <el-submenu index="8">
        <template slot="title">
          <!-- <i class="el-icon-setting"></i> -->
          <svg-icon class="svg-icon" icon-class="example" />
          <span slot="title">导航一</span>
        </template>
        <el-menu-item index="2" class="second-menu">
          <i class="el-icon-setting"></i>
          <span slot="title">二级菜单1</span>
        </el-menu-item>
        <el-submenu index="5" class="second-menu">
          <template slot="title" >
            <i class="el-icon-location"></i>
            <span slot="title">二级菜单2</span>
          </template>
          <el-menu-item index="4" class="second-menu">
            <i class="el-icon-eleme"></i>
            <span slot="title">三级级菜单1</span>
          </el-menu-item>
        </el-submenu>
        
      </el-submenu>
      
      <el-menu-item index="3">
        <i class="el-icon-document icon-color"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
    </el-menu>
  </div>
  </div>
</template>

<script>
export default {
  name: "journal",
  data() {
    return {
      isCollapse: false,
      openeds: ["8"], //默认展开
      active: "2" //默认选中
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath, "展开的回调");
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath, "收起的回调");
    },
    handleselect(key, keyPath) {
      console.log(key, keyPath, "菜单激活回调");
    }
  }
};
</script>
<style lang="scss" >
.journal {
  width: 100%;
}
.box{
  width: 210px;min-height: 100px;
}
//## 菜单基础样式
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  min-height: 100px;
  overflow: hidden;
  //## 修改菜单组件二级菜单背景颜色
  .second-menu {
    background-color: #1f2d3d !important;
    > div {
      background-color: #1f2d3d !important;
      &:hover {
        //设置鼠标滑过菜单时菜单背景颜色-针对有三级菜单的二级菜单
        background-color: #001528 !important;
      }
    }
    &:hover {
      //设置鼠标滑过菜单时菜单背景颜色-针对没有三级菜单的二级菜单
      background-color: #001528 !important;
    }
  }
}
//##修改svg图片样式
.svg-icon {
  margin: 0 10px 0 5px;
  font-size: 15px;
  //  color: rgb(191, 203, 217);
}
// ## 修改菜单组件当前激活的菜单背景颜色和字体颜色-基本可以无视
// .el-template.el-menu-item.is-active {
//   background-color: #001528 !important;
// }
</style>
