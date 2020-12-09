import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
const zh = {
    message: {
        'hello': '你好，世界',
    },
    ...zhLocale,//ui组件的语言包
    method:{
        'success':'成功',
        'warning':'警告',
        'error':'错误',
        'info':'提示',
        'operate successfully':'操作成功',
        'have expired':'已过期',
        'Language switch successful':' 切换语言成功'
    },//方法文件method的语言包
}

export default zh