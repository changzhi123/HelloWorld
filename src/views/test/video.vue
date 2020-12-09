<template>
  <div class="container">
    <div class="player">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
      ></video-player>
    </div>
    <el-button @clici="res">默认按钮</el-button>
    <el-image 
    style=" height: 100px"  fit='contain '
    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" 
    :preview-src-list="['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg']">
  </el-image>
  </div>
</template>
<script>
require("video.js/dist/video-js.css");
require("vue-video-player/src/custom-theme.css");
import { videoPlayer } from "vue-video-player";
export default {
  components: {
    videoPlayer
  }, //组件
  data() {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" //你的视频地址（必填）
          }
        ],
        // sources: [{
        //             type: "application/x-mpegURL",
        //             src: "rtmp://119.147.171.97:1935/live/blive1-1" //你的m3u8地址（必填）
        //         }],
        poster: "http://localhost/547be638615da10.png", //"poster.jpg", //你的封面地址
        width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false, //是否显示剩余时间
          fullscreenToggle: true ,//全屏按钮
        }
      }
    }; //数据
  },
  mounted() {
    // this.playerOptions.sources[0].src =
    // "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm";
    // this.playerOptions.poster = "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg";
  }, //挂载
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  }, //计算
  methods: {
    res() {
       var wsShell = new ActiveXObject("WScript.Shell");

      wsShell.SendKeys("^(p)");
      this.playerOptions.sources[0].src =
        "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4";
      this.playerOptions.poster = "poster.jpg";
    },
    onPlayerPlay(player) {
    //   alert("play");
      console.log(player);
      // 播放回调
    },
    onPlayerPause(player) {
    //   alert("pause");
      console.log(player);
      // 视频播完回调
    },
  } //方法
};
</script>
<style  lang="scss">
.container {
  background-color: #efefef;
  width: 800px;
  margin: 20px auto;
  min-height: 400px;
}
.video-js {
  .vjs-big-play-button {
    //   播放按钮换成圆形
    height: 2em;
    width: 2em;
    line-height: 2em;
    border-radius: 50%;
  }
}
</style>