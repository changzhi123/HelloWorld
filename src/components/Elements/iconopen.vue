<template>
  <el-dialog
    title="svg矢量图标库"
    :visible.sync="dialogVisible"
    :modal-append-to-body="masklayer"
    width="30%"
    :append-to-body="appendtobody"
    :before-close="handleClose"
  >
    <div class="dialog_box">
     <div v-for="(item,index) in icons" :key="index">
        <el-button
          :style="`border:none;`"
          :type="type(item)?'primary':''"
          plain
          :autofocus="item==iconval"
          @click="puticon(item)"
        >
          <svg-icon style="font-size:30px;" :icon-class="item" />
          <h5>{{item}}</h5>
        </el-button>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <div class="item_buttom">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="seticon">确 定</el-button>
      </div>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    }, //接受父组件返回的图片，父组件v-model绑定的数据
    masklayer: {
      type: Boolean,
      default: false
    }, // 是否需要遮罩层，默认不需要
    appendtobody: {
      type: Boolean,
      default: true
    }, //Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true,
    icons: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dialogVisible: false,
      //   icon: ["404", "ad", "admin", "component"],
      putval: null
    }; //数据
  },
  computed: {
    iconval() {
      return this.value;
    }
  },
  created() {}, //实例化
  mounted() {}, //挂载
  updated() {}, //更新
  destroyed() {}, //销毁
  methods: {
    type(type) {
      if (this.putval) return type == this.iconval && type == this.putval;
      if (!this.putval) return type == this.iconval;
    },
    emitInput(val) {
      //父组件v-model绑定即可拿到数据
      //将上传图片返回父组件
      this.$emit("input", val);
    },
    seticon() {
      if (!this.putval) return;
      this.emitInput(this.putval); //提交数据
      this.handleClose(); //关闭弹窗
    },
    puticon(val) {
      this.putval = val; //保存数据
    },
    handleClose(done) {
      this.putval = null;
      this.dialogVisible = false;
      //done()
    }
  } //方法
};
</script>
<style lang="scss" scoped>
.dialog {
  width: 100%;
}
.dialog_box {
  width: 100%;
  border: 1px solid #ccc;
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
   > div {
    width: 100px;
    display: inline-block;
    height: 90px;
    text-align: center;
    >button{
 width: 100%;height: 100%;
    }
  }
}
.item_buttom {
  width: 100%;
  display: flex;
  justify-content: space-between;
  button {
    width: 45%;
  }
}
</style>