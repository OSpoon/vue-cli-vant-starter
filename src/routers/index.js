import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
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
