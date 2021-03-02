<template>
  <div
    class="recommend"
    :style="style"
  >
    <h3 class="header-h3">{{objList.name}}</h3>
    <div class="main-box">
      <div v-for="(item, index) in objList.data" :key="index">
        <img class="imglist"  @click="skipOpen(item.tourl)"  :src="item.imgurl" v-if="item.imgurl" alt="" />
        <div class="imglist" v-else><Icon type="ios-image-outline" /></div>
        <h3 class="imgh3" v-if="item.price">{{item.price}}</h3>
        <div class="imgh3" v-else style="padding: 3px 10px;"><div></div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "recommend",
  data() {
    return {};
  },
  computed:{
     style() {
       let imgurl=`url('${this.objList.backgroundImg}') 100% 100% no-repeat`
     return{
       maxWidth:this.objList.width||'100%',
        height: this.objList.height || "200px",
       background:this.objList.backgroundImg?imgurl:this.objList.backgroundColor
     }
    },
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
  methods: {
    skipOpen(tourl) {
      if (this.isWindowsOpen && tourl) window.open(tourl);
    },
  },
};
</script>
<style lang="scss" scoped>
.imglist {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items:center;
  color: rgba(97, 165, 255, 0.7) ;
  font-size: 30px;
}
.imgh3 {
  padding: 8px 0;
  text-align: center;
  font-size: 14px;
  color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      box-sizing: border-box;
  >div{
       width: 100%;
          height: 100%;
          background:rgba(97, 165, 255, 0.7) ;
          height: 20px;
          
  }
}
.recommend {
  width: 100%;
  .header-h3 {
    color: #666;
    padding: 10px;
    font-size: 14px;
    font-weight: 700;
  }
  .main-box {
    width: 100%;
    height: calc(100% - 40px);
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    > div {
      box-sizing: border-box;
      height: 100%;
      width: 23%;
    //   border: forestgreen 1px solid;
    }
  }
}
</style>