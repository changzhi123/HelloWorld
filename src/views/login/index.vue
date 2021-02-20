<template>
  <div>login
      <a-button type="primary" @click="login">登陆</a-button>
  </div>
</template>

<script>
import {ref} from 'vue';
export default {
  data(){
      return{
          data:{
              username:'changzhi',
              password:'123456adc'
          }
      }
  },methods:{
    login(){
      this.$store.dispatch("user/setLogin", this.data).then(res=>{
        console.log(this.$store.state.user)
         this.$router.push('/');//登陆成功后跳转首页
                  window.location.reload();//刷新页面
      })
    }
  }
}
</script>

<style>

</style>