<template>
  <div class="home">
    <van-nav-bar
      title="Home"
    />
    <h3><a href="#/demo">跳转到Demo页</a></h3>
  </div>
</template>

<script>
export default {
  name: 'Home',
  created() {
    // this.$toast.loading({
    //   duration: 0,
    //   mask: true,
    //   forbidClick: true,
    //   message: '加载中...',
    //   loadingType: 'spinner'
    // })

    // setTimeout(() => {
    //   this.$toast.clear()
    // }, 3000)
  }
}
</script>
