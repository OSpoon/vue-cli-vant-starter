<template>
  <div id="app">
    <transition name="van-fade">
      <router-view
        v-wechat-title="title + ' - ' + $route.meta.title"
        class="router-view"
      />
    </transition>
  </div>
</template>
<script>
import settings from '@/settings'
export default {
  data() {
    return {
      title: settings.title || 'vue-cli-vant-starter'
    }
  }
}
</script>
<style lang="less">
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 14px;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.router-view {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  position: absolute;
  background: #f7f8fa;
}
</style>
