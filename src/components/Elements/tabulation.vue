<template>
  <!-- 基于element ui table表格组件 -->
  <div class="tabulation">
    <el-table
      :data="value||tableData"
      style="width: 100%"
      v-loading="loading"
      stripe
      border
      highlight-current-row
      :row-class-name="tableRowClassName"
      fit
    >
      <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="date" label="日期" align="center">
        <template slot-scope="scope">
          <span>{{ usertype(scope.row.date) }}</span>
        </template>
      </el-table-column>
      <!--  -->
      <el-table-column align="center">
        <template slot="header">
          <span>我是自定义头部</span>
          <i class="el-icon-share"></i>
        </template>
        <template slot-scope="scope">
          <span size="mini">{{scope.row.date}}</span>
        </template>
      </el-table-column>
      <!--  -->
      <el-table-column label="合并头" align="center">
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" align="center">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.phone }}</el-tag>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="address" label="地址" align="center"></el-table-column>
      <el-table-column prop="type" label="类型" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ usertypetow(scope.row.type) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            style="color:#028EFF;"
            @click="handleEdit( scope.row)"
          ></el-button>
          <!--使用了delreminder 组件  -->
          <delreminder del_icon="el-icon-delete" v-model="scope.row.id" @dellist="dellist"></delreminder>
        </template>
      </el-table-column>
    </el-table>
    <wicket ref="wickets" title="编辑" @setList="addList"></wicket>
  </div>
</template>
<script>
import { parseTime, reminder } from "@/utils/method";
export default {
  props: {
    value: {
      type: Array,
      default: null
    }, //接受父组件传递来的表格 v-model="tableData"
    tableData: {
      type: Array,
      default: null
    }, //接受父组件传递来的表格 :tableData="tableData"
    loading: {
      required: true, //必须参数
      type: Boolean
    } //表单是否懒加载
  },
  components: {
    delreminder: () => import("@/components/Elements/delreminder"), //删除提示按钮组件
    wicket: () => import("@/components/Elements/wicket")
  },
  methods: {
    //##提交编辑
    addList(row) {
      console.log(row, "提交编辑-表格");
      this.$emit("setlist", row);
      reminder("编辑成功！");
    },
    //##打开编辑
    handleEdit(row) {
      this.$refs.wickets.setBezel(row);
    },
    //##删除
    dellist(row) {
      reminder("删除成功！"); //调用@/utils/method里面的reminder方法
      console.log(row, "删除");
    },

    // //

    tableRowClassName({ row, rowIndex }) {
      console.log(row, rowIndex, "0");
      if (rowIndex === 0) {
        return "warning-row";
      } else if (rowIndex === 1) {
        return "success-row";
      }
      return "";
    },
    usertype(key) {
      //转换时间格式
      return parseTime(key); //调用@/utils/method里面的parseTime方法
    },
    usertypetow(key) {
      //分步转换
      switch (key) {
        case 1:
          return "打死他";
          break;
        case 2:
          return "打我啊";
          break;
        default:
          //默认
          return "没有数据";
      }
    },
   
  }
};
</script>
<style lang="scss" >
.tabulation {
  width: 100%;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>