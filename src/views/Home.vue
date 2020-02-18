<template>
  <div class="home">
    <van-nav-bar title="Home">
      <van-icon slot="right" name="more-o" size="18" @click="show=!show" />
    </van-nav-bar>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" class="sw_img">
      </van-swipe-item>
    </van-swipe>
    <van-notice-bar text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。" left-icon="volume-o" />
    <van-tabs v-model="active">
      <van-tab title="标签 1">
        <h3 @click="$router.push('/demo')">跳转到Demo页</h3>
      </van-tab>
      <van-tab title="标签 2">
        <van-cell-group>
          <van-form @submit="onSubmit">
            <van-field
              v-model="username"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
              v-model="password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
              <van-button round block type="info" native-type="submit">
                提交
              </van-button>
            </div>
          </van-form>
        </van-cell-group>
      </van-tab>
      <van-tab title="标签 3">
        <van-cell-group>
          <!-- 输入任意文本 -->
          <van-field v-model="text" label="文本" />
          <!-- 输入手机号，调起手机号键盘 -->
          <van-field v-model="tel" type="tel" label="手机号" />
          <!-- 允许输入整数，调起数字键盘 -->
          <van-field v-model="digit" type="digit" label="整数" />
          <!-- 允许输入数字，调起全键盘 -->
          <van-field v-model="number" type="number" label="数字" />
          <!-- 输入密码 -->
          <van-field v-model="password" type="password" label="密码" />
        </van-cell-group>
      </van-tab>
      <van-tab title="标签 4">
        <van-search v-model="value" placeholder="请输入搜索关键词" />
      </van-tab>
    </van-tabs>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      value: '',
      tel: '',
      text: '',
      digit: '',
      number: '',
      username: '',
      password: '',
      active: 0,
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ],
      show: false,
      actions: [
        { name: '选项' },
        { name: '选项' },
        { name: '选项', subname: '描述信息' }
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
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      console.log(item)
      this.show = false
    }
  }
}
</script>
<style scoped>
.sw_img{
  height: 150px;
}
</style>
