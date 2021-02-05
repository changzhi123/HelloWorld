

//前端自动组件全局注册

import vue from 'vue'

const requireComponent = require.context(  './components', false, /.vue$/)
console.log(requireComponent,'匹配到的文件')
// 循环获取到的文件，可在循环时处理文件名
requireComponent.keys().forEach((fileName) => {

  // 获取组件配置(组件模板)
  const componentConfig = requireComponent(fileName)//获取组件
  // 将被注册的组件名字,对获取的组件文件名进行处理
  const componentName = fileName.split('/')[1].replace(/\.vue$/, '')//获取组件名字
  console.log(componentName,' 组件名字',fileName)

  // 将组件在循环中注册到全局，
  vue.component(componentName, // 依据文件名处理好的，将要被注册到全局的组件名
    componentConfig.default || componentConfig)
})