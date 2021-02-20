import axios from 'axios'
import {setCookies,getCookies,delCookies}from '/@/utils'
import { message } from 'ant-design-vue';
import  keyName from '/@/utils/keyName'
const baseURLs = {
    development: '/api',
    production: '/api2',
}

const service = axios.create({
    baseURL: baseURLs[process.env.NODE_ENV],
    timeout: 5000, // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
    const token=getCookies(keyName.tokenName)||''
    
    config.headers['unseToKen'] =token
    return config
}, error => {
    // console.log(error)
    Promise.reject(error)
})


// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        console.log(res,'respone拦截器')
        if(res.status!=1){
            message.error(res.message||'系统繁忙！')
        }else{
            return res
        }
    },
    error => {
        // console.log('err' + error)
        return Promise.reject(error)
    })
export default service