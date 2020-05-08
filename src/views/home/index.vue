<template>
  <div>
    <van-nav-bar
      title="测试通用上传"
    />
    <van-field v-model="policyNo" input-align="right" placeholder="请输入订单号" required label="订单号" />
    <van-uploader :after-read="afterRead" />

    <van-field v-model="ﬁleStorageId" input-align="right" placeholder="请输入ﬁleStorageId" required label="ﬁleStorageId" />
    <van-button type="primary" block @click="down(ﬁleStorageId,'test')">下载</van-button>
  </div>
</template>

<script>
import { Dialog } from 'vant'

// 导入通用影像上传接口
import universalImageInterface from '@/utils/universal-image-http'

export default {
  name: 'Home',
  props: {},
  data() {
    return {
      policyNo: '',
      ﬁleStorageId: ''
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 执行上传
    upload(file) {
      const data = {
        file: file,
        policyNo: this.policyNo,
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
    down(ﬁleStorageId, storageType) {
      universalImageInterface.download(ﬁleStorageId, storageType, response => {
        console.log(response)
      }, error => {
        console.log(error)
      })
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      this.upload(file.file)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
