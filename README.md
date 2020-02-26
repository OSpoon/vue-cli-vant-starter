# vue-cli-vant-starter #


### 快速依赖本模板开发
```sh
vue create --preset ospoon/vue-preset-starter <project-name>
```

vue-cli 和 vant 结合的项目开发模板，主要内容如下：
1. 安装`eruda`,在dev模式并开启debug时,方便移动端查看日志
2. vant 引入组件采用的是[自动按需引入插件](https://youzan.github.io/vant/#/zh-CN/quickstart)，均已经配置完善。
3. Rem 适配，使用以下两个工具:
    1. [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 是一款 postcss 插件，用于将单位转化为 rem
    2. [lib-flexible](https://github.com/amfe/lib-flexible) 用于设置 rem 基准值
    3. 设计图标准按照 375 * 667 的尺寸给出，布局的时候除了 1px 其他全部按照 测量的距离 写就可以了
4. 使用`plop`构建初始页面/组件/store/apis,执行命令`npm run new`
5. 增加`axios`重复发送同一请求屏蔽操作
6. 执行`yarn clog`生成CHANGELOG.md提交日志
      1. 注意需要提升package.json中的version才能生成新的log
      2. 需安装conventional-changelog和对应的cli,执行命令:`yarn add --dev conventional-changelog conventional-changelog-cli`
7. svg图片支持,使用如下:
      1. 可到[iconfont](https://www.iconfont.cn/)搜索合适的图标进行下载,格式要求svg
      2. 将下载的图标导入src/icons/svg目录下
      3. 在需要使用的地方加入`<svg-icon icon-class="{{svg图标名称}}" />`
   注意:
      1. 下载到的图标颜色与`svg-icon`组件默认颜色不一致,可执行`yarn svgo`命令删除svg图标的'fill'和'fill-rule',如需保持颜色切勿执行
      2. 下载到的图标大小尺寸建议统一设置`128`

### 使用说明 ###
1. [使用说明(模板使用).md](./docs/使用说明(模板使用).md)
2. [使用说明(开发工具).md](./docs/使用说明(开发工具).md)
3. [使用说明(构建和发布).md](./docs/使用说明(构建和发布).md)
4. [使用说明(GIT提交规范).md](./docs/使用说明(GIT提交规范).md)
5. [其他说明(Less使用).md](./docs/其他说明(Less使用).md)

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


### 修订记录 ###
[CHANGELOG.md](./CHANGELOG.md)

### 注意事项 ###
1. Q: 如使用sourceTree提交代码,在Mac系统提示env: node: No such file or directory

   A: 项目开启的提交信息检测,因未知原因无法解决,提供初步解决方案如下
        1. 在User/username目录下找到.bash_profile文件(显示隐藏文件快捷键:Command+Shift+.)
        2. 文件末尾添加命令`alias ost="/Applications/SourceTree.app/Contents/MacOS/SourceTree"`
        3. 重启电脑使.bash_profile得修改生效
        4. 开机后终端执行`ost`即可打开sourceTree,提交代码可正常进行(终端暂不可关闭,关闭后sourceTree也会推出,如有高招请赐教)

2. Q: 提交代码提示红色报错信息:INVALID COMMIT MSG: does not match "<type>(<scope>): <subject>" !

   A: 项目开启的提交信息检测,因不规范被拦截,请查看[使用说明(GIT提交规范).md](./使用说明(GIT提交规范).md),修改后进行重新提交
3. Q: node-sass安装时间过长,或超时安装失败

   A: 推荐使用`cnpm install node-sass`安装


### 鸣谢 ###

1. [vue-cli-vant-starter](https://github.com/fxss5201/vue-cli-vant-starter)
2. [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)