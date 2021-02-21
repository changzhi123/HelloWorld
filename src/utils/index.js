import VueCookies from 'vue-cookies'

export function setCookies(keyName,value){//储存
    VueCookies.set(keyName, value) 
};
export function getCookies(keyName){//读取
   return VueCookies.get(keyName)
};
export function delCookies(keyName){//删除
    VueCookies.remove(keyName)
};