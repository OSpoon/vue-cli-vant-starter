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

### 使用说明 ###
1. [使用说明(模板使用).md](./使用说明(模板使用).md)
2. [使用说明(开发工具).md](./使用说明(开发工具).md)
3. [使用说明(构建和发布).md](./使用说明(构建和发布).md)
4. [其他说明(Less使用).md](./其他说明(Less使用).md)

### 使用依赖及文档地址 ###

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
