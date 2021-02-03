import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css' // CSS重置浏览器默认样式
import '@/styles/index.scss' // global css、
import '@/icons'

import axios from 'axios'
Vue.prototype.$axios=axios;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import locale from 'element-ui/lib/locale/lang/zh-CN'
// Vue.use(ElementUI, { locale })
Vue.use(ElementUI)

import 'ant-design-vue/dist/antd.css';//vue2.0版
import Antd from 'ant-design-vue';
Vue.use(Antd);

import '@/styles/index.scss' // 全局 css
import '@/permission'//权限控制，路由拦截


import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);//引入viewui

// 将不必要的库卸载掉 npm uninstall ant-design-vue

import i18n from '@/i18n/i18n'

// import bmap from 'vue-baidu-map'
// Vue.use(bmap,{ak:'YNceDPMTlSGi5t0RUvYKtZNCdooOkvmo'}) 

import  VueParticles  from   'vue-particles'
Vue.use(VueParticles) // 用于粒子动态背景

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
