<template>
  <div class="login-index-content">
    <van-form class="login-index-form" @submit="onSubmit">
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
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <van-divider>©2020 Created by OSpoon</van-divider>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {},
  data() {
    return {
      username: '',
      password: ''
    }
  },
  created() {},
  mounted() {},
  methods: {
    onSubmit(values) {
      console.log('submit', values)
      this.$router.push({ path: '/list' })
    },
    gotoList() {
      this.$router.push({ path: '/list' })
    }
  }
}
</script>

<style lang="less" scoped>
.login-index-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .login-index-form {
    margin-top: 90px;
  }
}
</style>
