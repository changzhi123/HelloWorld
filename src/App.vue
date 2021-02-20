<template>
  <router-view></router-view>
</template>

<script>
import { mapState } from "vuex";
import keyName from '/@/utils/keyName'
export default {
  name: "App",
  components: {},
  computed:{
    ...mapState(["username",])// 映射 this.count 为 store.state.count
  },
  mounted () {
    console.log(this.username, "mapState",keyName.tokenName);
    console.log(process.env,'当前环境',this.$store.state)
  }
};
</script>
<style scoped>

</style>
