# vue-cli-vant-starter #

# 开发工具请使用(VSCode)
1. 插件: eslint
2.  文件>首选项>设置,打开VSCode配置文件,添加如下配置
```json
{
    "files.autoSave": "off",
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "vue-html",
        {
        "language": "vue",
        "autoFix": true
        }
    ],
    "eslint.run": "onSave",
    "eslint.autoFixOnSave": true
}
```

# 如何配置Vuex
1. 在src/store/modules目录下创建模块命名的js文件
2. 配置样例
```js
import Cookies from 'js-cookie'

const state = {
  size: Cookies.get('size') || 'medium'
}

const mutations = {
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  }
}

const actions = {
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
```
3. 配置getters.js `size: state => state.apps.size`

# 如何使用vuex
1. 设置内容
`this.$store.dispatch('apps/setSize', size)`
```js
async xxx() {
    await this.$store.dispatch('apps/setSize', size)
    ...
}
```
2. 获取内容`this.$store.getters.size`

# 新增一个请求
1. 在src/api目录新建模块命名的js文件
2. 导入`import request from '@/utils/request'`
3. 编写接口
```js
export function models(id, token, data) {
  return request({
    url: '/function/models', //请求路径
    method: 'post', //请求方式
    params: { id: id, token: token }, // path params
    data, // FormData
    showLoading: true //是否展示loading
  })
}
```

# 如何使用新定义的接口
1. 在需要使用的页面导入`import { models } from '@/api/function'`
2. 调用
```js
models('140724199403250073', '1234567890', '{222:333,444:555}').then(response => {
    console.log('response', response)
})
```


vue-cli 和 vant 结合的项目开发模板，主要内容如下（后续新增的内容会在其后使用方括号标识添加时间）：

1. 将 `axios` 或者 `$axios` 添加到 `Vue.prototype` ，对 `axios` 的封装是基于 [vue-cli-plugin-axios](https://www.npmjs.com/package/vue-cli-plugin-axios) 插件。
2. 对 `axios` 的拦截器进行配置，调用 `axios` 发送请求的时候自动添加 `loading` 效果，请求返回的时候，判断请求内容的正确，错误的话直接提示错误信息。
3. 并发请求时，只有当最后一个请求完成的时候才会关闭 `loading` 效果。
4. 添加在路由切换的时候取消上个页面未完成的 `axios` 请求。
5. 添加本地代理 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) 及相应的配置说明。
6. 增加自定义参数：
    1. `showLoading`: 是否需要 `loading` 加载，至于样式仍是有你自由控制。
    2. 关于在短时间内发送多条相同请求处理逻辑的相关字段：
        1. 本插件默认是按照仅保留最初的发送请求链接。
        2. `needLast`: 需要最新的发送请求链接，以前发送的可以直接 `cancel` ，这种情况一般适用于搜索框发送请求。
        3. `needAll`: 所有的发送请求链接都需要

7. vant 引入组件采用的是[自动按需引入插件](https://youzan.github.io/vant/#/zh-CN/quickstart)，均已经配置完善。
8. Rem 适配，使用以下两个工具:
    1. [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 是一款 postcss 插件，用于将单位转化为 rem
    2. [lib-flexible](https://github.com/amfe/lib-flexible) 用于设置 rem 基准值
    3. 设计图标准按照 375 * 667 的尺寸给出，布局的时候除了 1px 其他全部按照 测量的距离 写就可以了

## 模板说明 ##

1. 本模板暂时的技术栈为： vue + vue-cli + vue-router + vuex + vant + axios + less（如果你使用的是其他的css预编译器请自行配置）

## 项目使用 ##

1. 先将本项目 Fork 到你的 github ，方便日后你对其进行修改。
2. 将你 github 上的远程库克隆到本地。

或者是将本项目克隆到本地，去除远程库，再添加你自己的远程库：

```
git remote rm origin
git remote add origin <远程库地址>
```

### 安装依赖及插件 ###

```
npm install
```

### 启动开发模式（热更新） ###

```
npm run serve
```

### 生产模式打包 ###

```
npm run build
```

### 更多详细配置 ###

请看 [Configuration Reference](https://cli.vuejs.org/config/)。

如果你使用的是 `vue ui` ，会发现项目名称可能不是你需要的，这个时候只需要将 `package.json` 和 `package-lock.json` 文件中的 `name` 修改为你希望的名称，然后重启项目。
