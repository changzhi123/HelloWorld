<template>
  <!-- 前缀 -->
  <div class="headerPrefix">
    <img class="PrefixImg" src="/@/assets/images/title.jpg" alt="" />
    <h3>{{projectName}} </h3>
    <!-- -->
  </div>
</template>

<script>
import {projectName} from '/@/utils/keyName.js'
import {
  toRefs,
  reactive,
    computed,
} from "vue";
export default {
  setup(props, ctx){
    const state=reactive({ })
    return{
      projectName,
      ...toRefs(state)
    }

  }
};
</script>

<style lang="less" scoped>
.headerPrefix {
  display: flex;
  align-items: center;
  .PrefixImg {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right:10px ;
  }
  >h3{
    font-size: 24px;
    margin: 0;
  }

}
</style>