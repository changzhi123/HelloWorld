<template>
  <!-- login -->
  <div class="login">

    <div class="login-box">

      <h2>{{projectName}}</h2>

      <div class="imput-box">
        <a-input
          size="large"
          :maxlength="30"
          placeholder="请输入账号"
          allowClear
          @change="canonical('username')"
          v-model:value="formData.username"
        >
          <template #prefix>
            <UserOutlined />
          </template>
        </a-input>
        <p v-if="rules.username.show" class="p-text">
          {{ rules.username.text }}
        </p>
      </div>

      <div class="imput-box">
        <a-input-password
          size="large"
          :maxlength="18"
          allowClear
          placeholder="请输入密码"
          @change="canonical('password')"
          v-model:value="formData.password"
          @pressEnter="login()"
        >
          <template #prefix>
            <LockOutlined />
          </template>
        </a-input-password>
        <p v-if="rules.password.show" class="p-text">
          {{ rules.password.text }}
        </p>
      </div>

      <a-button
        type="primary"
        size="large"
        @click="login()"
        block
        :loading="loading"
        >登录</a-button
      >

    </div>

  </div>
</template>

<script>
import {
  toRefs,
  reactive
} from "vue";
import { useStore } from "vuex";
import {projectName} from '@/utils/keyName.js'
export default {
  components: { UserOutlined, LockOutlined },
  setup() {
    const store = useStore();
    const state = reactive({
      formData: {
        username: "changzhi",
        password: "123456adc",
      },
      rules: {
        username: {
          text: "",
          show: false,
        },
        password: {
          text: "",
          show: false,
        },
      },
      loading: false,
    });
    //正则验证
    function canonical(type) {
      const keyName = {
        username: "账户",
        password: "密码",
      };
      if (!state.formData[type]) {
        state.rules[type].text = `请输入${keyName[type]}！`;
        state.rules[type].show = true;
      } else {
        state.rules[type].text = "";
        state.rules[type].show = false;
      }
      // console.log(type,state.rules[type])
    }
    //登陆
    function login() {
      state.loading = true;
      let isType = false;
      for (let key in state.rules) {
        if (state.rules[key].show) isType = true;
      }
      if (isType) {
        state.loading = false;
        return;
      }
      //   console.log(isType, "isType");
      store.dispatch("user/setLogin", state.formData).then(() => {
        state.loading = false;
      },()=>{
         state.loading = false;
      });
    }
    return {
      projectName,
      ...toRefs(state),
      login,
      canonical,
    };
  },
};
</script>
<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  background:url('../../assets/images/login.jpg') no-repeat;
  background-size: 100% 100%;
  .login-box {
    width: 450px;
    border: 1px solid #ccc;
    background: #f5f5f5;
    padding: 20px 50px 50px 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    h2 {
      font-size: 30px;
      width: 100%;
      text-align: center;
    }
    .imput-box {
      width: 100%;
      height: 70px;
    }
    .p-text {
      color: red;
      text-align: left;
      font-size: 14px;
    }
  }
}
</style>
