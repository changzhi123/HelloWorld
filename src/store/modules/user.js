
import { logIn, Info, getRouters,logouts } from '/@/api/user'
import { setCookies, getCookies, delCookies } from '/@/utils'
import addRoutes from '/@/router/addRoutes'
import {tokenName} from '/@/utils/keyName.js'
import router from '/@/router'
const state = {
   
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
  
    //获取用户信息
     getInfo({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            Info().then(response => {
                // console.log(response, '获取用户信息')
                const data = response.data || {}

                commit('stateUpdate', { key: 'userInfo', value: data })//储存数据

                //获取用户权限
                getRouters().then(res => {
                    //    console.log(res,'获取用户权限')
                    commit('stateUpdate', { key: 'addRoutes', value: addRoutes })
                    //动态挂在赛选后的路由
                    // const routerList = [...addRoutes, { path: '/404', name: '404', component: () => import('/@/views/404.vue') }]
                    // routerList.filter(item=>{
                    //     router.addRoute(item)
                    // }) 
                    // router.addRoute(
                    //     routerList
                    // )

                    resolve(response)
                },error=>{
                    reject(error)
                })

            },error=>{
                reject(error)
            })
        })

    },
    // 后台删除token用户名
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            logouts().then((res) => {

                dispatch('delDatas')//调用本地删除所有数据

                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 本地删除所有数据
    delDatas({ commit, state, dispatch }) {
        return new Promise(resolve => {
            commit('stateUpdate', { key: 'userInfo', value: null })//删除userInfo
            commit('stateUpdate', { key: 'addRoutes', value: [] })//删除addRoutes
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