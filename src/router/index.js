
import { createRouter ,createWebHashHistory } from 'vue-router'

export const constantRoutes = [//不需要权限验证的路由
    {
        path : '/',
        name: 'home',
        component : () => import('/@/views/home/index.vue'),
        meta:{}
    },
    {
        path : '/login',
        name: 'login',
        component : () => import('/@/views/login/index.vue'),
        meta:{}
    },
    {
        path: '/404',
        name: '404',
        component : () => import('/@/views/404.vue'),
        meta:{}
    }
]
const dynamicRouter=createRouter({
    history: createWebHashHistory(),
    routes:constantRoutes
 })

const router = dynamicRouter
console.log(router,'rou')
export function resetRouter() {
    const newRouter = dynamicRouter
    router.matcher = newRouter.matcher //  重置路由表
}
export default router