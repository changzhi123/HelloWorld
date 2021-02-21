
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { message } from 'ant-design-vue';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // 进度条样式

import getRouters from './getRouters'
import kenName from '/@/utils/keyName'
import { setCookies, getCookies, delCookies } from '/@/utils'
import store from '/@/store'//vuex


const router = createRouter({
    history: createWebHistory(),
    routes: [...getRouters]
});

//路由拦截
router.beforeEach((to, from, next) => {
    NProgress.start()//开启进度条

    const isToken = getCookies(kenName.token)
    const { meta: { requireLogin }, fullPath } = to;
    const isUserInfo = store.getters.userInfo

    console.log(requireLogin, '路由拦截', isUserInfo, isToken,to)

    if (requireLogin) {//判断路由是否需要权限
        if (isToken) {//判断是否已经登陆
            if (isUserInfo) {//当vuex中userInfo为空，说明用户刷新了,重新获取用户信息/权限

                next()//已登录直接通过
                NProgress.done()
            } else {
                try {
                    // console.log('用户刷新了',userInfo)
                    store.dispatch("user/getInfo").then(() => {
                        next()
                        NProgress.done()
                        //   console.log(store.getters.userInfo,'userInfo再次获取')
                    })
                } catch (error) {
                    store.dispatch("user/delDatas")//删除本地所有数据重新登陆
                    message.error('系统繁忙，请重新登陆！')
                    NProgress.done()
                }
            }
        } else {
            next('/login')
            NProgress.done()
        }
    } else {//不需要权限的路由
        if (to.name === 'login' && isToken) {
            next({ path: '/' })// 跳转到home页
            NProgress.done()
        } else {
            next()
            NProgress.done()
        }
    }
});

router.afterEach(() => {
    //  完成进度条
    NProgress.done()
});

export default router