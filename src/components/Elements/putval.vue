<template>
  <Button
    :style="` width:${wid};`"
    type="primary"
    :disabled="disabled"
    @click="setput"
    >{{ restext }}</Button
  >
  <!-- 获取验证码倒计时 -->
</template>
<script>
export default {
  props: {
    num: {
      //倒计时开始时间
      type: Number,
      default: 60,
    },
    switching: {
      //是否可以触发获取
      type: Boolean,
      default: false,
    },
    wid: {
      type: String, //按钮长度
      default: "120px",
    },
    texta: {
      type: String,
      default: "获取验证码",
    },
    textb: {
      type: String,
      default: "秒后重新获取",
    },
  },
  data() {
    return {
      restext: "",
      disabled: false,
      putnum: 0,
    };
  },
  mounted() {
    this.put();
  },
  methods: {
    put() {
      console.log(this.putnum, "倒计时");
      //   if (this.putnum == 0) {
      //     this.disabled = false;
      //     this.restext = this.texta;
      //   } else {
      //     if(!this.disabled)this.disabled = true;
      //     this.restext = this.putnum+this.textb;
      //   }
      switch (this.putnum) {
        case 0:
          // 执行代码块 1
          this.disabled = false;
          this.restext = this.texta;
          break;
        default:
        // 与 case 1 和 case 2 不同时执行的代码
         if (!this.disabled) this.disabled = true;
          this.restext = this.putnum + this.textb;
      }
    },
    setitem() {
      this.putnum = this.num;
      this.put();
      const item = setInterval(() => {
        this.putnum -= 1;
        this.put();
        if (this.putnum == 0) {
          //   console.log("清除函数",item);
          clearInterval(item);
        }
      }, 1000);
    },
    setput() {
      if (this.switching) return;
      this.setitem();
      console.log("获取验证码");
      this.$emit("getverify");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>