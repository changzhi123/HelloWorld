<template>
  <!-- <div class="pictureSelector"></div> -->
  <Modal
    :closable="false"
    v-model="isOpen"
    footer-hide :transfer='false'
    draggable
    :z-index="1100"
    :styles="{ left: '-300px', top: '150px' }"
    :mask="false"
  >
    <div class="min-box"  v-if="arrList.length">
      <div
        class="box-from"
        :style="`border: 1px solid ${item.id==pitchOn.id?'#2b85e4':'#ededed'};`"
        v-for="(item, index) in arrList"
        :key="`arrList${index}`"
        @click="setSelect(item)"
      >
        <img :src="item.imgurl" alt="" />
      </div>
    </div>
    <div v-else class="min-tab">暂时没有数据</div>
    <div class="footer-but">
      <Button style="margin-right: 10px" :size="size" @click="isOpen = false"
        >取消</Button
      >
      <Button type="primary" @click="setSubmit" :size="size">保存</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      size: "default",
      arrList: [
        {
          id: "0",
          imgurl:
            "https://gw.alicdn.com/bao/uploaded/i1/2105113961/O1CN01C6b1kj1f8BJxju0i4_!!0-item_pic.jpg",
          text: "商品标题，可以结合具体业务活动商品数据",
          price: "69.8 ",
          tourl:'12'
        },
        {
          id: "1",
          imgurl:
            "https://gw.alicdn.com/bao/uploaded/i1/2105113961/O1CN01C6b1kj1f8BJxju0i4_!!0-item_pic.jpg",
          text: "商品标题，可以结合具体业务活动商品数据",
          price: "69.8 ",
           tourl:''
        },
        {
          id: "2",
          imgurl:
            "https://gw.alicdn.com/bao/uploaded/i1/2105113961/O1CN01C6b1kj1f8BJxju0i4_!!0-item_pic.jpg",
          text: "商品标题，可以结合具体业务活动商品数据",
          price: "69.8 ",
           tourl:''
        },
        {
          id: "3",
          imgurl:
            "https://gw.alicdn.com/bao/uploaded/i1/2105113961/O1CN01C6b1kj1f8BJxju0i4_!!0-item_pic.jpg",
          text: "商品标题，可以结合具体业务活动商品数据",
          price: "69.8 ",
           tourl:''
        },
        {
          id: "4",
          imgurl:
            "https://gw.alicdn.com/bao/uploaded/i1/2105113961/O1CN01C6b1kj1f8BJxju0i4_!!0-item_pic.jpg",
          text: "商品标题，可以结合具体业务活动商品数据",
          price: "69.8 ",
           tourl:''
        },
        {
          id: "5",
          imgurl:
            "https://gw.alicdn.com/bao/uploaded/i1/2105113961/O1CN01C6b1kj1f8BJxju0i4_!!0-item_pic.jpg",
          text: "商品标题，可以结合具体业务活动商品数据",
          price: "69.8 ",
           tourl:''
        },
      ],
      pitchOn: {},//选中的商品
    };
  },
  mounted() {},
  methods: {
    setOpen() {
      this.isOpen = true;
      this.pitchOn={}
    },
    setSelect(item){
        // console.log(item,'点击了',this.pitchOn)
        if(this.pitchOn.id==item.id){
         this.pitchOn={}
        }else{
          this.pitchOn=JSON.parse(JSON.stringify(item));
        }
    },
    setSubmit(){
        if(this.pitchOn.id){    
          this.$emit('setSubmit',this.pitchOn)
          this.isOpen = false;
        }else{
           this.$Message.warning('请选择其中一项！');
        }
    }
  },
};
</script>


<style lang="scss" scoped>
.pictureSelector {
}

.box-from {
  height: 100px;
  width: 23%;cursor:pointer;
//   border: 1px solid #ededed;
  transition: 0.5s;
  //   margin-bottom: 10px;
  margin: 1%;
  > img {
    width: 100%;
    height: 100%;
  }
}
.box-from:hover {
  transform: translateY(-5px);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);  
}
.min-box {
  width: 100%;
  min-height: 200px;
  // border: 1px solid #ccc;
  box-sizing: border-box;
  background: rgba(242, 242, 242, 0.8);
  //   padding: 10px;
  display: flex;
  flex-wrap: wrap;
  //   justify-content: space-between;
}
.min-tab {
  width: 100%;
  min-height: 200px;
  font-size: 18px;
  box-sizing: border-box;
  display: flex;
  // border: 1px solid #ccc;
  align-items: center;
  justify-content: center;
  background: rgba(242, 242, 242, 0.8);
}
.footer-but {
  width: 100%;
  // border: 1px solid #ccc;
  box-sizing: border-box;
  text-align: right;
  padding: 10px 0 0 0;
}
</style>