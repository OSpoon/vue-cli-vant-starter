/**
 * 通用影像上载接口(互联网安全版)
 * 使用:
 *  1. 导入接口
 *    import universalImageInterface from '@/utils/universal-image-http'
 *  2. 调用接口
      节点描述:
        policyNo: 上传影像的唯一号，建议各个系统的前缀 + 各系统的唯一号;，长度最大36位
        storageType: 指分布式存储的bucket，必须指定：
                        group：团险使用
                        individual-image：个险影像
                        individual-pdf：个险pdf
                        gms：团险销管
                        individual-imagecms：应该使用
                        test：所有测试环境
        saveDB: 上载后获得的信息是否保存到数据库：Y:保存到数据库 N:不保存到数据库，根据需要设置

    upload(file) {
      const data = {
        file: file,
        policyNo: '',
        storageType: 'test',
        saveDB: 'Y'
      }
      // 调用上传接口
      universalImageInterface.upload(data, response => {
        console.log(response)
        Dialog({ title: '提示', message: response.code + '\n' + response.fileName + '\n' + response.fileStorageId + '\n' + response.message })
      }, error => {
        console.log(error)
        Dialog({ title: '提示ERR', message: error.code + '\n' + error.message })
      })
    },

   注意: 1.上传超时时间为5分钟
         2.文件最大为2M
         3.文件类型支持JPG\GIF\PDF
         4.接入外网客户端时需要先申请appId，会线下邮件发送appId, token和privateKey
 */
import axios from 'axios'
import rs from 'jsrsasign'

// ===============常量配置=↓=↓=↓=↓=↓=↓=↓=↓=↓=↓================
// 通用影像地址
const baseUrl = 'https://nephele-st.sunlife-everbright.com:9800'

// 加密上载接口
const securityupload = '/securityupload/file'
// 未加密下载接口
const unsafedownload = '/security/download'
// 通用影像alg
const algName = 'MD5withRSA'
const bearer = 'Bearer '

// 通用影像APP_ID: 使用前需申请
const appId = 'guangshubao'
// 通用影像token: 使用前需申请 替换时注意'Bearer '保留,注意空格
const token = bearer + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cGxvYWRmaWxlIiwicm9sZSI6Imludm9rZSIsImlzcyI6Imd1YW5nc2h1YmFvIiwiZXhwIjoxOTAzMjQ0MTkzfQ.Zon4XTdtfLsAKKR_AaqnuMy8C8s3zuWoZcM_PZv3Bqw'
// 通用影像公钥: 使用前需申请
const privateKey = '-----BEGIN PRIVATE KEY-----\n' +
  'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAJhHwsOmfuLbWH47\n' +
  'fMXDGbaF5oAwPoeMlC9yJr/5dJBNXPPtPkA//0n7JfY7XX/qNHlp98BQIkxUzIZB\n' +
  'RLIsrg8gdb+K1InBL5/3p/5vsuGRBAgCxFvswXCfl5043RaEnvaxCrk6H3jdbwx3\n' +
  'L2UpxrxXrpPZQ0Bgo6X61e8Bu2RPAgMBAAECgYA9Yl/+YjUv2V+Ysv4e8gCBdQRv\n' +
  'lAMAvQhW/9ri8/mq2aSop2+6kpGkDttEoLWWBKDWeILoQOUyg9RWIiVA9YXL6+d+\n' +
  'w/O3YnC0+oLM4tW9neHJvMn/L7MMHmwxQb+Bcz9Il9pavjB4r+1Il+lxy9egE5V5\n' +
  'kNrJ1G29c/P3NvQKYQJBAPfZf5sOhGFexL73XWbjdsAEoZi1UbVhn/aYwlBv43rY\n' +
  '3S6zAfniOrK3BkuMyEKhVP/8qZx2fYshx8KFEtdSz5cCQQCdSbhauyejTHPuBKZ7\n' +
  '4wupIyRNEVixGjOGvyxTsQUyCjR+2E0Y8Vbkj5dDKbz3LfiDCN17VogyDe8Gqwb4\n' +
  'AagJAkEApb4K+XQBzuODCnl9OnrORKZUMjy+wV7hjBSnjQblxpcTglEu9x30RuLi\n' +
  'EM+6c+RTZURfYERUvCAA5/H5oYi9TQJAeccbEjx3KwrFc1JsZ9zZKWII+BZnGe/U\n' +
  'Vw5qzn1vLVgTXuYvgxFQGnRGQ/zrzmDsWN+jQ5wypLZ/CyWdpqT5qQJAbfsqqA+w\n' +
  '8Gtb7enp4kJ72BLcdtS+EYV+u/5+8oebj8uG4vYwhaHIYYfccRL8XDmTYmhMIqzV\n' +
  'EbOloBoMrfiNow==\n' + '-----END PRIVATE KEY-----'
// ===============常量配置=↑=↑=↑=↑=↑=↑=↑=↑=↑=↑================

const service = axios.create({
  baseURL: baseUrl,
  timeout: 1000 * 60 * 5 // 请求超时
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    console.log(config)
    if (config.method === 'post') {
      config.headers['Content-Type'] = 'multipart/form-data'
      config.headers['Signature'] = config.signhex
      config.headers['Authorization'] = token
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.code === 200) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response.data)
    }
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

const util = {
  // 获取当前时间
  getCurrentDate: (format) => {
    const now = new Date()
    const year = now.getFullYear() // 得到年份
    let month = now.getMonth() // 得到月份
    let date = now.getDate() // 得到日期
    // const day = now.getDay() // 得到周几
    let hour = now.getHours() // 得到小时
    let minu = now.getMinutes() // 得到分钟
    let sec = now.getSeconds() // 得到秒
    month = month + 1
    if (month < 10) month = '0' + month
    if (date < 10) date = '0' + date
    if (hour < 10) hour = '0' + hour
    if (minu < 10) minu = '0' + minu
    if (sec < 10) sec = '0' + sec
    let time = ''
    if (format === 1) { // 精确到天
      time = year + '-' + month + '-' + date
    } else if (format === 2) { // 精确到分
      time = year + '-' + month + '-' + date + ' ' + hour + ':' + minu + ':' + sec
    }
    return time
  }
}

export default {
  upload(params, successCallback, errorCallback) {
    console.log(params.file)
    if (params.file.size / 1024 > 2000) {
      errorCallback && errorCallback({ code: 'T403', message: '禁止上传大于2M以上的文件' })
    } else {
      const startDateTime = util.getCurrentDate(2)
      let sign_pre = appId + '|' + params.policyNo + '|' + params.saveDB + '|' + startDateTime + '|' + params.storageType + '|'
      const reader = new FileReader()
      reader.readAsDataURL(params.file)
      reader.onload = () => {
        const binary = reader.result
        console.log(reader)
        sign_pre = sign_pre + binary.substring(binary.indexOf(',') + 1)
        console.log('sign_pre ', sign_pre)
        const signature = new rs.KJUR.crypto.Signature({ alg: algName, prvkeypem: privateKey })
        signature.updateString(sign_pre)
        const sign = signature.sign()
        console.log('sign ', sign)
        const signhex = rs.hextob64(sign)
        console.log('signhex is : ' + signhex)
        const formData = new FormData()
        formData.append('file', params.file)
        formData.append('policyNo', params.policyNo)
        formData.append('storageType', params.storageType)
        formData.append('appId', appId)
        formData.append('startDateTime', startDateTime)
        formData.append('saveDB', params.saveDB)
        console.log('>>> 发送影像上载数据')
        service({
          method: 'post',
          url: securityupload,
          data: formData,
          signhex
        }).then(
          (response) => {
            successCallback && successCallback(response)
          })
          .catch((error) => {
            errorCallback && errorCallback(error)
          })
      }
    }
  },
  download(ﬁleStorageId, storageType, successCallback, errorCallback) {
    service({
      method: 'get',
      url: `${unsafedownload}/${ﬁleStorageId}/${storageType}`
    }).then(
      (response) => {
        successCallback && successCallback(response)
      })
      .catch((error) => {
        errorCallback && errorCallback(error)
      })
  }
}
