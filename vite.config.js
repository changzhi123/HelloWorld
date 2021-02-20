
// vite.config.js
const path = require('path')
module.exports = {
    alias: {
        '/@/': path.resolve(__dirname, './src')
        //小bug 引入必须加双斜线 注 /@/views/home/index.vue
    },
    hostname: 'localhost', // 默认是 localhost
    port: '3000', // 默认是 3000 端口
    open: true, // 浏览器自动打开
    https: false, // 是否开启 https
    ssr: false, // 服务端渲染
    base: './', // 生产环境下的公共路径
    outDir: 'dist', // 打包构建输出路径，默认 dist ，如果路径存在，构建之前会被删除
    proxy: { // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
    '/api': {
      target: 'http://47.93.220.79:3003/demo', // 后端服务实际地址
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
  }
}