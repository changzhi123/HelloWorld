<template>
  <div class>
    <upload-excel :on-success="handleSuccess" :before-upload="beforeUpload" />
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>
  </div>
</template>
<script>
import UploadExcel from "@/components/Elements/UploadExcel"; //引入导入组件
export default {
  components: { UploadExcel }, //组件
  data() {
    return {
      tableData: [],
      tableHeader: []
    }; //数据
  },
  mounted() {}, //挂载
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (isLt1M) {
        return true;
      }
      this.$message({
        message: "请不要上传大于1m的文件。",
        type: "warning"
      });
      return false;
    },
    handleSuccess({ results, header }) {
      console.log(results, header, "jieguo");
      this.tableData = results;
      this.tableHeader = header;
    }
  } //方法
};
</script>
<style scoped lang = "scss">
</style>