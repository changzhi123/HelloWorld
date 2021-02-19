<template>
  <div class="DrillingMap" ref="myChart"></div>
</template> 
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      geoJson: {},
      parentInfo: [{ cityName: "全国", code: 100000 }],
      currentIndex: 0,
      myChart: null,
    };
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.myChart);
    this.init(100000);
  },
  methods: {
    //初始化
    init(adcode) {
      this.getGeoJson(adcode).then((data) => {
        this.geoJson = data;
        this.getMapData();
        console.log(data, "地图数据");
      });
    },
    getGeoJson(adcode, childAdcode = "") {
      return new Promise((resolve, reject) => {
        function insideFun(adcode, childAdcode) {
          AMapUI.loadUI(["geo/DistrictExplorer"], (DistrictExplorer) => {
            var districtExplorer = new DistrictExplorer();
            districtExplorer.loadAreaNode(adcode, function (error, areaNode) {
              if (error) {
                console.error(error);
                reject(error);
                return;
              }
              console.log(areaNode, "areaNode");
              let Json = areaNode.getSubFeatures();
              if (Json.length === 0) {
                let parent = areaNode._data.geoData.parent.properties.acroutes;
                insideFun(parent[parent.length - 1], adcode);
                return;
              }
              if (childAdcode) {
                Json = Json.filter((item) => {
                  return item.properties.adcode == childAdcode;
                });
              }
              let mapJson = {
                features: Json,
              };
              resolve(mapJson);
            });
          });
        }
        insideFun(adcode, childAdcode);
      });
    },
    //获取数据
    getMapData() {
      let mapData = [],
        pointData = [],
        sum = 0;
      this.geoJson.features.forEach((item) => {
        let value = Math.random() * 3000;
        mapData.push({
          name: item.properties.name,
          value: value,
          cityCode: item.properties.adcode,
        });
        pointData.push({
          name: item.properties.name,
          value: [item.properties.center[0], item.properties.center[1], value],
          cityCode: item.properties.adcode,
        });
        sum += value;
      });
      mapData = mapData.sort(function (a, b) {
        return b.value - a.value;
      });
      console.log(mapData, sum, pointData, "mapData, sum, pointData");
      this.initEchartMap(mapData, sum, pointData);
    },
    //渲染echarts
    initEchartMap(mapData, sum, pointData) {
      let xData = [],
        yData = [];
      let min = mapData[mapData.length - 1].value;
      let max = mapData[0].value;
      if (mapData.length === 1) {
        min = 0;
      }
      mapData.forEach((c) => {
        xData.unshift(
          c.name.replace(/(省|市|自治区|回族|维吾尔|壮族|特别行政区)/g, "")
        );
        yData.unshift(c.value);
      });
      //这里做个切换，全国的时候才显示南海诸岛  只有当注册的名字为china的时候才会显示南海诸岛
      echarts.registerMap(
        this.parentInfo.length === 1 ? "china" : "map",
        this.geoJson
      );

      let option = {
        baseOption: {
          backgroundColor: "#f5f5f5",
          title: [
            {
              left: "center",
              top: 20,
              text:
                this.parentInfo[this.parentInfo.length - 1].cityName +
                "销售额统计图(可点击到县)",
              textStyle: {
                color: "#b3efff",
                fontSize: 16,
              },
            },
            {
              text: "销售总额：" + sum.toFixed(2) + "万",
              left: "center",
              top: 45,
              textStyle: {
                color: "#FFAC50",
                fontSize: 20,
              },
            },
          ],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "none", // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          legend: {
            show: true,
            icon: "roundRect",
            itemWidth: 25,
            itemHeight: 15,
            itemGap: 9,
            bottom: "10",
            right: "20",
            textStyle: {
              fontSize: 14,
              color: "#b3efff",
            },
            data: ["单数", "销售额"],
          },
          grid: [
            {
              show: false,
              right: "21%",
              top: "12%",
              bottom: "8%",
              containLabel: true,
              width: "15%",
            },
            {
              show: false,
              right: "18.5%", //调整中间文字位置
              top: "14%", //使中间文字对齐
              bottom: "8%",
              width: "0%",
            },
            {
              show: false,
              right: "2%",
              top: "12%",
              bottom: "8%",
              containLabel: true,
              width: "15%",
            },
          ],

          geo: {
            map: this.parentInfo.length === 1 ? "china" : "map",
            zoom: 1.1,
            roam: true,
            left: "10%",
            top: "15%",
            tooltip: {
              trigger: "item",
              formatter: (p) => {
                let val = p.value[2];
                if (window.isNaN(val)) {
                  val = 0;
                }
                let txtCon =
                  "<div style='text-align:left'>" +
                  p.name +
                  ":<br />单数：" +
                  val.toFixed(2) +
                  "单<br />销售额：" +
                  val.toFixed(2) +
                  "万</div>";
                return txtCon;
              },
            },
            label: {
              normal: {
                show: true,
                color: "#f9f9f9", //省份标签字体颜色
                formatter: (p) => {
                  switch (p.name) {
                    case "内蒙古自治区":
                      p.name = "内蒙古";
                      break;
                    case "西藏自治区":
                      p.name = "西藏";
                      break;
                    case "新疆维吾尔自治区":
                      p.name = "新疆";
                      break;
                    case "宁夏回族自治区":
                      p.name = "宁夏";
                      break;
                    case "广西壮族自治区":
                      p.name = "广西";
                      break;
                    case "香港特别行政区":
                      p.name = "香港";
                      break;
                    case "澳门特别行政区":
                      p.name = "澳门";
                      break;
                  }
                  return p.name;
                },
              },
              emphasis: {
                show: true,
                color: "#f75a00",
              },
            },
            itemStyle: {
              normal: {
                areaColor: "#58bc58",
                borderColor: "#f5f5f5",
                borderWidth: 1.3,
                shadowBlur: 15,
                shadowColor: "#3a73c0",
                shadowOffsetX: 7,
                shadowOffsetY: 6,
              },
              emphasis: {
                areaColor: "#8dd7fc",
                borderWidth: 1.6,
                shadowBlur: 25,
              },
            },
          },

          series: [
            {
              //最外层鼠标经过显示的黑框
              name: "年销售额度",
              type: "map",
              geoIndex: 0,
              map: this.parentInfo.length === 1 ? "china" : "map",
              roam: true,
              zoom: 1.3,
              tooltip: {
                trigger: "item",
                formatter: (p) => {
                  let val = p.value;
                  if (p.name == "南海诸岛") return;
                  if (window.isNaN(val)) {
                    val = 0;
                  }
                  let txtCon =
                    "<div style='text-align:left'>" +
                    p.name +
                    ":<br />单数：" +
                    val.toFixed(2) +
                    "单<br />销售额：" +
                    val.toFixed(2) +
                    "万</div>";
                  return txtCon;
                },
              },
              label: {
                normal: {
                  formatter: function (data) {
                    return "4";
                  },
                  show: true,
                  position: "right",
                  distance: 5,
                  color: "white",
                  backgroundColor: "#1D3039",
                  padding: 10,
                  borderRadius: 20,
                  // show: false,
                },
                emphasis: {
                  show: false,
                },
              },
              data: mapData,
            },
            {
              name: "散点",
              type: "effectScatter",
              coordinateSystem: "geo",
              rippleEffect: {
                brushType: "fill",
              },
              itemStyle: {
                normal: {
                  color: "#F4E925",
                  shadowBlur: 10,
                  shadowColor: "#333",
                },
              },
              data: pointData,
              symbolSize: function (val) {
                let value = val[2];
                if (value == max) {
                  return 27;
                }
                return 10;
              },
              showEffectOn: "render", //加载完毕显示特效
            },
          ],
        },
      };
      this.myChart.setOption(option, true);
      //点击前解绑，防止点击事件触发多次
      this.myChart.off("click");
      this.myChart.on("click", this.echartsMapClick);
      //监听时间切换事件
      this.myChart.off("timelinechanged");
      this.myChart.on("timelinechanged", (params) => {
        this.currentIndex = params.currentIndex;
        this.getMapData();
      });
    },
    //echarts点击事件
    echartsMapClick(params) {
      console.log("点击了", params);
      // $('.back').css({"cursor":"pointer","opacity":"1"})
      if (!params.data) {
        return;
      } else {
        //如果当前是最后一级，那就直接return
        if (
          this.parentInfo[this.parentInfo.length - 1].code ==
          params.data.cityCode
        ) {
          return;
        }
        let data = params.data;
        this.parentInfo.push({
          cityName: data.name,
          code: data.cityCode,
        });
        this.init(data.cityCode);
      }
    },
    //返回
    back() {
      if (this.parentInfo.length === 1) {
        return;
      }
      this.parentInfo.pop();
      this.init(this.parentInfo[this.parentInfo.length - 1].code);
    },
  },
};
</script>
<style lang="scss" scoped>
.DrillingMap {
  width: 100%;
  height: 100%;
}
</style>