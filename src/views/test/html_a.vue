<template>
  <div class="html">
    <div class="box">
      <div
        :class="item.class"
        v-for="(item, index) in typeset"
        :key="index"
        style=""
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      typeset: [
          { class: "square", text: "正方形" },
           { class: "rectangle", text: "矩形" },
           { class: "circle", text: "圆形" },
           { class: "oval", text: "椭圆形" },
           { class: "triangle-up", text: "向上三角形" },//
           { class: "triangle-down", text: "向下三角形" },//ttriangle-left
            { class: "triangle-left", text: "向左三角形" },//
            { class: "triangle-right", text: "向右三角形" },//
            { class: "triangle-topleft", text: "向上" },
            { class: "triangle-topright", text: "右上" },
            { class: "triangle-topright", text: "右上" },//\
            { class: "triangle-bottomleft", text: "左下" },
            { class: "triangle-bottomright", text: "右下" },//
 { class: "curvedarrow", text: "箭头" },//
  { class: "trapezoid", text: "梯形" },//
  {class:'parallelogram',text:'平行四边形'},
{class:'star-six',text:'六角星'},
{class:'star-five',text:'五角星'},
{class:'pentagon',text:'五边形'},
{class:'hexagon',text:'六边形'}
      ],
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.html {
  width: 100%;
}
.box {
  border: 1px solid #ccc;
  padding: 10px;
  display: flex;
  flex-flow: wrap;
//   justify-content: space-between;
  div {
    color: #000;
    // text-align: center;line-height: 100px;
    // margin-bottom: 20px;
margin: 0 10px 20px 10px;
  }
}
//Square(正方形)
.square {
  width: 100px;
  height: 100px;
  background: #f90;
}
//Rectangle(矩形)
.rectangle {
    width: 200px;
    height: 100px;
    background: red;
}
//圆形
.circle {
    width: 100px;
    height: 100px;
    background: red;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
}
//椭圆形
.oval {
    width: 200px;
    height: 100px;
    background: red;
    -moz-border-radius: 100px / 50px;
    -webkit-border-radius: 100px / 50px;
    border-radius: 100px / 50px;
}
//向上的三角形
.triangle-up {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid red;
}
//向下
.triangle-down {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-top: 100px solid red;
}
//向左
.triangle-left {
    width: 0;
    height: 0;
    border-top: 50px solid transparent;
    border-right: 100px solid red;
    border-bottom: 50px solid transparent;
}
//向右三角形
.triangle-right {
    width: 0;
    height: 0;
    border-top: 50px solid transparent;
    border-left: 100px solid red;
    border-bottom: 50px solid transparent;
}
//左上
.triangle-topleft {
    width: 0;
    height: 0;
    border-top: 100px solid red;
    border-right: 100px solid transparent;
}
//右上
.triangle-topright {
    width: 0;
    height: 0;
    border-top: 100px solid red;
    border-left: 100px solid transparent;
}
//左下
.triangle-bottomleft {
    width: 0;
    height: 0;
    border-bottom: 100px solid red;
    border-right: 100px solid transparent;
}
//右下
.triangle-bottomright {
    width: 0;
    height: 0;
    border-bottom: 100px solid red;
    border-left: 100px solid transparent;
}
//箭头
.curvedarrow {

  position: relative;
  width: 0;
  height: 0;
  border-top: 9px solid transparent;
  border-right: 9px solid red;
  -webkit-transform: rotate(10deg);
  -moz-transform: rotate(10deg);
  -ms-transform: rotate(10deg);
  -o-transform: rotate(10deg);
&:after {
  content: "";
  position: absolute;
  border: 0 solid transparent;
  border-top: 3px solid red;
  border-radius: 20px 0 0 0;
  top: -12px;
  left: -9px;
  width: 12px;
  height: 12px;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
}
}

//梯形
.trapezoid {
    border-bottom: 100px solid red;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    height: 0;
    width: 100px;
}
//平行四边
.parallelogram {
    width: 150px;
    height: 100px;
    -webkit-transform: skew(20deg);
       -moz-transform: skew(20deg);
         -o-transform: skew(20deg);
    background: red;
}
//六角星
.star-six {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid red;
    position: relative;
    &:after {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-top: 100px solid red;
    position: absolute;
    content: "";
    top: 30px;
    left: -50px;
}
}
//五角星
.star-five {
   margin: 50px 0;
   position: relative;
   display: block;
   color: red;
   width: 0px;
   height: 0px;
   border-right:  100px solid transparent;
   border-bottom: 70px  solid red;
   border-left:   100px solid transparent;
   -moz-transform:    rotate(35deg);
   -webkit-transform: rotate(35deg);
   -ms-transform:     rotate(35deg);
   -o-transform:      rotate(35deg);
   &:before {
   border-bottom: 80px solid red;
   border-left: 30px solid transparent;
   border-right: 30px solid transparent;
   position: absolute;
   height: 0;
   width: 0;
   top: -45px;
   left: -65px;
   display: block;
   content: '';
   -webkit-transform: rotate(-35deg);
   -moz-transform:    rotate(-35deg);
   -ms-transform:     rotate(-35deg);
   -o-transform:      rotate(-35deg);

}
&:after {
   position: absolute;
   display: block;
   color: red;
   top: 3px;
   left: -105px;
   width: 0px;
   height: 0px;
   border-right: 100px solid transparent;
   border-bottom: 70px solid red;
   border-left: 100px solid transparent;
   -webkit-transform: rotate(-70deg);
   -moz-transform:    rotate(-70deg);
   -ms-transform:     rotate(-70deg);
   -o-transform:      rotate(-70deg);
   content: '';
}
}

//五边形
.pentagon {
    position: relative;
    width: 54px;
    border-width: 50px 18px 0;
    border-style: solid;
    border-color: red transparent;
    &:before {
    content: "";
    position: absolute;
    height: 0;
    width: 0;
    top: -85px;
    left: -18px;
    border-width: 0 45px 35px;
    border-style: solid;
    border-color: transparent transparent red;
}
}

//六边形
.hexagon {
    width: 100px;
    height: 55px;
    background: red;
    position: relative;
    &:before {
    content: "";
    position: absolute;
    top: -25px;
    left: 0;
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 25px solid red;
}
&:after {
    content: "";
    position: absolute;
    bottom: -25px;
    left: 0;
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-top: 25px solid red;
}
}
</style>