import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/layout'

Vue.use(Router)
// this.$router 访问路由器，也可以通过 this.$route 访问当前路由 $route.query (如果 URL 中有查询参数)、 $route.params
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')//刷新当前页
      }
    ]
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "about" */ '@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "about" */'@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      is_only: true,
      meta:{
      icon: 'dashboard',
      title: '首页',
      affix: true
      }
    }]
  },
 
]

const createRouter = () => new Router({
  mode: 'history', // require service support 需要服务支持
  base: '/',
  // mode:'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()


export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher //  重置路由表
}

export default router
