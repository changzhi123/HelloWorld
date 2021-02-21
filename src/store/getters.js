// getters.js
const getters = {
    //state
    token: state => state.user.token,
    addRoutes:state=>state.user.addRoutes,
    username:state=>state.user.username,
    userInfo:state=>state.user.userInfo,

    //
};
export default getters