//## 常用的一些方法集合

import {
  MessageBox,
  Notification,
  Message
} from 'element-ui' //引入element-ui 插件

import i18n from '@/i18n/i18n'

// ##  格式化时间+星期
export function parseTime(time, req) { //格式化时间+星期
  if (arguments.length === 0) {
    return null
  }
  if (!time) { //当传入的值为空，拦截返回空
    return ''
  }
  const format = req || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') { //判断传入的类型是不是时间戳
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000 // parseInt解析字符串获得整数字 parseInt("10");返回 10 || parseInt("19",10);返回 19 (10+9) ||parseInt("11",2);返回 3 (2+1)
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(), //年
    m: date.getMonth() + 1, //月
    d: date.getDate(), //日
    h: date.getHours(), //时
    i: date.getMinutes(), //分
    s: date.getSeconds(), //秒
    a: date.getDay() //星期
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (item, key) => { //replace方法替换字符串
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (item.length > 0 && value < 10) { //当值小于10时补零
      value = '0' + value
    }
    return value || 0
  })
  return time_str //返回转换后的格式
}


// ##  重置对象
export function resetObj(req, val) { // 重置对象
  for (let key in req) {
    req[key] = val || null //传入的值为空默认等于null
  }
}


//##  获取指定目录下的所有文件名后缀名为svg的文件名字
export function filename(url,type){
  // const files = require.context('@/icons/svg', false, /.svg$/).keys();
  const files = require.context('@/icons/svg', false, /.svg$/).keys();
  return files.map(item=>{
    return(item.split("/"))[1].split(".")[0]
  })
}

// ##  格式化时间
export function Formattime(time, val) {
  if (typeof time === 'object') { //判断传入是参数是不是时间戳
    date = time //是直接放行
  } else {
    time = time.getTime() //不是转化为时间戳
  }
  return new Date(date + 8 * 3600 * 1000) //val为数字，没有传递默认为19
    .toJSON()
    .substr(0, val || 19)
    .replace("T", " ")
    .replace(/-/g, ".");
}

// ##  消息提示2  
export function messagealert(text, type, place, val, set) {
  // console.log(i18n.t('method.warning'))
  const state = {
    warning: 'warning',
    success: 'success',
    error: 'error',
    info: 'info'
  }
  Notification({
    title: type ? i18n.t('method.' + state[type]) : i18n.t('method.success'), //提示标题
    dangerouslyUseHTMLString: true, //是否打开html片段
    message: text || i18n.t('method.operate successfully') + '！', //提示内容
    type: type || 'success', //消息状态
    position: place || 'top-right', //提示位置
    offset: set || 0, //偏移量
    duration: val || 2 * 1000, //提示时间
    showClose: true, //是否显示关闭按钮
  })
}

// ##  消息提示1
export function reminder(text, type, val) { //消息提示 必须安装element-ui才生效 提示弹窗出现位置top
  Message({
    message: text || i18n.t('method.operate successfully') + '！', //text为空默认输出操作成功
    type: type || 'success', //type为空默认为成功提示success/warning/info/error
    duration: val || 2 * 1000, //提示时间
    showClose: true, //是否显示关闭按钮
    dangerouslyUseHTMLString: true, //是否打开html片段
  })
}


//##返回顶部
export function backTop() { //返回顶部
  document.body.scrollTop = document.documentElement.scrollTop = 0
}

//## 判断有效时间是否已经过期
export function validity(key, value) {
  const req = new Date().getTime(); //当前时间
  let item
  if (typeof key === 'object') { //传入的是否是时间对象&标准时间格式
    item = key.getTime(); //传入的时间
  } else if (typeof key === 'string') { //传入的时间是否是字符串
    item = new Date(key).getTime()
  } else { //是时间催直接赋值
    item = key
  }
  return req > item ? value || '已过期' : key //have expired
  //当传入时间小于当前时间返回已过期活着传入的value 
}


//## 节流
export function throttles(fun, delay) {
  let last, deferTimer
  return function (args) {
    let that = this
    let _args = arguments
    let now = +new Date()
    if (last && now < last + delay || 500) {
      clearTimeout(deferTimer)
      deferTimer = setTimeout(function () {
        last = now
        fun.apply(that, _args)
      }, delay || 500)
    } else {
      last = now
      fun.apply(that, _args)
    }
  }
}
// ## 用户名正则
export function UsernameRegula(val,type){
  const userType={
    unserA:/^[a-zA-Z0-9_-]{4,16}$/,//，4到16位（字母，数字，下划线，减号）
  }
  return userType[type||'unserA'].test(val)
}

// ## 手机号码正则
export function MobileRegular(val,type){
  const Mobile={
    MobileA:/^1(3|4|5|6|7|8|9)\d{9}$/,
  }
  return Mobile[type ||'MobileA'].test(val,type)
}

// ## 邮箱正则
export function EmailRegular(val,type){
  const Email={
    EmailA:/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
  }
  return Email[type||'EmailA'].test(val)
}

// ## 密码正则
export function PasswordRegular(val, type) {
  const passwor = {
    // 密码至少包含 数字和英文，长度6-20
    passworA: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
    // 密码包含 数字,英文,字符中的两种以上，长度6-20
    passworB: /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/,
    //至少包含数字跟字母，可以有字符，长度6-20
    passworC: /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/,
    //至少包含数字和字母两种
    passworD: /^(?![^a-zA-Z]+$)(?!\D+$)/,
  }
  return passwor[type || 'passworD'].test(val)
}

// ## ip地址正则
export function IPregularity(val,type){
  const ip={
    //电脑ip地址
    idA:/(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/,
  }
  return ip[type||'idA'].test(val)
}

//##倒计时
export function count_down(val) {
  const nowtime = new Date().getTime(),
  endtime =  val
  return  endtime - nowtime
    
}

///##合并对象,并深拷贝
export function objset(data,tag){
  for(let key in tag){
    //    console.log(key,'key',tag[key],data[key],typeof tag[key],typeof false)
       if(Array.isArray(tag[key])){
         data[key]=[...tag[key]]//当值为数字，深拷贝
       }else if(typeof tag[key] == 'object' ){
          if(!data[key])data[key]={}//判断原始对象是否有key属性，没有新增并赋值为{}
          this.objset(data[key],tag[key])//值为{}时，重复调用函数
      }else if(typeof tag[key]=='function'){
          data[key]=tag[key] //值为函数直接赋值
      }else{
          data[key]=tag[key]//普通值直接深拷贝
      }

  }
  return data
}
export function putobj(data){
   return JSON.parse(JSON.stringify(data))
}
export function copyobj (data, list){
  if (!data) return {}; //data必须为真，不为真结束循环返回{}
  let obj = list || {}; //判断list是否为真，为真合并对象，为假拷贝对象
  for (let key in data) {
    if (Array.isArray(data[key])) {
      obj[key] = [...data[key]]; //优先判断是不是数组，是直接拷贝
    } else if (typeof data[key] == "object") {
      obj[key] = this.copyobj(data[key], obj[key]); //对象重复调用函数，进行深度循环
    } else {
      obj[key] = data[key]; //普通值，直接拷贝,函数不用处理直接拷贝
    }
  }
  return obj;//该方法有缺陷，无法判断date和null类型
};

//##  完美深拷贝合并对象方法，多维度
export function deepCopy(data,obj={}){
  if (!data) return {}; //data必须为真，不为真结束循环返回
  for (let key in data) {
    const type = Object.prototype.toString.call(data[key]);
    if (type == "[object Array]") {
      obj[key] = [...data[key]]; //判断是不是数组，是直接拷贝
    } else if (type == "[object Object]") {
      obj[key] = deepCopy(data[key], obj[key]); //对象重复调用函数，深度循环
    } else {
      obj[key] = data[key]; //普通值，直接拷贝,函数不用处理直接拷贝
    }
  }
  return obj;
  /*
  Object.prototype.toString.call({}) ;   // [object Object]
  Object.prototype.toString.call('') ;   // [object String]
  Object.prototype.toString.call(1) ;    // [object Number]
  Object.prototype.toString.call(true) ; // [object Boolean]
  Object.prototype.toString.call(Symbol()); //[object Symbol]
  Object.prototype.toString.call(undefined) ; // [object Undefined]
  Object.prototype.toString.call(null) ; // [object Null]
  Object.prototype.toString.call(new Function()) ; // [object Function]
  Object.prototype.toString.call(new Date()) ; // [object Date]
  Object.prototype.toString.call([]) ; // [object Array]
  Object.prototype.toString.call(new RegExp()) ; // [object RegExp]
  Object.prototype.toString.call(new Error()) ; // [object Error]
  Object.prototype.toString.call(document) ; // [object HTMLDocument]
  Object.prototype.toString.call(window) ; //[object global] window 是全局对象 global 的引用
  */
}
//## 数组排序
export function sortMap (key)  {
  return (a, b) => {
    let a_item = a[key] || a,b_item = b[key] || b;
    return a_item - b_item;
  };
};
