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
    this.init();
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
        {
          start: "四川", //发货省
          processing: 50, //进行中
          end: "广西", //收货省
          completed: 98.82, //已完成
        },
      ];
      const myChart = echarts.init(this.$refs.TheNationalMap);
      const s_data = [];
      window.addEventListener("resize", function () {
        myChart.resize();
      });
      s_data.push(
        {//线路
        type: "lines",
        zlevel: 2,
        mapType: "china",
        symbol: "none",
        effect: {
          show: true,
          period: 1.5,
          trailLength: 0.1,
          color: "#00FFFF", //线上的动态效果颜色
          symbol: "pin",
          symbolSize: 6,
          trailLength: 0.5,
        },
        lineStyle: {
          normal: {
            color: "#f90", //线的颜色
            width: 1,
            opacity: 0.4,
            curveness: 0.2,
          },
          
        },
        data: this.formtGCData(geoCoordMap, data),
      },
       {//线路图表
                type: 'lines',
                zlevel: 2,
                symbol: ['none', 'arrow'],
                symbolSize: 10,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    symbol: 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
                    symbolSize: 15
                },
                lineStyle: {
                    normal: {
                        color: '#58bc58',
                        width: 1,
                        opacity: 0.6,
                        curveness: 0.2
                    }
                },
                data: this.formtGCData(geoCoordMap, data),
            },
             {
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: '{b}'
                    }
                },
                // symbolSize: function(val) {
                //     return val[2] / 8;
                // },
                itemStyle: {
                    normal: {
                        color: '#f90',
                    },
                    emphasis: {
                        areaColor: '#fff'
                    }
                },
                data:this.dotlist(geoCoordMap, data)
            }
      );
      let option = {
        // tooltip: {
        //   trigger: "item",
        // },
          tooltip: {
                trigger: 'item',
                formatter: function(params, ticket, callback) {
                      console.log(params.data,'params')
                    if (params.seriesType == "effectScatter") {
                        return "线路：" + params.data.name + "" + params.data.value[2];
                    } else if (params.seriesType == "lines") {
                        return params.data.name[0] + ">" + params.data.name[1] + "<br />" + params.data.value[0];
                    } else {
                        return params.name;
                    }
                }
            },
        geo: {
          map: "china",
          label: {
            show: true,
            position: "insideLeft",
            color: "#000", //省份字体颜色
            fontSize: "13",
            emphasis: {
              show: true,
            },
          },
          roam: true, //是否可以拖动放大
          silent: false, //是否禁用选中区域
          itemStyle: {
            normal: {
              areaColor: "transparent",
              borderColor: "#0e94eb", //地图边界线颜色
              shadowBlur: 10,
              shadowColor: "#0e94ea", //地图边界线阴影颜色
            },
            emphasis: {
              areaColor: "#5961EB", //选中区域的填充颜色
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderColor: "#5961EB", //选中区域的边框颜色
              shadowColor: "#5961EB", //选中区域的阴影
            },
          },
          left: 10,
          right: 10,
        },
        
        series: s_data,
      };

      myChart.setOption(option);  
      // 4. 让图表跟随屏幕自动的去适应
        window.addEventListener("resize", function() {
            myChart.resize();
        });
    },
    dotlist(geoData, data){//点
      const arr =[]
      data.filter(item=>{
        console.log(item,'itemarr')
        arr.push({
          name:item.start,
          value:geoData[item.start].concat([item.processing])
        })
      })
      console.log(arr,'listarr')
      return arr

    },
    formtGCData(geoData, data) {//线路
      const tGeoDt = [];
      data.filter((item, index) => {
        // console.log(item, index, "item");
        if (item.start != item.end) {
          tGeoDt.push({
            name:[item.end,item.start],
            value:[item.processing,item.completed],
            coords: [geoData[item.end], geoData[item.start]],
          });
        }
      });
      console.log(tGeoDt, "tGeoDt", geoData, data);
      return tGeoDt;
    },
  },
};
</script>
<style lang="scss" scoped>
.TheNationalMap {
  width: 100%;
  height: 100%;
}
</style>