import Vue from 'vue'
import './plugins/axios'
import 'amfe-flexible'
import { Toast, Field, NavBar, Button, Divider } from 'vant'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from './utils'

// 注册全局utils
window.utils = utils

console.log(utils.DES3.encrypt('', JSON.stringify('1234567890').replace(/\s/g, '')))

window.globalConfig = {
  gwAuth: 'https://ewx.e-sleb.com/product/api/v1/weixin/authorization/index?shareType=gsbzf'
}

Vue.use(Toast)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Button)
Vue.use(Divider)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  Vue.prototype.$toast.clear()
  const CancelToken = Vue.axios.CancelToken
  store.state.source.cancel && store.state.source.cancel()
  store.commit('setSource', CancelToken.source())
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
