<template>
  <div>
    <a-button type="primary" @click="set">清楚</a-button>
    hone
     <a-button type="primary" @click="sss">查看</a-button>
     <a-button type="primary" @click="tttt">text</a-button>
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
    set(){
      this.$store.dispatch('user/delDatas')
    },
    sss(){
      console.log(this.$router.getRoutes(),'router.getRoutes()',this.$store.state.user.userInfo)
    },
    tttt(){
      this.$router.push('/text')
    }
  },
};
</script>

<style>
</style>