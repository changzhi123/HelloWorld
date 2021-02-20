import request from '../utils/request'
//登陆
export function logIn(data) {
    return request({
      url: '/webapi/v1/customer/platforms',
      method: 'POST',
      data
    });
  }
//获取用户信息
export function Info(params) {
    return request({
      url: '/user/info',
      method: 'get',
      params
    });
  }