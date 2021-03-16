
import { logIn, Info, getMenus, logouts } from '@/api/user.js'
import { setCookies, getCookies, delCookies } from '@/utils/index.js'
import addRoutes from '@/router/addRoutes.js'
import fixRouters from '@/router/fixRouters.js'
import { tokenName } from '@/utils/keyName.js'
import router from '@/router/index.js'
const state = {
    token:getCookies(tokenName),//确保token实时最新的
    fixRouters: fixRouters,//固定路由
    userInfo: null,//用户信息
    addRoutes: [],//动态路由

};

const actions = {
    //登陆
    setLogin({ commit, state, dispatch }, userInfo) {
        const username = userInfo.username.trim()//去除用户名的前后空格
        return new Promise((resolve, reject) => {
            logIn({ username, password: userInfo.password }).then(res => {
                const { token } = res.data || {}
                // console.log(res, '登录成功')
                setCookies(tokenName, token) //登录成功后将token存储在cookie之中

                router.push('/');//登陆成功后跳转首页
                window.location.reload();//刷新页面

                resolve()
            }).catch(error => {
                reject(error)
            });
        });
    },
    //获取用户权限
    GenerateRoutes({ commit, state, dispatch }) {
        return getMenus().then(response => {
            const accessedRouters = response.data || []
            commit('stateUpdate', { key: 'addRoutes', value: addRoutes })
            const routerList=[...addRoutes,{path:"/:pathMatch(.*)*",redirect:{ name:'404'}}]
            routerList.filter(item => {
                router.addRoute(item)
            })
        })
    },
    //获取用户信息
    getInfo({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            Info().then(response => {
                // console.log(response, '获取用户信息')
                const data = response.data || {}

                commit('stateUpdate', { key: 'userInfo', value: data })//储存数据
                
                dispatch('GenerateRoutes').then(()=>{
                    resolve()
                })

            }, error => {
                reject(error)
            })
        })

    },
    // 后台删除token用户名
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            logouts().then((res) => {

                dispatch('resetToken')//调用本地删除所有数据

                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 本地删除所有数据
    resetToken({ commit, state, dispatch }) {
        return new Promise(resolve => {
            commit('stateUpdate', { key: 'userInfo', value: null })//删除userInfo
            commit('stateUpdate', { key: 'addRoutes', value: [] })//删除addRoutes
            commit('stateUpdate', { key: 'token', value: null })//删除userInfo
            delCookies(tokenName)//删除token
            resolve()
        })
    }
};

const mutations = {
    // 设置 state 里面指定属性的值，通用更新方法
    stateUpdate(state, { key, value, module }) {
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