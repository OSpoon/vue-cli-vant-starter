# vue-cli-vant-starter #


vue-cli 和 vant 结合的项目开发模板，主要内容如下：
1. 安装`eruda`,在dev模式并开启debug时,方便移动端查看日志
2. vant 引入组件采用的是[自动按需引入插件](https://youzan.github.io/vant/#/zh-CN/quickstart)，均已经配置完善。
3. Rem 适配，使用以下两个工具:
    1. [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 是一款 postcss 插件，用于将单位转化为 rem
    2. [lib-flexible](https://github.com/amfe/lib-flexible) 用于设置 rem 基准值
    3. 设计图标准按照 375 * 667 的尺寸给出，布局的时候除了 1px 其他全部按照 测量的距离 写就可以了

## 模板说明 ##

1. 本模板暂时的技术栈为： vue + vue-cli + vue-router + vuex + vant + axios + less（如果你使用的是其他的css预编译器请自行配置）

## 开发工具请使用(VSCode) ##
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

## 如何配置Vuex ##
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

## 如何使用vuex ##
1. 设置内容
`this.$store.dispatch('apps/setSize', size)`
```js
async xxx() {
    await this.$store.dispatch('apps/setSize', size)
    ...
}
```
2. 获取内容`this.$store.getters.size`

## 新增一个请求 ##
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

## 如何使用新定义的接口 ##
1. 在需要使用的页面导入`import { models } from '@/api/function'`
2. 调用
```js
models('140724199403250073', '1234567890', '{222:333,444:555}').then(response => {
    console.log('response', response)
})
```

### 安装依赖及插件 ###

```
yarn install
```

### 启动项目 ###

```
npm run serve
```
### 预生产模式打包 ###

```
npm run build:stage
```

### 生产模式打包 ###

```
npm run build:prod
```

### 更多详细配置 ###

请看 [Configuration Reference](https://cli.vuejs.org/config/)。

如果你使用的是 `vue ui` ，会发现项目名称可能不是你需要的，这个时候只需要将 `package.json` 和 `package-lock.json` 文件中的 `name` 修改为你希望的名称，然后重启项目。

### 鸣谢 ###

1. [vue-cli-vant-starter](https://github.com/fxss5201/vue-cli-vant-starter)
2. [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)
