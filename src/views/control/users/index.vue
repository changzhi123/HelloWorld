<template>
  <div class="user">
    <div class="user_tab">
      <el-row :gutter="40">
        <el-col :xs="12" :sm="12" :lg="6">
          <div class="demo-input-suffix">
            <span>权限类别：</span>
            <el-cascader
              placeholder="请选择权限类别"
              v-model="reqdata.type"
              clearable
              :options="listtab"
              :props="{ expandTrigger: 'hover',label:'rolename',value:'id',children:'roles' }"
            ></el-cascader>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6">
          <div class="demo-input-suffix">
            <span>用户名：</span>
            <el-input
              placeholder="请输入用户名"
              v-model.trim="reqdata.username"
              :maxLength="20"
              clearable
            ></el-input>
          </div>
        </el-col>
        <!-- <el-col :xs="12" :sm="12" :lg="6">
          <div class="demo-input-suffix">
            <span>手机号码：</span>
            <el-input
              placeholder="请输入手机号码"
              v-model="reqdata.mobile"
              oninput="value=value.replace(/[^\d]/g,'')"
              clearable
              :maxLength="11"
            ></el-input>
          </div>
        </el-col> -->
            <!-- oninput="value=value.replace(/[^\d]/g,'')"   限制只能输入数字 -->
        <el-col :xs="12" :sm="12" :lg="6">
          <div class="demo-input-suffix">
            <el-row>
              <el-button type="primary" icon="el-icon-search" @click="getsearch" plain>查询</el-button>
            </el-row>
            <el-row>
              <el-button
                type="primary"
               @click="$refs.popups.setBezel()"
                icon="el-icon-circle-plus-outline"
                plain
              >添加管理员</el-button>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="user_box">
        <tabulation ref="tabulations"  :pageSize="reqdata.pageSize"
        :currentPage="reqdata.currentPage"
        :loading="loading"
        :tableData="tableData" :listtab='listtab'
        @getlist='getlist' />
        <pagination
        :total="total" location='center'
        :limit.sync="reqdata.pageSize"
        :page.sync="reqdata.currentPage"
        rowheights
        @getlist="getlist" />
    </div>
  <popup ref="popups" title='新增管理员' :listtab='listtab' @setList='addlist'></popup>
  </div>
</template>
<script>
import { getrole,getuser,setunser} from "@/api/user";
import {
  reminder
} from "@/utils/method";
import tabulation from './tabulation'
import pagination from "@/components/Elements/pagination";
export default {
  components: {tabulation,pagination,popup:()=>import('./pop_up')}, //组件
  data() {
    return {
      reqdata: { type: null, username: null ,pageSize:10,currentPage:1},
      listtab: [],///角色列表
      tableData:[],
      loading:false,
      total:0
    }; //数据
  },
  mounted() {
    this.getrolelist();
    this.getlist()
    let arr =[1,2,3,4,5,6,7]
    console.log(arr.slice(2,6))
    console.log(Math.floor(new Date()/1000),'时间')
  }, //挂载
  methods: {
    getlist(){
        this.loading=true
        getuser(this.reqdata).then(res=>{
            console.log(res.data,'用户列表')
            this.tableData=res.data
            this.total=res.total
            this.loading=false
        })
    },
    addlist(row) {
       setunser(row).then(res=>{
           console.log(res,'新增管理员')
           reminder(res.msg)
           this.getlist()
       })
    },
    getrolelist() {
      getrole().then(res => {
        console.log(res.data, "获取角色列表");
        this.listtab = res.data;
      });
    },
    getsearch() {
      this.reqdata.currentPage=1
      this.getlist()
    },
  } //方法
};
</script>
<style scoped lang="scss">
.user {
  width: 100%;
}
.user_tab {
  width: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  background: #fff;
  border-radius: 5px;
  padding-bottom: 20px;
  .demo-input-suffix {
    p {
      display: inline-block;
      line-height: 40px;
    }
    button {
      background: #028eff;
      color: #fff;
    }
    margin-top: 20px;
    height: 40px;
    padding: 0 10px;
    min-width: 250px;
    display: flex;
    line-height: 40px;
    justify-content: space-between;
    div {
      width: calc(100% - 100px);
    }
    span {
      width: 100px;
      text-align: center;
    }
  }
}

//表格
.user_box {
  width: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  margin-top: 20px;
  min-height: 200px;
  background: #fff;
  border-radius: 5px;
  padding: 10px;
  position: relative;
  .examine {
    color: #028eff;
  }
}
</style>