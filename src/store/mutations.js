// mutations.js
let mutations = {
    // 设置 state 里面指定属性的值，通用更新方法
    stateUpdate(state, key, value, module ) {
        if (module) {
            state[module][key] = value;
        } else {
            state[key] = value;
        }
    },
}
export default mutations