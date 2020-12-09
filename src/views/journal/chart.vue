<template>
  <div>
    <div class="macarons" id="macarons" :style="{height:height,width:width}" ref="macarons" />
    <BoxCard class="box" />
    <chartto />
  </div>
</template>

<script>
// 曲线图
import echarts from "echarts";
import resize from "./mixins/resize";
require("echarts/theme/macarons"); // echarts主题
import chartto from './chartto'
export default {
  components: {
    BoxCard: () => import("./BoxCard"),chartto
  },
  // mixins: [resize],//宽度自适应方法一

  data() {
    return {
      chart: null,
      width: "100%",
      height: "400px",
      chartData: {
        expectedData: [100, 120, 161, 134, 105, 160, 165, 100],
        actualData: [120, 82, 91, 154, 162, 140, 145, 120]
      }
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val); //当数据变更时更新挂在数据
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    }); //在修改数据之后立即使用这个方法，获得更新后的dom。避免拿到更新前的数据
  },
  beforeDestroy() {
    //挡组件被销毁时，初始化图表，避免bug
    if (!this.chart) return;
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.macarons, "macarons"); //字符串'macarons'是使用echarts主题样式
      // this.chart = echarts.init(this.$refs.macarons);
      //  this.chart = echarts.init(this.$el, 'macarons')//两种实现方式
      this.setOptions(this.chartData); //挂在数据
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        title: {
          text: "雨量流量关系图",
          subtext: "数据来自西安兰特水电测控技术有限公司"
          //     left: 'center',
          //     align: 'right'
        },

        xAxis: {
          data: [
            "邮件营销",
            "联盟广告",
            "视频广告",
            "直接访问",
            "搜索引擎",
            "Mon",
            "Tue",
            "Wed"
          ],
          boundaryGap: false,
          axisTick: {
            show: false
          },  axisLabel:{
                            
                             rotate:-45, //刻度旋转45度角//this.defaultData.rotate,
                             color: ['#3398DB'],
                            // formatter : (params) => {  // x轴太长换行
                            //     // return this.formatFunc(params);
                            //     return this.ellipseXzhou(params);
                            // },
                             interval:0,
                        },
        },
        grid: {
          left: 20,
          right: 20,
          bottom: 20,
          top: 60,
          width: "auto",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ["expected", "actual"] ////数据名字
        },
        series: [
          {
            name: "expected", //数据名字
            stack: "总量",
            itemStyle: {
              normal: {
                color: "#FF005A", //标题文字的颜色
                lineStyle: {
                  color: "#FF005A", //曲线的颜色
                  width: 2
                },
                areaStyle: {
                  color: "#f90" //曲线下的背景颜色
                }
              }
            },
            smooth: true,
            type: "line",
            data: expectedData, //载入数据
            animationDuration: 2800,
            animationEasing: "cubicInOut"
          },
          {
            name: "actual", //数据名字
            smooth: true,
            stack: "总量",
            type: "line",
            itemStyle: {
              normal: {
                color: "#3888fa", //标题文字的颜色
                lineStyle: {
                  color: "#3888fa", //曲线的颜色
                  width: 2
                },
                areaStyle: {
                  color: "#58bc58" //曲线下的背景颜色
                }
              }
            },
            data: actualData, //载入数据
            animationDuration: 2800,
            animationEasing: "quadraticOut"
          }
        ]
      });
      window.addEventListener("resize", () => { this.chart.resize();});//宽度自适应方法二
    }
  }
};
</script>
<style lang="scss" scoped>
.macarons {
  width: 100%;
}
.box {
  width: 400px;
}
</style>
