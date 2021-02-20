//permission.js
import router from '/@/router'//路由
import { message } from 'ant-design-vue';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // 进度条样式

import store from '/@/store'//vuex

import kenName from '/@/utils/keyName'
import { setCookies, getCookies, delCookies } from '/@/utils'

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const hasToken = getCookies(kenName.token)
    console.log(to, from, '路由拦截', hasToken)
    if (hasToken) {//判断是否登录
        if (to.path == '/login') {
            // 如果已登录，则重定向到主页
            next({ path: '/' })
            NProgress.done()
        } else {
            const hasGetUserInfo = store.state.user.username
            if (hasGetUserInfo) {
                next()
            } else {
                try {
                    //获取用户信息
                    await store.dispatch('user/getInfo')
                    store.dispatch('user/GenerateRoutes').then(() => {// 生成可访问的路由表
                        const new_router = store.getters.addRouters
                        new_router.push({ path: '*', redirect: '/404', hidden: true })
                        router.addRoute(store.getters.addRouters) // 动态添加可访问路由表
                        router.options.routes = store.getters.routers
                        next({ ...to, replace: true })// hack方法 确保addRoutes已完成 设置replace: true，这样导航就不会留下历史
                    })
                } catch (error){
                    // 删除令牌，进入登录页面重新登录
                    console.log(error,'error')
                    await store.dispatch('user/resetToken')
                    message.error(error || 'Has Error')
                    next('/login')
                    NProgress.done()
                }
            }
        }
    }else{
        const whiteList = ['/login']
        if (whiteList.indexOf(to.path) !== -1) {
            // 在免费登录白名单，直接去
            next()
          } else {
            //  没有访问权限的其他页面被重定向到登录页面。
            // next(`/login?redirect=${to.path}`)
            next('/login')
            NProgress.done()
          }
    }

})
router.afterEach(() => {
    //  完成进度条
    NProgress.done()
  })