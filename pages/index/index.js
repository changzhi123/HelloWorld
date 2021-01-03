//index.js
//获取应用实例
const app = getApp()
const util=require('../../utils/util.js')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list:['北京','故宫','天津']
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  toLogs:function(){//路由跳转
    console.log('跳转',this.data.list)
    const _this=this
    // wx.switchTab({
    //   url: "../list/index"
    // })
    wx.navigateTo({
      url: "../text/index?list="+_this.data.list
    })//传值
    /**
     * wx.switchTab 只能跳转 tabBar 中的页面并关闭其他页面
     * 
     * wx.navigateTo 只能跳转tabBar以外的页面
    */
  },
  onLoad: function () {
    console.log(util.getUrl('data.json'),'url')
  // 请求接口
  wx.request({
    url:util.getUrl('data.json'),
    //"https://ehcto.com/data.json",
    data:{
      key:'123',
      unerName:'changzhi'
    },
    success(res){
      console.log(res,'请求结果')
    }
  })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
