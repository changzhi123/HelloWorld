import VueCookies from 'vue-cookies'
import { message } from 'ant-design-vue';


export function setCookies(keyName, value) {//储存
    VueCookies.set(keyName, value)
};
export function getCookies(keyName) {//读取
    return VueCookies.get(keyName)
};
export function delCookies(keyName) {//删除
    VueCookies.remove(keyName)
};

//##消息提示
export function reminder(content, { type = 'success', duration = 3, onClose } = {}) {
    //content：提示文字 type：提示类型 duration：提示时间 onClose：提示结束回调
    message[type](content, [duration], onClose)
}

//##格式化时间
export function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
    const type = Object.prototype.toString.call(date)
    if (type != '[object Date]') date = new Date(date)//判断是否时间戳
    const time = {
        YYYY: date.getFullYear(), //年
        MM: date.getMonth() + 1, //月
        DD: date.getDate(), //日
        HH: date.getHours(), //时
        mm: date.getMinutes(), //分
        ss: date.getSeconds(), //秒
    }
    Object.keys(time).filter(key => {
        let reqItem=time[key]*1
        if(reqItem<10)reqItem=`0${reqItem}`
        format = format.replace(key, reqItem)
    })
    return format
}

//## 数组排序
export function sortArr(key) {
    return (a, b) => {
        let a_item = a[key] || a, b_item = b[key] || b;
        return a_item - b_item;
    };
};

//##  深拷贝合并对象方法，多维度
export function deepCopy(data, obj = {}) {
    if (!data) return {}; //data必须为真，不为真结束循环返回
    Object.keys(data).filter(key => {
        const type = Object.prototype.toString.call(data[key]);
        if (type == "[object Array]") {
            obj[key] = [...data[key]]; //判断是不是数组，是直接拷贝
        } else if (type == "[object Object]") {
            obj[key] = deepCopy(data[key], obj[key]); //对象重复调用函数，深度循环
        } else {
            obj[key] = data[key]; //普通值，直接拷贝,函数不用处理直接拷贝
        }
    })
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