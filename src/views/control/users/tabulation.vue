<template>
  <div class="tabulation">
    <tables
      :loading="loading"
      :tableData="tableData"
      :selection="false"
      ref="tablestype"
      :pageSize="pageSize"
      :currentPage="currentPage"
    >
      <el-table-column
        v-for="(item,index) in tableheads"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        align="center"
      >
        <template slot-scope="scope">
          <span v-if="item.prop!='avatar'&&item.prop!='type'">{{ scope.row[item.prop] }}</span>
          <img :src="scope.row[item.prop]" style="height:50px;" alt v-if="item.prop=='avatar'" />
          <span v-if="item.prop=='type'">{{user_role(scope.row[item.prop])}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            style="color:#028EFF;"
            @click="$refs.popups.setBezel(scope.row)"
          ></el-button>
          <delreminder v-model="scope.row" del_color="#028eff" @dellist="dellist" />
        </template>
      </el-table-column>
    </tables>
    <popup ref="popups" title="编辑管理员" :listtab="listtab" @setList="setlist"></popup>
  </div>
</template>
<script>
import tables from "@/components/Elements/tables";
import delreminder from "@/components/Elements/delreminder";
import { delunser, setunser } from "@/api/user";
import { reminder } from "@/utils/method";

export default {
  components: { tables, delreminder, popup: () => import("./pop_up") }, //组件
  props: {
    pageSize: Number,
    currentPage: Number,
    tableData: {
      type: Array,
      default: null
    }, //接受父组件传递来的表格 :tableData="tableData"
    loading: {
      type: Boolean,
      default: true
    },
    listtab: {
      type: Array,
      required: true
    } //角色列表
  },
  data() {
    return {
      tableheads: [
        { prop: "username", label: "用户名" },
        { prop: "nickname", label: "昵称" },
        { prop: "avatar", label: "头像" },
        { prop: "type", label: "所属角色" }
      ]
    }; //数据
  },
  methods: {
      user_role(key){
        //   console.log(key,this.listtab)
          const restxse=[]
          this.listtab.filter(item=>{
              if(item.id==key[0]){
                  item.roles.filter(v=>{
                      if(v.id==key[1]){
                         restxse.push(v.rolename)
                      }
                  })
              }
          })
          return restxse.join(',')
      },
    setlist(row) {
      setunser(row).then(res => {
        console.log(res, "修改管理员");
        reminder(res.msg);
        this.$emit("getlist");
      });
    },
    dellist(key) {
      delunser({ id: key.id }).then(res => {
        console.log(res, "删除管理员");
        reminder(res.msg);
        this.$emit("getlist");
      });
    }
  } //方法
};
</script>
<style scoped lang="scss">
.tabulation {
  width: 100%;
}
</style>