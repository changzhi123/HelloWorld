import Layout from '@/components/Layout/index.vue';

const addRoutes=[
    {
        path : '/user',
        name: 'user',
        component : () => import('@/views/user/index.vue'),
        meta:{
            title:'个人中心'
        }
    },
    {
        path:'/apply',
        name:'apply',
        component:()=>import('@/views/apply/index.vue'),
        meta: {  
            title:'应用中心'
        }
    },
    {
        path: '/text',
        name: 'text',
        component: () => import('@/views/text/index.vue'),
        meta: {}

    },
    {
        path: '/item',
        name: 'item',
        component: () => import('@/views/item/index.vue'),
        meta: { }
    },
    {
        path: '/toDoList',
        name: 'toDoList',
        component: () => import('@/views/toDoList/index.vue'),
        meta: { }
    },
    //Layout路由
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
          {
            path: 'dashboard',
            component: () => import('@/views/dashboard/index.vue'),
            name: 'Dashboard',
            meta: { title: '首页',  affix: true }
          }
        ]
      },
];
export default addRoutes