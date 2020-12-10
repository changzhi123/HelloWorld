
// export default (name, index = false) => () => import(`@/${name}.vue`)
export default (view)=>{
    return (resolve) => require([`@/${view}.vue`], resolve)
  }
//传递组件地址进来

/*
静态路由懒加载，当我们把在router里面，把它写死在ts里时，它加载的ok的，
可是我们通过api接口拉取过来的数据时，发现是不报了上面的错0
错误原因是webpack打包逻辑，webpack4中动态import不支持变量方式，
查看路由返回的信息，只是返回一个方法。
// 原写法
export const loadView = (view) => {
  return () => import(`@/views/${view}`)
}
 
// webpack4 中动态import不支持以变量的方式，替换为下面的代码
export const loadView = (view) => {
  return (resolve) => require([`@/views/${view}`], resolve)
}
*/