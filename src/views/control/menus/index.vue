<template>
<!-- 菜单管理 -->
  <div class="menus">
    <div class="menus_heade">
      <el-row :gutter="40">
        <el-col :xs="12" :sm="12" :lg="12">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="newlyincreased">添加菜单</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="menus_tabul">
      <tabulation :loading="loading" @getlist='getlist' :tableData="tableData" @setlist="setlsit" />
    </div>
    <wicket ref="wickets" @setList="addlist" :tableData="tableData" title="新增菜单" />
  </div>
</template>
<script>
import { parseTime, reminder } from "@/utils/method";
import { getMenus } from "@/api/user";
import tabulation from "./tabulation";
import wicket from "./wicket";
import { getsetrouter } from "@/api/user";
export default {
  components: {
    tabulation,
    wicket
  }, //组件
  data() {
    return {
      loading: true,
      tableData: []
    }; //数据
  },
  created() {}, //实例化
  mounted() {
    this.getlist();
  }, //挂载
  updated() {}, //更新
  destroyed() {}, //销毁
  computed: {}, //计算
  methods: {
    newlyincreased() {
      this.$refs.wickets.setBezel();
    },
    getlist() {
      this.loading = true;
      getMenus().then(res => {
        this.tableData = res.data;
        console.log(res.data, "菜单列表");
        this.loading = false;
      });
    },
    addlist(row) {
      console.log(row);
      getsetrouter(row).then(res => {
        console.log(res, "新增菜单");
        reminder("新增菜单成功！");
        this.getlist();
      });
    },
    setlsit(row) {
      console.log(row);
      row.children = null;
      getsetrouter(row).then(res => {
        console.log(res, "编辑菜单");
        reminder("编辑菜单成功！");
        this.getlist();
      });
    }
  } //方法
};
</script>
<style scoped lang = "scss">
.menus {
  width: 100%;
}
.menus_heade {
  padding: 20px;
  width: 100%;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}
.menus_tabul {
    width: 100%;
  min-height: 200px;
  background: #fff;
  margin-top: 20px;
  padding: 10px;border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}
</style>