<template>
  <div class="picturesOfTheRadio">
    <template v-for="(item, index) in arrList">
      <div :style="style" class="img-list" :key="index">
        <img class="imges-text" :src="item" alt="" />
        <div class="button-box">
            <Icon  type="md-trash" @click="delList(index)" />
            <Icon type="md-search" />
        </div>
      </div>
    </template>
    <div :style="style" class="img-list" v-if="arrList.length < order">
      <Icon @click="$refs.pictureSelectorTest.setOpen()" type="md-add" class="icon-text" />
    </div>
    <pictureSelector @setSubmit='setSubmit' ref="pictureSelectorTest"></pictureSelector>
  </div>
</template>

<script>
import pictureSelector from "./pictureSelector";
export default {
  components: {
    pictureSelector,
  },
  data() {
    return {
      arrList: [],
    };
  },
  computed: {
    style() {
      return {
        width: this.HeightToWidth,
        height: this.HeightToWidth,
      };
    },
  },
  props: {
    order: {
      type: Number,
      default: 1,
    },
    imgList: {
      type: Array,
      default: () => [],
    },
    HeightToWidth: {
      type: String,
      default: "90px",
    },
  },
  watch: {
    imgList(val) {
      this.arrList = val;
    },
  },
  mounted() {
    this.arrList = [...this.imgList];
  },
  methods:{
      noOpen(){
          this.$refs.pictureSelectorTest.isOpen=false
      },
       setSubmit(val){
          this.arrList.push(val.imgurl)
          this.$emit('present',this.arrList)
      },
      delList(index){
          this.$emit('delList',index)
      }
  }
};
</script>

<style lang="scss" scoped>
.icon-text {
  color: rgba(97, 165, 255, 0.7);
  font-size: 50px;
  cursor: pointer;
}
.picturesOfTheRadio {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  //   justify-content: center;
  .img-list {
    display: flex;
    background: #e2e2e2;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 5px;
    .imges-text {
      width: 100%;
      height: 100%;
    }
  }
}
.button-box{
    width: 100%;
    height: 100%;
    // height: 20px;
    position: absolute;
    // border:  1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color:#ccc;
    >:hover{
         color: #2d8cf0;
    }
}
</style>