const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //拆分css
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin'); //压缩css
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    // 定义环境:devlelopment，production,none
    // development环境代码不压缩，production环境代码压缩，变量替换；
    mode: 'production',
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
    entry: {
        main: './home/src/entry.client.js',
    },
    //发布文件
    output: {
        //发布文件名
        filename: '[name].js', //.[hash:8].js设置指纹
        //发布文件地址
        path: path.join(process.cwd(), './static/'),
        //HTML文件引入资源位置，不再服务器下使用相对路径，使用服务器配置绝对路径
        publicPath: '/static/'
    },
    //err,warning追踪工具  
    devtool: 'inline-source-map',
    //配置webpack-dev-server查找文件位置，配置浏览器自动刷新
    devServer: {
        //告诉webpack-dev-server资源位置,相对于webpack.config.js文件位置，默认加载index.html
        contentBase: './',
        // port: 8080,
        // open: true,
        // webpack-dev-server跨域请求代理
        proxy: {
            '/test/api': {
                // api地址
                target: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',
                // 请求路径重写
                pathRewrite: {
                    '^/test/api': '',
                },
                // 安全校验关闭，校验https
                secure: false
            }
        }
    },
    plugins: [
        // 配置vue-loader插件 
        new VueLoaderPlugin(),
        // 自动清理dist文件夹插件
        // new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }), 
        // index.html文件发布插件
        new HtmlWebpackPlugin({
            // 定义index.html文件位置
            template: './home/public/index.html',
            // 定义index.html文件发布位置
            filename: '../views/index.html',
            hash: true, //添加指纹的另一种方式，以query形式添加  
            inject: true, //是否注入静态资源，默认注入，可不设置
            minify: {
                removeComments: false,
            }
        }),
        // 拆分css文件插件
        new MiniCssExtractPlugin({ 
            // 定义拆分css文件的位置
            filename: 'style.css',
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
                use: ['style-loader', {loader: MiniCssExtractPlugin.loader, options: { esModule: true }}, 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', {loader: MiniCssExtractPlugin.loader, options: { esModule: true }}, 'css-loader','less-loader']
            },
            {
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader','sass-loader']
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
                // 配置分离css文件
                options: {
                    extractCSS: true,
                }
            }
        ]
    },
    optimization: {
        // css压缩
        minimizer: [
            new CssMinimizerWebpackPlugin(),
        ],
        // 拆分库文件  
        splitChunks: {
            cacheGroups: {
                lib: {
                    name: 'lib',
                    chunks: 'initial',
                    test: /node_modules/,
                }
            }
        }
    }
};