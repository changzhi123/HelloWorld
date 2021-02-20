
const addRoutes=[
    {
        path : '/user',
        name: 'user',
        component : () => import('/@/views/user/index.vue'),
        isShow:true,//是否显示在菜单栏中
        meta:{
            isAuthority:true,// 需要权限才能访问
        }
    },
]
export default addRoutes