<template>
  <div class="home">
    <van-nav-bar
      title="Home"
    />
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image">
      </van-swipe-item>
    </van-swipe>
    <van-notice-bar text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。" left-icon="volume-o" />
    <van-tabs v-model="active">
      <van-tab title="标签 1"><h3 @click="$router.push('/demo')">跳转到Demo页</h3></van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      active: 0,
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ]
    }
  },
  created() {
    this.$toast.loading({
      duration: 0,
      mask: true,
      forbidClick: true,
      message: '加载中...',
      loadingType: 'spinner'
    })

    setTimeout(() => {
      this.$toast.clear()
    }, 1000)
  }
}
</script>
<style scoped>
img{
  height: 150px;
}
</style>
