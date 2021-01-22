<template>
  <Modal
    v-model="isOpen"
    :mask="false"
    width="400px"
    footer-hide
    :closable="true"
    draggable
    :styles="{ left: '-300px', top: '150px' }"
    :title="list.title"
  >
    <div class="open-box">
      <Form
        ref="formValidate"
        :model="objList"
        :rules="ruleValidate"
        label-position="top"
        class="from-box"
      >
      <!-- 所有组件共有 -->
        <template>
          <FormItem label="设置宽度" prop="width">
          <Input v-model="objList.width" clearable placeholder="宽度默认为100%" />
          </FormItem>
          <FormItem label="设置高度" prop="height">
            <Input v-model="objList.height" clearable placeholder="高度默认为200px" />
          </FormItem>
        </template>
        <!-- 纯文本特区 -->
        <template v-if="data.componentPack=='plainTextBlock'">
          <FormItem label="文本" prop="text">
             <Input v-model="objList.text" clearable placeholder="请输入文本" />
           </FormItem>
           <FormItem label="字体大小" >
             <Input v-model="objList.size" clearable placeholder="请设置字体大小" />
           </FormItem>
           <FormItem label="背景颜色">
             <Input v-model="objList.background" clearable placeholder="请设置背景颜色" />
           </FormItem>
            <FormItem label="字体颜色">
             <Input v-model="objList.color" clearable placeholder="请设置字体颜色" />
           </FormItem>
        </template>
        <!--商品分类特区  -->
        <template v-if="data.componentPack=='CategoryGoods'">
           <FormItem label="标题" prop="name">
             <Input v-model="objList.name" clearable placeholder="请输入标题" />
           </FormItem>
           <FormItem label="文本" prop="text">
             <Input v-model="objList.text" clearable placeholder="请输入文本" />
           </FormItem>
          
       </template>
        <!-- 秒杀商品特有 -->
        <template v-if="data.componentPack=='FlashSaleGoodsList'">
          <FormItem label="标题" prop="name">
            <Input v-model="objList.name" clearable placeholder="请输入标题" />
          </FormItem>
          <FormItem label="秒杀时间" prop="itme">
            <DatePicker ref="datetime" v-model="itme" type="datetime" @on-change="(e)=>{objList.itme=e}"  format="yyyy-MM-dd HH:mm:ss" placeholder="请设置秒杀时间" ></DatePicker>
          </FormItem>
        </template>
        <!-- list特区 -->
         <template v-if="objList.list" >
          <div :key="soleKeys.list">
               <FormItem v-for="(item,index) in objList.list"  :key="`${index}list`" 
               :label="index==0?'前置图片':'后置图片'" 
              :prop="`list.${index}.imgurl`" 
             :rules="{ required: true, message: index==0?'前置图片路径':'后置图片路径', trigger: 'change' }">
               <div class="img-box">
              <div>
                <img
                  class="imgurl"
                  v-if="item.imgurl"
                  :src="item.imgurl"
                  alt=""
                />
                <Icon class="icon" type="md-add" v-else />
              </div>
              <div>
                <div>
                  
                </div>
                <Input  @on-blur="refreshKey('list')"
                  v-model="item.imgurl" clearable
                  placeholder="请设置图片路径"
               />
              </div>
            </div>
          </FormItem>
          </div>
           </template>
        <!-- data有商品配置特区 -->
        <template v-if="objList.data"  >
          <Divider>配置区域</Divider>
          <div :key="soleKeys.data">
            <FormItem v-for="(item, index) in objList.data" :label="`商品配置(${index + 1})`"
           :prop="`data.${index}.imgurl`" :key="`${index}data`"
          :rules="{ required: true, message: '请配置商品图片', trigger: 'change' }">
            <div class="img-box">
              <div>
                <img
                  class="imgurl"
                  v-if="item.imgurl"
                  :src="item.imgurl"
                  alt=""
                />
                <Icon class="icon" type="md-add" v-else />
              </div>
              <div>
                <div>
                  <div class="top-num">{{index+1}}</div>
                  <ButtonGroup>
                  <Button icon="md-arrow-dropup" :disabled="index==0" @click="setSortord(true,index)"></Button>
                  <Button icon="md-arrow-dropdown"  @click="setSortord(false,index)" :disabled='index==objList.data.length-1'></Button>
                  <Button icon="md-close" @click="delDtata(index)" :disabled="objList.data.length==1"></Button>
                </ButtonGroup>
                </div>
                <Input @on-blur="refreshKey('data')"
                  v-model.trim="item.imgurl" clearable
                  placeholder="请设置商品图片路径"
                />
              </div>
            </div>
          </FormItem>
          <div class="add-list" v-if="isOpen" >
             <Button @click="addData" :disabled="objList.data.length>=objList.maxData"
              icon="md-add" >( {{objList.data.length}} / {{objList.maxData}} )</Button>
          </div>
          </div>
        </template>
      </Form>
      <div class="footer">
        <Button @click="handleReset('formValidate')">取消</Button>
        <Button type="primary" @click="handleSubmit('formValidate')"
          >保存</Button
        >
      </div>
    </div>
    <div class="footer-tab">
      <ButtonGroup vertical>
        <Button
          icon="md-arrow-dropup"
          :disabled="objIndex == 0"
          @click="setRank(true)"
        ></Button>
        <Button
          icon="md-arrow-dropdown"
          :disabled="objIndex == list.length - 1"
          @click="setRank(false)"
        ></Button>
        <Button icon="md-trash" @click="delList"></Button>
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
      list: {},
      ruleValidate: {
        name:[{ required: true, message: '请输入标题', trigger: 'change' } ],
        itme:[{ required: true, message: '请设置秒杀时间', trigger: 'change' }],
        text:[{ required: true, message: '请输入文本', trigger: 'change' }],
        advertising:[{ required: true, message: '请输入广告位标题', trigger: 'change' }],
        toAdvertising:[{required: true, message: '请输入广告位副标题', trigger: 'change' }],
      },
      objList: {},
      itme:null,
      soleKeys:{//dada和list的唯一key，可以动态控制组件更新
        data:'data-index-key',
        list:'list-index-key'
      }
    };
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    objIndex: {
      //组件素组index
      type: Number,
      default: 0,
    },
  },
  computed: {
  
  },
  watch:{
    
  },
  methods: {
    refreshKey(type){//刷新key
      this.soleKeys[type]=new Date().getTime()
      console.log(type,'更新了key')
    },
    addData(){//新增data中的商品
    const length=this.objList.data.length
      this.objList.data.push({
        index:length,
        imgurl:''
      })
      this.refreshKey('data')
    // console.log('新增商品',this.objList.data)
    },
    delDtata(key){//删除商品配置
       this.objList.data.splice(key,1)
       this.refreshKey('data')
    },
    setSortord(type,key){//排序
      const index=type?key-1:key+1
        if(type){//向上
          this.objList.data[key].index=index
          this.objList.data[index].index=key
        }else{//向下
         this.objList.data[key].index=index
        this.objList.data[index].index=key
        }
      this.objList.data.sort((a,b)=>{
         return a['index']-b['index']
      })
      this.refreshKey('data')
        // console.log( this.objList.data,index,key,' this.objList.data')
    },
    handleSubmit(name) {
      console.log(this.objList, "objList");
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit("setAmend", this.objList, this.objIndex);
          // this.$Message.success('Success!');
          this.setOpen(false);
        } else {
          // this.$Message.error('Fail!');
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.setOpen(false);
    },
    setOpen(type) {
      if (type) {
        console.log(this.data, "this.data");
        this.list = JSON.parse(JSON.stringify(this.data)); //this.data
        // this.objList = JSON.parse(JSON.stringify(this.data.objList));
      this.objList={}
      for(let key in this.data.objList){
        this.objList[key]=this.data.objList[key]
      }
      if(this.objList.itme)this.itme=this.objList.itme
        if(this.objList.data)this.objList.data.filter((item,index)=>{
          item['index']=index//给数字中的每一项都添加索引，方便排序
        })
      }
      this.isOpen = type;
    },
    setRank(type) {
      //前后排序
      this.$emit("setRank", type, this.objIndex);
    },
    delList() {
      //移除
      // console.log('移除')
      this.$emit("delList", this.objIndex);
      this.isOpen = false;
    },
  },
};
</script>
<style lang="scss" scoped>

.img-box {
  width: 100%;
  height: 100px;
  // border: solid 1px #ccc;
  display: flex;
  > div:nth-child(1) {
    width: 30%;
    height: 100%;
    background-color: #e2e2e2;
    // border: solid 1px #ccc;
    display: flex;
    font-size: 50px;
    color: rgba(97, 165, 255, 0.7);
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .imgurl {
      width: 100%;
      height: 100%;
    }
  }
  > div:nth-child(2) {
    width: calc(100% - 30%);
    height: 100%;
    box-sizing: border-box;
    padding: 0 0 0 10px;
    // border: solid 1px #ccc;
    display: flex;
    flex-wrap:wrap ;
    >div:nth-child(1){
 width: 100%;
 display: flex;
justify-content: space-between;
 .top-num{
   background: #e2e2e2;
   color: rgba(97, 165, 255, 0.7);
   height: 32px;
   text-align: center;line-height: 32px;
   display: inline-block;
   padding: 0 10px;font-size: 18px;border-radius:5px ;font-weight:bold;
 }
    }
  }
}
.footer {
  width: 100%;
  // border: solid springgreen 1px;
  // height: 50px;
  // display: flex;
  // justify-content: space-around;
  text-align: right;
  margin-top: 10px;
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
  min-height: 200px;
  max-height: 400px;
  // border: springgreen solid 1px;
  background: #fff;
  box-sizing: border-box;
  overflow: auto;   
  .add-list{
    text-align: right;
  }
  .from-box{
 background: hsla(0,0%,94.9%,.8);
  padding: 10px;
  }
}
.element::-webkit-scrollbar {
  width: 0 !important;
}
</style>