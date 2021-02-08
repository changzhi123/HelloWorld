<template>
  <div class="china-map">
    <div :style="{ height: height, width: width }" ref="myEchart"></div>
  </div>
</template>
<script>
import echarts from "echarts";
import { objset } from "@/utils/method";
import latLngMap from "./lat-lng-map.js";
const lodash = require("lodash");
//   import '../../../../node_modules/echarts/map/js/china.js'
import '../../../node_modules/echarts/map/js/china.js'
export default {
  name: "ChinaMap",
  props: {
    height: {
      type: String,
      default: "320px",
    },
    width: {
      type: String,
      default: "100%",
    },
    // markpoint的data
    data: {
      type: Array,
      default: () => [],
    },
    // 传入的设置，可不传
    option: {
      type: Object,
      default: () => {},
    },
    color: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      myChart: null,
    };
  },
  computed: {
    markPointData() {
      let markpointData = [];
      let max = lodash.maxBy(this.data, "value");
      console.log(max,'xxxx');
      this.data.map((value) => {
        let coord = latLngMap[value.name];
        if (coord && value.value) {
          let val = Number(value.value);
          let size = (val / max.value) * 15;
          markpointData.push({
            coord,
            symbolSize: size < 6 ? 6 : size,
          });
        }
      });
      return markpointData;
    },
  },
  methods: {
   
    chinaConfigure() {
      this.myChart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置
      window.onresize = this.myChart.resize;
      this.myChart.clear();
     let option = { // 进行相关配置
                    grid: {
                        left: 0,
                    },
                    geo: { // 这个是重点配置区
                        map: 'china', // 表示中国地图
                        roam: false,  // true 地图可缩放
                        zoom: 1.2,
                        label: {
                            normal: {
                                show: true, // 是否显示对应地名
                                textStyle: {
                                    color: '#505050',//地图区域文字颜色
                                    fontSize:10
                                },
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    color: '#5961EB',//选中区域的文字颜色
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderColor:'#5284F8', //'地图边框颜色
                                shadowColor: 'rgba(48, 76, 159)',//轮廓阴影颜色
                                areaColor: 'transparent',
                                borderType: 'solid',
                                shadowOffsetX: 0,
                                shadowOffsetY: 3,
                                shadowBlur: 16
                            },
                            emphasis: {
                                areaColor: "#5961EB",//选中区域的填充颜色
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                shadowBlur: 20,
                                borderColor: '#5961EB',//选中区域的边框颜色
                                shadowColor: '#5961EB'//选中区域的阴影
                            }
                        },
                    },
                    series: [
                        {
                            type: 'scatter',
                            coordinateSystem: 'geo' // 对应上方配置
                        },
                        {
                            name: '', // 浮动框的标题
                            type: 'map',
                            geoIndex: 0,
                            zoom: 1.2,
                            data: [],
                            markPoint: {
                                symbol: 'circle', //标记(气泡)的图形
                                symbolSize: 10, //标记(气泡)的大小
                                itemStyle:{
                                    color: '#5284F8',//地图点的颜色
                                    borderColor: '#000',
                                    borderWidth: 0,
                                    borderType: 'solid',
                                    // opacity: 0.5
                                },
                                data: this.markPointData
                            }
                        }
                    ]
                };
      console.log(this.markPointData,'markPointData')
      console.log(option,this.option,'数据')
      let list =Object.assign(option,this.option);
      this.myChart.setOption(list);
    },
  },
  mounted() {
    this.chinaConfigure();
  },
  watch: {
    data() {
      this.chinaConfigure();
    },
    option() {
      this.chinaConfigure();
    },
  },
};
</script>
<style lang="scss" scoped>
.china-map {
}
</style>