<template>
  <div class="chartTypeAnnular">
    <div ref="item" :style="{height: height}"></div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  props: {
      height: {
        type: String,
        default: '200px'
      },
    putOptions:{
        type:Object,
        default:()=>{}
    }
  },
  data() {
    return {
      map: null,
      setOptions:{
        listcolor:['#1e90ff', '#e96908', '#FF6507', '#ff9966', '#ff99cc', '#00cc33', '#006ecc', '#e6f04c', '#fe2b53', '#881584'],
        //legend
        legend_data:null,//["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
        legend_orient:'vertical',
        legend_icon:'circle',
        legend_align:'right',
        legend_left:'right',
        //serie
         series_radius:[30, 60],
         series_center:['30%', '50%'],
         series_hoverAnimation:true,
         seriec_roseType:false,
         series_name:'circle',
         series_data:null,//[  { value: 0, name: "直接访问" },{ value: 0, name: "邮件营销" }],
         series_label_show:true,     
      },
    };
  },
  computed: {

  },
  mounted() {
    this.mettype()
      this.initechar()
  },
  methods: {
    mettype(){
      const reqdata=this.putOptions
      if(!reqdata)return
      // console.log(this.putOptions,'putOptions')
       for (let key in reqdata){
        //  console.log(reqdata[key],key,'key')
          this.setOptions[key]=reqdata[key]//只更新修改的
       }

    },
      initechar(){
        let option= {
         tooltip: {
            show: true, // 可视
            trigger: "item",
            formatter: '{b}: {d}%' // 提示内容
        },
        legend: {
           orient: this.setOptions.legend_orient,//"vertical",
           icon: this.setOptions.legend_icon,//'circle',//图标为圆形，默认是方形
           data: this.setOptions.legend_data,//["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
           itemWidth: 8, // 设置宽度
           itemHeight: 8, // 设置高度
           bottom: null,
           
           align: this.setOptions.legend_align,//'right', // 图标与属性名的相对位置，默认为right，即属性名在左，图标在右
           left:this.setOptions.legend_left,//'right',
           selectedMode: true, // 可选择
        },
        series:[
          {
            name:this.setOptions.series_name,//"访问来源",
            type: "pie",
            radius:this.setOptions.series_radius, //环形图中心直径和外圈直径
            center: this.setOptions.series_center,//['30%', '50%'],//环形图位置
            avoidLabelOverlap: true,
            stillShowZeroSum: true,
            hoverAnimation: this.setOptions.series_hoverAnimation,//true, // 鼠标悬停效果，默认是true
            roseType:this.setOptions.seriec_roseType,//false,
            emphasis: {
              label: {
                show: false,
                fontSize: "50",
                fontWeight: "bold",
              },
            },
             label: { // 设置饼状图圆心属性
                normal: {
                  // rotate: 10,
                  show:this.setOptions.series_label_show,// true,
                  color: this.setOptions.listcolor,
                  // position: 'center'
                  formatter: (v) => {
                   
                      let text = v.name;
                      let percent = v.percent;
                      return `${text}\n${percent}%`;
              
                  }
                },
              },
             labelLine: {
                normal: {
                  show: true,
                  // smooth: true,
                  // rotate: 10,
                  length:4,
                  length2: 4,
                  lineStyle:{
                    type: 'dashed',
                  }
                },
                emphasis:{
                  show: true,
                  lineStyle: {
                    type: 'dashed'
                  }
                }
              },
            data: this.setOptions.series_data,//[
            //   { value: 0, name: "直接访问" },
            //   { value: 0, name: "邮件营销" },
            // ],
             itemStyle: { // 元素样式
                normal: {
                  // 柱状图颜色
                  color: (params) => { // 对每个颜色赋值
                    // 颜色列表
                    let listcolor = this.setOptions.listcolor
                    // 返回颜色
                    return listcolor[params.dataIndex]
                    
                  },
                },
                emphasis: {
                  borderWidth: 4, // 鼠标悬浮，有白色间隙
                  borderColor: 'transparent',
                  label:{
                    show: false
                  },
                }
              },
          },
        ],  
      }
 



          this.map = echarts.init(this.$refs.item)
          this.map.clear()
          this.map.setOption(option) // 使用刚指定的配置项和数据显示图表。
      }
  },
};
</script>
<style lang="scss" scoped>
.chartTypeAnnular {
  width: 100%;
  height: 100%;
}
</style>