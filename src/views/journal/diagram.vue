<template>
    <div  class="diagram">
      <div ref="c1" class="box"></div>
    </div>
</template>
<script>
import { Chart } from '@antv/g2'; // 图表插件
export default {
  props: {
    // datas: {
    //   type: Array,
    //   default: () => {
    //     return [
    //       { date: "2015-01-04", num: 3, key: "feng" },
    //       { date: "2015-01-05", num: 5, key: "feng" },
    //       { date: "2015-01-06", num: 9, key: "feng" },
    //       { date: "2015-01-04", num: 7, key: "feng1" },
    //       { date: "2015-01-05", num: 5, key: "feng1" },
    //       { date: "2015-01-06", num: 6, key: "feng1" }
    //     ];
    //   }
    // }
  },
  data() {
    return {
      charts: null, //新增设备实例
      data:[
          { date: "2015-01-04", num: 3, key: "feng" },
          { date: "2015-01-05", num: 5, key: "feng" },
          { date: "2015-01-06", num: 9, key: "feng" },
          { date: "2015-01-04", num: 7, key: "feng1" },
          { date: "2015-01-05", num: 3, key: "feng1" },
          { date: "2015-01-06", num: 6, key: "feng1" }
        ],
    }; //数据
  },
  mounted() {
    this.graph();
  }, //挂载
  methods: {
    graph() {
      this.charts = new Chart({
        container: this.$refs.c1,
        forceFit: true,
        height: 400, width:800,
        padding: [40, 50, 70, 70]
      });
      this.charts.data(this.data);
      this.charts.scale({
        month: {
          range: [0, 1]
        },
        temperature: {
          nice: true
        }
      });
      this.charts.guide().text({
        position: ["min", "max"],
        content: "新增设备数曲线", //图表标题
        style: {
          fill: "#000", //字体颜色
          fontWeight: 1000, //加粗
          fontSize: 18,
          fontWeight: "bold",
          textBaseline: "top"
        },
        
        offsetY: -30, //偏移量
        offsetX: -20 //偏移量
      });
      this.charts.legend({
        position: "top" //让属性字段在头部居中
      });
      this.charts.tooltip({
        showCrosshairs: true, // 展示 Tooltip 辅助线
        shared: true
      });
      this.charts.axis("num", {
        label: {
          formatter: val => {
            return val + "数字";
            // return val;
          }
        }
      });
      // this.chart.animate(true)//开启或者关闭 chart 动画
      this.charts
        .line()
        .position("date*num")
        .color("key") //对象里面要显示可动标签的属性
        .shape("smooth");
      this.charts
        .point()
        .position("date*num")
        .color("key") //对象里面要显示可动标签的属性
        .size(4)
        .shape("circle")
        .style({
          stroke: "#fff", //圆点外圈的颜色
          lineWidth: 1
        });
       
      this.charts.render();
    }
  } //方法
};
</script>
<style scoped lang="scss">
.diagram{
 width: 100%;
 .box{
   width: 100%;min-height: 400px;
 }
}
</style>