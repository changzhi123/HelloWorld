
import { logIn, Info, getRouters } from '/@/api/user'
import { setCookies, getCookies, delCookies } from '/@/utils'
import addRoutes from '/@/router/addRoutes'
import keyName from '/@/utils/keyName'
import router from '/@/router'
const state = {
    // username: '',
    // token: '',//token
    userInfo: null,//用户信息
    addRoutes: [],//动态路由
    // routers:[]
};

const actions = {
    //登陆
    setLogin({ commit, state, dispatch }, userInfo) {
        const username = userInfo.username.trim()//去除用户名的前后空格
        return new Promise((resolve, reject) => {
            logIn({ username, password: userInfo.password }).then(res => {
                const { token } = res.data || {}
                // console.log(res, '登录成功')
                setCookies(keyName.token, token) //登录成功后将token存储在cookie之中

                dispatch('getInfo').then(() => {
                    router.push('/');//登陆成功后跳转首页
                    window.location.reload();//刷新页面
                })
                resolve()
            }).catch(error => {
                reject(error)
            });
        });
    },
    //获取权限
    setRouter({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            getRouters().then(res => {

                commit('stateUpdate', { key: 'addRoutes', value: addRoutes })
                //动态挂在赛选后的路由
                const routerList=[...addRoutes,{ path: '/404',name:'404', component: () => import('/@/views/404.vue') }]
                routerList.filter(item=>{
                    router.addRoute(item)
                }) 
                // router.addRoute([
                //        ...addRoutes,

                //     { path: '/404',name:'404', component: () => import('/@/views/404') }

                // ])
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //获取用户信息
    getInfo({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            Info().then(res => {
                // console.log(res, '获取用户信息')
                const data = res.data || {}
                if (!data) {
                    reject('验证失败，请重新登录.')
                }

                commit('stateUpdate', { key: 'userInfo', value: data })//储存数据

                dispatch('setRouter')

                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })

    },
    // 后台删除token用户名
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            logouts().then((res) => {

                dispatch('delDatas')

                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 本地删除所有数据
    delDatas({ commit, state, dispatch }) {
        return new Promise(resolve => {

            commit('stateUpdate', { key: 'addRoutes', value: [] })
            delCookies(keyName.userInfo)//删除userInfo
            delCookies(keyName.token)//删除token

            router.push('/login')

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