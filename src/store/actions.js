// actions.js
import {logIn,Info} from '/@/api/user'
import {setCookies,getCookies,delCookies}from '/@/utils'
import addRoutes from '/@/router/addRoutes'
import kenName from '/@/utils/keyName'
let actions = {
    setLogin({ commit }, userInfo){//登陆
        const username = userInfo.username.trim()
        return new Promise((resolve, reject) => {
            logIn({username, password:userInfo.password}).then(res => {
              const {token} = res.data||{}

              setCookies(keyName.tokenName, token) //登录成功后将token存储在cookie之中
              commit('stateUpdate', 'token',token)

              router.push( '/');//登陆成功后跳转首页
              window.location.reload();//刷新页面

              resolve()
            }).catch(error => {
              reject(error)
            });
          });
    },
    getInfo({ commit }){//获取用户信息
        const token=getCookies(keyName.tokenName)||
        Info({token:token}).then(res=>{
            const {} = res.data||{}
            //在这里赛选权限路由
            commit('stateUpdate', 'addRoutes',addRoutes)//把有权限的路由存入vuex中
        })
    }
}
export default actions