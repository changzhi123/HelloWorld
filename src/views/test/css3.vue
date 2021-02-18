<template>
  <div class="css3">
    <div class='box'>
      <visualizationMap ref="visualizationMaps"></visualizationMap>
    </div>
    <div class="box">
      <chartTypeAnnular :putOptions="putOptions" />
    </div>
    <div class="box">
      <ChinaMap
        ref="ChinaMap"
        color="#000"
        :data="data"
        :option="options"
      ></ChinaMap>
    </div>
    <div class="box">
    <TheNationalMap ref="TheNationalMaps"></TheNationalMap>
    </div>
    <div class="box">
      <nationwideMap ref="nationwideMaps"></nationwideMap>
    </div>
  </div>
</template>

<script>
import chartTypeAnnular from "@/components/Elements/chartTypeAnnular";
import ChinaMap from "@/components/Elements/ChinaMap";
import TheNationalMap from '@/components/Elements/TheNationalMap';
import nationwideMap from '@/components/Elements/nationwideMap'
import visualizationMap from '@/components/Elements/visualizationMap'
import { data } from "./map.js";
export default {
  components: {
    chartTypeAnnular,TheNationalMap,
    ChinaMap,nationwideMap,visualizationMap
  },
  data() {
    return {
      putOptions: {
        legend_data: [
          "直接访问",
          "邮件营销",
          "联盟广告",
          "视频广告",
          "搜索引擎",
        ],
        series_data: [
          { value: 0, name: "直接访问" },
          { value: 0, name: "邮件营销" },
        ],
      },
      options: {
        tooltip: {
          trigger: "item",
          backgroundColor: "#71BCF1",
          formatter: (params) => {
            var res = undefined;
            var myseries = this.data;
            for (var i = 0; i < myseries.length; i++) {
              if (params.name.includes(myseries[i].name)) {
                res =
                  params.name +
                  "<br/>" +
                  "销售额 : " +
                  myseries[i].value +
                  "</br>";
              }
            }
            return res;
          },
        },
      },
      data: [],
      sale: {
        totalAmount: 0,
        tranOrders: 0,
      },
      otherReverse: {
        北京市: "北京",
        天津市: "天津",
        重庆市: "重庆",
        上海市: "上海",
        新疆维吾尔自治区: "新疆",
        宁夏回族自治区: "宁夏",
        内蒙古自治区: "内蒙古",
        西藏自治区: "西藏",
        广西壮族自治区: "广西",
        香港特别行政区: "香港",
        澳门特别行政区: "澳门",
      },
    };
  },
  mounted() {
    console.log(this.data, "data");
    this.getData();
  },
  methods: {
    getData() {
      this.sale = {
        totalAmount: 20,
        tranOrders: 30,
      };

      this.data = data.map((val) => {
        this.sale.totalAmount += val.transMoney;
        this.sale.tranOrders += val.tranOrders;

        let name = this.otherReverse[val.name]
          ? this.otherReverse[val.name]
          : val.name.replace("省", "");
        return {
          name: name,
          value: val.transMoney,
        };
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.css3 {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.box {
  width: 40%;
  height: 400px;
  border: 1px solid #ccc;
  margin: 10px;
}
</style>