'use strict'
const port = process.env.port || process.env.npm_config_port || 8080

const path = require('path')

const defaultSettings = require('./src/settings.js')

function resolve(dir) { //定义函数，svg配置svg-sprite-loader用
    return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Element Admin' //页标题

console.log(`当前构建环境：${process.env.NODE_ENV} -  ${process.env.ENV}  - ${process.env.VUE_APP_URL}`)

//所有配置项说明可在 https://cli.vuejs.org/config/
module.exports = {
    publicPath: '/',// 根域上下文目录
    outputDir: 'dist', // build输出目录
    assetsDir: 'assets', // 静态资源目录（js, css, img）
    lintOnSave: false, // 是否开启eslint
    productionSourceMap: false,

    //productionGzip:true,
    //productionGzipExtensions:['js','css'],
    //npm install --save-dev compression-webpack-plugin@1.1.11

    devServer: {
        open: true, // 是否自动弹出浏览器页面
        //host: "localhost",
        port: port,
        //https: false,//是否使用https协议
        hotOnly: true, //是否开启热更新
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            [process.env.VUE_APP_URL]: {
                // target: 'http://localhost:3003/demo', //API服务器的地址
                target: 'http://47.93.220.79:3003/demo', //API服务器的地址
                //ws: true, // 代理websockets
                changeOrigin: true, //虚拟的站点需要更管origin
                pathRewrite: { //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    ['^' + process.env.VUE_APP_URL]: ''
                }
            }
        },
    },
    configureWebpack: {
        //在webpack的name字段中提供应用程序的标题
        //可以在index.html中访问它以注入正确的标题。
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }

    },
    chainWebpack(config) {
        config.plugins.delete('preload') // TODO: need test
        config.plugins.delete('prefetch') // TODO: need test
        //svg配置svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()

        //set preserveWhitespace
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true
                return options
            })
            .end()

        config
            //https://webpack.js.org/configuration/devtool/#development
            .when(process.env.NODE_ENV === 'development',
                config => config.devtool('cheap-source-map')
            )

        config
            .when(process.env.NODE_ENV !== 'development',
                config => {
                    config
                        .plugin('ScriptExtHtmlWebpackPlugin')
                        .after('html')
                        .use('script-ext-html-webpack-plugin', [{
                            //   必须与runtimeChunk名称相同。默认是
                            inline: /runtime\..*\.js$/
                        }])
                        .end()
                    config
                        .optimization.splitChunks({
                            chunks: 'all',
                            cacheGroups: {
                                libs: {
                                    name: 'chunk-libs',
                                    test: /[\\/]node_modules[\\/]/,
                                    priority: 10,
                                    chunks: 'initial' //dependent只包最初依赖的第三方
                                },
                                iviewUI: {
                                    name: 'chunk-iviewUI',//iviewUI
                                    priority: 20,
                                    test: /[\\/]node_modules[\\/]_?iview(.*)/
                                  },
                                  echarts: {
                                    name: 'chunk-echarts',//echarts
                                    priority: 20,
                                    test: /[\\/]node_modules[\\/]_?echarts(.*)/
                                  },
                                elementUI: {
                                    name: 'chunk-elementUI', //  将elementUI拆分成一个包
                                    priority: 20, //  重量需要大于libs和app，否则会被打包成libs或app
                                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // 以适应cnpm
                                },
                                commons: {
                                    name: 'chunk-commons',
                                    test: resolve('src/components'), // 可以自定义规则
                                    minChunks: 3, //   最低常见的数量
                                    priority: 5,
                                    reuseExistingChunk: true
                                }
                            }
                        })
                    config.optimization.runtimeChunk('single')
                }
            )
    },




}