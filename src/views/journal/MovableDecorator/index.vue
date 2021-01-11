<template>
  <div class="head">
    <div class="tab">
      <div class="tab-box" v-for="(item, idnex) in data" :key="idnex">
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
       :options="{group:{name: 'itxst',pull:'clone'},sort: true}"
        @start="onStart"
        chosenClass="chosenClass"
        class="main-box"   v-model="list"
        @end="onEnd" @change="handleDragChange"
      >
        <transition-group> 
        </transition-group>
      </draggable>

      <el-button @click="open">测试</el-button>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import tools from "./tools";
 import { getComponentsAndInitToolsConfig } from './utils';
// 工具栏配置的组件
    const components = getComponentsAndInitToolsConfig(tools);
export default {
  components: {
    draggable,
    ...components
  },
  data() {
    return {
      data: [],
      list:[],
       moveId:-1
    };
  },
  computed: {
    // data() {
    //   return tools || [];
    // },
  },
  watch: {
    //   tools(val){
    //       this.data=[...val]
    //   }
  },
  mounted() {
    this.data = [...tools];
    console.log(components,'components')
  },
  methods: {
     
      handleDragChange(e){
          console.log(e,'handleDragChange')
      },
    onMove(e,originalEvent){
        const {maxNum,nowNum}=e.draggedContext.element
        // console.log(e,originalEvent,'onMove',e.draggedContext.element)
        if(nowNum>=maxNum){//判断当打到最大数量后不允许增加
            return false
        }else{
            return true
        }
    },
    onEnd(e) {
      console.log(e, "onEnd");
      
    },
    onStart(e) {
      console.log(e, "onStart");
    },
    open() {
      console.log(tools, "测试",this.list);
    },
  },
};
</script>
<style lang="scss" scoped>
$heide: calc(100vh - 84px);
$tab-width: 300px;
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
}
 .disabled {
        cursor: no-drop;
        opacity: 0.8;
    }
</style>
