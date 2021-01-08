<template>
  <div class="canvas">
    <Tag color="primary">canvas</Tag>
    <div class="canvas_box">
      <Row>
        <Col span="6">
          <Card class="box">
            <p slot="title">圆</p>
            <canvas
              ref="myCanvas_a"
              width="300"
              height="130"
              style="border: 1px solid #c3c3c3"
            >
            </canvas>
          </Card>
        </Col>
        <Col span="6">
          <Card class="box">
            <p slot="title">文本</p>
            <canvas
              ref="myCanvas_b"
              width="300"
              height="130"
              style="border: 1px solid #c3c3c3"
            >
            </canvas>
          </Card>
        </Col>
        <Col span="6">
          <Card class="box">
            <p slot="title">矩形</p>
            <canvas
              ref="myCanvas_c"
              width="300"
              height="130"
              style="border: 1px solid #c3c3c3"
            >
            </canvas>
          </Card>
        </Col>
        <Col span="6">
          <Card class="box">
            <p slot="title">圆+弧</p>
            <canvas
              ref="myCanvas_d"
              width="300"
              height="130"
              style="border: 1px solid #c3c3c3"
            >
            </canvas>
          </Card>
        </Col>
      </Row>
    </div>
     <div class="upand"></div>
     <tuodong></tuodong>
     <div class="upand"></div>
     <fuzhi></fuzhi>
  </div>
</template>
<script>
import tuodong from '@/components/Kanban/tuodong'
import fuzhi from '@/components/Kanban/fuzhi'
export default {
  data() {
    return {};
  },
  components:{
    tuodong,fuzhi
  },
  mounted() {
    this.initCanvas();
    this.initCanvas_b();
    this.initCanvas_c();
    this.initCanvas_d();
  },
  methods: {
    initCanvas() {
      const c = this.$refs.myCanvas_a;
      const ctx = c.getContext("2d");
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "aqua"; //圆形的颜色
      ctx.arc(95, 50, 40, 0, 2 * Math.PI);
      ctx.stroke();
    },
    initCanvas_b() {
      var c = this.$refs.myCanvas_b;
      var ctx = c.getContext("2d");
      ctx.font = "30px Arial";
      //   ctx.fillText("Hello World", 10, 50);//绘制实心文字
      ctx.strokeText("Hello World", 10, 50); //绘制空心文字
    },
    initCanvas_c() {
      var c = this.$refs.myCanvas_c;
      var ctx = c.getContext("2d");
      //fillRect(x, y, width, height): 绘制一个填充的矩形
      // strokeRect(x, y, width, height): 绘制一个矩形的边框
      // clearRect(x, y, width, height):清除指定矩形区域，让清除部分完全透明。
      ctx.rect(10, 10, 150, 100);
      ctx.lineWidth = 2;
      ctx.fillStyle = "cyan"; //设置填充颜色
      ctx.strokeStyle = "#F5270B"; //边框颜色
      ctx.fill();
      ctx.stroke();
    },
    initCanvas_d() {
      var canvas = this.$refs.myCanvas_d;
      var context = canvas.getContext("2d");
    //   context.arc(60, 60, 50, 0, 2 * Math.PI, false);
    //   context.strokeStyle = "#c33"; //边框颜色
    //   context.fillStyle = "red"; //填充颜色
    //   // context.fill(); //填充
    //   context.stroke(); //画边框

      context.arc(290, 20, 50, 0.5 * Math.PI, 1 * Math.PI); // 弧度从1/2*Π 到 Π，及90°到180°
      context.strokeStyle = "#c33";
      // context.fill();
      context.stroke();
    },
  },
};
</script>
<style lang="scss" scoped>
.upand{
  margin: 20px 0;
}
.canvas {
  width: 100%;
  .canvas_box {
    width: 100%;
    border: 1px solid #ccc;
    min-height: 300px;
    box-sizing: border-box;
    .box {
      height: 200px;
      box-sizing: border-box;
      margin-bottom: 20px;
    }
  }
}
</style>