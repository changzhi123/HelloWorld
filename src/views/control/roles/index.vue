<template>
  <!-- 角色管理 -->
  <div class="roles">
    <!-- roles -->
    <div class="roles_tabul">
      <el-row>
        <el-col :span="4" style="min-width: 200px;">
          <el-menu class="el-menu-vertical-demo" @select="getdata">
            <el-submenu :index="item.id" v-for="item in listtab" collapse :key="item.id">
              <template slot="title">
                <strong>
                  <span>{{item.rolename}}</span>
                </strong>
              </template>
              <el-menu-item-group class="tab">
                <el-menu-item
                  :index="child.id.toString()"
                  v-for="child in item.roles"
                  :key="child.id"
                >
                  <span v-if="type!=child.id">{{child.rolename}}</span>
                  <i
                    class="el-icon-edit iconic-b"
                    v-if="type!=child.id"
                    @click.stop="compile(child.id,child.rolename)"
                  ></i>
                  <!-- click.stop方法阻止事件冒泡 -->
                  <i
                    class="el-icon-delete iconic-a"
                    @click.stop="dellist(child.id)"
                    v-if="type!=child.id"
                  ></i>

                  <el-input
                    placeholder="请输入名称"
                    v-model.trim="roleName"
                    clearable
                    v-if="type==child.id"
                  ></el-input>
                  <i
                    class="el-icon-folder-add"
                    :style="roleName?'color: #028EFF;':'color: #909399;'"
                    v-if="type==child.id"
                    @click.stop="compile(child.id,child.rolename,item.id)"
                  ></i>
                </el-menu-item>
                <el-menu-item>
                  <i
                    class="el-icon-circle-plus-outline"
                    v-if="type!=item.id"
                    @click.stop="switcher(item.id)"
                  ></i>
                  <el-input
                    placeholder="请输入名称"
                    :maxlength="5"
                    clearable
                    v-if="type==item.id"
                    v-model.trim="roleName"
                  ></el-input>
                  <i
                    class="el-icon-folder-add"
                    :style="roleName?'color: #028EFF;':'color: #909399;'"
                    v-if="type==item.id"
                    @click.stop="switcher(item.id)"
                  ></i>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-col :span="8" class="Finland">
          <transition name="fade">
            <div class="select" v-if="roleid">
              <el-tree
                :data="menudata"
                show-checkbox
                v-loading="loading"
                :default-expand-all="false"
                node-key="id"
                ref="tree"
                highlight-current
                :props="defaultProps"
              ></el-tree>
              <!--    :default-expanded-keys="[1]" :default-checked-keys="[5]" -->
              <!-- <el-button @click="getCheckedNodes">通过 node 获取</el-button>
            <el-button @click="getCheckedKeys">通过 key 获取</el-button>
            <el-button @click="setCheckedNodes">通过 node 设置</el-button>
            <el-button @click="setCheckedKeys">通过 key 设置</el-button>
              <el-button @click="resetChecked">清空</el-button>-->

              <div class="buttons">
                <el-button @click="steamed">清空&全选</el-button>
                <el-button @click="getCheckedKeys" type="primary">保存</el-button>
              </div>
            </div>
          </transition>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getMenus, getrole, getrolemenu, setrole, delrole,setrolemenu } from "@/api/user";
import { reminder } from "@/utils/method";
export default {
  components: {}, //组件
  data() {
    return {
      listtab: [], //角色列表
      type: null,
      roleName: "",
      roleid: null,
      loading: false,
      menudata: [], //菜单树
      defaultProps: {
        children: "children",
        label: "title"
      },
      reqdata: [] //去除父级id之后的数据
    }; //数据
  },
  mounted() {
    this.getlist();
    this.getrolelist();
  }, //挂载
  methods: {
    getlist() {
      getMenus().then(res => {
        console.log(res.data, "获取菜单树");
        this.menudata = res.data;
      });
    },
    getrolelist() {
      getrole().then(res => {
        console.log(res.data, "获取角色列表");
        this.listtab = res.data;
      });
    },
    getdata(key) {
      this.roleid = key;
      console.log(typeof key,'key')
      if (!key) return;
      this.loading = true;
      this.reqdata = [];
      getrolemenu({ id: key }).then(res => {
        console.log(res.data, "获取当前角色分配的菜单");
        this.setfiltrate(this.menudata, res.data); //遍历去除父级id
        this.$refs.tree.setCheckedKeys(this.reqdata);
        this.loading = false;
      });
    },
    dellist(key) {
      //删除
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.roleid == key) this.roleid = null;
          delrole({ id: key }).then(res => {
            console.log(res, "删除成功！");
            reminder(res.msg);
            this.getrolelist();
          });
        })
        .catch(() => {
          reminder('已取消删除',"info");
         });
    },
    compile(key, val, id) {
      //key是当前编辑的角色id，val是当前编辑的角色名，id是角色类别id
      //编辑
      if (this.type != key) {
        //打开编辑输入框
        this.type = key;
        this.roleName = val;
      } else {
        //已存在
        this.type = null;
        if (this.roleName)
          setrole({ id: key, rolename: this.roleName }).then(res => {
            console.log(res, "编辑成功！");
            reminder(res.msg);
            this.getrolelist();
          });
      }
    },
    switcher(key) {
      //新增 key是将要添加的角色类别id
      if (this.type != key) {
        //打开新增输入框
        this.roleName = "";
        this.type = key;
      } else {
        //已存在
        this.type = null;
        if (this.roleName)
          setrole({ rolename: this.roleName, type: key }).then(res => {
            console.log(res, "新增成功！");
            reminder(res.msg);
            this.getrolelist();
          });
      }
    },
    steamed() {
      if (this.$refs.tree.getCheckedKeys().length > 0) {
        this.$refs.tree.setCheckedKeys([]); //清空
      } else {
        this.$refs.tree.setCheckedNodes(this.menudata); //全选 //
      }
    },
    setfiltrate(data, arr) {
      data.filter(item => {
        if (arr.includes(item.id)) {
          if (!item.children) {
            this.reqdata.push(item.id); //children为空，吧id保存
          } else {
            this.setfiltrate(item.children, arr); //如果children不为空，重复回调
          }
        }
      });
    },

    getCheckedKeys() {
      const nodeList = Array.from(
        new Set([
          ...this.$refs.tree.getCheckedKeys(),
          ...this.$refs.tree.getHalfCheckedKeys()
        ])
      );
      // console.log(nodeList)
         setrolemenu({control:nodeList,id:this.roleid}).then(res=>{
        console.log(res,'更新成功!')
        reminder(res.msg)
        this.getdata(this.roleid)
      })
    }
  } //方法
};
</script>
<style scoped lang="scss">
.roles {
  width: 100%;
}
.roles_tabul {
  width: 100%;
  min-height: 200px;
  background: #fff;
  //   margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);

  .Finland {
    display: flex;
    justify-content: space-between;
    .select {
      padding: 20px 10px 80px 10px;
      width: 100%;
      margin-bottom: 20px;
      .el-tree-node__content {
        display: flex;
        justify-content: space-between;
      }
      position: relative;
    }
    .buttons {
      width: 100%;
      margin-top: 20px;
      position: absolute;
      left: 60%;
      button {
        width: 30%;
      }
    }
  }
  .tab {
    color: #ccc;
    ul {
      li {
        padding-left: 25px !important;
        i {
          color: #028eff;
        }
        position: relative;
        .iconic-b {
          position: absolute;
          right: 40px;
          line-height: 50px;
        }
        .iconic-a {
          position: absolute;
          right: 10px;
          line-height: 50px;
        }
      }
    }
  }
}
</style>
<style lang="scss" >
.el-menu-item-group__title {
  padding: 0 !important;
}
// 优化ui组件样式bug
</style>