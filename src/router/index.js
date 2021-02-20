
import { createRouter ,createWebHashHistory } from 'vue-router'

const routes = [//不需要权限验证的路由
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
        path: '/:pathMatch(.*)*',
        name: '404',
        component : () => import('/@/views/404.vue'),
        meta:{}
    }
]

const router = createRouter({
   history: createWebHashHistory(),
   routes
})
export default router