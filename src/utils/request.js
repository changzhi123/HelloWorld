import axios from 'axios'
import { setCookies, getCookies, delCookies } from '/@/utils'
import { message } from 'ant-design-vue';
import {tokenName} from '/@/utils/keyName.js'
import store from '/@/store'
const baseURLs = {
    development: '/api',
    production: '/api',
};

const service = axios.create({
    baseURL: baseURLs[process.env.NODE_ENV],
    timeout: 5000, // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
    const token = getCookies(tokenName)
    
    if (token) {
        config.headers['vue_Token'] = token // 让每个请求携带
    }
    return config
}, error => {
    // console.log(error)
    Promise.reject(error)
});


// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        console.log( 'respone拦截器:',res)
        if (res.code != 0) {
            if (res.code == 404 || res.code == 401) {
                store.dispatch('user/delDatas')
            }

            message.error(res.msg || '系统繁忙！')

            return Promise.reject(new Error(res.msg || 'Error'))
        } else {
            return res
        }
    },
    error => {
        // console.log('拦截请求报错err' + error)
        return Promise.reject(error)
    });

export default service