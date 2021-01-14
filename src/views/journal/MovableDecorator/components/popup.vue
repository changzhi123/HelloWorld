<template>
  <Modal
    v-model="isOpen"
    :mask="false" width='450px'
    footer-hide :closable='true'
    draggable   title="Title"
  >
  <!-- <slot></slot> -->
  <div class="open-box">
     
  </div>
  <div class="footer-tab">
        <Tooltip  content="上移" placement="right-start">
           <Icon class="icon" type="md-arrow-dropup" />
          </Tooltip>
           <Tooltip  content="下移" placement="right-start">
              <Icon  class="icon" type="md-arrow-dropdown" />
          </Tooltip>
          <div class="tab"></div>
          <Tooltip  content="移除" placement="right-start">
             <Icon class="icon"  type="md-trash" />
          </Tooltip>
  </div>
  </Modal>
</template>
<script>
// cursor:not-allowed;鼠标不可点击时的样式
export default {
    data(){
        return{
            isOpen:false
        }
    },
    props:{
      
    },
    methods:{
        setOpen(type){
            this.isOpen=type
        }
    }
}
</script>
<style lang="scss" scoped>
.footer-tab{
    position: absolute;
    left: calc(100% + 20px);
    width: 35px;
    top: 0;
    text-align: center;
    // border: solid #ccc 1px;
    box-shadow: 0 1px 6px 0 rgba(0,0,0,.25);
    background: #fff;
    .tab{
        width: 100%;
        border-top: 1px solid #ccc;
    }
     .icon{
            font-size: 30px;
            // color: #ccc;
            width: 100%;
            display: block;
            line-height: 40px; cursor:pointer;
            text-align: center;
        }
        .icon:hover{
            color: #1890ff;
        }
}
.open-box{
    width: 100%;
    height: 300px;
    // border: springgreen solid 1px;
    background: #fff;
    overflow: auto;
   
}
</style>