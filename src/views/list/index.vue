<template>
  <div>
    <van-nav-bar
      title="视频列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="van-hairline--top" />
    <div class="list-index-content">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in list"
          :key="item"
          :title="item"
          @click="player(1)"
        />
      </van-list>
    </div>
    <van-popup
      v-model="showPlayer"
      overlay="false"
      position="top"
      class="list-index-player"
    >
      <van-notice-bar scrollable text="正在播放的视频是。" />
      <video-player
        class="video-player vjs-custom-skin"
        :playsinline="true"
        :options="playersOption"
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
    </van-popup>
  </div>
</template>

<script>
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import { Toast } from 'vant'
// 定义常量配置对象
const playersOptions = {
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
      src: ''
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
export default {
  name: 'List',
  components: {
    videoPlayer
  },
  props: {},
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      showPlayer: false,
      lives: [
        {
          id: 1,
          title: '视频001',
          src: 'http://vjs.zencdn.net/v/oceans.mp4'
        },
        {
          id: 2,
          title: '视频002',
          src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
        },
        {
          id: 3,
          title: '视频003',
          src: 'https://media.w3.org/2010/05/sintel/trailer.mp4'
        },
        {
          id: 4,
          title: '视频004',
          src:
            'http://mirror.aarnet.edu.au/pub/TED-talks/911Mothers_2010W-480p.mp4'
        },
        {
          id: 5,
          title: '视频005',
          src: 'https://media.w3.org/2010/05/sintel/trailer.mp4'
        },
        {
          id: 6,
          title: '视频006',
          src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
        }
      ],
      playersOption: {}
    }
  },
  created() {},
  mounted() {},
  methods: {
    player(index) {
      this.playersOption = playersOptions
      this.playersOption.sources[0].src = this.lives[index].src
      this.showPlayer = true
    },
    onClickLeft() {
      this.$router.go(-1)
      Toast('返回')
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
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
      this.showPlayer = false
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
.list-index-content {
  height: 100%;
  overflow-y: auto;
}
.list-index-player {
  width: 100%;
  height: 251px;
}
</style>
