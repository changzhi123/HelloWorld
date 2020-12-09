import { getToken,setToken,removeToken} from '@/utils/auth'
import { login,logouts, getInfo, getMenus,getrouter} from '@/api/user'
import lazyLoading from './lazyLoading'
import {resetRouter, constantRoutes} from '@/router'
import Layout from '@/layout'

import {datas} from './route'

const state = {
    token: getToken(),
    name: '',//ursename
    avatar: '',//头像
    roles: '', // 增加一个角色变量
    routers: constantRoutes, //增加
    addRouters: [], //增加
    nickname:''
}

const mutations = {
    // 设置 state 里面指定属性的值，通用更新方法
    stateUpdate(state, {key, value, module}){
          if (module) {
            state[module][key] = value;
          } else {
            state[key] = value;
          }
      },
    SET_TOKEN: (state, token) => {
        state.token = token //保存token
    },
    SET_NAME: (state, username) => { //用户名
        state.name = username
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => { // 增加
        state.roles = roles
    },
    SET_NICKNAME: (state, nickname) => { // 增加
        state.nickname = nickname
    },
    SET_ROUTERS: (state, routers) => { // 增加
        state.addRouters = routers
        state.routers = constantRoutes.concat(routers)
    }
}

const actions = {
    login({commit}, userInfo) { //登录
        const username = userInfo.username.trim() //去除用户名的前后空格
        return new Promise((resolve, reject) => {
            login({username:username,password:userInfo.password}).then(res => {
                const data = res.data
                console.log(data, '登录成功',this.$router)
                setToken(data.token) //登录成功后将token存储在cookie之中
                commit('SET_TOKEN', data.token)
                // commit('stateUpdate', {key : 'token', value :  data.token});//使用方法
                // const restoken='changzhi'+new Date().getTime()
                // setToken(restoken) //假登录
                // commit('SET_TOKEN', restoken)
                resolve()
            }).catch(error => {
                reject(error)
            });
        });
    },
    // 增加获取菜单
    GenerateRoutes({ commit}) {
        return getrouter().then(response => {
            const accessedRouters = response.data
            // const accessedRouters = JSON.parse(JSON.stringify(datas))
            console.log(accessedRouters, '后端返回的路由树')

            // 第一层未做递归
            accessedRouters.map(item => {
                if (item.component) {
                    item.component = Layout
                }

                if (item.children) {
                    item.children.map(child => {
                        // if (!child.children) {
                            child.component = lazyLoading(child.component, child.path)//二级菜单
                        // }
                        if (child.children) {
                            // child.component = Layout2
                            child.children.map(tertiary => {
                                tertiary.component = lazyLoading(tertiary.component, tertiary.path)//三级菜单
                            })
                        }
                        
                    })
                }

            })
            //   console.log(accessedRouters,'递归后获取菜单')
            commit('SET_ROUTERS', accessedRouters)
        })
    },
    //获取用户信息
    getInfo({ commit}) {
        return new Promise((resolve, reject) => {
            getInfo().then(response => {
                console.log(response, '获取用户信息')
                const { data} = response
                if (!data) {
                    reject('验证失败，请重新登录.')
                }
                const {
                    username,avatar,nickname
                } = data
                const userimg='https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
                commit('SET_NAME', username)
                commit('SET_AVATAR', avatar||userimg)
                commit('SET_NICKNAME', nickname) 

                // commit('SET_NAME','长志name') //假数据
                // commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
                // commit('SET_ROLES', '长志roles')
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 后台删除token用户名
    logout({commit,state}) {
        return new Promise((resolve, reject) => {
            logouts().then(() => {
                commit('SET_TOKEN', '')
                commit('SET_NAME', '')
                removeToken()
                resetRouter()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    // remove token  本地删除token
    resetToken({ commit}) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            removeToken()
            resolve()
        })
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}