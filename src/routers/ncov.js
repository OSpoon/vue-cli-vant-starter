const ncov = () => import(/* webpackChunkName: "demo" */ '@/views/ncov/index.vue')

export default [
  {
    name: 'ncov',
    path: '/ncov',
    component: ncov,
    meta: {
      title: '2019nCoV',
      login: false
    }
  }
]
