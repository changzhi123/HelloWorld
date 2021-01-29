<template>
  <div class="head">
    <div class="head-header">
      <Select
        :size="form.size"
        v-model="form.genreType"
        @on-change="onChange"
        style="width: 200px"
      >
        <Option
          v-for="item in cityList"
          :value="item.value"
          :key="item.value"
          >{{ item.label }}</Option
        >
      </Select>
    </div>
    <div class="head-main-box">
      <div class="tab">
        <div class="tab-box" v-for="(item, idnex) in objlist" :key="idnex">
          <!-- <h3>{{ item.groupName }}({{ item.componentList.length }})</h3> -->
          <Divider
            >{{ item.groupName }}({{ item.componentList.length }})</Divider
          >
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
          @choose="choose"
          @change="handleDragChange"
        >
          <transition-group>
            <component
              v-for="(item, index) in list"
              :key="index"
              :class="{ 'mian-form': true, 'main-put': objIndex == index }"
              :is="item.componentPack"
              :objList="item.objList"
              :isWindowsOpen="isWindowsOpen"
            >
              <!--  :is="item.componentPack"  动态渲染组件 -->
            </component>
          </transition-group>
        </draggable>

        <!-- <el-button @click="open" >测试</el-button> -->
      </div>
    </div>

    <popup
      ref="popups"
      :data="data"
      @setAmend="setAmend"
      :objIndex="objIndex"
      @delList="delList"
      @setRank="setRank"
    ></popup>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import tools from "./tools";
import { deepCopy } from "@/utils/method";
// import popup from './components/popup'
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
    popup: () => import("./components/popup"), //弹窗
  },
  data() {
    return {
      form: {
        genreType: "pc",
        size: "large",
      },
      cityList: [
        {
          label: "pc",
          value: "pc",
        },
        {
          label: "move",
          value: "move",
        },
      ],
      isName: "itxst", //原始数据的id
      list: [], //已渲染的组件集合
      setObj: {}, //记录组件已经渲染的重复次数
      data: {}, //打开弹窗组件的数据
      objIndex: null, //打开弹窗的组件index
      isOpen: true, //是否可以打开弹窗
      isWindowsOpen: false, //组件是否可以点击图片跳转
    };
  },
  computed: {
    objlist() {
      const database = tools[this.form.genreType] || [];
      const arrlist = [];
      database.filter((item) => {
        // console.log(item,'item')
        const objdata = {
          componentList: [],
          groupName: item.groupName,
          id: item.id,
        };
        item.componentList.filter((v) => {
          // console.log(v,'v')
          let reslist = deepCopy(v);
          reslist.nowNum = this.setObj[v.componentPack] || 0;
          objdata.componentList.push(reslist);
        });
        arrlist.push(objdata); //(deepCopy(item))//深拷贝
      });
      return arrlist;
    },
  },
  watch: {
    list(val) {
      this.setObj = {};
      const length = this.list.length;
      this.list.filter((item, index) => {
        //更新记录组件已经渲染的数量
        // console.log(index,'index')
        item["index"] = index; //渲染素组的index
        item["length"] = length; //渲染数组的length
        if (item.isOpenType) this.objIndex = index; //更新打开弹窗的组件的index
        // console.log(item.componentPack,'item')
        this.setObj[item.componentPack]
          ? (this.setObj[item.componentPack] += 1)
          : (this.setObj[item.componentPack] = 1);
      });
      // console.log(val,'list更新了', this.setObj)
    },
  },
  mounted() {},
  methods: {
    onChange() {
      this.list = [];
    },
    setRank(type, index) {
      //弹窗排序
      const num = type ? index - 1 : index + 1;
      if (type) {
        //向上排序
        this.list[index].index = num;
        this.list[num].index = index;
      } else {
        //向下排序
        this.list[index].index = num;
        this.list[num].index = index;
      }
      this.list.sort((a, b) => {
        return a["index"] - b["index"];
      });
      this.objIndex = num; //更新弹窗里面的index
      // console.log(this.list,'this.list')
    },
    delList(key) {
      //移除某一个组件
      this.list.splice(key, 1);
    },
    setAmend(obj, key) {
      //提交修改
      console.log(obj, key, "提交修改");
      this.list[key].objList = deepCopy(obj);
    },
    choose(e) {
      //被点击的
      const key = e.oldIndex;
      const { title, length, objList, componentPack } = this.list[key];
      this.data["title"] = title;
      this.objIndex = key;
      this.data["componentPack"] = componentPack;
      this.data["length"] = length;
      this.data["objList"] = deepCopy(objList);

      const _this = this;
      setTimeout(function () {
        if (_this.isOpen) {
          //异步处理拖动会打开弹窗bug，研制300
          _this.$refs.popups.setOpen(true);
        }
      }, 300);
      this.list.filter((item, index) => {
        item.isOpenType = key == index ? true : false; //更新组件弹窗状态，true为打开
      });
      console.log(key, "被点击的", this.list[key]);
      //this.$refs.[refName][0].$el.getBoundingClientRect() 获取组件元素样式的方法
    },
    setDialog() {
      console.log("选择弹窗");
    },
    End(e) {
      this.isName = "itxst"; //修改回原始数据的id，避免无法往右拖
      // console.log('结束拖动')
      this.isOpen = true; //选择拖动不能打开弹窗
    },
    Start() {
      this.isName = "reqitxst"; //修改原始数据id避免组件往回拖
      //  console.log('开始拖动')
      this.isOpen = false; //拖动完成，可以开启打开弹窗权限
    },
    handleDragChange(e) {
      // const itme=new Date().getTime()
      // const refName=`${e.added.element.componentPack}${itme}`
      // e.added.element['refName']=refName
      // console.log(e.added.element,'list收到',e,refName,this.list)//给新增过来的数据增加独一无二的ref，方便数据操作
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
      console.log(tools, this.objlist, "测试", this.list, this.setObj);
    },
  },
};
</script>
<style lang="scss" scoped>
.main-put {
  box-shadow: inset 0 0 5px 3px #2b9939;
  padding: 1px;
  // border-color: #2b9939;
}
$heide: calc(100vh - 84px);
$tab-width: 300px;
.disabled {
  cursor: no-drop;
  opacity: 0.8;
}
.head {
  width: 100%;
  height: $heide;
  box-sizing: border-box;
}
.head-header {
  width: 100%;
  height: 64px;
  border-bottom: solid 1px #ccc;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.3);
  > div {
    margin: 0 10px;
  }
}
.head-main-box {
  display: flex;
  box-sizing: border-box;
  height: calc(100% - 64px);
  > div {
    height: 100%;
    box-sizing: border-box;
    background: #fff;
    overflow: auto;
  }
  .tab {
  width: $tab-width; //200px;
  border-right: solid 1px #ccc;
  height: 100%;
}
.main {
  flex: 1;
  background: #f5f5f5;
}
}


.tab-box {
  width: 100%;
  min-height: 100px;
  overflow: auto;
  .h3 {
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
      cursor: move;
    }
  }
}
</style>
