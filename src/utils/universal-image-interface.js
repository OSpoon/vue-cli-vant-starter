import axios from 'axios'
import md5 from 'js-md5'
import { format } from 'date-fns'

// 通用常量配置
const baseUrl = 'https://nephele-st.sunlife-everbright.com:9800'
const securityupload = '/securityupload/file'
//
const appId = 'guangshubao'
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cGxvYWRmaWxlIiwicm9sZSI6Imludm9rZSIsImlzcyI6Imd1YW5nc2h1YmFvIiwiZXhwIjoxOTAzMjQ0MTkzfQ.Zon4XTdtfLsAKKR_AaqnuMy8C8s3zuWoZcM_PZv3Bqw'
const salt = '[B@3bfdc050'

// 创建一个AXIOS实例
const service = axios.create({
  baseURL: baseUrl, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000 * 60 * 5 // 请求超时
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    console.log(config)
    config.headers['Content-Type'] = 'multipart/form-data'
    config.headers['Signature'] = config.sign
    config.headers['Authorization'] = 'Bearer ' + token
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    return Promise.reject(response.data)
  },
  error => {
    console.log(error.message)
    if (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            error.message = '错误请求'
            break
          case 401:
            error.message = '未授权，请重新登录'
            break
          case 403:
            error.message = '拒绝访问'
            break
          case 404:
            error.message = '请求错误,未找到该资源'
            break
          case 405:
            error.message = '请求方法未允许'
            break
          case 408:
            error.message = '请求超时'
            break
          case 500:
            error.message = '服务器端出错'
            break
          case 501:
            error.message = '网络未实现'
            break
          case 502:
            error.message = '网络错误'
            break
          case 503:
            error.message = '服务不可用'
            break
          case 504:
            error.message = '网络超时'
            break
          case 505:
            error.message = 'http版本不支持该请求'
            break
          default:
            error.message = `连接错误${error.response.status}`
        }
        const errData = {
          code: error.response.status,
          message: error.message
        }
        console.log('统一错误处理: ', errData)
        return Promise.reject(errData.message || 'Error')
      } else if (error.request) {
        return Promise.reject('网络出错，请稍后重试')
      }
    }
    return Promise.reject(error)
  }
)

export default {
  upload(params, successCallback, errorCallback) {
    console.log('>>>构造sign明文开始')
    const startDateTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    const signStr = appId + '|' + params.policyNo + '|' + params.saveDB + '|' + startDateTime + '|' + params.storageType + '|' + salt
    console.log(signStr)
    console.log('>>>构造sign密文开始')
    const sign = md5(signStr)
    console.log(sign)
    // 构造请求体
    const formData = new FormData()
    formData.append('file', params.file)
    formData.append('policyNo', params.policyNo)
    formData.append('storageType', params.storageType)
    formData.append('appId', params.appId)
    formData.append('startDateTime', startDateTime)
    formData.append('saveDB', params.saveDB)
    console.log('>>>发送数据')
    service({
      method: 'post',
      url: securityupload,
      data: formData,
      sign
    }).then(
      (response) => {
        successCallback && successCallback(response)
      })
      .catch((error) => {
        errorCallback && errorCallback(error)
      })
  }
}
