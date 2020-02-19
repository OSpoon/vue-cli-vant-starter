<template>
  <div>
    <van-nav-bar
      title="疫情地图"
    />
    <div id="chinamap" ref="chinamap" style="width:100%;height:400px" />
  </div>
</template>

<script>
import { EleResize } from '@/js/esresize.js'
import jsonp from 'jsonp'
import echarts from 'echarts'
import 'echarts/map/js/china'

const option = {
  title: {
    text: '2019nCov疫情图',
    link: 'http://n22.online'
  },
  series: [{
    name: '确诊人数',
    type: 'map', // 显示类型为地图
    map: 'china', // 显示地图类型为中国地图
    label: {
      show: true, // 显示对应地区的名称
      color: '#333', // 显示地区名称颜色
      fontSize: 8 // 显示地区名称字体大小
    },
    itemStyle: {
      areaColor: '#eee' // 显示地图板块颜色
    },
    zoom: 1.2, // 地图缩放大小
    emphasis: {// 控制鼠标滑过时的背景颜色
      label: {
        color: '#ff0',
        fontSize: 12
      },
      itemStyle: {
        areaColor: '#83b5e7'
      }
    },
    data: []
  }],
  visualMap: [{
    type: 'piecewise',
    show: true,
    pieces: [// 分段
      { min: 10000 },
      { min: 1000, max: 9999 },
      { min: 100, max: 999 },
      { min: 10, max: 99 },
      { min: 1, max: 9 }
    ],
    inRange: {
      symbol: 'rect',
      color: ['#ffc0b1', 'red']
    },
    itemWidth: 20,
    itemHeight: 10
  }],
  tooltip: {
    trigger: 'item'
  }
}

export default {
  name: 'Home',
  props: {},
  data() {
    return {}
  },
  created() {},
  mounted() {
    this.getData()
  },
  methods: {
    initEcharts(dom, option) {
      const chart = echarts.init(dom)
      chart.setOption(option)
      EleResize.on(dom, () => {
        chart.resize()
      })
    },
    getData() {
      jsonp('https://interface.sina.cn/news/wap/fymap2020_data.d.json?_1580892522427', {}, (err, data) => {
        if (!err) {
          console.log(data)
          const list = data.data.list.map(item => ({ name: item.name, value: item.value }))
          option.series[0].data = list
          this.initEcharts(this.$refs.chinamap, option)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
