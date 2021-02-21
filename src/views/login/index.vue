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
      this.$store.dispatch("user/setLogin", this.data)
    }
  }
}
</script>

<style>

</style>