<template>
  <Modal
    v-model="isOpen"
    :mask="false"
    width="400px"
    footer-hide  
    :closable="true"
    draggable  
    :styles="{left:'-300px',top:'150px'}"
    :title="list.title"
  >
    <div class="open-box">
      <div class="footer">
        <Button @click="setOpen(false)">取消</Button>
        <Button type="primary">保存</Button>
      </div>
    </div>
    <div class="footer-tab">
      <ButtonGroup vertical>
        <Button icon="md-arrow-dropup" :disabled='objIndex==0' @click="setRank(true)"></Button>
        <Button icon="md-arrow-dropdown" :disabled='objIndex==list.length-1' @click="setRank(false)"></Button>
        <Button icon="md-trash" @click='delList'></Button>
        <!-- <Button icon="logo-tumblr"></Button> -->
      </ButtonGroup>
    </div>
  </Modal>
</template>
<script>
// cursor:not-allowed;鼠标不可点击时的样式
export default {
  data() {
    return {
      isOpen: false,
      list:{}
    };
  },
  props: {
    data:{
      type:Object,
      default:()=>({})
    },
    objIndex:{//组件素组index
      type:Number,
      default:0
    },
    
  },

  methods: {
    setOpen(type) {
      if(type){
        this.list=JSON.parse(JSON.stringify(this.data))//this.data
      }
      this.isOpen = type;
    },
    setRank(type){//前后排序
      this.$emit('setRank',type,this.objIndex)
    },
    delList(){//移除
    // console.log('移除')
      this.$emit('delList',this.objIndex)
      this.isOpen = false;
    }
  },
};
</script>
<style lang="scss" scoped>
.footer {
  width: 100%;
  // border: solid springgreen 1px;
  // height: 50px;
  // display: flex;
  // justify-content: space-around;
  text-align: right;
  > button {
    margin-right: 30px;
  }
}
.footer-tab {
  position: absolute;
  left: calc(100% + 20px);
//   width: 35px;
  top: 0;
  text-align: center;
  // border: solid #ccc 1px;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.25);
  // background: #fff;
}
.open-box {
  width: 100%;
  height: 300px;
  // border: springgreen solid 1px;
  background: #fff;
  overflow: auto;
}
</style>