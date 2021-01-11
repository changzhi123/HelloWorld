function genId() {
    // let preKey = `${+new Date()}`;
    // let key = 0;
    // return () => {
    //     const curTimestamp = `${+new Date()}`;
    //     if (curTimestamp === preKey) {
    //         key += 1;
    //     } else {
    //         // 重置 key
    //         key = 0;
    //     }

    //     preKey = curTimestamp;
    //     return `${preKey}x${key}`;
    // };
    return    `${new Date().getTime()}`
}
export function getComponentsAndInitToolsConfig(configTools) {
    // const arr=[]
    // configTools.filter(item=>{
    //     item.componentList.filter(v=>{
    //         arr.push(v.componentPack.name=v.componentPack)
    //     })
    // })
    // return arr
    // 平铺开所有组
    const componentList = configTools.reduce((preVal, curVal) => [
        ...preVal,
        ...curVal.componentList
    ], []);
console.log(componentList,'componentList')
    // 注册组件结构
    const data = componentList.reduce((preVal, { componentPack }) => {
        // 修改原数据
        // 生成 From组件和View组件 Name
        const needViewName = !componentPack.componentViewName;
        const needFormName = componentPack.Form && !componentPack.componentFormName;
   console.log(needViewName ,needFormName,'needViewName || needFormName',componentPack)
        // 需要生成viewName 或者 formName
        if (needViewName || needFormName) {
        
            const id = ((componentPack.propsSchema && (componentPack.propsSchema.id || componentPack.propsSchema.$id)) || genId());
        console.log(id,'id')
            if (needViewName) componentPack.componentViewName = `View${id}`;
            if (needFormName) componentPack.componentFormName = `Form${id}`;
        }

        if (componentPack.componentFormName) {
            preVal[componentPack.componentFormName] = componentPack.Form;
        }
        preVal[componentPack.componentViewName] = componentPack.View;

        Object.freeze(componentPack);
        return preVal;
    }, {});


    // 冻结配置数据
    Object.freeze(configTools);
    window.configTools = configTools;
    return data;
}