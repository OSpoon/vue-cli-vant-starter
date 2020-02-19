# vue-cli-vant-starter #

vue-cli 和 vant 结合的项目开发模板，主要内容如下：
1. 安装`eruda`,在dev模式并开启debug时,方便移动端查看日志
2. vant 引入组件采用的是[自动按需引入插件](https://youzan.github.io/vant/#/zh-CN/quickstart)，均已经配置完善。
3. Rem 适配，使用以下两个工具:
    1. [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 是一款 postcss 插件，用于将单位转化为 rem
    2. [lib-flexible](https://github.com/amfe/lib-flexible) 用于设置 rem 基准值
    3. 设计图标准按照 375 * 667 的尺寸给出，布局的时候除了 1px 其他全部按照 测量的距离 写就可以了
4. 使用`plop`构建初始页面/组件/store/apis,执行命令`npm run new`
    1. 新增页面 执行`yarn new`,选择view
    2. 新增组件 执行`yarn new`,选择component
    2. 新增store 执行`yarn new`,选择store
    2. 新增API 执行`yarn new`,选择apis
5. 增加`axios`重复发送同一请求屏蔽操作

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


## 新增请求 ##
1. 目录`src/api/xxx.js`
2. 创建api接口
    1. 命令执行`yarn new`
    2. 输入api接口名称
    3. 选择apis,确定即可
3. 调用
    1. 导入`import { xxx } from '@/api/xxx'`
    2. ```js
        xxxGet({id:xxx}).then(response => {
            console.log('response', response)
        }).catch(err => {
          console.log('err', err)
        })
       ```
注意: 默认生成增,删,改,查4个API,具体请按实际接口调整


## 新增View ##
1. 目录`src/view/xxx/xxx.vue`
2. 创建View
    1. 命令执行`yarn new`
    2. 输入view名称
    3. 选择view,确定即可
4. 添加路由
    1. 目录`src/routers`
    2. 新建新模块的路由文件(已有模块路由文件打开后做相应配置)
        ```js
        const user = () => import(/* webpackChunkName: "demo" */ '@/views/user/index.vue')

        export default [
          {
            name: 'user',
            path: '/user',
            component: user,
            meta: {
              title: '用户页面'
            }
          }
        ]
        ```
    3. 将新增的模块路由配置到src/routers/index.js中,配置示例如下:
      ```js
      function callback() {
        require([
          './user'
        ],
        (
          user,
        ) => {
          router.addRoutes([
            ...user.default
          ])
        }).catch(err => {
          console.log(err.message)
        })
      }
      ```

## 构建和发布 ##

### 安装依赖及插件 ###

```
yarn install
```

### 启动项目 ###

```
npm run serve
```

### 构建 ###
```sh
# 打包正式环境
npm run build:prod

# 打包预发布环境
npm run build:stage
```

### 环境变量 ###
1. 环境变量的配置文件:
    1. .env.development 开发环境
    2. .env.staging 预发布环境
    3. .env.production 发布环境
2. 环境变量必须以VUE_APP_为开头。如:VUE_APP_API
3. 获取环境变量: process.env.VUE_APP_xxxx

### 分析构建文件体积 ###
1. 执行 `npm run preview -- --report`
2. 打开 (http://localhost:9999/report.html)[http://localhost:9999/report.html]


## 教程 ##
1. [Less教程.md](./Less教程.md)


## 使用技术栈 ##

1. [Vue](https://cn.vuejs.org/)
2. [Vue Cli](https://cli.vuejs.org/zh/guide/cli-service.html)
3. [Vue Router](https://router.vuejs.org/zh/guide/#html)
4. [Vuex](https://vuex.vuejs.org/zh/)
5. [vant](https://youzan.github.io/vant/#/zh-CN/)
6. [axios](http://www.axios-js.com/)
7. [plop](https://www.npmjs.com/package/plop)
8. [crypto-js](https://www.npmjs.com/package/crypto-js)
9. [js-cookie](https://www.npmjs.com/package/js-cookie)
10. [vue-wechat-title](https://www.npmjs.com/package/vue-wechat-title)

### 鸣谢 ###

1. [vue-cli-vant-starter](https://github.com/fxss5201/vue-cli-vant-starter)
2. [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)
