<template>
  <div class="searchBox" :style="style">
   <div class="searchBoxinput" :style="borderRadius">
      <Input :border='false'  prefix="ios-contact" search placeholder="请搜索商品名称" />
   </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    style() {
      let imgurl = `url('${this.objList.backgroundImg}') 100% 100% no-repeat`;
      return {
        maxWidth: this.objList.width || "100%",
        minHeight: this.objList.height || "200px",
        background: this.objList.backgroundImg
          ? imgurl
          : this.objList.backgroundColor,
          padding: this.objList.padding + "px",
           backgroundSize: "cover",
        backgroundAttachment: "fixed",
         
      };
    },
    borderRadius(){
      let radius=this.objList.borderRadius + "px"
      return{
         borderRadius:`${radius} ${radius}`,
      }
    }
  },
  props: {
    objList: {
      type: Object,
      default: () => ({}),
    },
    isWindowsOpen: {
      type: Boolean,
      defaule: true,
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.searchBox {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  .searchBoxinput{
    width: 100%;
    border: solid 1px #ccc;
    overflow: hidden;
    // border-radius:16px 16px;
  }

}
</style>