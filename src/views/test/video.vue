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
        @ended="onPlayerEnded($event)"
        @waiting="onPlayerWaiting($event)"
        @playing="onPlayerPlaying($event)"
        @loadeddata="onPlayerLoadeddata($event)"
        @timeupdate="onPlayerTimeupdate($event)"
        @canplay="onPlayerCanplay($event)"
        @canplaythrough="onPlayerCanplaythrough($event)"
        @statechanged="playerStateChanged($event)"
        @ready="playerReadied"
      ></video-player>
    </div>
    <el-button @clici="res">默认按钮</el-button>
    <el-image
      style="height: 100px"
      fit="contain "
      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      :preview-src-list="[
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      ]"
    >
    </el-image>
  </div>
</template>
<script>
require("video.js/dist/video-js.css");
require("vue-video-player/src/custom-theme.css");
import { videoPlayer } from "vue-video-player";
export default {
  components: {
    videoPlayer,
  }, //组件
  data() {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。

        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        techOrder: ['flash', 'html5'],      // 兼容顺序
       flash: {
          hls: { withCredentials: false },
          // swf: "./static/media/video-js.swf", // 引入静态文件swf
        },
        html5: { hls: { withCredentials: false } },

        sources: [
          {
            type: "video/mp4", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4", //你的视频地址（必填）
          },
        ],
        // sources: [{
        //             type: "application/x-mpegURL",
        //             src: "rtmp://119.147.171.97:1935/live/blive1-1" //你的m3u8地址（必填）
        // }],
        poster: "http://localhost/547be638615da10.png", //"poster.jpg", //你的封面地址
        width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: true, //是否显示剩余时间
          fullscreenToggle: true, //是否显示全屏按钮
        },
      },
    }; //数据
  },
  mounted() {},
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
      //       this.$refs.videoPlayer.player.play() // 播放
      // this.$refs.videoPlayer.player.pause() // 暂停
      // this.$refs.videoPlayer.player.src(src) // 重置进度条
    },
  }, //计算
  methods: {
    res() {
      // var wsShell = new ActiveXObject("WScript.Shell");

      // wsShell.SendKeys("^(p)");
      this.playerOptions.sources[0].src =
        "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4";
      this.playerOptions.poster = "poster.jpg";
    },
    // 播放回调
    onPlayerPlay(player) {
      console.log("播放回调", player);
    },

    // 暂停回调
    onPlayerPause(player) {
      console.log("暂停回调", player);
    },

    // 视频播完回调
    onPlayerEnded($event) {
      console.log($event, "视频播完回调");
    },

    // DOM元素上的readyState更改导致播放停止
    onPlayerWaiting($event) {
      console.log($event, "DOM元素上的readyState更改导致播放停止");
    },

    // 已开始播放回调
    onPlayerPlaying($event) {
      console.log($event, "已开始播放回调");
    },

    // 当播放器在当前播放位置下载数据时触发
    onPlayerLoadeddata($event) {
      console.log($event, "当播放器在当前播放位置下载数据时触发");
    },

    // 当前播放位置发生变化时触发。
    onPlayerTimeupdate($event) {
      console.log($event, "当前播放位置发生变化时触发。");
    },

    //媒体的readyState为HAVE_FUTURE_DATA或更高
    onPlayerCanplay(player) {
      console.log("媒体的readyState为HAVE_FUTURE_DATA或更高", player);
    },

    //媒体的readyState为HAVE_ENOUGH_DATA或更高。这意味着可以在不缓冲的情况下播放整个媒体文件。
    onPlayerCanplaythrough(player) {
      console.log(
        "媒体的readyState为HAVE_ENOUGH_DATA或更高。这意味着可以在不缓冲的情况下播放整个媒体文件。",
        player
      );
    },

    //播放状态改变回调
    playerStateChanged(playerCurrentState) {
      console.log("播放状态改变回调", playerCurrentState);
    },

    //将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数。。
    playerReadied(player) {
      console.log("将侦听器绑定到组件的就绪状态。", player);
    },
  }, //方法
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