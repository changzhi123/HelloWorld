<template>
  <div class="head">
    <div class="tab">
      <div class="tab-box" v-for="(item, idnex) in objlist" :key="idnex">
        <h3>{{ item.groupName }}({{ item.componentList.length }})</h3>
        <!--  group="Decoration" -->
        <draggable
          class="box"
          v-model="item.componentList"
          :options="{ group: { name: 'itxst', pull: 'clone' }, sort: false }"
          @start="onStart"
          @end="onEnd"
          :move="onMove"
          chosenClass="chosenClass"
          dragClass="dragClass"
          :filter="`.disabled`"
          @filter="$message.error('该组件添加数目已达上限！')"
        >
          <transition-group>
            <div
              :class="{ min: true, disabled: tab.nowNum >= tab.maxNum }"
              v-for="(tab, idx) in item.componentList"
              :key="idx"
            >
              <!-- <i :class="tab.icon"></i> -->
              <Icon :type="tab.icon" />
              <div>{{ tab.title }}</div>
              <div>{{ tab.nowNum }}/{{ tab.maxNum }}</div>
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>
    <div class="main">
      <!--  group="Decoration" -->
      <draggable
        :options="{ group: { name: isName, pull: 'clone' }, sort: true }"
        @start="Start"
        chosenClass="chosenClassTo"
        ghostClass="ghostClass"
        class="main-box"
        v-model="list"
        @end="End" 
        @choose='choose'
        @change="handleDragChange"
      >
        <transition-group>
          <component
            v-for="(item, index) in list"
            :key="index"
            class="mian-form"
            :is="item.componentPack"
            :styles="item.styles"
            :objList='item.objList'
            :arrList='item.arrList'
            :ref='item.refName'
          >
            <!--  :is="item.componentPack"  动态渲染组件 -->
          </component>
        </transition-group>
      </draggable>

      <el-button @click="open" >测试</el-button>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import tools from "./tools";
import {deepCopy} from '@/utils/method'
import { vec4 } from 'gl-matrix';
export default {
  components: {
    draggable,
    CarouselImg: () => import("./components/CarouselImg"),
    FlashSaleGoodsList: () => import("./components/FlashSaleGoodsList"),
    plainTextBlock: () => import("./components/plainTextBlock"),
    MultipleImg5: () => import("./components/MultipleImg5"),
    MultipleImg2_3: () => import("./components/MultipleImg2_3"),
    MultipleImg1_3: () => import("./components/MultipleImg1_3"),
    CategoryGoods: () => import("./components/CategoryGoods"),
    RecommendedGoodsList: () => import("./components/RecommendedGoodsList"),
    AllGoodsList: () => import("./components/AllGoodsList"),
    Coupon: () => import("./components/Coupon"),
  },
  data() {
    return {
      isName: "itxst", //原始数据的id
      list: [], //已渲染的组件集合
      setObj: {}, //记录组件已经渲染的重复次数
    };
  },
  computed: {
    objlist() {
      const arrlist = [];
      tools.filter((item) => {
        // console.log(item,'item')
        const objdata={
          componentList:[],
          groupName:item.groupName,
          id:item.id
        }
        item.componentList.filter(v=>{
            // console.log(v,'v')
            let reslist=deepCopy(v)
            reslist.nowNum=this.setObj[v.componentPack]||0
            objdata.componentList.push(reslist)
        })
        arrlist.push(objdata)//(deepCopy(item))//深拷贝
      });
      return arrlist;
    },
  },
  watch: {
    list(val) {
      this.setObj = {};
      this.list.filter((item) => {
        //更新记录组件已经渲染的数量
        // console.log(item.componentPack,'item')
        this.setObj[item.componentPack]
          ? (this.setObj[item.componentPack] += 1)
          : (this.setObj[item.componentPack] = 1);
      });
      console.log(val,'val', this.setObj)
    },
  },
  mounted() {},
  methods: {
    choose(e){//被点击的
      const idnex=e.oldIndex
      const refName=this.list[idnex].refName
      // console.log(idnex,'被点击的',this.list[idnex],refName,this.$refs)
      this.$refs[refName][0].setOpenType()//特殊渲染组件，所以需要多解构一次[0]
    },
    setDialog(){
      console.log('选择弹窗')
    },
    End() {
      this.isName = "itxst"; //修改回原始数据的id，避免无法往右拖
      console.log('结束')
    },
    Start() {
      this.isName = "reqitxst"; //修改原始数据id避免组件往回拖
       console.log('开始')
    },
    handleDragChange(e) {
      //console.log(e.added.element,'list收到',e)//给新增过来的数据增加独一无二的ref，方便数据操作
      e.added.element['refName']=`${e.added.element.componentPack}${new Date().getTime()}`
    },
    onMove(e, originalEvent) {
      // const {maxNum,nowNum}=e.draggedContext.element
      // console.log(e,originalEvent,'onMove',e.draggedContext.element)
      // if(nowNum>=maxNum){//判断当打到最大数量后不允许增加
      //     return false
      // }else{
      //     return true
      // }
    },
    onEnd(e) {
      // console.log(e, "onEnd");
    },
    onStart(e) {
      // console.log(e, "onStart");
    },
    open() {
      console.log(tools,this.objlist, "测试", this.list, this.setObj, this.obj);
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
      // border: solid 1px #ccc;
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
.dragClass {
  // background: #f90 !important;
}
.chosenClassTo {
  box-sizing: border-box;
  background: #f2f2f2 !important;

  box-shadow: inset 0 0 8px 3px #2b9939;
  z-index: 1;
}
.chosenClass {
  //
  // border-color: #ccc !important;
  border: solid 1px #ccc;
  box-shadow: 2px 0px 5px #ccc;
  transition: box-shadow 0.3s ease;
  box-sizing: border-box;
  background: #f2f2f2 !important;
}
.ghostClass {
  text-align: center;
  height: 120px;
  width: calc(100% - 30px);
  margin: 15px auto;
  font-size: 18px;
  background: #fff !important;
  border: 15px solid #f2f2f2;
  box-sizing: border-box;
  padding: 10px;
}
.main-box {
  width: 100%;
  > span {
    width: 100%;
    min-height: 300px;
    box-sizing: border-box;
    padding: 5px;
    display: block;
    margin: auto;
    .mian-form {
      // width: 100%;
      box-sizing: border-box;
      margin: auto;
    }
  }
}
</style>
