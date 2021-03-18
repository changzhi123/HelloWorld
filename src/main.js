// main.js

import { createApp } from 'vue'
import App from './App.vue'


import router from './router'//路由
import store from './store'//vuex

import Antd from 'ant-design-vue';//ui组件
import 'ant-design-vue/dist/antd.css';//ui组件样式

import * as Icons from "@ant-design/icons-vue";

const app = createApp(App)
    .use(router)
    .use(store)
    .use(Antd)
app.mount('#app')


Object.keys(Icons).filter(key=>{
    app.component(key, Icons[key]);//全局引入icon图标
})


