
<template>
  <div class="login">
    <div class="login-setting">
      <!-- 粒子动效 -->
      <vue-particles
        color="#fff"
        :particlesNumber="130"
        :particleOpacity="0.7"
        shapeType="star"
        linesColor="#58bc58"
        :linesWidth="1"
        :lineOpacity="0.6"
        :linesDistance="180"
        :moveSpeed="5"
      ></vue-particles>
      <!-- color: String类型。默认'#dedede'。粒子颜色。
      particleOpacity: Number类型。默认0.7。粒子透明度。
      particlesNumber: Number类型。默认80。粒子数量。
      shapeType: String类型。默认'circle'。可用的粒子外观类型有："circle","edge","triangle", "polygon","star"。
      particleSize: Number类型。默认80。单个粒子大小。
      linesColor: String类型。默认'#dedede'。线条颜色。
      linesWidth: Number类型。默认1。线条宽度。
      lineLinked: 布尔类型。默认true。连接线是否可用。
      lineOpacity: Number类型。默认0.4。线条透明度。
      linesDistance: Number类型。默认150。线条距离。
      moveSpeed: Number类型。默认3。粒子运动速度。
      hoverEffect: 布尔类型。默认true。是否有hover特效。
      hoverMode: String类型。默认true。可用的hover模式有: "grab", "repulse", "bubble"。
      clickEffect: 布尔类型。默认true。是否有click特效。
      clickMode: String类型。默认true。可用的click模式有: "push", "remove", "repulse"-->
    </div>
    <!-- 登录 -->
    <el-form
      v-show="showLegend"
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="form-title">
        <h3>{{titlename}}</h3>
      </div>
      <el-form-item label prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="用户名"
          clearable
          prefix-icon="el-icon-user-solid"
        ></el-input>
      </el-form-item>
      <el-form-item label prop="password">
        <el-input
          placeholder="密码"
          v-model="loginForm.password"
          @keyup.enter.native="register_login"
          clearable
          show-password
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click="register_login"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { throttles } from "@/utils/method";
// import  VueParticles  from  'vue-particles'
export default {
  // components:{
  //   VueParticles
  // },
  data() {
    return {
      titlename: "vue/cli3.0",
      showLegend: true, //登录弹窗
      loading: false, //登录等候
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 20, message: "最多20 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      },
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  mounted() {},
  methods: {
    register_login() {
      this.$refs.loginForm.validate(valid => {
        //登录
        if (valid) {
          this.loading = true;
          this.changefield();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    changefield: throttles(function(type, index, item) {
      //登录节流，里面执行登录请求逻辑
      console.log(this.loginForm, "loginForm");
      this.$store
        .dispatch("user/login", this.loginForm)
        .then(() => {
          this.$router.push({ path: this.redirect || "/" }); //登录成功之后重定向到首页
          window.location.reload(); //登录后刷新页面，重置路由面包屑记录,避免登录后留有导航记录
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$message.error(err); //登录失败提示错误
        });
    }, 500)
  }
};
</script>
<style lang="scss" scoped>
.login {
  min-height: 100%;
  width: 100%;
  background-color: #000;
  position: relative;
  //   overflow: hidden;
  .login-setting {
    width: 100%;
    // height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585142993424&di=4ee21bbb28110a38a4c598c7cdd74101&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F00%2F01%2F61%2F7356068651b1807.jpg")
      no-repeat;
    background-size: 100% 100%;
    background-attachment: fixed;
  }
  .login-form {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    position: relative;
    width: 430px;
    min-height: 250px;
    border-radius: 5px;
    background: #fff;
    max-width: 100%;
    padding: 30px;
    top: 200px;
    margin: 0px auto;
    overflow: hidden;
    z-index: 1000;
    box-sizing: border-box;
    .form-title {
      text-align: center;
    }
  }
}
</style>
