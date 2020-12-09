<template>
  <div class="tab">
    <h1>表格组件</h1>
    <tabulation v-model="res"  @setlist='setlist' :loading='loading'></tabulation>
    <h1>分页组件</h1>
    <pagination
      :total="20"
      :limit.sync="req.pageSize"
      :page.sync="req.currentPage"
      @getlist="getlist"
    ></pagination>
    <!--  -->
    <h1>弹窗+表单组件</h1>
    <wicket ref="wicket" @setList="addList" title="新增"> </wicket>
    <el-button @click="dakai" >新增</el-button>
  </div>
</template>
<script>
import { reminder } from "@/utils/method";
export default {
  components: {
    tabulation: () => import("@/components/Elements/tabulation"), //组件异步加载
    pagination: () => import("@/components/Elements/pagination"),
    wicket: () => import("@/components/Elements/wicket")
  },
  data() {
    return {
      res: [
        {
          date: null,
          name: "小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          type: 1,
          id: 1,phone:'15000000000'
        },
        {
          date: null,
          name: "王虎",
          address: "上海市普陀区金沙江路 1517 弄",
          type: 2,
          id: 2,phone:'15000000000'
        }
      ],
      req:{currentPage: 3,pageSize:10,},
      loading:false
    };
  },
  mounted() {
    this.item();
  },
  methods: {
    addList(row) {
      console.log(row, "新增成功!"); //新增
      row.id=new Date().getTime()
      this.res.push(JSON.parse(JSON.stringify(row)));
      this.item();
      reminder('新增成功！')
    },
    setlist(row){
      this.res.map(item=>{
        if(item.id==row.id){
          for (let key in item) {
            item[key]=row[key]
          }
        }
      })
    },
    dakai() {
      //新增打开弹窗
      this.$refs.wicket.setBezel();
    },
    getlist(key) {
      console.log(this.req.currentPage, this.req.pageSize, "获取刷新列表");
    },
    item() {
      this.res.map(item => {
        item.date = new Date().getTime();
        return item;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.tab{
  width: 100%;
}
</style>