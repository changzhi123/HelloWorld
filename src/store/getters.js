// getters.js
const getters = {
    //state
    fixRouters:state=>state.user.fixRouters,
    token:state=>state.user.token,
    addRoutes:state=>state.user.addRoutes,
    userInfo:state=>state.user.userInfo,
    //
};
export default getters