<template>
  <div>
    <van-nav-bar
      title="视频列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="van-hairline--top" />
    <div class="list-index-content">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="item in list" :key="item" :title="item" />
      </van-list>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'List',
  props: {},
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  created() {},
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1)
      Toast('返回')
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.list-index-content {
  height: 100%;
  overflow-y: auto;
}
</style>
