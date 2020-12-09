import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // 进度条样式
import getPageTitle from '@/utils/get-page-title'

const whiteList = ['/login']
//全局钩子
// to:router即将进入的路由对象
// from:当前导航即将离开的路由
// next:Function,进行管道中的一个钩子，如果执行完了，则导航的状态就是 confirmed （确认的）；否则为false，终止导航。
router.beforeEach(async(to, from, next) =>{
    NProgress.start()
    // 设置页面标题
  document.title = getPageTitle(to.meta.title)

    const hasToken = getToken()
    console.log(hasToken, '确定用户是否已登录')

    if (hasToken) {
        if (to.path === '/login') {
            // 如果已登录，则重定向到主页
            next({ path: '/' })
            NProgress.done()
          } else{
            const hasGetUserInfo = store.getters.name
            console.log(hasGetUserInfo, '登录姓名')
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            console.log(hasRoles,'hasRoles00')
            if (hasGetUserInfo) {
                next()
              } else{
                try {
                    //获取用户信息
                    await store.dispatch('user/getInfo')
                    store.dispatch('user/GenerateRoutes').then(() => { // 生成可访问的路由表
                      const new_router = store.getters.addRouters
                      new_router.push({ path: '*', redirect: '/404', hidden: true })
                      
                      // console.log(store.getters.addRouters,'动态添加可访问路由表')

                      router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                      router.options.routes = store.getters.routers
                      next({ ...to, replace: true })// hack方法 确保addRoutes已完成 设置replace: true，这样导航就不会留下历史
                      
                    })
                  } catch (error) {
                    //  删除令牌，进入登录页面重新登录
                    await store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
                    next(`/login`)
                    // next(`/login?redirect=${to.path}`)
                    NProgress.done()
                  }
              }
          }
    }else{
        if (whiteList.indexOf(to.path) !== -1) {
            // 在免费登录白名单，直接去
            next()
          } else {
            //  没有访问权限的其他页面被重定向到登录页面。
            // next(`/login?redirect=${to.path}`)
            next(`/login`)
            NProgress.done()
          }
    }
})
router.afterEach(() => {
    //  完成进度条
    NProgress.done()
  })