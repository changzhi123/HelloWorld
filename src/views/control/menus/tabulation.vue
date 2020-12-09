<template>
  <!-- 基于element ui table表格组件 -->
  <div class="tabulation">
    <el-table
      :data="value||tableData"
      style="width: 100%"
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      v-loading="loading"
      stripe
      border
      highlight-current-row
      fit
    >
      <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="title" label="菜单名称title"></el-table-column>
      <el-table-column prop="path" label="跳转路由path"></el-table-column>
      <el-table-column prop="component" label="组件地址component"></el-table-column>
      <el-table-column prop="name" label="组件名称name" align="center"></el-table-column>
      <el-table-column prop="hidden" label="是否显示hidden" align="center">
        <template slot-scope="scope">
          <span>{{ usertypetow(scope.row.hidden) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="icon" label="组件图标icon" align="center"></el-table-column>
      <el-table-column prop="rank" label="菜单级别rank" align="center">
        <template slot-scope="scope">
          <span>{{ usertyperow(scope.row.rank) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="order" label="菜单排序order" align="center"></el-table-column>
      <el-table-column prop="parent" label="父级菜单parent" align="center">
        <template slot-scope="scope">
          <span>{{ usertype(scope.row.parent) }}</span>
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
          <delreminder
            del_icon="el-icon-delete"
            del_color="#028EFF"
            v-model="scope.row"
            @dellist="dellist"
          ></delreminder>
        </template>
      </el-table-column>
    </el-table>
    <wicket ref="wickets" title="编辑菜单" :tableData="tableData" @setList="addList"></wicket>
  </div>
</template>
<script>
import { parseTime, reminder } from "@/utils/method";
import { getsetrouter, getdelrouter } from "@/api/user";
import wicket from "./wicket";
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
    wicket
  },
  methods: {
    //##提交编辑
    addList(row) {
      console.log(row, "提交编辑-表格");
      this.$emit("setlist", row);
      // reminder("编辑成功！");
    },
    //##打开编辑
    handleEdit(row) {
      this.$refs.wickets.setBezel(row);
    },
    //##删除
    dellist(row) {
      console.log(row, "删除");
      getdelrouter({ id: row.id }).then(res => {
        console.log(res, "删除菜单");
        reminder("删除成功");
        this.$emit("getlist");
      });
    },

    // //
    usertype(key) {
      let name = "";
      if (key)
        this.tableData.filter(item => {
           if(item.id==key){
            return name=item.meta.title+' & '+item.name
           }else{
              if(item.children){
                item.children.filter(tab=>{
                  if(tab.id==key){
                   return name=tab.meta.title+' & '+tab.name
                  }
                })
              }
           }
        });
      return name || key;
    },
    usertypetow(key) {
      //分步转换
      switch (key) {
        case true:
          return "隐藏";
          break;
        case false:
          return "显示";
          break;
      }
    },
    usertyperow(key) {
      switch (key) {
        case 1:
          return "一级菜单";
          break;
        case 2:
          return "二级菜单";
          break;
            case 3:
          return "三级菜单";
          break;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.tabulation {
  width: 100%;
  padding: 10px;
}
</style>