<template>
  <div class>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    <el-button
      type="primary"
      :loading="downloadLoading"
      @click="handleDownload"
      icon="el-icon-document"
    >导出</el-button>
  </div>
</template>
<script>
export default {
  components: {}, //组件
  data() {
    return {
      list: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      downloadLoading: false,
       filename: 'nihao',//表格名字
      autoWidth: true,
      bookType: 'xlsx',//导出文件类型
    }; //数据
  },
  mounted() {}, //挂载
  computed: {}, //计算
  methods: {
    handleDownload() {
      console.log(this.filename, this.autoWidth, this.bookType, "是什么");
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = ["date", "name", "address"];
        const filterVal = [
          "date",
          "name",
          "address"
        ];
        const list = this.list;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }
  } //方法
};
</script>
<style scoped lang = "scss">
</style>