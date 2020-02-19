import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页'
    }
  }
]

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// 添加新增模块的路由配置
function callback() {
  require([
    './demo'
  ],
  (
    demo,
  ) => {
    router.addRoutes([
      ...demo.default
    ])
  }).catch(err => {
    console.log(err.message)
  })
}

// https://router.vuejs.org/zh/api/#router-addroutes
router.onReady(callback)

export default router
