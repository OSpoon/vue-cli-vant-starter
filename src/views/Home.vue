<template>
  <div class="home">
    <van-nav-bar
      title="Home"
    />
    <h3 @click="$router.push('/demo')">跳转到Demo页</h3>
  </div>
</template>

<script>
export default {
  name: 'Home',
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
