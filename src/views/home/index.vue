<template>
  <div>
    <a-button type="primary" @click="$store.dispatch('user/delDatas')">清楚</a-button>
    hone
     <a-button type="primary" @click="sss">查看</a-button>
     <a-button type="primary" @click="$router.push('/text')">text</a-button>
     <a-button type="primary" @click="$router.push('/item')">item</a-button>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
  mounted() {
  },
  methods: {
    sss(){
      console.log(this.$router.getRoutes(),'router.getRoutes()',this.$store.state.user.userInfo)
    },
  },
};
</script>

<style>
</style>