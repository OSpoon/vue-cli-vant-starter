import Vue from 'vue'
import 'amfe-flexible'
import { Toast, Field, NavBar, Button, Divider, DropdownMenu, DropdownItem } from 'vant'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from './utils'
import * as filters from './filters' // global filters

// 注册全局utils
window.utils = utils

window.globalConfig = {
  gwAuth: 'https://ewx.e-sleb.com/product/api/v1/weixin/authorization/index?shareType=gsbzf'
}

Vue.use(Toast)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Button)
Vue.use(Divider)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
