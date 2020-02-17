import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import(/* webpackChunkName: "home" */ './views/Home.vue')
const Demo = () => import(/* webpackChunkName: "about" */ './views/Demo.vue')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/demo',
      name: 'demo',
      component: Demo
    }
  ]
})

export default router
