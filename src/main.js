// main.js

import { createApp } from 'vue'
import App from './App.vue'


import router from './router'//路由
import store from './store'//vuex

import Antd from 'ant-design-vue';//ui组件
import 'ant-design-vue/dist/antd.css';//ui组件样式



createApp(App)
    .use(router)
    .use(store)
    .use(Antd)
    .mount('#app')

