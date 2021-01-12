<template>
  <div class="head">
    <div class="tab">
      <div class="tab-box" v-for="(item, idnex) in objlist" :key="idnex">
        <h3>{{ item.groupName }}({{ item.componentList.length }})</h3>
        <!--  group="Decoration" -->
        <draggable
          class="box"
          v-model="item.componentList"
          :options="{group:{name: 'itxst',pull:'clone'},sort: false}"
          @start="onStart"
          @end="onEnd"  :move="onMove"
          chosenClass="chosenClass" 
         :filter="`.disabled`" @filter="$message.error('该组件添加数目已达上限！')"
        >
          <transition-group>
            <div 
              :class="{'min':true, 'disabled':tab.nowNum>=tab.maxNum}"
              v-for="(tab, idx) in item.componentList"
              :key="idx" 
            >
              <i :class="tab.icon"></i>
              <div>{{ tab.title }}</div>
              <div>{{tab.nowNum}}/{{ tab.maxNum }}</div>
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>
    <div class="main">
        <!--  group="Decoration" -->
      <draggable
       :options="{group:{name: isName,pull:'clone'},sort: true}"
        @start="Start"
        chosenClass="chosenClass"
        class="main-box"   v-model="list"
        @end="End" @change="handleDragChange"
      >
        <transition-group> 
          <div v-for="(item,index) in list" :key='index' class="mian-form" >
             <component
            :is="item.componentPack" :styles='item.styles'
          >
          <!--  :is="item.componentPack"  动态渲染组件 -->
          </component>
          </div>
        </transition-group>
      </draggable>

      <el-button @click="open">测试</el-button>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import tools from "./tools";
export default {
  components: {
    draggable,
    CarouselImg:() => import('./components/CarouselImg'),
    FlashSaleGoodsList:() => import('./components/FlashSaleGoodsList'),
    plainTextBlock:() => import('./components/plainTextBlock'),
    MultipleImg5:() => import('./components/MultipleImg5'),
    MultipleImg2_3:() => import('./components/MultipleImg2_3'),
    MultipleImg1_3:() => import('./components/MultipleImg1_3'),
    CategoryGoods:() => import('./components/CategoryGoods'),
    RecommendedGoodsList:() => import('./components/RecommendedGoodsList'),
    AllGoodsList:() => import('./components/AllGoodsList'),
    Coupon:() => import('./components/Coupon'),
  },
  data() {
    return {
      isName:'itxst',//原始数据的id
      list:[ ],//已渲染的组件集合
      setObj:{ },//记录组件已经渲染的重复次数
    };
  },
  computed: {
    objlist(){
      const arr=[]
      tools.filter(item=>{
        // console.log(item,'itemn')
        let obj={
          id:item.id,
          groupName:item.groupName,
          componentList:[]
        }
        item.componentList.filter(v=>{
          // console.log(v,'v')
          obj.componentList.push({
            componentPack:v.componentPack,
            icon:v.icon,
            maxNum:v.maxNum,
            parent:v.parent,
            title:v.title,
            nowNum:this.setObj[v.componentPack]||0,
            styles:v.styles
          })
        })
        arr.push(obj)
      })
      return arr
    }
  },
  watch: {
    list(val){
      // console.log(val,'val')
      this.setObj={}
      this.list.filter(item=>{//更新记录组件已经渲染的数量
        // console.log(item.componentPack,'item')
        this.setObj[item.componentPack]? this.setObj[item.componentPack]+=1:this.setObj[item.componentPack]=1
        
      })
    }
  },
  mounted() {
  },
  methods: {
    End(){
        this.isName='itxst'//修改回原始数据的id，避免无法往右拖
      // console.log('结束')
    },
     Start(){
       this.isName='reqitxst'//修改原始数据id避免组件往回拖
      //  console.log('开始')
     },
      handleDragChange(e){
          //console.log(e.added.element,'list收到')
       
      },
    onMove(e,originalEvent){
        // const {maxNum,nowNum}=e.draggedContext.element
        // console.log(e,originalEvent,'onMove',e.draggedContext.element)
        // if(nowNum>=maxNum){//判断当打到最大数量后不允许增加
        //     return false
        // }else{
        //     return true
        // }
    },
    onEnd(e) {
      console.log(e, "onEnd");
      
    },
    onStart(e) {
      console.log(e, "onStart");
    },
    open() {
      console.log(tools, "测试",this.list,this.setObj,this.obj);
    },
  },
};
</script>
<style lang="scss" scoped>
$heide: calc(100vh - 84px);
$tab-width: 300px;
 .disabled {
        cursor: no-drop;
        opacity: 0.8;
    }
.head {
  width: 100%;
  height: $heide; //calc(100vh - 84px);
  border: solid 1px #ccc;
  // background: #58bc58;
  display: flex;
  > div {
    height: 100%;
    border: solid 1px #ccc;
    overflow: auto;
  }
  .tab {
    width: $tab-width; //200px;
    // background: chartreuse;
  }
  .main {
    //width: calc(100% - $tab-width);//calc(100% - 200px);
    flex: 1; 
      background: #f5f5f5;
  }
}
.tab-box {
  width: 100%;
  min-height: 100px;
  > h3 {
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    padding: 0 20px;
    display: block;
    // border-bottom: solid 1px #ccc;
    width: 100%;
  }
  .box {
    > span {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
    width: 100%;
    .min {
      width: 48%;
      height: 100px;
      border: solid 1px #ccc;
      font-size: 16px;
      display: flex;
      text-align: center;
      margin: 1%;
      box-sizing: border-box;
      padding: 10px 0;
      border-radius: 10px;
      flex-wrap: wrap;
      > i {
        font-size: 20px;
        width: 100%;
        display: block;
      }
      > div {
        width: 100%;
      }
    }
  }
}
.chosenClass {
  //
  border-color: #f90 !important;
  transition: box-shadow 0.3s ease;
}
.main-box{
    width: 100%;
    >span{
        width: 100%;
        min-height: 100px;
        box-sizing: border-box;
        padding: 5px;display: block;
    }
    .mian-form{
      width: 100%;
      box-sizing: border-box;
      margin: auto;
      overflow: hidden; 
      >div{
      margin: auto;
      border: 1px solid #ccc;
      box-sizing: border-box;
      // background: #fff;
      }
    }
}
</style>
