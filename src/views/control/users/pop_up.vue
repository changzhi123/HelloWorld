<template>
  <popups
    ref="popupsto"
    :title="title"
    :ruleForm="ruleForm"
    :rules="rules"
    @setList="setList"
    labelwidth="120px"
  >
    <el-form-item label="用户名：" prop="username">
      <el-input
        autocomplete="off"
        :maxlength="16"
        placeholder="请输入用户名" :disabled='typepasstype'
        v-model.trim="ruleForm.username"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item label="所属角色：" prop="type">
      <el-cascader
        style="width:100%;"
        v-model="ruleForm.type"
        :options="listtab"
        placeholder="请选择所属角色"
        clearable
        :props="{ expandTrigger: 'hover',value:'id',label:'rolename',children:'roles' }"
      ></el-cascader>
    </el-form-item>
    <el-form-item v-if="typepasstype" >
      <el-button @click="typepass=!typepass">{{typepass?'取消修改':'修改密码'}}</el-button> 
     </el-form-item>
    <el-form-item label="密码：" prop="password" v-if="typepass">
      <el-input
        autocomplete="off"
        :maxlength="18"
        placeholder="请输入密码"
        v-model.trim="ruleForm.password"
        clearable show-password
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码：" prop="password_tow" v-if="typepass">
      <el-input
        autocomplete="off"
        :maxlength="18"
        placeholder="请确认密码" show-password
        v-model.trim="ruleForm.password_tow"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item label="昵称：" prop="nickname">
      <el-input
        autocomplete="off"
        :maxlength="10"
        placeholder="请输入昵称"
        v-model.trim="ruleForm.nickname"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item label="头像：" prop="avatar">
      <el-input autocomplete="off" placeholder="请输入头像地址" v-model.trim="ruleForm.avatar" clearable></el-input>
    </el-form-item>
    <!-- <el-form-item label="手机号：" prop="mobile">
      <el-input
        autocomplete="off"
        placeholder="请输入手机号"
        v-model="ruleForm.mobile"
        oninput="value=value.replace(/[^\d]/g,'')"
        :maxlength="11"
        clearable
      ></el-input>
    </el-form-item> -->
    <!-- <el-form-item label="邮箱：" prop="mailbox">
      <el-input
        autocomplete="off"
        placeholder="请输入邮箱"
        :maxlength="30"
        v-model.trim="ruleForm.mailbox"
        clearable
      ></el-input>
    </el-form-item> -->

    <div class="item_buttom">
      <el-button @click="$refs.popupsto.handleClose();">取消</el-button>
      <el-button type="primary" @click="$refs.popupsto.resetForm();">提交</el-button>
    </div>
  </popups>
</template>
<script>
import popups from "@/components/Elements/pop_up";
import {
  PasswordRegular,
  MobileRegular,
  UsernameRegula,
  EmailRegular,
  reminder
} from "@/utils/method";
export default {
  components: { popups }, //组件
  props: {
    title: {
      type: String,
      required: true
    },
    listtab: {
      type: Array,
      required: true
    }
  },
  data() {
    const type_password = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码!"));
      } else {
        if (!PasswordRegular(value)) {
          callback(new Error("密码必须包含数字和字母"));
        } else {
          if (value.length > 18 || value.length < 8) {
            callback(new Error("密码长度在8-16个字符！"));
          }
          callback();
        }
      }
    };
    const type_password_tow = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请再次输入密码"));
      } else {
        if (value !== this.ruleForm.password) {
          return callback(new Error("两次输入密码不一致!"));
        } else {
          return callback();
        }
      }
    };
    const username_type = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入用户名"));
      } else {
        if (!UsernameRegula(value)) {
          return callback(new Error("只能是数字和字母,长度在 4 到 18 个字符"));
        } else {
          return callback();
        }
      }
    };
    // const type_mobile = (rule, value, callback) => {
    //   if (value) {
    //     if (!MobileRegular(value)) {
    //       return callback(new Error("请输入正确的手机号码"));
    //     } else {
    //       return callback();
    //     }
    //   } else if (!value) {
    //     return callback();
    //   }
    // };
    // const type_mailbox = (rule, value, callback) => {
    //   if (value) {
    //     if (!EmailRegular(value)) {
    //       return callback(new Error("请输入正确的邮箱账号"));
    //     } else {
    //       return callback();
    //     }
    //   } else if (!value) {
    //     return callback();
    //   }
    // };
    return {
        typepass:null,
        typepasstype:null,
      ruleForm: {
        username: null, //用户名
        nickname: '', //昵称
        type: null, //所属角色
        avatar: '', //头像
        // mobile: null, //手机
        // mailbox: null, //邮箱
        password: null, //密码
        password_tow: null
      },
      rules: {
        type: [
          { required: true, message: "请选择所属角色", trigger: "change" }
        ],
        username: [
          { required: true, validator: username_type, trigger: "change" }
        ],
        // mobile: [{ required: true, trigger: "change", validator: type_mobile }],
        // mailbox: [
        //   { required: true, trigger: "change", validator: type_mailbox }
        // ],
        password: [
          { required: true, trigger: "change", validator: type_password }
        ],
        password_tow: [
          { required: true, trigger: "change", validator: type_password_tow }
        ]
      }
    }; //数据
  },
  methods: {
    setList(row) {
        console.log(row)
        this.$emit('setList',row)
    },
    setBezel(row) {
      this.$refs.popupsto.setBezel();
       this.typepass=true
       this.typepasstype=false
      if (row) {
          this.typepass=false
           this.typepasstype=true
        this.ruleForm = JSON.parse(JSON.stringify(row));
      }
    }
  } //方法
};
</script>
<style scoped lang="scss">
.item_buttom {
  width: 100%;
  display: flex;
  justify-content: space-between;
  button {
    width: 45%;
  }
}
</style>