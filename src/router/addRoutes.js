import Layout from '@/components/Layout/index.vue';

const addRoutes = [
    {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/index.vue'),
        meta: {
            title: '个人中心'
        }
    },
    {
        path: '/apply',
        name: 'apply',
        component: () => import('@/views/apply/index.vue'),
        meta: {
            title: '应用中心'
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
        meta: {}
    },
    {
        path: '/toDoList',
        name: 'toDoList',
        component: () => import('@/views/toDoList/index.vue'),
        meta: {}
    },
    //Layout路由
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: '/dashboard',
                component: () => import('@/views/dashboard/index.vue'),
                name: 'Dashboard',
                display: true,//是否显示在菜单栏
                meta: { title: '首页',icon:'HomeOutlined'}
            }
        ]
    },
    {
        path: '/tests',
        component: Layout,
        redirect: '/test',
        children: [
            {
                path: '/test',
                component: () => import('@/views/test/index.vue'),
                name: 'test',
                display: true,//是否显示在菜单栏
                meta: { title: '测试' ,icon:'DashboardOutlined'},
                children:[
                    {
                        path: '/test-table',
                        component: () => import('@/views/test/test-table.vue'),
                        name: 'test-table',
                        display: true,//是否显示在菜单栏
                        meta: { title: '表格' }, 
                    },
                    {
                        path: '/test-chart',
                        component: () => import('@/views/test/test-chart.vue'),
                        name: 'test-chart',
                        display: true,//是否显示在菜单栏
                        meta: { title: '图表' }, 
                    }
                ]
            }
        ]
    },
];
export default addRoutes