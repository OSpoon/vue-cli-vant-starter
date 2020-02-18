const demo = () => import(/* webpackChunkName: "demo" */ '@/views/demo/Demo.vue')

export default [
  {
    name: 'demo',
    path: '/demo',
    component: demo,
    meta: {
      title: 'Demo',
      login: false
    }
  }
]
