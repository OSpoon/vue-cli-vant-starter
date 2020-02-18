import Vue from 'vue'
import Router from 'vue-router'
const defaultSettings = require('@/settings')
const name = defaultSettings.title || 'vue-cli-vant-starter'

Vue.use(Router)
const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        title: name + ' - 首页'
      }
    }
  ]
})

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
