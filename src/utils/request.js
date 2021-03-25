import axios from 'axios'
import { setCookies, getCookies, delCookies ,reminder} from '@/utils/index.js'
import {tokenName} from '@/utils/keyName.js'
import store from '@/store/index.js'
const baseURLs = {
    development: '/api',
    production: '/api',
};

console.log(import.meta.env.MODE,import.meta.env,'获取环境变量',process.env.NODE_ENV)

const service = axios.create({
    baseURL: baseURLs[import.meta.env.MODE],
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
        // console.log( 'respone拦截器:',res)

        if (res.code != 0) {
            if (res.code == 404 || res.code == 401) {
                store.dispatch('user/delDatas')
            }
            reminder(res.msg || '系统繁忙！',{type:'error'})

            return Promise.reject(new Error(res.msg || 'Error'))
        } else {
            return res
        }

    },
    error => {
        console.error('拦截请求报错err' + error)
        // message.error( '系统繁忙！')
        return Promise.reject(error)
    });

export default service