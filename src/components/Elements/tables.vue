<template>
  <!-- 可无限复用的表格组件 -->
  <el-table
    :row-class-name="tableRowClassName"
    ref="multipleTable"
    :data="tableData"
    style="width: 100%"
    v-loading="loading"
    :stripe="stripe"
    :border="border"
    highlight-current-row
    fit
    @selection-change="handleSelectionChange"
    :tree-props="treeprops"
    row-key="id"
    :default-expand-all="expandall"
  >
    <el-table-column v-if="selection" type="selection" width="55" align="center"></el-table-column>
    <!-- 选择器功能 -->
    <el-table-column v-if="hidden" label="序号" :index="indexMethod" type="index" width="55" align="center"></el-table-column>
    <!-- 列表序号 -->
    <slot></slot>
  </el-table>
</template>
<script>
export default {
  //  needNum: [String, Number],// 两个类型都可以传
  props: {
    tableData: {
      type: Array,
      default: null
    },
    loading: {
      type: Boolean,
      required: true //是否必须参数
    },
    hidden: {
      type: Boolean,
      default: true
    }, //是否显示序号
    selection: {
      type: Boolean,
      default: true
    }, //是否增加选择器功能
    treeprops: {
      type: Object,
      default() {
        return { children: "children", hasChildren: "hasChildren" };
      } //当子列表里面hasChildren为true时，不渲染该子项
    }, //树形表格子项渲染条件
    expandall: {
      type: Boolean,
      default: false
    }, //树形表格是否默认展开
    condition: {
      type: Object,
      default: null
    }, //状态表格 !注意带斑马线和表格状态冲突，建议只开启其中一项
    stripe: {
      type: Boolean,
      default: false
    }, //是否带斑马纹 !注意带斑马线和表格状态冲突，建议只开启其中一项
    border: {
      type: Boolean,
      default: true
    }, //竖直方向的边框
     pageSize:{
      type:Number,default:0
    },//每页多少条
    currentPage:{
      type:Number,default:1
    },//当前页
  },
  methods: {
      indexMethod(index) {
          const reqtype=(this.currentPage-1)*this.pageSize
      //  console.log(index,reqtype,'--',this.currentPage,this.pageSize)
        return index +1+reqtype;
      // console.log(this.pageSize,this.currentPage)
      //   return this.pageSize*this.currentPage+index+1-this.pageSize;
      },
    handleSelectionChange(val) {
      // console.log(val, "选择器val");
      this.$emit("selectlist", val);
    },
    toggleSelection(row) {
      if (row) {
        row.forEach(item => {
          this.$refs.multipleTable.toggleRowSelection(item);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    }, //设置默认选择，传入的值为数组
    tableRowClassName({ row, rowIndex }) {
      if (!this.condition) return;
      const { data, colors, type } = this.condition;
      if (type != "index") {
        const index = data.indexOf(row[type]);
        if (index >= 0) return colors[index];
        return "";
      } else {
        const index = data.indexOf(rowIndex);
        if (index >= 0) return colors[index];
        return "";
      }
    } //带状态的表格 !注意带斑马线和表格状态冲突，建议只开启其中一项
  }
};
</script>
