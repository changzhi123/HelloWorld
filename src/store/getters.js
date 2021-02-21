// getters.js
const getters = {
    token: state => state.user.token,
    addRoutes:state=>state.user.addRoutes,
    username:state=>state.user.username,
}
export default getters