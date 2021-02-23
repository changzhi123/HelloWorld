const getRouters = [//固定的路由
    {
        path: '/',
        name: 'home',
        component: () => import('/@/views/home/index.vue'),
        isShow: true,//是否显示在菜单栏中
        meta: {
            requireLogin: true,// 需要权限才能访问
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('/@/views/login/index.vue'),
        meta: {}
    },
    {
        path: '/text',
        name: 'text',
        component: () => import('/@/views/text/index.vue'),
        meta: {
            requireLogin: true,// 需要权限才能访问
        }

    },
    {
        path: '/item',
        name: 'item',
        component: () => import('/@/views/item/index.vue'),
        meta: {
            requireLogin: true,// 需要权限才能访问
        }
    },
    {
        path: '/toDoList',
        name: 'toDoList',
        component: () => import('/@/views/toDoList/index.vue'),
        meta: {
            requireLogin: true,// 需要权限才能访问
        }
    },
    {
        path : '/user',
        name: 'user',
        component : () => import('/@/views/user/index.vue'),
        isShow:true,//是否显示在菜单栏中
        meta:{
            requireLogin:true,// 需要权限才能访问
        }
    },
];
export default getRouters