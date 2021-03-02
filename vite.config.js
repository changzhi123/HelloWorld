//vite.config.js

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';


// https://vitejs.dev/config/  文档
export default defineConfig({
  plugins: [vue()],
  base: "./",//打包路径

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')//设置别名
    }
  },
  server: {
    hostname: 'localhost', // 默认是 localhost
    port: 3000, // 默认是 3000 端口
    open: false, // 浏览器自动打开
    https: false, // 是否开启 https
    ssr: false, // 服务端渲染
    proxy: {
      '/api': {
        target: 'http://47.93.220.79:3003/demo', // 后端服务实际地址
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    },
    cors: true
  }

})
