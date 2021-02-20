
import { logIn, Info, routers } from '/@/api/user'
import { setCookies, getCookies, delCookies } from '/@/utils'
import addRoutes from '/@/router/addRoutes'
import keyName from '/@/utils/keyName'
import {resetRouter,constantRoutes} from '/@/router'
import router from '/@/router'
const state = {
    username: '',
    token: '',//token
    userInfo: {},//用户信息
    addRoutes: [],//动态路由
    routers:constantRoutes
};

const actions = {
    //登陆
    setLogin({ commit }, userInfo) {
        const username = userInfo.username.trim()//去除用户名的前后空格
        return new Promise((resolve, reject) => {
            logIn({ username, password: userInfo.password }).then(res => {
                const { token } = res.data || {}
                // console.log(res, '登录成功')
                setCookies(keyName.token, token) //登录成功后将token存储在cookie之中
                commit('stateUpdate', {key:'token',value:token})
                  
                //   router.push( '/');//登陆成功后跳转首页
                //   window.location.reload();//刷新页面

                resolve()
            }).catch(error => {
                reject(error)
            });
        });
    },
    //获取菜单
    GenerateRoutes({ commit }) {
        // return routers().then(res => {
        //    const {accessedRouters}=res||{}
           //筛选路由
        //    console.log(addRoutes,'递归后获取菜单')
           commit('stateUpdate',{ key:'addRoutes', value:addRoutes})
        // })
    },
    //获取用户信息
    getInfo({ commit }) {
        return new Promise((resolve, reject) => {
            Info().then(res => {
                // console.log(res, '获取用户信息')
                if (!res.data) {
                    reject('验证失败，请重新登录.')
                }
                const { username, avatar, nickname } = res.data || {}
                commit('stateUpdate', {key:'username', value:username})
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })

    },
    // 后台删除token用户名
    logout({commit,state}) {
        return new Promise((resolve, reject) => {
            logouts().then(() => {
                commit('stateUpdate', {key:'username',value: ''})
                commit('stateUpdate', {key:'token', value:''})
                delCookies(keyName.token)
                resetRouter()//重置路由
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    // remove token  本地删除token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('stateUpdate', {key:'token', value:''})
            delCookies(keyName.token)
            resolve()
        })
    }
};

const mutations = {
    // 设置 state 里面指定属性的值，通用更新方法
    stateUpdate(state, {key, value, module}) {
        if (module) {
            state[module][key] = value;
        } else {
            state[key] = value;
        }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};