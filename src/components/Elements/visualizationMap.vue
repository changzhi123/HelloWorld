<template>
  <div class="visualizationMap">
    <div class="map1"></div>
    <div class="map2"></div>
    <div class="map3"></div>
    <div class="chart"></div>
  </div>
</template>

<script>
export default {
  name: "visualizationMap",
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.visualizationMap {
  width: 100%;
  height: 100%;
    position: relative;
            
            
            .map1{
                width:60%;
                height: 80%;
                position:absolute;
                top: 50%;
                left:50%;
                transform: translate(-50%,-50%);
                background:url('../../assets/images/map.png') no-repeat;
                background-size: 100%,100%;
                opacity: 0.3;

            }
            .map2{
                width: 70%;
                height: 90%;
                position:absolute;
                top: 50%;
                left:50%;
                transform: translate(-50%,-50%);
                background:url('../../assets/images/lbx.png') no-repeat;
                background-size: 100%,100%;
                opacity: 0.6;
               
                animation: rotate1 15s linear infinite;
            }
            @keyframes rotate1 {
                0% {
                    transform: translate(-50%, -50%) rotate(0deg);
                }
              100%{
                  transform: translate(-50%, -50%) rotate(360deg);
                }
              }
              .map3{
                width: 70%;
                height: 90%;
                position:absolute;
                top: 50%;
                left:50%;
                transform: translate(-50%,-50%);
                background:url('../../assets/images/jt.png') no-repeat;
                background-size: 100%,100%;
                opacity: 0.6;
               
                animation: rotate2 10s linear infinite;
            }
            .chart{
                position:absolute;
                top: 0;
                left:0;
                width: 100%;
                height: 100%;
                // background-color: pink;
                


            }
            @keyframes rotate2 {
                0% {
                    transform: translate(-50%, -50%) rotate(0deg);
                }
              100%{
                  transform: translate(-50%, -50%) rotate(-360deg);
                }
              }

}
</style>