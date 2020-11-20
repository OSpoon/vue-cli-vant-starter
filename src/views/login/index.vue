<template>
  <div class="login-index-content">
    <!-- 登录组件 -->
    <van-form class="login-index-form" @submit="onSubmit">
      <van-field
        v-model="phone"
        type="tel"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="teacherId"
        type="number"
        name="老师ID"
        label="老师ID"
        placeholder="老师ID"
        :rules="[{ required: true, message: '请填写老师ID' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          登录
        </van-button>
      </div>
      <van-divider
        @click="showRegister = !showRegister"
      >点我注册账号</van-divider>
    </van-form>
    <!-- 底部标识 -->
    <van-divider>©2020 Created by OSpoon</van-divider>
    <!-- 注册组件 -->
    <van-popup
      v-model="showRegister"
      closeable
      round
      class="login-index-register"
    >
      <van-form @submit="onRegister">
        <van-field
          v-model="username"
          type="text"
          name="姓名"
          label="姓名"
          placeholder="请输入姓名"
          required
        />
        <van-field
          v-model="phone"
          type="tel"
          name="手机号"
          label="手机号"
          placeholder="请输入手机号"
          required
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          required
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit">
            注册账号
          </van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { login } from '@/api/user'
export default {
  name: 'Login',
  props: {},
  data() {
    return {
      username: '',
      phone: '',
      password: '',
      teacherId: '',
      showRegister: false
    }
  },
  created() {},
  mounted() {},
  methods: {
    onSubmit(values) {
      console.log('submit', values)
      login({
        phone: this.phone,
        password: this.password,
        teacherId: this.teacherId
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$router.push({ path: '/list' })
        } else {
          Toast(res.message)
        }
      })
    },
    onRegister(values) {
      console.log('submit', values)
      this.showRegister = false
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
    padding: 10px;
    border-radius: 8px;
  }
  .login-index-register {
    width: 80%;
    height: 255px;
    padding: 0px 10px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
}
</style>
