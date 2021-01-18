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
      >
        <FormItem label="设置宽度" prop="width">
          <Input v-model="objList.width" clearable placeholder="宽度默认为100%"></Input>
        </FormItem>
        <FormItem label="设置高度" prop="height">
          <Input v-model="objList.height" clearable placeholder="高度默认为200px"></Input>
        </FormItem>
        <template v-for="(item, index) in objList.data">
          <FormItem :label="`商品配置(${index + 1})`" :prop="`data.${index}.imgurl`" :key="index"
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
                <Input
                  v-model="item.imgurl" clearable
                  placeholder="请输入商品图片路径"
                ></Input>
              </div>
            </div>
          </FormItem>
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
     const validatePass = (rule, value, callback) => {
       console.log(rule, value, callback,'value')
                // if (value === '') {
                //     callback(new Error('Please enter your password'));
                // } else {
                //     if (this.formCustom.passwdCheck !== '') {
                //         // 对第二个密码框单独验证
                //         this.$refs.formCustom.validateField('passwdCheck');
                //     }
                //     callback();
                // }
            };
    return {
      isOpen: false,
      list: {},
      ruleValidate: {
        //  width: [{ required: true, message: '请设置宽度', trigger: 'change' } ],
        //  height: [{ required: true, message: '请设置高度', trigger: 'blur' } ],
        //  { validator: validatePassCheck, trigger: 'blur' }
        // imgurl:[{ validator: validatePass, trigger: 'blur'}]
      },
      objList: {},
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
  methods: {
    delDtata(key){//删除商品配置
       this.objList.data.splice(key,1)
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
        this.objList = JSON.parse(JSON.stringify(this.data.objList));
        this.objList.data.filter((item,index)=>{
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
   background: #f2f2f2;
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
.element::-webkit-scrollbar {
  width: 0 !important;
}
</style>