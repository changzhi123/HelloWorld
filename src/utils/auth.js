import Cookies from 'js-cookie'

const TokenKey = 'vue3.0_Token' //储存token的名字

export function getToken() { //读取token
  return Cookies.get(TokenKey)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token) //保存token
}

export function removeToken() { //删除token
  return Cookies.remove(TokenKey)
}


const lang = 'vue3.0_lang' //储存语言标识的名字

export function getlang() { //读取语言标识
  return Cookies.get(lang)
}
export function setlang(val) { //保存语言标识
  return Cookies.set(lang, val)
}
// export function remove() {//删除语言标识
//   Cookies.remove(lang);
// }