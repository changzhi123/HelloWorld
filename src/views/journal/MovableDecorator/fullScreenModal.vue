<template>
  <Modal v-model="isOpen" fullscreen title="预览">
    <div :style="style" class="fullScreenModal" :key="fullScreenModal">
      <component
        v-for="(item, index) in list"
        :key="index"
        :is="item.componentPack"
        :objList="item.objList"
      >
      </component>
    </div>
  </Modal>
</template>

<script>
const requireComponents = require.context("./components/", false, /\.vue$/);
//读取当前文件夹下components文件夹下.vue文件
const componentsObj = {};
requireComponents.keys().forEach((filePath) => {
  const componentName = filePath.split("/")[1].replace(/\.vue$/, ""); //获取组件名字
  const componentConfig = requireComponents(filePath); //获取组件
  componentsObj[componentName] = componentConfig.default || componentConfig;
  console.log(
    componentName,
    "当前组件",
    filePath,
    componentConfig,
    requireComponents
  );
});
export default {
  name: "fullScreenModal",
  components: componentsObj,
  data() {
    return {
      isOpen: false,
      fullScreenModal: new Date().getTime(),
    };
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: "pc",
    },
  },
  computed: {
    style() {
      let width = this.type == "pc" ? "100%" : "375px";
      return {
        width: width,
      };
    },
  },
  mounted() {},
  methods: {
    setOpen() {
      this.isOpen = true;
      this.fullScreenModal = new Date().getTime();
      // console.log(this.list, this.type, "arr");
    },
  },
};
</script>

<style lang="scss" scoped>
.fullScreenModal {
  box-sizing: border-box;
  border: solid #ccc 1px;
  margin: 0 auto;
  min-height: 100%;
  > div {
    margin: auto;
    box-sizing: border-box;
    margin-bottom: 2px;
  }
}
</style>