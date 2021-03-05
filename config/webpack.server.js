const path = require('path');
const VueServerRendererPlugin = require('vue-server-renderer/server-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    // 定义环境:devlelopment，production,none
    // development环境代码不压缩，production环境代码压缩，变量替换；
    mode: 'development',
    target: 'node',
    resolve: {
        // 配置文件引入(import)路径别名
        alias: {
            vue$: 'vue/dist/vue.js',
            '@': path.join(process.cwd(), './home/src'),
            '@v': path.join(process.cwd(), './home/src/views'),
            '@c': path.join(process.cwd(), './home/src/components')
        },
        // 引入时省略拓展名
        extensions: ['.js', '.vue']
    },
    //入口文件
    entry:  './home/src/entry.server.js',
    //发布文件
    output: {
        //发布文件名
        // filename: 'server.bundle.js', //.[hash:8].js设置指纹
        //发布文件地址
        libraryTarget: 'commonjs2',
        path: path.join(process.cwd(), './static/'),
        //HTML文件引入资源位置，不再服务器下使用相对路径，使用服务器配置绝对路径
        publicPath: '/static/',
    },
    plugins: [
        // 配置vue-loader插件 
        new VueLoaderPlugin(),
        new VueServerRendererPlugin({
            filename: '../bundle/vue-ssr-server-bundle.json'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, "src"),
                loader: 'babel-loader',
                // 配置异步加载模块插件
                options: {
                    plugins: ['@babel/plugin-syntax-dynamic-import']
                }
            },
            {
                test: /\.(ttf|woff2?)$/,
                loader: 'url-loader',
            },
            {
                // css文件编译压缩
                test: /\.css$/,
                use: ['css-loader']
            },
            {
                test: /\.less$/,
                use: ['css-loader','less-loader']
            },
            {
                test: /\.scss$/,
                use: ['css-loader','sass-loader']
            },
            {  
                //图片文件压缩
                test: /\.(png|svg|jpg|jpeg|gif)/,
                use: ['url-loader?limit=4096'],
                type: 'asset/resource'
            },
            {   
                // 新版本必须使用vueloaderplugin插件
                test: /\.vue$/,
                loader: 'vue-loader',
            }
        ]
    },
};