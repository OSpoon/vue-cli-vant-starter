<template>
  <div class="login-index-content">
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
    </van-form>
    <van-divider>©2020 Created by OSpoon</van-divider>
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
      phone: '',
      password: '',
      teacherId: ''
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
}
</style>
