<template>
  <div class="demo">
    <van-nav-bar
      title="Demo"
      left-text="返回"
      @click-left="$router.go(-1)"
    />
    <van-dropdown-menu>
      <van-dropdown-item v-model="currentFun" :options="functions" @change="dropdown(currentFun)" />
    </van-dropdown-menu>
  </div>
</template>

<script>
// @ is an alias to /src
import { models } from '@/api/function'

export default {
  name: 'Demo',
  data() {
    return {
      currentFun: 0,
      functions: [
        { text: 'GET请求', value: 0 },
        { text: 'POST请求', value: 1 },
        { text: 'PUT请求', value: 2 },
        { text: 'DELETE请求', value: 3 },
        { text: 'DES加密', value: 4 }
      ]
    }
  },
  created() {
  },
  methods: {
    dropdown(value) {
      if (value === 0) {
        models('140724199403250073', '1234567890', '{222:333,444:555}').then(response => {
          console.log('response', response)
        })
      } else if (value === 1) {
        models().then(response => {
          console.log('response', response)
        }).catch(err => {
          console.log('err', err)
        })
        models().then(response => {
          console.log('response', response)
        }).catch(err => {
          console.log('err', err)
        })
        models().then(response => {
          console.log('response', response)
        }).catch(err => {
          console.log('err', err)
        })
        models().then(response => {
          console.log('response', response)
        }).catch(err => {
          console.log('err', err)
        })
        models().then(response => {
          console.log('response', response)
        }).catch(err => {
          console.log('err', err)
        })
        models().then(response => {
          console.log('response', response)
        }).catch(err => {
          console.log('err', err)
        })
      } else if (value === 2) {
        models().then(response => {
          console.log('response', response)
        })
      } else if (value === 3) {
        models().then(response => {
          console.log('response', response)
        })
      } else if (value === 4) {
        console.log(window.utils.DES3.encrypt('', JSON.stringify('1234567890').replace(/\s/g, '')))
      }
    }
  }
}
</script>
