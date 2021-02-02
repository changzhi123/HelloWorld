<template>
  <div class="TheNationalMap" ref="TheNationalMap"></div>
</template>

<script>
import geoCoordMap from "./lat-lng-map.js";
import echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
      this.init()
  },
  methods: {
    init() {
      const data = [
        {
          start: "北京", //发货省
          processing: 50, //进行中
          end: "广东", //收货省
          completed: 98.82, //已完成
        },
      ];
      const myChart = echarts.init(this.$refs.TheNationalMap);
      const s_data = [];
      window.addEventListener("resize", function () {
        myChart.resize();
      });
      s_data.push({
        type: "lines",
        zlevel: 2,
        mapType: "china",
        symbol: "none",
        effect: {
          show: true,
          period: 1.5,
          trailLength: 0.1,
          color: "#00FFFF",//线上的动态效果颜色
          symbol: "pin",
          symbolSize: 6,
          trailLength: 0.5,
        },
        lineStyle: {
          normal: {
            color: "#f90",//线的颜色
            width: 1,
            opacity: 0.4,
            curveness: 0.2,
          },
        },
        data: this.formtGCData(geoCoordMap, data),
      });
      let option = {
        tooltip: {
          trigger: "item",
        },
        geo: {
          map: "china",
          label: {
            show: true,
            position: "insideLeft",
            color: "#000",//省份字体颜色
            fontSize: "13",
            emphasis: {
              show: true,
            },
          },
          roam: false,
          silent: true,
          itemStyle: {
            normal: {
              areaColor: "transparent",
              borderColor: "#0e94eb",//地图边界线颜色
              shadowBlur: 10,
              shadowColor: "#0e94ea",//地图边界线阴影颜色
            },
          },
          left: 10,
          right: 10,
        },
        series: s_data,
      };

      myChart.setOption(option);
    },
    formtGCData(geoData, data) {
      const tGeoDt = [];
      data.filter((item, index) => {
         console.log(item,index,'item')
        if (item.start != item.end) {
          tGeoDt.push({
            coords: [geoData[item.end], geoData[item.start]],
          });
        }
      });
      console.log(tGeoDt,'tGeoDt',geoData, data)
      return tGeoDt;
    },
  },
};
</script>
<style lang="scss" scoped>
.TheNationalMap{
    width: 100%;
    height: 100%;
}
</style>