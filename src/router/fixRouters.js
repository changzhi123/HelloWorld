const fixRouters = [//固定的路由
    {
        path: '/',
        name: 'home',
        component: () => import('../views/home/index.vue'),
        meta: { 
            title:'首页'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/index.vue'),
        meta: {}
    },
    {
        path: '/404',
        name: '404',
        component: () => import('../views/404.vue'),
        meta: {}
    },
   
];

export default fixRouters