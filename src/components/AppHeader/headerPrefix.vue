<template>
  <!-- 前缀 -->
  <div class="headerPrefix">
    <img class="PrefixImg" src="/@/assets/logo.png" alt="" />
    <h3>{{title}}</h3>
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
    const state=reactive({
       title:computed(()=>projectName)
    })
    return{
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
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  >h3{
    font-size: 24px;
     margin-left: 10px;
  }

}
</style>