const getters = {
    visitedViews: state => state.tagsView.visitedViews, // 增加
    cachedViews: state => state.tagsView.cachedViews, // 增加
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    roles: state => state.user.roles, // 增加
    nickname:state=>state.user.nickname,
    routers: state => state.user.routers, // 增加
    addRouters: state => state.user.addRouters ,// 增加
    permission_routes: state => state.permission.routes,
    errorLogs: state => state.errorLog.logs
}


export default getters