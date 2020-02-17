import Vue from 'vue'
import axios from 'axios'
import { Dialog } from 'vant'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建一个AXIOS实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000 // 请求超时
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (config.showLoading) {
      Vue.prototype.$toast.loading({
        duration: 0,
        mask: true,
        forbidClick: true,
        message: '加载中...',
        loadingType: 'spinner'
      })
    }
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-AUTH-TOKEN'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-AUTH-TOKEN'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    Vue.prototype.$toast('网络出错，请重试')
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.config.showLoading) {
      Vue.prototype.$toast.clear()
    }
    const res = response.data
    return res
  },
  error => {
    console.info(error) // for debug
    if (error.config.showLoading) {
      Vue.prototype.$toast.clear()
    }
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status >= 400 && error.response.status < 500) {
        Dialog({ title: '提示', message: '业务执行错误: ' + error.response.data.message || 'Error' })
      } else if (error.response.status >= 500) {
        Dialog({ title: '提示', message: '系统运行异常: ' + error.response.data.error || 'Error' })
      } else {
        Dialog({ title: '提示', message: '其他异常: ' + error.response.data.error || 'Error' })
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      Dialog({ title: '提示', message: '网络异常: ' + error.message || 'Error' })
    } else {
      // Something happened in setting up the request that triggered an Error
      Dialog({ title: '提示', message: '未知错误: ' + error.message || 'Error' })
    }
    return Promise.reject(error)
  }
)

export default service
