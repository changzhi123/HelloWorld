<template>
  <div class>
    <h1 v-if="true">公共表格组件</h1>
    <!-- !注意表格斑马线和表格状态冲突，建议只开启其中一项 -->
    <tables
      :loading="loading"
      :tableData="tableData"
      ref="tablestype" :condition='condition' :pageSize='pageSize' :currentPage='currentPage'
    >
      <el-table-column
        v-for="(item,index) in tableheads"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        align="center"
        :sortable="item=='date'"
        column-key="date"
      >
        <!-- :sortable="item=='date'" 是否打开赛选 column-key="date" 控制赛选条件 -->
        <template slot-scope="scope">
          <span v-if="item.prop!='name'&&item.prop!='address'">{{ scope.row[item.prop] }}</span>
          <el-tag v-if="item.prop=='name'">{{ scope.row[item.prop] }}</el-tag>
          <span v-if="item.prop=='address'">{{ usertype(scope.row[item.prop]) }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center">
        <template slot="header">
          <span>自定义头部</span>
          <i class="el-icon-share"></i>
        </template>
        <template slot-scope="scope">
          <span size="mini">{{scope.row.date}}</span>
        </template>
      </el-table-column>

      <el-table-column label="合并头" align="center">
        <el-table-column prop="date" label="date" align="center"></el-table-column>
        <el-table-column prop="date" label="date" align="center">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.date }}</el-tag>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button  size="small">{{scope.row.name}}</el-button>
        </template>
      </el-table-column>
    </tables>
    <el-button @click="ret">设置默认选择项</el-button>
  </div>
</template>
<script>
import tables from "@/components/Elements/tables";
export default {
  components: {
    tables //: () => import("@/components/Elements/tables")//使用该方法引入组件，只有在挂载的时候才会加载，常用组件不建议使用该方法引入
  }, //组件
  props:{
    pageSize:Number,currentPage:Number
  },
  data() {
    return {
      loading: false,
      // tablehead: ["date", "name", "address"],
      tableheads:[
        {prop:'date',label:'date'},{prop:'name',label:'name'},{prop:'address',label:'address'}
      ],
      tableData: [
        { id: 1, date: "2016-04-02", name: "王小虎", address: 1 },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小白",
          address: 2,
          children: [{ id: 3, date: "2016-05-08", name: "王小黑", address: 2 }]
        },
         { id: 5, date: "2016-04-02", name: "王小虎2", address: 1 },
          { id: 6, date: "2016-04-02", name: "王小虎2", address: 1 },
      ],
      // condition:  { type: "index", data: [0, 2], colors: ["success-row", "warning-row"] },//表格状态渲染条件
      condition:{ type: "id", data: [1, 3,5], colors: ["success-row", "warning-row","success-row"] },//表格状态渲染条件
    }; //数据
  },
  mounted() {
    this.type();
    this.ret();
  }, //挂载
  methods: {
    ret() {
      //调用子组件的方法，设置默认选择项
      this.$refs.tablestype.toggleSelection([this.tableData[0]]);
    },
    type() {
      for (let key in this.tableData[0]) {
        console.log(key, this.tableData[0][key], "key遍历对象");
      }
    },
   
    usertype(key) {
      switch (key) {
        case 1:
          return "打死他";
          break;
        case 2:
          return "打我啊";
          break;
      } //分步转换
    }
  } //方法
};
</script>
<style lang="scss" >
.el-table .warning-row { // 表格状态渲染染色
  background: #58bc58;
}

.el-table .success-row {// 表格状态渲染染色
  background: #f0f9eb;
}
</style>