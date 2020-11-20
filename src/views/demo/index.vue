<template>
  <div class="demo">
    <video-player
      ref="videoPlayer"
      class="video-player vjs-custom-skin"
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
    />
  </div>
</template>

<script>
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
export default {
  name: 'Demo',
  components: {
    videoPlayer
  },
  props: {},
  data() {
    return {
      playerOptions: {
        // 播放速度
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        // 如果true,浏览器准备好时开始回放。
        autoplay: false,
        // 默认情况下将会消除任何音频。
        muted: false,
        // 导致视频一结束就重新开始。
        loop: false,
        // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        preload: 'auto',
        language: 'zh-CN',
        // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        aspectRatio: '16:9',
        // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        fluid: true,
        sources: [
          {
            // 类型
            type: 'video/mp4',
            // url地址
            src:
              'https://outin-929137402a5111eb98d100163e1c955c.oss-cn-shanghai.aliyuncs.com/sv/41e5516-175e180589a/41e5516-175e180589a.mp4?Expires=1605862768&OSSAccessKeyId=LTAIrkwb21KyGjJl&Signature=JG90jYVRonNyJ1aUdprXd%2FRek54%3D'
          }
        ],
        // 你的封面地址
        poster:
          'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3212249132,3285358493&fm=26&gp=0.jpg',
        // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true // 是否显示全屏按钮
        }
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 播放回调
    onPlayerPlay(player) {
      console.log('player play!', player)
    },

    // 暂停回调
    onPlayerPause(player) {
      console.log('player pause!', player)
    },

    // 视频播完回调
    onPlayerEnded($event) {
      console.log('视频播完回调')
    },

    // DOM元素上的readyState更改导致播放停止
    onPlayerWaiting($event) {
      console.log('播放停止')
    },

    // 已开始播放回调
    onPlayerPlaying($event) {
      console.log('已开始播放回调')
    },

    // 当播放器在当前播放位置下载数据时触发
    onPlayerLoadeddata($event) {
      console.log('当播放器在当前播放位置下载数据时触发')
    },

    // 当前播放位置发生变化时触发。
    onPlayerTimeupdate($event) {
      // console.log('当前播放位置发生变化时触发。')
    },

    // 媒体的readyState为HAVE_FUTURE_DATA或更高
    onPlayerCanplay(player) {
      // console.log('player Canplay!', player)
    },

    // 媒体的readyState为HAVE_ENOUGH_DATA或更高。这意味着可以在不缓冲的情况下播放整个媒体文件。
    onPlayerCanplaythrough(player) {
      // console.log('player Canplaythrough!', player)
    },

    // 播放状态改变回调
    playerStateChanged(playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },

    // 将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数。。
    playerReadied(player) {
      console.log('example player 1 readied', player)
    }
  }
}
</script>

<style lang="less" scoped>
.demo {
  overflow-y: auto;
  height: 100%;
}
</style>
