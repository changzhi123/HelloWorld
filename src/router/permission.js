//permission.js
import router from '/@/router'//路由

router.beforeEach((to, from, next)=>{
    console.log(to, from, next,'路由拦截')
    next()
})