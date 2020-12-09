
// const _import = require('../../router/_import_' + process.env.NODE_ENV)
// export default (name, index = false) => () => import(`../../views/${name}${index ? '/index' : ''}.vue`)
export default (name, index = false) => () => import(`@/${name}.vue`)
//传递组件地址进来