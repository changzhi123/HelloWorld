import request from '@/utils/request'

export function getInfo(data) {//获取用户信息
  return request({
    url: '/users/getInfo',
    method: 'get',
    params: data
  });
}
export function login(data) {//登录
  return request({
    url: '/login',
    method: 'post',
    data: data
  });
}
export function logouts(data) {//退出登录
  return request({
    url: '/users/logouts',
    method: 'get',
    params: data
  });
}
export function getMenus(data) {//获取菜单
  return request({
    url: '/users/getMenus',
    method: 'get',
    params: data
  });
}
export function delImg(data) {//删除上传的图片配合图片上传组件使用
  return request({
    url: '/users',
    method: 'get',
    params: data
  });
}
export function getsetrouter(data) {//编辑修改菜单
  return request({
    url: '/users/setrouter',
    method: 'post',
    data: data
  })
}
export function getdelrouter(data) {//删除菜单
  return request({
    url: '/users/delrouter',
    method: 'delete',
    params: data
  })
}
export function getrole(data) {//获取角色列表
  return request({
    url: '/users/getrole',
    method: 'get',
    params: data
  })
}
export function getrolemenu(data) {//获取角色所分配的菜单
  return request({
    url: '/users/getrole/menu',
    method: 'get',
    params: data
  })
}
export function setrole(data) {//角色列表编辑和新增
  return request({
    url: '/users/setrole',
    method: 'post',
    data
  })
}
export function delrole(data) {//删除juese
  return request({
    url: '/users/delrole',
    method: 'delete',
    params: data
  })
}
export function setrolemenu(data) {//修改角色分配的菜单
  return request({
    url: '/users/setrole/menu',
    method: 'post',
    data
  })
}
export function getuser(data) {//获取管理员列表
  return request({
    url: '/',
    method: 'post',
    data
  })
}
export function delunser(data) {//删除管理员
  return request({
    url: '/delunser',
    method: 'delete',
    params: data
  })
}
export function setunser(data) {//新增修改管理员
  return request({
    url: '/register',
    method: 'post',
    data
  })
}
export function getrouter(data) {//获取动态路由
  return request({
    url: '/users/getrouter',
    method: 'get',
    params: data
  })
}