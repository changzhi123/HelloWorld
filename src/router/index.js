
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { message } from 'ant-design-vue';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // 进度条样式

import fixRouters from './fixRouters'
import { tokenName,whiteList } from '/@/utils/keyName.js'
import { setCookies, getCookies, delCookies } from '/@/utils'
import store from '/@/store'//vuex


const router = createRouter({
    history: createWebHistory(),
    routes: [...fixRouters]
});


//路由拦截
router.beforeEach((to, from, next) => {
    NProgress.start()//开启进度条

    const hasToken = getCookies(tokenName)
    const hasGetUserInfo = store.getters.userInfo

    // console.log('路由拦截', hasGetUserInfo, hasToken, to)

    if (hasToken) {//判断是否已经登陆
        if (to.path == '/login') {
            next('/')
        } else {
            if (hasGetUserInfo) {//判断用户是否刷新页面
                next()//没有刷新直接通过
            } else {
               
                store.dispatch('user/getInfo').then(() => {//再次获取用户权限
                    next({ ...to, replace: true })
                }, error => {
                    message.error('验证失败，请重新登陆！')
                    store.dispatch("user/resetToken")//清楚所有数据
                    next('/login')
                    NProgress.done()
                })
            }
        }
    } else {
        if (whiteList.includes(to.path)) {
            next()//白名单直接进入
        } else {
            next('/login')
            NProgress.done()
        }

    }


});

router.afterEach(() => {
    //  完成进度条
    NProgress.done()
});

export default router