<template>
  <div :class="{res:tt,foo:true}"  :style="ress">
    <!-- class与style的绑定 -->
    nestb
    <el-button type="success" @click="datas" >pt按钮</el-button>
    <el-button type="success" @click.stop="datas">stop</el-button>
    <el-button type="success" @submit.prevent="datas">submit.prevent</el-button>
    <el-button type="success" @click.stop.prevent="datas">click.stop.prevent</el-button>
    <el-button type="success" @click.capture="datas">click.capture</el-button>
    <el-button type="success" @click.self="datas">click.self</el-button>
    <el-button type="success" @click.once="datas">点击事件将只会触发一次</el-button>
     <input  type="success" @keyup.enter="datas">keyup.enter</input>
    <vue-qr
      :logo-src="logoSrc"
      :size="200"
      :margin="0"
      :auto-color="true"
      :dot-scale="1"
      :text="appSrc"
    />
  </div>

  <!-- text:  //编码的内容，不能为空且必须要有值
size: 尺寸, 长宽一致, 包含外边距
margin: 二维码图像的外边距, 默认 20px，一定要设置为零，否则会被莫名奇妙的压缩
colorDark: 实点的颜色
colorLight: 空白区的颜色
bgSrc: 欲嵌入的背景图地址，一般不用，会比较花哨
backgroundDimming: 叠加在背景图上的颜色, 在解码有难度的时有一定帮助
logoSrc: 欲嵌入至二维码中心的 LOGO 地址，头像图片
logoScale: 用于计算 LOGO 大小的值, 过大将导致解码失败, LOGO 尺寸计算公式 logoScale*(size-2*margin), 默认 0.2f
logoMargin: LOGO 标识周围的空白边框, 默认为0
logoCornerRadius: 标识及其边框的圆角半径, 默认为0
whiteMargin: 若设为 true, 背景图外将绘制白色边框
dotScale: (0 < scale < 1.0f) 数据区域点缩小比例，让你的数据保持原来尺寸，如果迷得连接特别长，可以用缩放，如果不是特别长，就设置为1，不然生成的二维码密密麻麻,有些商家的二维码密密麻麻，就是连接太长，导致的，加上不缩放。
autoColor: 若为 true, 背景图的主要颜色将作为实点的颜色, 即 colorDark
binarize: 若为 true, 图像将被二值化处理, 未指定阈值则使用默认值
binarizeThreshold:(0 < threshold < 255) 二值化处理的阈值
callback: 生成的二维码 Data URI 可以在回调中取得,第一个参数为二维码 data URL, 第二个参数为 props 传过来的 qid(因为二维码生成是异步的,所以加个 id 用于排序)
  bindElement: 指定是否需要自动将生成的二维码绑定到HTML上, 默认是TRUE-->
  <!-- 
    object: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    }

    <div v-for="item of items"></div>

    <div v-for="(value, name, index) in object">
      {{ index }}. {{ name }}: {{ value }}
    </div>

    当处于同一节点，v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个
     v-for 循环中。当你只想为部分项渲染节点时，这种优先级的机制会十分有用

    <template v-for="item in items">
      <li>{{ item.msg }}</li>
      <li class="divider" role="presentation"></li>
    </template>

    组件会在 `currentTabComponent` 改变时改变 
    <component v-bind:is="currentTabComponent"></component>
    已注册组件的名字，或
    一个组件的选项对象
  -->
</template>
<script>
import VueQr from "vue-qr";
export default {
  components: { VueQr }, //组件
  data() {
    return {
      logoSrc: "",
      appSrc: "http://www.baidu.com",
      tt: true,
      ress: {
        color: "#f90",
        fontSize: "50px"
      }
    }; //数据
  },
  mounted() {}, //挂载
  computed: {}, //计算
  methods: {
    datas() {
      console.log("1");
      //           <!-- 阻止单击事件继续传播 -->
      // <a v-on:click.stop="doThis"></a>

      // <!-- 提交事件不再重载页面 -->
      // <form v-on:submit.prevent="onSubmit"></form>

      // <!-- 修饰符可以串联 -->
      // <a v-on:click.stop.prevent="doThat"></a>

      // <!-- 只有修饰符 -->
      // <form v-on:submit.prevent></form>

      // <!-- 添加事件监听器时使用事件捕获模式 -->
      // <!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
      // <div v-on:click.capture="doThis">...</div>

      // <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
      // <!-- 即事件不是从内部元素触发的 -->
      // <div v-on:click.self="doThat">...</div>
    }
  } //方法
};
</script>
<style scoped lang = "scss">
.res {
  /* font-size: 80px; */
}
</style>