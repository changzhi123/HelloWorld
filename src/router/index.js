
import { createRouter ,createWebHashHistory } from 'vue-router'
import getRouters from './getRouters'
import kenName from '/@/utils/keyName'
import { setCookies, getCookies, delCookies } from '/@/utils'
import store from '/@/store'//vuex


import  NProgress from 'nprogress'
import 'nprogress/nprogress.css' // 进度条样式

const router = createRouter({
    history: createWebHashHistory(),
    routes:[...getRouters]
 });
//路由拦截
router.beforeEach((to, from, next) =>{
   NProgress.start()//开启进度条

   const token=getCookies(kenName.token)
   const userInfo =getCookies(kenName.userInfo)
   const isLogin = token && userInfo;
   const {meta : {requireLogin}, fullPath} = to;
   console.log(requireLogin,'路由拦截',isLogin,token,userInfo)
   if (requireLogin){//判断路由是否需要权限
     if (isLogin){//判断是否已经登陆
        next()//已登录直接通过
        NProgress.done()
     }else{
        next({name : 'login', query : {fromPath : fullPath}});//没有登陆直接去登陆页面
        NProgress.done()
     }
   }else{//不需要权限的路由
     if(to.name === 'login' && isLogin){
        next({path: '/'  })// 跳转到home页
        NProgress.done()
     }else{
        next()
        NProgress.done()
     }
   }
});
router.afterEach(() => {
    //  完成进度条
    NProgress.done()
})

export default router