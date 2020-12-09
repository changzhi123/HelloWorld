<template>
  <div class="Admin">
    <h3>子组件的：{{title}}</h3>
    <h3>子组件的：{{value}}</h3>
    <el-input v-model="input" placeholder="请输入内容" style="width:200px;"></el-input>
    <el-button @click="childMethod()">调用父组件的方法value+100</el-button>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    value: Number
  },
  data() {
    return {
      input: "0"
    };
  },
  methods: {
    childMethod() {
      //调用父组件的方法，并传递参数
      this.$emit("req", this.input);
    },
    print(e) {
      console.log(this.title, "title被父组件调用", e, "父组件传递过来的参数");
    }
  }
};
</script>
<style lang="scss" scoped>
.Admin {
  width: 100%;
}
</style>