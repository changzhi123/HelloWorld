import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken ,removeToken} from '@/utils/auth'


// 创建axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_URL, // api的base_url
    timeout: 5000 // 请求超时时间
  })
  
  // request拦截器
  service.interceptors.request.use(config => {
    if (store.getters.token) {
      config.headers['vue_Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config
  }, error => {
    console.log(error) // 为调试
    Promise.reject(error)
  })
  
  // respone拦截器
  service.interceptors.response.use(
    response => {
      const res = response.data;
      if(res.code!=0){
        if (res.code == 404 || res.code == 401) {
          removeToken() //清除Cookies token
          //新登陆
          MessageBox.confirm('登录过期', '登录过期', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('user/resetToken').then(() => {
            location.reload()//方法用于刷新当前文档。
            })
          })
        }else{
          Message({
            message: res.msg || '系统繁忙！',
            type: 'error',
            duration: 2 * 1000
          })
        }
        return Promise.reject(new Error(res.msg || 'Error'))
      }else{
        return res  
      }
    },
    error => {
      console.log('err' + error)// 为调试
      Message({
        message: error.msg,
        type: 'error',
        duration: 2 * 1000
      })
      return Promise.reject(error)
    })
  
  export default service
  