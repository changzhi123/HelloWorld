const state={
    list:[ {
        id: 1,
        timestamp: 244486951365,
        author: "Robert",
        reviewer: "Larry",
        title: "Agfci1",
        content_short: "mock data",
        content:
          "<p>I am testing data, I am testing data.</p><p><img src='https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943'></p>",
        forecast: "8.43",
        importance: 3,
        type: "JP",
        status: "draft",
        display_time: "1988-01-26 04:01:10",
        comment_disabled: true,
        pageviews: 2645,
        image_uri:
          "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
        platforms: ["a-platform"]
      },
       {
        id: 2,
        timestamp: 244486951365,
        author: "Robert2",
        reviewer: "Larry",
        title: "Agfciy2",
        content_short: "mock data",
        content:
          "<p>I am testing data, I am testing data.</p><p><img src='https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943'></p>",
        forecast: "8.43",
        importance: 1,
        type: "JP",
        status: "draft",
        display_time: "1988-01-26 04:01:10",
        comment_disabled: true,
        pageviews: 2645,
        image_uri:
          "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
        platforms: ["a-platform"]
      }],//未读消息总数
}
const mutations = {
    SET_TOTAL:(state,res)=>{
        console.log(res,'res')
        if(!res.id){
            console.log(1)
            state.list.push(res)
        }else{
            console.log(2)
            state.list.map(item=>{
                if(item.id==res.id){
                    item=res
                }
            })
        }
        
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    // actions
  }