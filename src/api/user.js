import request from '../utils/request'
//登陆
export function logIn(data) {
    return request({
      url: '/login',
      method: 'POST',
      data
    });
  }
//获取用户信息
export function Info(params) {
    return request({
      url: '/users/getInfo',
      method: 'get',
      params
    });
  }
//获取用户权限
export function getMenus(params) {
  return request({
    url: '/users/getrouter',
    method: 'get',
    params
  });
}
//退出登陆
export function logouts(params){
  return request({
    url: '/users/logouts',
    method: 'get',
    params
  });
}