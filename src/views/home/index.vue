<template>
  <div>
    <van-uploader :after-read="afterRead" />
  </div>
</template>

<script>
import { Dialog } from 'vant'

import universalImageInterface from '@/utils/universal-image-interface'

export default {
  name: 'Home',
  props: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    // 执行上传
    upload(file) {
      const data = {
        file: file,
        policyNo: 'test_140724001',
        storageType: 'test',
        saveDB: 'Y'
      }
      // 调用上传接口
      universalImageInterface.upload(data, response => {
        console.log(response)
        Dialog({ title: '提示', message: response })
      }, error => {
        console.log(error)
        Dialog({ title: '提示ERR', message: error })
      })
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file.file)
      this.upload(file.file)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
