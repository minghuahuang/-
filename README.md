# webpack5 + vue2 前后端同步渲染demo项目

## 配置使用webpack5 + vue2 + scss + vuex + store + vue-router + vue-server-renderer + express 实现ssr,同步数据，插值注入

项目结构

```
|-- webpack-fe-rd
    |-- .gitignore
    |-- app.js node服务器配置
    |-- package.json npm包依赖
    |-- README.md
    |-- bundle 服务器文件打包文件
    |   |-- vue-ssr-server-bundle.json 服务器文件打包编译为.json文件
    |-- config
    |   |-- webpack.client.js webpack前端配置文件
    |   |-- webpack.server.js webpack后端配置文件
    |-- home 前端文件目录
    |   |-- public 静态资源目录
    |   |   |-- index.html
    |   |-- src 开发目录
    |       |-- App.vue 主应用程序
    |       |-- entry.client.js 前端入口文件
    |       |-- entry.server.js 后端入口文件
    |       |-- favicon.ico
    |       |-- main.js 应用程序入口文件
    |       |-- router.js 路由文件
    |       |-- store.js store文件
    |       |-- style.scss 全局样式
    |       |-- components 共享组件目录
    |       |-- views 视图组件目录
    |           |-- Detail.vue
    |           |-- Home.vue
    |           |-- List.vue
    |-- static 前端静态资源发布位置
    |   |-- 241.js
    |   |-- 241.style.css
    |   |-- 81.js
    |   |-- 81.style.css
    |   |-- lib.js
    |   |-- main.js
    |   |-- style.css
    |-- views 前端html文件发布位置
        |-- index.html
```

项目命令： 

```
npm run start 启动前后端构建
node ./app.js 启动服务器，端口号为3005
```

### 已解决问题
vue-server-renderer服务器端渲染打包问题及解决： 
在webpack配置文件中使用vue-server-renderer/server-plugin处理服务器端文件打包时会报错：
```
> webpack --config ./config/webpack.server.js

[vue-server-renderer-webpack-plugin] webpack config `output.libraryTarget` should be "commonjs2".

D:\Vue\webpack-fe-rd\node_modules\vue-server-renderer\server-plugin.js:76
      throw new Error(
      ^

Error: Entry "main" not found. Did you specify the correct entry option?
```
根据错误定位是vue-server-renderer\server-plugin错误，server-plugin.js修改文件即可；
[文件修改](https://github.com/vuejs/vue/issues/11718)

### 未解决问题  
前端路由使用异步加载组件方式引入，浏览器报警告
Vue warn: The client-side rendered virtual DOM tree is not matching server-rendered content. 
目前处理方式：同步加载；



